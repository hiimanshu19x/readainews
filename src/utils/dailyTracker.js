// Daily deduplication and multi-tier balanced curation engine
// Guarantees balanced representation across:
// 1. Breaking / Important News (Reuters, Bloomberg, FT, AP, WSJ)
// 2. AI Industry (TechCrunch, The Information, VentureBeat, The Verge)
// 3. Deep Analysis (MIT Technology Review, WIRED, Ars Technica, IEEE Spectrum)
// 4. Research (Nature, Science)

export function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const STORAGE_PREFIX = 'readainews_seen_v5_';

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

// Reset today's seen history
export function resetSeenArticlesToday() {
  if (typeof window === 'undefined') return;
  const todayKey = getTodayDateKey();
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${todayKey}`);
  } catch (e) {}
}

/**
 * Returns 5 unique articles balanced across 4 tiers:
 * - 1 Breaking / Important News (Reuters, Bloomberg, FT, AP, WSJ)
 * - 1 AI Industry (TechCrunch, The Information, VentureBeat, The Verge)
 * - 1 Deep Analysis (MIT Tech Review, WIRED, Ars Technica, IEEE Spectrum)
 * - 1 Research (Nature, Science)
 * - 1 High-Impact Wildcard
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

  const tiers = ['breaking', 'industry', 'analysis', 'research'];
  const selected = [];
  const pickedIds = new Set();

  // Pick 1 from each tier if available
  tiers.forEach(tier => {
    const tierCandidates = unseen.filter(a => a.tier === tier && !pickedIds.has(a.id));
    if (tierCandidates.length > 0) {
      const pick = tierCandidates[Math.floor(Math.random() * tierCandidates.length)];
      selected.push(pick);
      pickedIds.add(pick.id);
    }
  });

  // Fill remaining slots up to 'count' from remaining unseen items
  const remainingCandidates = unseen.filter(a => !pickedIds.has(a.id)).sort(() => 0.5 - Math.random());
  for (const cand of remainingCandidates) {
    if (selected.length >= count) break;
    selected.push(cand);
    pickedIds.add(cand.id);
  }

  // Fallback if still under count
  if (selected.length < count) {
    const leftover = pool.filter(a => !pickedIds.has(a.id)).sort(() => 0.5 - Math.random());
    for (const cand of leftover) {
      if (selected.length >= count) break;
      selected.push(cand);
      pickedIds.add(cand.id);
    }
  }

  const selectedIds = selected.map(a => a.id);

  // Mark these articles as seen today
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
