/**
 * Vercel Serverless API Route: /api/news
 * 
 * Ingests 50-150 candidate articles directly from official RSS feeds across
 * TechCrunch, The Verge, MIT Tech Review, WIRED, Ars Technica, Google, OpenAI, etc.
 * Enforces strict < 24h publication freshness in UTC and selects the top AI stories.
 */

import { TRUSTED_AI_SOURCES } from '../src/utils/sourceRegistry.js';
import { parseFeedXml, executeNewsPipeline } from '../src/utils/newsPipeline.js';

export default async function handler(req, res) {
  const isForce = req.query?.force === 'true' || req.query?.refresh === 'true';
  
  if (isForce) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
  }

  console.log(`[ReadAiNews] Fetch started at ${new Date().toISOString()} (force: ${isForce})`);
  
  const allCandidates = [];
  const sourceStats = [];

  // Fetch from all trusted sources with per-source isolation and 6s timeout
  const fetchPromises = TRUSTED_AI_SOURCES.map(async (source) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      
      const response = await fetch(source.feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ReadAiNews/2.0'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[ReadAiNews] Source failed: ${source.name} (HTTP ${response.status})`);
        sourceStats.push({ source: source.name, status: 'error', code: response.status, count: 0 });
        return;
      }

      const xmlText = await response.text();
      const articles = parseFeedXml(xmlText, source);
      
      console.log(`[ReadAiNews] Source: ${source.name} | Articles fetched: ${articles.length}`);
      sourceStats.push({ source: source.name, status: 'ok', count: articles.length });
      allCandidates.push(...articles);
    } catch (err) {
      console.warn(`[ReadAiNews] Source exception: ${source.name} - ${err.message}`);
      sourceStats.push({ source: source.name, status: 'exception', error: err.message, count: 0 });
    }
  });

  await Promise.allSettled(fetchPromises);

  console.log(`[ReadAiNews] Total candidate pool fetched: ${allCandidates.length} articles across ${TRUSTED_AI_SOURCES.length} sources`);

  // Execute the pipeline: Strict < 24h filter, deduplication, AI importance ranking across full pool
  const winners = executeNewsPipeline(allCandidates, {
    nowUtc: Date.now(),
    maxArticles: 50,
    timeZone: 'Asia/Kolkata',
    logger: console
  });

  res.status(200).json({
    success: true,
    count: winners.length,
    articles: winners,
    sourceStats: sourceStats,
    timestamp: new Date().toISOString()
  });
}
