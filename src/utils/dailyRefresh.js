import { allNewsArticles } from '../data/newsData';
import { getTodayLocalKey } from './timeZone.js';
import { fetchFreshLiveArticles } from './liveScraper.js';

const BATCH_STORAGE_KEY = 'readainews_1hr_batch_v10_';
const REFRESH_TIMESTAMP_KEY = 'readainews_last_refresh_time_v10';
const ONE_HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Automatically refreshes the top curated AI news every 1 hour from the premier publications.
 * Fetches fresh articles from the web and adds them to the pool with zero duplicates.
 */
export async function getDailyRefreshedArticles(forceLive = false) {
  if (typeof window === 'undefined') {
    return { articles: allNewsArticles.slice(0, 5), isLive: false };
  }

  const now = Date.now();
  const lastRefreshTime = parseInt(localStorage.getItem(REFRESH_TIMESTAMP_KEY) || '0', 10);
  const timeSinceLastRefresh = now - lastRefreshTime;
  const isExpired = timeSinceLastRefresh >= ONE_HOUR_MS;

  // If not forcing refresh, and cached batch exists and is under 1 hour old, return cached
  if (!forceLive && !isExpired && lastRefreshTime > 0) {
    const cachedBatch = localStorage.getItem(BATCH_STORAGE_KEY);
    if (cachedBatch) {
      try {
        const parsed = JSON.parse(cachedBatch);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          return {
            articles: parsed,
            isLive: true,
            isCachedToday: true,
            nextRefreshInMs: ONE_HOUR_MS - timeSinceLastRefresh
          };
        }
      } catch (e) {
        console.warn('Cache read error:', e);
      }
    }
  }

  // Fetch 5 brand new articles from the live web feeds
  const freshArticles = await fetchFreshLiveArticles(5);

  // Save new 1-hour batch and update timestamp
  try {
    localStorage.setItem(REFRESH_TIMESTAMP_KEY, now.toString());
    localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(freshArticles));
  } catch (e) {
    console.warn('Cache write error:', e);
  }

  return {
    articles: freshArticles,
    isLive: true,
    isCachedToday: false,
    nextRefreshInMs: ONE_HOUR_MS
  };
}

/**
 * Returns remaining time until next automated 1-hour refresh in minutes
 */
export function getNextRefreshCountdown() {
  if (typeof window === 'undefined') return { hours: 1, minutes: 0 };
  const now = Date.now();
  const lastRefreshTime = parseInt(localStorage.getItem(REFRESH_TIMESTAMP_KEY) || '0', 10);
  const diff = ONE_HOUR_MS - (now - lastRefreshTime);
  if (diff <= 0) return { hours: 0, minutes: 0 };
  const totalMins = Math.floor(diff / 60000);
  const hours = Math.floor(totalMins / 60);
  const minutes = totalMins % 60;
  return { hours, minutes };
}

const PREVIEW_STORAGE_PREFIX = 'readainews_preview_article_v10_';

/**
 * Returns the featured preview article that strictly updates ONCE PER DAY.
 * Persists for the local calendar date and automatically updates when a new day arrives.
 */
export function getDailyPreviewArticle(pool = allNewsArticles) {
  if (!pool || pool.length === 0) return null;

  const todayKey = getTodayLocalKey();

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      // Clean up stale preview caches from past dates
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('readainews_preview_article_') && !key.endsWith(todayKey)) {
          localStorage.removeItem(key);
        }
      }

      // Check if already selected for today
      const cached = localStorage.getItem(`${PREVIEW_STORAGE_PREFIX}${todayKey}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.id) {
          const match = pool.find(a => a.id === parsed.id);
          if (match) return match;
        }
      }
    } catch (e) {
      console.warn('Preview cache read error:', e);
    }
  }

  // Deterministically select the featured article of the day
  let dayHash = 0;
  for (let i = 0; i < todayKey.length; i++) {
    dayHash = (dayHash * 31 + todayKey.charCodeAt(i)) & 0xffffffff;
  }
  const dayIndex = Math.abs(dayHash) % pool.length;
  const selected = pool.find(a => a.featured) || pool[dayIndex] || pool[0];

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(`${PREVIEW_STORAGE_PREFIX}${todayKey}`, JSON.stringify(selected));
    } catch (e) {}
  }

  return selected;
}
