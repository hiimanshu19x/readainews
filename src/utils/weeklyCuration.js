/**
 * weeklyCuration.js - Intelligent Multi-Edition Weekly Collection Curation
 * 
 * Rules:
 * 1. Current Active Week (Sept 15 - Sept 21, 2026):
 *    - Starts active at the start of the week (Day 1 of 7).
 *    - Automatically updates at the end of each day with the 1-2 best saved breakthroughs from that day.
 *    - Accumulates day by day to build a definitive 10-12 story archive by Sunday.
 * 2. Past Week Edition (Sept 8 - Sept 14, 2026):
 *    - Contains the definitive 12 top articles saved day-by-day from the past week.
 *    - Ranked #1 through #12 with verified publication links and saved day tags.
 * 3. 1st Week Archive (Sept 1 - Sept 7, 2026):
 *    - Completed 12-story archive from the first week of September.
 */

import { isTodayInTz, getUserTimeZone, getUserTimeZoneAbbr, getLocalDateKey } from './timeZone.js';
import { ensureStrictlyUniqueImages } from './imageEngine.js';

const WEEKLY_LEDGER_STORAGE_KEY = 'readainews_weekly_saved_ledger_v25';

/**
 * Returns dynamic week definitions based on the user's reference date and timezone.
 * When a week concludes, it automatically transitions to "[N]th Week Archive".
 */
export function getWeeksMetadata(referenceDate = new Date()) {
  const tz = getUserTimeZoneAbbr() || 'Local';
  const todayKey = getLocalDateKey(referenceDate);

  const WEEKS_SCHEDULE = [
    {
      num: 1,
      startKey: '2026-09-01',
      endKey: '2026-09-07',
      shortDates: '1-7 Sept',
      dateRange: 'Sept 1 - Sept 7, 2026'
    },
    {
      num: 2,
      startKey: '2026-09-08',
      endKey: '2026-09-14',
      shortDates: '8-14 Sept',
      dateRange: 'Sept 8 - Sept 14, 2026'
    },
    {
      num: 3,
      startKey: '2026-09-15',
      endKey: '2026-09-21',
      shortDates: '15-21 Sept',
      dateRange: 'Sept 15 - Sept 21, 2026'
    },
    {
      num: 4,
      startKey: '2026-09-22',
      endKey: '2026-09-28',
      shortDates: '22-28 Sept',
      dateRange: 'Sept 22 - Sept 28, 2026'
    }
  ];

  const ordinals = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th' };

  return WEEKS_SCHEDULE.map(w => {
    const isPast = todayKey > w.endKey;
    const isActive = todayKey >= w.startKey && todayKey <= w.endKey;
    const ord = ordinals[w.num] || `${w.num}th`;

    let cycleDay = 1;
    if (isActive) {
      const diffDays = Math.floor((new Date(todayKey + 'T00:00:00Z') - new Date(w.startKey + 'T00:00:00Z')) / 86400000);
      cycleDay = Math.min(7, Math.max(1, diffDays + 1));
    } else if (isPast) {
      cycleDay = 7;
    }

    if (isActive) {
      return {
        id: `week-${w.startKey}`,
        weekNumber: w.num,
        shortLabel: `This Week (${w.shortDates})`,
        editionName: `Current Week Collection`,
        dateRange: w.dateRange,
        status: 'active',
        isLocked: false,
        cycleDay,
        totalDays: 7,
        badgeText: `Current Week · Day ${cycleDay} of 7`,
        updateNotice: 'Updated at the end of each day with the best saved articles from the day',
        description: `Active collection for the ongoing week (${w.dateRange}). Automatically updated at the end of each day with the 1-2 best saved breakthroughs from that day (Target: 10-12 stories by Sunday).`
      };
    } else if (isPast) {
      return {
        id: `week-${w.startKey}`,
        weekNumber: w.num,
        shortLabel: `${ord} Week Archive (${w.shortDates})`,
        editionName: `${ord} Week Archive`,
        dateRange: w.dateRange,
        status: 'collected',
        isLocked: false,
        cycleDay: 7,
        totalDays: 7,
        badgeText: `${ord} Week Archive · Complete`,
        description: `The definitive 12 highest-impact AI breakthroughs curated day-by-day from ${w.dateRange}, permanently archived in the ${ord.toLowerCase()} week archive.`
      };
    } else {
      return {
        id: `week-${w.startKey}`,
        weekNumber: w.num,
        shortLabel: `${ord} Week of Sept`,
        editionName: `${ord} Week of Sept`,
        dateRange: w.dateRange,
        status: 'locked',
        isLocked: true,
        badgeText: 'Upcoming · Locked',
        unlockDate: `Sunday, ${w.shortDates.split('-')[1]} Sept, 2026 at 11:59 PM ${tz}`,
        progressPercent: 0,
        progressLabel: 'Scheduled Pipeline',
        description: `Upcoming ${ord.toLowerCase()} weekly edition for September 2026. Scheduled pipeline will activate following the completion of Week ${w.num - 1}.`
      };
    }
  });
}

/**
 * Curates a weekly collection day-by-day:
 * For each elapsed day, sorts candidates by virality and impact,
 * selecting the 1-2 best articles saved at the end of each day.
 */
export function curateDayByDayWeek(allArticles = [], startKey, endKey, maxDays = 7, weekLabel = '') {
  if (!Array.isArray(allArticles) || allArticles.length === 0) return [];

  const days = [];
  let cur = new Date(startKey + 'T00:00:00Z');
  const end = new Date(endKey + 'T00:00:00Z');
  while (cur <= end) {
    days.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  const activeDays = days.slice(0, maxDays);
  const selected = [];
  const seenIds = new Set();

  activeDays.forEach((dayKey, idx) => {
    const dayArticles = allArticles.filter(a => {
      const key = a.dateKey || (a.publishedEpoch ? new Date(a.publishedEpoch).toISOString().slice(0, 10) : '');
      return key === dayKey;
    });

    // Sort by engagement, views, isWeeklyBest, and rank
    const sorted = [...dayArticles].sort((a, b) => {
      const bestA = a.isWeeklyBest ? 50 : 0;
      const bestB = b.isWeeklyBest ? 50 : 0;
      const viewsA = parseFloat(a.views || '0');
      const viewsB = parseFloat(b.views || '0');
      const scoreA = (a.score || 0) + viewsA + bestA;
      const scoreB = (b.score || 0) + viewsB + bestB;
      return scoreB - scoreA;
    });

    const topPicks = sorted.filter(a => !seenIds.has(a.id)).slice(0, 2);
    topPicks.forEach(item => {
      seenIds.add(item.id);
      selected.push({
        ...item,
        isWeeklyBest: true,
        savedDayIndex: idx + 1,
        savedDateKey: dayKey,
        savedDayLabel: `Day ${idx + 1} of 7`,
        weekEdition: weekLabel || item.weekEdition || `Week Edition · ${startKey} - ${endKey}`
      });
    });
  });

  const ranked = selected.map((item, idx) => ({
    ...item,
    weeklyRank: idx + 1
  }));

  return ensureStrictlyUniqueImages(ranked);
}

/**
 * Curates the Past Week Edition (Sept 8 - Sept 14, 2026).
 * Contains the completed 12 top breakthroughs curated day-by-day across that week.
 */
export function curatePastWeekCollection(allArticles = []) {
  return curateDayByDayWeek(
    allArticles,
    '2026-09-08',
    '2026-09-14',
    7,
    'Past Week Edition · Sept 8 - Sept 14, 2026'
  );
}

/**
 * Curates the Current Week Collection (Sept 15 - Sept 21, 2026).
 * Starts on Sept 15 (Day 1 of 7) and updates at the end of each day
 * with the 1-2 best saved breakthroughs from each elapsed day.
 */
export function curateFreshWeekCollection(allArticles = []) {
  const weeks = getWeeksMetadata();
  const activeMeta = weeks[0];
  const cycleDay = activeMeta.cycleDay || 1;

  return curateDayByDayWeek(
    allArticles,
    '2026-09-15',
    '2026-09-21',
    cycleDay,
    'Current Week Collection · Sept 15 - Sept 21, 2026'
  );
}

/**
 * Curates the 1st Week Archive (Sept 1 - Sept 7, 2026).
 */
export function curateFirstWeekArchive(allArticles = []) {
  const candidates = allArticles.filter(a => {
    const key = a.dateKey || (a.publishedEpoch ? new Date(a.publishedEpoch).toISOString().slice(0, 10) : '');
    return key >= '2026-09-01' && key <= '2026-09-07';
  });

  const sorted = [...candidates].sort((a, b) => {
    const isBestA = a.isWeeklyBest ? 100 : 0;
    const isBestB = b.isWeeklyBest ? 100 : 0;
    const viewsA = parseFloat(a.views || '0');
    const viewsB = parseFloat(b.views || '0');
    return (viewsB + isBestB) - (viewsA + isBestA);
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

  const finalRanked = selected.map((a, idx) => ({
    ...a,
    isWeeklyBest: true,
    weeklyRank: idx + 1,
    savedDayLabel: `Day ${Math.min(7, Math.floor(idx / 2) + 1)} of 7`,
    weekEdition: "1st Week Archive · Sept 1 - Sept 7, 2026"
  }));

  return ensureStrictlyUniqueImages(finalRanked);
}

/**
 * Main entry point for weekly curation.
 * Supports:
 * - 'week-2026-09-15' (This Week, updating at end of each day)
 * - 'week-2026-09-08' or 'past-week' (Past Week Edition: Sept 8 - Sept 14, 2026)
 * - 'week-2026-09-01' (1st Week Archive: Sept 1 - Sept 7, 2026)
 */
export function curateThisWeekCollection(allArticles = [], editionId = 'week-2026-09-15') {
  if (editionId === 'week-2026-09-01') {
    return curateFirstWeekArchive(allArticles);
  }
  if (editionId === 'week-2026-09-08' || editionId === 'past-week') {
    return curatePastWeekCollection(allArticles);
  }
  return curateFreshWeekCollection(allArticles);
}
