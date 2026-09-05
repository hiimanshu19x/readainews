/**
 * Client timezone utility
 * Ensures all dates, times, and day tracking are dynamically rendered
 * in the user's local browser timezone rather than UTC.
 */

export function getUserTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch (e) {
    return 'Asia/Kolkata';
  }
}

export function getUserTimeZoneAbbr() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date());
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart ? tzPart.value : 'IST';
  } catch (e) {
    return 'IST';
  }
}

export function getCurrentLocalHour(timeZone = getUserTimeZone()) {
  try {
    const str = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      hour12: false
    }).format(new Date());
    return parseInt(str, 10) % 24;
  } catch (e) {
    return new Date().getHours();
  }
}

/**
 * Returns date key formatted as YYYY-MM-DD in the specified timezone.
 */
export function getLocalDateKey(d = new Date(), timeZone = getUserTimeZone()) {
  try {
    const date = typeof d === 'number' ? new Date(d) : (d instanceof Date ? d : new Date(d));
    return new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch (e) {
    const date = d instanceof Date ? d : new Date(d);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

/**
 * Returns today's date key formatted as YYYY-MM-DD in the USER's LOCAL timezone.
 */
export function getTodayLocalKey(d = new Date(), timeZone = getUserTimeZone()) {
  return getLocalDateKey(d, timeZone);
}

/**
 * Checks whether an epoch falls strictly on today's calendar date in the given timezone.
 */
export function isTodayInTz(epochMs, timeZone = getUserTimeZone()) {
  if (!epochMs) return false;
  const nowKey = getLocalDateKey(Date.now(), timeZone);
  const articleKey = getLocalDateKey(epochMs, timeZone);
  return nowKey === articleKey;
}

/**
 * Checks whether an epoch falls strictly on yesterday's calendar date in the given timezone.
 */
export function isYesterdayInTz(epochMs, timeZone = getUserTimeZone()) {
  if (!epochMs) return false;
  const yesterdayKey = getLocalDateKey(Date.now() - 24 * 3600 * 1000, timeZone);
  const articleKey = getLocalDateKey(epochMs, timeZone);
  return yesterdayKey === articleKey;
}

/**
 * Formats accurate, non-contradictory card badges for any article:
 * - If published today: { dayLabel: 'Today', timeAgo: '25m ago' | '3h ago' }
 * - If published yesterday: { dayLabel: 'Yesterday', timeAgo: '17h ago' | '23h ago' }
 * - If older: { dayLabel: 'Sep 3', timeAgo: '2d ago' }
 */
export function formatCardDateBadges(epochOrDate, nowUtc = Date.now(), timeZone = getUserTimeZone()) {
  if (!epochOrDate) return { dayLabel: 'Recent', timeAgo: '' };
  
  let epoch = epochOrDate;
  if (typeof epochOrDate === 'string') {
    const parsed = new Date(epochOrDate).getTime();
    epoch = isNaN(parsed) ? 0 : parsed;
  }
  if (!epoch) return { dayLabel: 'Recent', timeAgo: '' };

  const ageMs = Math.max(0, nowUtc - epoch);
  const mins = Math.floor(ageMs / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  let timeAgo = '';
  if (mins < 60) {
    timeAgo = `${Math.max(1, mins)}m ago`;
  } else if (hrs < 24) {
    timeAgo = `${hrs}h ago`;
  } else {
    timeAgo = `${days}d ago`;
  }

  let dayLabel = 'Today';
  if (isTodayInTz(epoch, timeZone)) {
    dayLabel = 'Today';
  } else if (isYesterdayInTz(epoch, timeZone)) {
    dayLabel = 'Yesterday';
  } else {
    dayLabel = formatLocalShortDate(epoch);
  }

  return {
    dayLabel,
    timeAgo,
    fullLabel: `${dayLabel} • ${timeAgo}`
  };
}

/**
 * Formats a date into a clean local headline, e.g., "Saturday, September 5, 2026"
 */
export function formatLocalFullDate(d = new Date()) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Formats a date into a concise string, e.g., "Sep 5, 2026"
 */
export function formatLocalShortDate(d = new Date()) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Formats full local date + time, e.g. "Sunday, Sep 14, 2026 at 11:59 PM IST"
 */
export function formatLocalDateTime(d = new Date()) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

