export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

export function slugifyCategory(categoryName) {
  return categoryName.toLowerCase().replaceAll("&", "and").replace(/\s+/g, "-");
}

export function getInternalPath(href) {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin
      ? `${url.pathname}${url.search}`
      : null;
  } catch {
    return null;
  }
}
