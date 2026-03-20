# SwiftBuy Vanilla Storefront

This project has been converted from a React frontend into a pure HTML, CSS, and JavaScript storefront powered by Vite.

## Stack

- HTML entry in `index.html`
- Vanilla JavaScript modules in `src/`
- Plain CSS in `src/styles.css` and `src/styles/`
- Vite for local development and production builds

## Features

- Multi-page storefront using the History API
- Product listing, search, filtering, sorting, and pagination
- Product detail pages with variant selection
- Cart and wishlist persistence with `localStorage`
- Three-step checkout flow
- Mock account, order history, contact, FAQ, and about pages
- Light and dark theme toggle
- Responsive header, footer, hero carousel, and mobile bottom navigation

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notes

- The active app now runs from `src/main.js`.
- The production build output is generated in `dist/`.
- Some legacy React source files may still exist in `src/app/`, but they are no longer used by the build.
