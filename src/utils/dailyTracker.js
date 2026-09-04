// Daily deduplication engine to guarantee the same news never appears twice on the same day

export function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const STORAGE_PREFIX = 'readainews_seen_v4_';

// Cleanup stale date keys from past days to keep localStorage pristine
function cleanupOldDates(todayKey) {
  if (typeof window === 'undefined') return;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX) && key !== `${STORAGE_PREFIX}${todayKey}`) {
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.warn('Storage cleanup error:', e);
  }
}

// Retrieve IDs of articles that have already been shown today
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

// Mark a batch of articles as seen today
export function markArticlesAsSeenToday(articleIds) {
  if (typeof window === 'undefined' || !articleIds || articleIds.length === 0) return;
  const todayKey = getTodayDateKey();
  try {
    const existing = getSeenArticlesToday();
    const merged = Array.from(new Set([...existing, ...articleIds]));
    localStorage.setItem(`${STORAGE_PREFIX}${todayKey}`, JSON.stringify(merged));
  } catch (e) {
    console.warn('Failed to save seen articles for today:', e);
  }
}

// Reset today's seen history (for manual testing or when entire pool is exhausted)
export function resetSeenArticlesToday() {
  if (typeof window === 'undefined') return;
  const todayKey = getTodayDateKey();
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${todayKey}`);
  } catch (e) {}
}

/**
 * Returns 5 unique articles that have NEVER been shown today.
 * If user exhausts all available stories, it gracefully resets the cycle and informs the user.
 */
export function getUniqueDailyArticles(pool = [], count = 5) {
  const seenIds = new Set(getSeenArticlesToday());
  
  // Articles in the pool that haven't been seen today
  let unseen = pool.filter(article => !seenIds.has(article.id));
  let isResetCycle = false;

  // If pool has fewer unseen articles than requested count, reset cycle
  if (unseen.length < count) {
    resetSeenArticlesToday();
    seenIds.clear();
    unseen = [...pool];
    isResetCycle = true;
  }

  // Shuffle the unseen articles
  const shuffled = [...unseen].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  const selectedIds = selected.map(a => a.id);

  // Mark these 5 articles as seen today so they won't appear again today
  markArticlesAsSeenToday(selectedIds);

  const totalSeenNow = getSeenArticlesToday().length;

  return {
    articles: selected,
    isResetCycle,
    remainingUnseen: Math.max(0, pool.length - totalSeenNow),
    totalSeenToday: totalSeenNow,
    totalPoolSize: pool.length
  };
}
