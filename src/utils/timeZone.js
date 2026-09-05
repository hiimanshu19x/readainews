/**
 * Client timezone utility
 * Ensures all dates, times, and day tracking are dynamically rendered
 * in the user's local browser timezone rather than UTC.
 */

export function getUserTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch (e) {
    return 'UTC';
  }
}

export function getUserTimeZoneAbbr() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date());
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart ? tzPart.value : '';
  } catch (e) {
    return '';
  }
}

/**
 * Returns today's date key formatted as YYYY-MM-DD in the USER's LOCAL timezone.
 */
export function getTodayLocalKey(d = new Date()) {
  const date = d instanceof Date ? d : new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
