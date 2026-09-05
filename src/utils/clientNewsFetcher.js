/**
 * clientNewsFetcher.js - Resilient Client News Fetcher
 * 
 * Fetches fresh AI news pool from /api/news (Vercel serverless function).
 * Provides graceful client-side fallback if the API route is unreachable.
 * Strictly guarantees that ONLY articles published within the last 24 hours are returned for Today's News.
 */

import { executeNewsPipeline, parseFeedXml } from './newsPipeline.js';
import { TRUSTED_AI_SOURCES } from './sourceRegistry.js';
import { ensureStrictlyUniqueImages } from './imageEngine.js';

const STORAGE_KEY_POOL = 'readainews_fresh_pool_v14';
const STORAGE_KEY_TIMESTAMP = 'readainews_fresh_timestamp_v14';
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Extracts a batch of 5 distinct articles from the fresh pool for a given batch index.
 */
export function getBatchOfArticles(pool = [], batchIndex = 1, batchSize = 5) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  if (pool.length <= batchSize) return pool;

  const totalBatches = Math.ceil(pool.length / batchSize);
  const normalizedIndex = ((batchIndex - 1) % totalBatches) + 1;
  const start = (normalizedIndex - 1) * batchSize;
  const slice = pool.slice(start, start + batchSize);

  if (slice.length < batchSize) {
    const needed = batchSize - slice.length;
    const fillers = pool.slice(0, needed).filter(f => !slice.some(s => s.id === f.id));
    return [...slice, ...fillers];
  }
  return slice;
}

/**
 * Calculates current default hourly batch index (1..totalBatches) based on elapsed hours.
 */
export function getHourlyBatchIndex(poolSize = 25, batchSize = 5) {
  const totalBatches = Math.max(1, Math.ceil(poolSize / batchSize));
  const hourOfDay = Math.floor(Date.now() / (3600 * 1000));
  return (hourOfDay % totalBatches) + 1;
}

/**
 * Fetches the full pool of fresh AI news (< 24h old) for Today's News.
 */
export async function fetchTodayFreshNews(force = false) {
  const now = Date.now();
  
  // Check client-side cached fresh pool if not forcing refresh
  if (!force && typeof window !== 'undefined') {
    try {
      const lastTime = parseInt(localStorage.getItem(STORAGE_KEY_TIMESTAMP) || '0', 10);
      const isStillFresh = (now - lastTime) < ONE_HOUR_MS;
      if (isStillFresh) {
        const cachedRaw = localStorage.getItem(STORAGE_KEY_POOL);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          // Verify cached items are strictly within 24h
          const valid = cached.filter(a => {
            const age = now - (a.publishedEpoch || 0);
            return age >= 0 && age <= 24 * 3600 * 1000;
          });
          if (valid.length > 0) {
            console.log(`[ReadAiNews] Using cached fresh pool (${valid.length} articles)`);
            return ensureStrictlyUniqueImages(valid);
          }
        }
      }
    } catch (e) {
      console.warn('[ReadAiNews] Cache read warning:', e);
    }
  }

  // Attempt 1: Fetch from /api/news Vercel Serverless Function
  try {
    const url = `/api/news?force=${force ? 'true' : 'false'}&_t=${now}`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        // Enforce 24h filter client-side as an extra safety guard
        const strictlyFresh = data.articles.filter(a => {
          const age = now - (a.publishedEpoch || 0);
          return age >= 0 && age <= 24 * 3600 * 1000;
        });
        
        const finalPool = ensureStrictlyUniqueImages(strictlyFresh);
        
        if (typeof window !== 'undefined' && finalPool.length > 0) {
          try {
            localStorage.setItem(STORAGE_KEY_POOL, JSON.stringify(finalPool));
            localStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
          } catch (e) {}
        }
        
        console.log(`[ReadAiNews] Received ${finalPool.length} fresh articles pool from /api/news`);
        return finalPool;
      }
    }
  } catch (err) {
    console.warn('[ReadAiNews] /api/news fetch failed, falling back to client-side pipeline:', err.message);
  }

  // Attempt 2: Client-side direct pipeline for local development or API fallback
  try {
    console.log('[ReadAiNews] Running client-side RSS pipeline...');
    const candidateArticles = [];
    const clientFeeds = TRUSTED_AI_SOURCES.slice(0, 10);
    
    const feedPromises = clientFeeds.map(async (source) => {
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.feedUrl)}`;
        const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(5000) });
        if (res.ok) {
          const xml = await res.text();
          const parsed = parseFeedXml(xml, source);
          candidateArticles.push(...parsed);
        }
      } catch (e) {}
    });
    
    await Promise.allSettled(feedPromises);
    
    if (candidateArticles.length > 0) {
      const winners = executeNewsPipeline(candidateArticles, {
        nowUtc: now,
        maxArticles: 50,
        logger: console
      });
      
      const finalPool = ensureStrictlyUniqueImages(winners);
      
      if (typeof window !== 'undefined' && finalPool.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEY_POOL, JSON.stringify(finalPool));
          localStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
        } catch (e) {}
      }
      
      return finalPool;
    }
  } catch (e) {
    console.error('[ReadAiNews] Client-side fallback error:', e);
  }

  return [];
}

/**
 * Filters articles for the Weekly Collection ("Read This Week").
 * Strictly enforces: published_at >= now - 7 days (168 hours).
 */
export function getWeeklyFreshArticles(articles = []) {
  const now = Date.now();
  const SEVEN_DAYS_MS = 7 * 24 * 3600 * 1000;
  
  const weeklyOnly = articles.filter(a => {
    if (!a.publishedEpoch) return false;
    const age = now - a.publishedEpoch;
    return age >= 0 && age <= SEVEN_DAYS_MS;
  });
  
  return ensureStrictlyUniqueImages(weeklyOnly);
}
