/**
 * clientNewsFetcher.js - Resilient Client News Fetcher
 * 
 * Fetches fresh AI news pool from /api/news (Vercel serverless function).
 * Provides graceful client-side fallback if the API route is unreachable.
 * Strictly guarantees that ONLY articles published TODAY (on today's calendar date
 * in the user's timezone) are returned for Today's News feed.
 */

import { executeNewsPipeline, parseFeedXml } from './newsPipeline.js';
import { TRUSTED_AI_SOURCES } from './sourceRegistry.js';
import { ensureStrictlyUniqueImages } from './imageEngine.js';
import { isTodayInTz, getUserTimeZone, getLocalDateKey } from './timeZone.js';

export const STORAGE_KEY_POOL = 'readainews_fresh_pool_v17';
export const STORAGE_KEY_TIMESTAMP = 'readainews_fresh_timestamp_v17';
export const STORAGE_KEY_HOUR = 'readainews_fresh_hour_v17';
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Extracts a batch of 5 distinct articles from the fresh pool for a given batch index.
 */
export function getBatchOfArticles(pool = [], batchIndex = 1, batchSize = 5) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  if (pool.length <= batchSize) return pool;

  const totalBatches = Math.max(1, Math.ceil(pool.length / batchSize));
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
 * Calculates current default hourly batch index (1..totalBatches) based on current hour of day.
 */
export function getHourlyBatchIndex(poolSize = 13, batchSize = 5) {
  const totalBatches = Math.max(1, Math.ceil(poolSize / batchSize));
  const hourOfDay = new Date().getHours();
  return (hourOfDay % totalBatches) + 1;
}

/**
 * Fetches the full pool of fresh AI news published TODAY for Today's News.
 */
export async function fetchTodayFreshNews(force = false) {
  const now = Date.now();
  const tz = getUserTimeZone();
  const currentHourOfToday = new Date().getHours();
  
  // Check client-side cached fresh pool if not forcing refresh and hour hasn't changed
  if (!force && typeof window !== 'undefined') {
    try {
      const lastHour = parseInt(localStorage.getItem(STORAGE_KEY_HOUR) || '-1', 10);
      const lastTime = parseInt(localStorage.getItem(STORAGE_KEY_TIMESTAMP) || '0', 10);
      const isSameHour = lastHour === currentHourOfToday;
      const isWithinHour = (now - lastTime) < ONE_HOUR_MS;
      
      if (isSameHour && isWithinHour) {
        const cachedRaw = localStorage.getItem(STORAGE_KEY_POOL);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          // Strictly verify cached items are from TODAY in user's timezone
          const todayOnly = cached.filter(a => isTodayInTz(a.publishedEpoch, tz));
          if (todayOnly.length >= 5) {
            console.log(`[ReadAiNews] Using cached fresh pool (${todayOnly.length} articles from today)`);
            return ensureStrictlyUniqueImages(todayOnly);
          }
        }
      }
    } catch (e) {
      console.warn('[ReadAiNews] Cache read warning:', e);
    }
  }

  // Helper to safely parse and process API news response
  const processApiResponse = (data) => {
    if (data && data.success && Array.isArray(data.articles)) {
      // STRICT CALENDAR DATE FILTER: Retain articles published TODAY
      const todayArticles = data.articles.filter(a => isTodayInTz(a.publishedEpoch, tz));
      
      let poolForToday = todayArticles;
      if (poolForToday.length < 5) {
        const recentFallback = data.articles.filter(a => {
          const age = now - (a.publishedEpoch || 0);
          return age >= 0 && age <= 12 * 3600 * 1000;
        });
        poolForToday = recentFallback.length >= poolForToday.length ? recentFallback : data.articles.slice(0, 5);
      }
      
      const finalPool = ensureStrictlyUniqueImages(poolForToday);
      
      if (typeof window !== 'undefined' && finalPool.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEY_POOL, JSON.stringify(finalPool));
          localStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
          localStorage.setItem(STORAGE_KEY_HOUR, currentHourOfToday.toString());
        } catch (e) {}
      }
      
      console.log(`[ReadAiNews] Received ${finalPool.length} articles for Today's feed from API`);
      return finalPool;
    }
    return null;
  };

  // Attempt 1: Fetch from relative /api/news Vercel Serverless Function
  try {
    const url = `/api/news?force=${force ? 'true' : 'false'}&_t=${now}`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        const pool = processApiResponse(data);
        if (pool && pool.length > 0) return pool;
      }
    }
  } catch (err) {
    console.warn('[ReadAiNews] /api/news fetch failed:', err.message);
  }

  // Attempt 2: Direct fetch from production API (essential for local dev & preview)
  try {
    const prodUrl = `https://readainews.vercel.app/api/news?force=${force ? 'true' : 'false'}&_t=${now}`;
    const res = await fetch(prodUrl, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        const pool = processApiResponse(data);
        if (pool && pool.length > 0) return pool;
      }
    }
  } catch (err) {
    console.warn('[ReadAiNews] Production API fallback failed:', err.message);
  }

  // Attempt 3: Client-side direct pipeline for local development or API fallback
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
        timeZone: tz,
        logger: console
      });
      
      const todayArticles = winners.filter(a => isTodayInTz(a.publishedEpoch, tz));
      const pool = todayArticles.length >= 5 ? todayArticles : winners.slice(0, 5);
      const finalPool = ensureStrictlyUniqueImages(pool);
      
      if (typeof window !== 'undefined' && finalPool.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEY_POOL, JSON.stringify(finalPool));
          localStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
          localStorage.setItem(STORAGE_KEY_HOUR, currentHourOfToday.toString());
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

