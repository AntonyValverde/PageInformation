const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

const UNITS = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

export function relativeTime(date) {
  const seconds = (new Date(date).getTime() - Date.now()) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size || unit === "minute") {
      return rtf.format(Math.round(seconds / size), unit);
    }
  }
  return "";
}

const monthYear = new Intl.DateTimeFormat("es", { month: "long", year: "numeric", timeZone: "UTC" });

export function formatMonthYear(isoDate) {
  const text = monthYear.format(new Date(isoDate));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// "memory-cards_web" → "Memory Cards Web"
export function formatRepoName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}
