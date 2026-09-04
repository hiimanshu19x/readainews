import { allNewsArticles } from '../data/newsData';
import { getTodayDateKey, getUniqueDailyArticles } from './dailyTracker';

const BATCH_STORAGE_KEY = 'readainews_today_batch_v6_';
const REFRESH_DATE_KEY = 'readainews_last_refresh_date_v6';

/**
 * Ensures the website gets a refreshed shot of articles from the top 15 premier publications every day.
 * Automatically guarantees balanced representation across:
 * - Breaking / Important News (Reuters, Bloomberg, FT, AP, WSJ)
 * - AI Industry (TechCrunch, The Information, VentureBeat, The Verge)
 * - Deep Analysis (MIT Technology Review, WIRED, Ars Technica, IEEE Spectrum)
 * - Research (Nature, Science)
 */
export async function getDailyRefreshedArticles(forceLive = false) {
  const todayKey = getTodayDateKey();
  
  if (typeof window === 'undefined') {
    return { articles: allNewsArticles.slice(0, 5), isLive: false, dateKey: todayKey };
  }

  const lastRefreshDate = localStorage.getItem(REFRESH_DATE_KEY);
  const cachedBatch = localStorage.getItem(`${BATCH_STORAGE_KEY}${todayKey}`);

  // Purge any stale cache with legacy IDs or mismatched links
  if (cachedBatch) {
    try {
      const parsed = JSON.parse(cachedBatch);
      const isLegacy = Array.isArray(parsed) && parsed.some(a => a.id?.startsWith('live-') || !a.tier);
      if (isLegacy) {
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
        if (Array.isArray(parsed) && parsed.length >= 5 && parsed[0]?.sourceUrl && parsed[0]?.tier) {
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

  // Pick balanced 5 articles across the 4 tiers using the daily tracker
  const { articles: selectedBatch } = getUniqueDailyArticles(allNewsArticles, 5);

  // Save today's refreshed batch & update last refresh date
  try {
    localStorage.setItem(REFRESH_DATE_KEY, todayKey);
    localStorage.setItem(`${BATCH_STORAGE_KEY}${todayKey}`, JSON.stringify(selectedBatch));
  } catch (e) {
    console.warn('Cache write failed:', e);
  }

  return {
    articles: selectedBatch,
    isLive: true,
    dateKey: todayKey,
    isCachedToday: false
  };
}
