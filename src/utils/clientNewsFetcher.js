/**
 * clientNewsFetcher.js - Resilient Client News Fetcher
 * 
 * Fetches fresh AI news from /api/news (Vercel serverless function).
 * Provides graceful client-side fallback if the API route is unreachable.
 * Strictly guarantees that ONLY articles published within the last 24 hours are returned for Today's News.
 */

import { executeNewsPipeline, parseFeedXml } from './newsPipeline.js';
import { TRUSTED_AI_SOURCES } from './sourceRegistry.js';
import { ensureStrictlyUniqueImages } from './imageEngine.js';

const STORAGE_KEY_TODAY = 'readainews_fresh_today_v13';
const STORAGE_KEY_TIMESTAMP = 'readainews_fresh_timestamp_v13';
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Fetches the freshest AI news for "Today's AI News" deck.
 * Guarantees that only articles published within the last 24 hours are returned.
 */
export async function fetchTodayFreshNews(force = false) {
  const now = Date.now();
  
  // Check client-side cached fresh batch if not forcing refresh
  if (!force && typeof window !== 'undefined') {
    try {
      const lastTime = parseInt(localStorage.getItem(STORAGE_KEY_TIMESTAMP) || '0', 10);
      const isStillFresh = (now - lastTime) < ONE_HOUR_MS;
      if (isStillFresh) {
        const cachedRaw = localStorage.getItem(STORAGE_KEY_TODAY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          // Verify cached items are still within 24h
          const valid = cached.filter(a => {
            const age = now - (a.publishedEpoch || 0);
            return age >= 0 && age <= 24 * 3600 * 1000;
          });
          if (valid.length > 0) {
            console.log(`[ReadAiNews] Using cached fresh batch (${valid.length} articles)`);
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
    const url = `/api/news${force ? '?force=true' : ''}`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      cache: force ? 'no-store' : 'default'
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        // Enforce 24h filter client-side as an extra safety guard
        const strictlyFresh = data.articles.filter(a => {
          const age = now - (a.publishedEpoch || 0);
          return age >= 0 && age <= 24 * 3600 * 1000;
        });
        
        const finalArticles = ensureStrictlyUniqueImages(strictlyFresh.slice(0, 5));
        
        if (typeof window !== 'undefined' && finalArticles.length > 0) {
          try {
            localStorage.setItem(STORAGE_KEY_TODAY, JSON.stringify(finalArticles));
            localStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
          } catch (e) {}
        }
        
        console.log(`[ReadAiNews] Successfully received ${finalArticles.length} fresh articles from /api/news`);
        return finalArticles;
      }
    }
  } catch (err) {
    console.warn('[ReadAiNews] /api/news fetch failed, falling back to client-side pipeline:', err.message);
  }

  // Attempt 2: Client-side direct pipeline for local development or API fallback
  try {
    console.log('[ReadAiNews] Running client-side RSS pipeline...');
    const candidateArticles = [];
    
    // Pick top reliable feeds that support CORS or direct access
    const clientFeeds = TRUSTED_AI_SOURCES.slice(0, 8);
    
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
        maxArticles: 5,
        logger: console
      });
      
      const finalArticles = ensureStrictlyUniqueImages(winners);
      
      if (typeof window !== 'undefined' && finalArticles.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEY_TODAY, JSON.stringify(finalArticles));
          localStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
        } catch (e) {}
      }
      
      return finalArticles;
    }
  } catch (e) {
    console.error('[ReadAiNews] Client-side fallback error:', e);
  }

  // If no fresh news found in last 24h, return empty array (DO NOT BACKFILL WITH STALE NEWS!)
  console.log('[ReadAiNews] Zero articles passed the 24-hour freshness filter. Returning empty feed.');
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
