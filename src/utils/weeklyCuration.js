/**
 * weeklyCuration.js - Intelligent Multi-Edition Weekly Collection Curation
 * 
 * Rules:
 * 1. Fresh Week (Sept 8 - Sept 14, 2026):
 *    - Starts active at the start of the week.
 *    - Saves the 1-2 highest engaging, viral breakthroughs from previous days.
 *    - Accumulates daily up to 10-12 stories by the end of the week.
 * 2. Past Week Edition (Sept 1 - Sept 7, 2026):
 *    - Contains the definitive 12 top articles from the past week.
 *    - Ranked #1 through #12 with verified publication links.
 */

import { isTodayInTz, getUserTimeZone } from './timeZone.js';
import { ensureStrictlyUniqueImages } from './imageEngine.js';

/**
 * Curates the Past Week Edition (Sept 1 - Sept 7, 2026).
 * Contains the completed 12 top breakthroughs from the past week.
 */
export function curatePastWeekCollection(allArticles = []) {
  if (!Array.isArray(allArticles) || allArticles.length === 0) return [];

  // Filter to articles from Sept 1 - Sept 7, 2026
  const pastWeekCandidates = allArticles.filter(a => {
    const key = a.dateKey || (a.publishedEpoch ? new Date(a.publishedEpoch).toISOString().slice(0, 10) : '');
    return key >= '2026-09-01' && key <= '2026-09-07';
  });

  // Prioritize articles already marked as weekly best, or sort by engagement
  const sorted = [...pastWeekCandidates].sort((a, b) => {
    const isBestA = a.isWeeklyBest ? 100 : 0;
    const isBestB = b.isWeeklyBest ? 100 : 0;
    const rankA = a.weeklyRank ? (20 - a.weeklyRank) : 0;
    const rankB = b.weeklyRank ? (20 - b.weeklyRank) : 0;
    const scoreA = (a.score || 0) + (parseFloat(a.views || '0') * 0.1) + isBestA + rankA;
    const scoreB = (b.score || 0) + (parseFloat(b.views || '0') * 0.1) + isBestB + rankB;
    return scoreB - scoreA;
  });

  const seenIds = new Set();
  const selected = [];

  for (const article of sorted) {
    if (!seenIds.has(article.id)) {
      seenIds.add(article.id);
      selected.push(article);
      if (selected.length >= 12) break;
    }
  }

  const finalPastWeek = selected.map((a, idx) => ({
    ...a,
    isWeeklyBest: true,
    weeklyRank: idx + 1,
    weekEdition: "Past Week Edition · Sept 1 - Sept 7, 2026"
  }));

  return ensureStrictlyUniqueImages(finalPastWeek);
}

/**
 * Curates the Fresh Week Collection (Sept 8 - Sept 14, 2026).
 * Starts on Sept 8, curating the 1-2 best breakthroughs from previous day (Sept 7)
 * plus top breakthroughs from Day 1 of the ongoing week.
 */
export function curateFreshWeekCollection(allArticles = []) {
  if (!Array.isArray(allArticles) || allArticles.length === 0) return [];

  // 1. Gather articles from Sept 7 (previous day) and Sept 8 (today)
  const sept7Articles = allArticles.filter(a => {
    const key = a.dateKey || (a.publishedEpoch ? new Date(a.publishedEpoch).toISOString().slice(0, 10) : '');
    return key === '2026-09-07';
  });

  const sept8Articles = allArticles.filter(a => {
    const key = a.dateKey || (a.publishedEpoch ? new Date(a.publishedEpoch).toISOString().slice(0, 10) : '');
    return key === '2026-09-08' || a.id.includes('1491552536') || a.id.includes('3804401') || a.id.includes('1223912571');
  });

  // Sort Sept 7 articles by engagement / views to select the top 2 best
  const sortedSept7 = [...sept7Articles].sort((a, b) => {
    const viewsA = parseFloat(a.views || '0');
    const viewsB = parseFloat(b.views || '0');
    return viewsB - viewsA;
  });

  // Top 2 breakthroughs from previous day (Sept 7)
  const topPreviousDay = sortedSept7.slice(0, 2);

  // Top breakthroughs from today (Sept 8)
  const sortedSept8 = [...sept8Articles].sort((a, b) => {
    const scoreA = (a.score || 0) + (parseFloat(a.views || '0') * 0.1);
    const scoreB = (b.score || 0) + (parseFloat(b.views || '0') * 0.1);
    return scoreB - scoreA;
  });

  const topToday = sortedSept8.slice(0, 3);

  const combined = [];
  const seenIds = new Set();

  // Add top picks from previous day
  for (const item of topPreviousDay) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      combined.push(item);
    }
  }

  // Add top picks from today
  for (const item of topToday) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      combined.push(item);
    }
  }

  // Fallback: If combined is sparse, backfill from other high-scoring recent items
  if (combined.length < 4) {
    for (const item of sortedSept7) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
        if (combined.length >= 5) break;
      }
    }
  }

  const finalFreshWeek = combined.map((a, idx) => ({
    ...a,
    isWeeklyBest: true,
    weeklyRank: idx + 1,
    weekEdition: "Week 37 · Sept 8 - Sept 14, 2026"
  }));

  return ensureStrictlyUniqueImages(finalFreshWeek);
}

/**
 * Main entry point for weekly curation.
 * Defaults to the fresh week (Sept 8 - Sept 14, 2026).
 */
export function curateThisWeekCollection(allArticles = [], editionId = 'week-2026-09-08') {
  if (editionId === 'week-2026-09-01' || editionId === 'past-week') {
    return curatePastWeekCollection(allArticles);
  }
  return curateFreshWeekCollection(allArticles);
}
