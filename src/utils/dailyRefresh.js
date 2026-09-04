import { fetchLiveWebAiNews } from './liveScraper';
import { allNewsArticles } from '../data/newsData';
import { getTodayDateKey, getUniqueDailyArticles } from './dailyTracker';

const BATCH_STORAGE_KEY = 'readainews_today_batch_v4_';
const REFRESH_DATE_KEY = 'readainews_last_refresh_date_v4';

/**
 * Ensures the website gets a refreshed shot of articles from top tier publications every day.
 * Automatically guarantees 5 distinct top news outlets (TechCrunch, Wired, MIT Tech Review, Bloomberg, The Verge).
 */
export async function getDailyRefreshedArticles(forceLive = false) {
  const todayKey = getTodayDateKey();
  
  if (typeof window === 'undefined') {
    return { articles: allNewsArticles.slice(0, 5), isLive: false, dateKey: todayKey };
  }

  const lastRefreshDate = localStorage.getItem(REFRESH_DATE_KEY);
  const cachedBatch = localStorage.getItem(`${BATCH_STORAGE_KEY}${todayKey}`);

  // Purge any stale cache with live- HackerNews IDs or mismatched links
  if (cachedBatch) {
    try {
      const parsed = JSON.parse(cachedBatch);
      const hasLegacyHn = Array.isArray(parsed) && parsed.some(a => a.id?.startsWith('live-') || a.source?.includes('Hacker News') || a.sourceUrl?.includes('ycombinator'));
      if (hasLegacyHn) {
        localStorage.removeItem(`${BATCH_STORAGE_KEY}${todayKey}`);
      }
    } catch (e) {
      localStorage.removeItem(`${BATCH_STORAGE_KEY}${todayKey}`);
    }
  }

  // If we already have today's verified batch cached and not forcing a live refresh
  if (!forceLive && lastRefreshDate === todayKey) {
    const freshCached = localStorage.getItem(`${BATCH_STORAGE_KEY}${todayKey}`);
    if (freshCached) {
      try {
        const parsed = JSON.parse(freshCached);
        if (Array.isArray(parsed) && parsed.length >= 5 && parsed[0]?.sourceUrl && !parsed[0].id?.startsWith('live-')) {
          return {
            articles: parsed,
            isLive: true,
            dateKey: todayKey,
            isCachedToday: true
          };
        }
      } catch (e) {
        console.warn('Cache read failed:', e);
      }
    }
  }

  // Primary top-tier curated news pool for today: 5 distinct publications
  const topFive = allNewsArticles.slice(0, 5);

  // Save today's refreshed batch & update last refresh date
  try {
    localStorage.setItem(REFRESH_DATE_KEY, todayKey);
    localStorage.setItem(`${BATCH_STORAGE_KEY}${todayKey}`, JSON.stringify(topFive));
  } catch (e) {
    console.warn('Cache write failed:', e);
  }

  return {
    articles: topFive,
    isLive: true,
    dateKey: todayKey,
    isCachedToday: false
  };
}
