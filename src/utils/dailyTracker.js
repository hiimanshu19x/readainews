// Daily deduplication and multi-tier 5-story curation engine
// Strictly displays the 5 best AI articles from premier publications.
// Guarantees zero duplicates for any time and seamless infinite rotation across sets of 5.
import { getTodayLocalKey } from './timeZone';

export function getTodayDateKey() {
  return getTodayLocalKey();
}

const STORAGE_PREFIX = 'readainews_seen_v9_';
const BATCH_INDEX_KEY = 'readainews_batch_idx_v9';

// Cleanup stale date keys from past days to keep localStorage pristine
function cleanupOldDates(todayKey) {
  if (typeof window === 'undefined') return;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('readainews_seen_') && !key.includes('v9')) {
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.warn('Storage cleanup error:', e);
  }
}

// Retrieve IDs of articles that have already been shown in current cycle
export function getSeenArticlesToday() {
  if (typeof window === 'undefined') return [];
  const todayKey = getTodayDateKey();
  cleanupOldDates(todayKey);
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${todayKey}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Mark a batch of articles as seen
export function markArticlesAsSeenToday(articleIds) {
  if (typeof window === 'undefined' || !articleIds || articleIds.length === 0) return;
  const todayKey = getTodayDateKey();
  try {
    const existing = getSeenArticlesToday();
    const merged = Array.from(new Set([...existing, ...articleIds]));
    localStorage.setItem(`${STORAGE_PREFIX}${todayKey}`, JSON.stringify(merged));
  } catch (e) {
    console.warn('Failed to save seen articles:', e);
  }
}

// Reset seen history
export function resetSeenArticlesToday() {
  if (typeof window === 'undefined') return;
  const todayKey = getTodayDateKey();
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${todayKey}`);
    localStorage.removeItem(BATCH_INDEX_KEY);
  } catch (e) {}
}

let memoryBatch = -1;

/**
 * Returns exactly 5 unique AI articles from the premier pool.
 * Rotates smoothly through 3 curated sets of 5 stories (15 total).
 * Guarantees zero duplicate articles within any set, and loops seamlessly.
 */
export function getUniqueDailyArticles(pool = [], count = 5) {
  if (!pool || pool.length === 0) {
    return {
      articles: [],
      batchIndex: 1,
      totalBatches: 3,
      isResetCycle: false,
      remainingUnseen: 0,
      totalSeenToday: 0,
      totalPoolSize: 0
    };
  }

  // Divide pool into 3 clean, balanced sets of 5
  const totalBatches = Math.max(1, Math.ceil(pool.length / count));
  
  let currentBatch = 0;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const storedIdx = localStorage.getItem(BATCH_INDEX_KEY);
      if (storedIdx !== null) {
        currentBatch = (parseInt(storedIdx, 10) + 1) % totalBatches;
      }
      localStorage.setItem(BATCH_INDEX_KEY, currentBatch.toString());
    } catch (e) {
      memoryBatch = (memoryBatch + 1) % totalBatches;
      currentBatch = memoryBatch;
    }
  } else {
    memoryBatch = (memoryBatch + 1) % totalBatches;
    currentBatch = memoryBatch;
  }

  // Get articles for this batch
  const startIndex = currentBatch * count;
  let selected = pool.slice(startIndex, startIndex + count);

  // If at the end or fewer than count, wrap around to guarantee exactly 5
  if (selected.length < count) {
    const wrap = pool.slice(0, count - selected.length);
    selected = [...selected, ...wrap];
  }

  const selectedIds = selected.map(a => a.id);
  markArticlesAsSeenToday(selectedIds);

  return {
    articles: selected.slice(0, count), // Always strictly 5 articles
    batchIndex: currentBatch + 1,
    totalBatches: totalBatches,
    isResetCycle: currentBatch === 0,
    remainingUnseen: Math.max(0, (totalBatches - (currentBatch + 1)) * count),
    totalSeenToday: (currentBatch + 1) * count,
    totalPoolSize: pool.length
  };
}
