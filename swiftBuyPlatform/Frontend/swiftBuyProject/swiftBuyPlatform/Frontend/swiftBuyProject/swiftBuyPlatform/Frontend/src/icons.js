const ICONS = {
  arrowRight:
    '<path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path>',
  check: '<path d="M20 6 9 17l-5-5"></path>',
  chevronDown: '<path d="m6 9 6 6 6-6"></path>',
  chevronLeft: '<path d="m15 18-6-6 6-6"></path>',
  chevronRight: '<path d="m9 18 6-6-6-6"></path>',
  clock:
    '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v6l4 2"></path>',
  creditCard:
    '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path>',
  filter:
    '<path d="M22 4H2"></path><path d="M19 12H5"></path><path d="M15 20H9"></path>',
  grid:
    '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
  heart:
    '<path d="m12 20-1.2-1.1C5.3 13.9 2 10.9 2 7.3A4.3 4.3 0 0 1 6.3 3C8.3 3 10 4 11 5.5 12 4 13.7 3 15.7 3A4.3 4.3 0 0 1 20 7.3c0 3.6-3.3 6.6-8.8 11.6Z"></path>',
  home:
    '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10.5V20h14v-9.5"></path>',
  leaf:
    '<path d="M11 20c5.5 0 9-4.5 9-10V4h-6c-5.5 0-9 4.5-9 10v6h6Z"></path><path d="M9 15c1.5-2.5 4.5-4.5 8-6"></path>',
  list:
    '<path d="M8 6h13"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path>',
  mail:
    '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>',
  mapPin:
    '<path d="M12 21s-6-5.7-6-11a6 6 0 1 1 12 0c0 5.3-6 11-6 11Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
  minus: '<path d="M5 12h14"></path>',
  moon: '<path d="M12 3a7 7 0 1 0 9 9A9 9 0 1 1 12 3Z"></path>',
  package:
    '<path d="m3 7 9-4 9 4-9 4-9-4Z"></path><path d="M3 7v10l9 4 9-4V7"></path><path d="M12 11v10"></path>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-1.2 1.2a16 16 0 0 0 6.6 6.6l1.2-1.2a2 2 0 0 1 1.8-.6l3 .5A2 2 0 0 1 22 16.9Z"></path>',
  plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
  rotate:
    '<path d="M3 2v6h6"></path><path d="M21 12a9 9 0 0 0-15.5-6L3 8"></path><path d="M21 22v-6h-6"></path><path d="M3 12a9 9 0 0 0 15.5 6L21 16"></path>',
  search:
    '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>',
  send:
    '<path d="m22 2-7 20-4-9-9-4 20-7Z"></path><path d="M22 2 11 13"></path>',
  shield:
    '<path d="m12 3 7 3v5c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V6l7-3Z"></path>',
  sparkles:
    '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"></path><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path><path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z"></path>',
  star:
    '<path d="m12 2.5 3 6.2 6.9 1-5 4.8 1.2 6.8L12 18l-6.1 3.3 1.2-6.8-5-4.8 6.9-1 3-6.2Z"></path>',
  sun:
    '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2.5"></path><path d="M12 19.5V22"></path><path d="m4.9 4.9 1.8 1.8"></path><path d="m17.3 17.3 1.8 1.8"></path><path d="M2 12h2.5"></path><path d="M19.5 12H22"></path><path d="m4.9 19.1 1.8-1.8"></path><path d="m17.3 6.7 1.8-1.8"></path>',
  trash:
    '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M6 6l1 14h10l1-14"></path><path d="M10 10v6"></path><path d="M14 10v6"></path>',
  truck:
    '<path d="M10 17h4"></path><path d="M14 17h3l3-3v-4h-6V6H2v11h3"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
  user:
    '<path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle>',
  x: '<path d="m18 6-12 12"></path><path d="m6 6 12 12"></path>',
  zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"></path>',
};

export function icon(name, className = "icon") {
  return `<svg viewBox="0 0 24 24" class="${className}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}
