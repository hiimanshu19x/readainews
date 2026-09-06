/**
 * weeklyCuration.js - Intelligent Weekly Collection Curation
 * 
 * Rules:
 * 1. Tracks the current 7-day week (Sept 1 - Sept 7, 2026).
 * 2. Selects the 1-2 highest engaging, highest-impact articles from each previous day of the week.
 * 3. By the end of the week, builds a definitive curated collection of 10-12 top-tier AI articles.
 * 4. Ranks articles (#1, #2, ... #12) with verified original publication links.
 */

import { isTodayInTz, getUserTimeZone } from './timeZone.js';
import { ensureStrictlyUniqueImages } from './imageEngine.js';

export function curateThisWeekCollection(allArticles = []) {
  if (!Array.isArray(allArticles) || allArticles.length === 0) {
    return [];
  }

  const now = Date.now();
  const tz = getUserTimeZone();
  const ONE_DAY_MS = 24 * 3600 * 1000;
  const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;

  // Filter to articles within the past 7 days (the current rolling week)
  const candidateArticles = allArticles.filter(a => {
    if (!a.publishedEpoch) return false;
    const age = now - a.publishedEpoch;
    return age >= 0 && age <= SEVEN_DAYS_MS;
  });

  // Group candidate articles by local calendar date (YYYY-MM-DD)
  const daysMap = new Map();
  
  for (const article of candidateArticles) {
    const pubDate = new Date(article.publishedEpoch);
    const dateKey = pubDate.toLocaleDateString('en-CA', { timeZone: tz });
    
    if (!daysMap.has(dateKey)) {
      daysMap.set(dateKey, []);
    }
    daysMap.get(dateKey).push(article);
  }

  // Sort dates descending (newest previous days first)
  const sortedDates = Array.from(daysMap.keys()).sort().reverse();
  const curatedSelection = [];
  const seenIds = new Set();

  // For each day, pick the top 1 or 2 highest engaging/scored articles
  for (const dateKey of sortedDates) {
    const dayArticles = daysMap.get(dateKey) || [];
    
    // Sort day's articles by engagement score / importance
    const rankedDayArticles = [...dayArticles].sort((a, b) => {
      // Prioritize high-weight sources & engagement
      const scoreA = (a.score || 0) + (a.isWeeklyBest ? 20 : 0) + (parseFloat(a.views || '0') * 0.1);
      const scoreB = (b.score || 0) + (b.isWeeklyBest ? 20 : 0) + (parseFloat(b.views || '0') * 0.1);
      return scoreB - scoreA;
    });

    // Select top 1-2 articles for this day
    const topPicks = rankedDayArticles.slice(0, 2);
    for (const pick of topPicks) {
      if (!seenIds.has(pick.id)) {
        seenIds.add(pick.id);
        curatedSelection.push(pick);
      }
    }
  }

  // If fewer than 10 articles (e.g. early in the week), backfill from remaining high-scoring articles in the week
  if (curatedSelection.length < 10 && candidateArticles.length >= 10) {
    const remaining = candidateArticles
      .filter(a => !seenIds.has(a.id))
      .sort((a, b) => (b.score || 0) - (a.score || 0));
      
    for (const r of remaining) {
      if (curatedSelection.length >= 12) break;
      if (!seenIds.has(r.id)) {
        seenIds.add(r.id);
        curatedSelection.push(r);
      }
    }
  }

  // Assign clean weekly ranks and ensure strictly unique images
  const finalWeekly = curatedSelection.slice(0, 12).map((a, idx) => ({
    ...a,
    isWeeklyBest: true,
    weeklyRank: idx + 1,
    weekEdition: "Week 36 · Sept 1 - Sept 7, 2026"
  }));

  return ensureStrictlyUniqueImages(finalWeekly);
}
