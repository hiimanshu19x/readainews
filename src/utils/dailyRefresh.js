import { allNewsArticles } from '../data/newsData';
import { getUniqueDailyArticles } from './dailyTracker';

const BATCH_STORAGE_KEY = 'readainews_1hr_batch_v9_';
const REFRESH_TIMESTAMP_KEY = 'readainews_last_refresh_time_v9';
const ONE_HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Automatically refreshes the top curated AI news every 1 hour from the 15 premier publications.
 * Guarantees zero duplicates for any time using persistent seen-article history.
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

  // Generate a fresh 5-story batch with strict zero-repeat guarantee
  const { articles: selectedBatch } = getUniqueDailyArticles(allNewsArticles, 5);

  // Save new 1-hour batch and update timestamp
  try {
    localStorage.setItem(REFRESH_TIMESTAMP_KEY, now.toString());
    localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(selectedBatch));
  } catch (e) {
    console.warn('Cache write error:', e);
  }

  return {
    articles: selectedBatch,
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
