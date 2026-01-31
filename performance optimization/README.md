# React Performance Optimization Examples

This folder contains corrected, runnable example components that demonstrate route-level code splitting, lazy loading of heavy components, and a skeleton loader.

Files added:

- `App.jsx` — Main app showing Suspense + React.lazy and react-router usage.
- `pages/Home.jsx`, `pages/Courses.jsx`, `pages/Gallery.jsx` — Lazy-loaded route pages.
- `components/GalleryGrid.jsx` — Simple gallery grid demo component.
- `components/SkeletonCard.jsx` — Skeleton loader component used in the gallery.
- `skeleton.css` — Styles for the skeleton loader.
- `package.json` — Minimal package file for running these examples with Vite (includes react-router-dom).

Usage

1. From `/home/user/Desktop/code/performance optimization` install dependencies and run the dev server:

```bash
npm install
npm run dev
```

2. Open the dev server (Vite default http://localhost:5173). The routes `/`, `/courses`, and `/gallery` are lazy-loaded.

Notes & Improvements

- These examples are intentionally minimal and dependency-light. In a production app consider:
  - Server-side rendering strategies for faster first paint.
  - Image lazy-loading (`loading="lazy"`), responsive images, and optimized formats.
  - Virtualization (react-window/react-virtual) for very long lists.
  - Suspense boundaries placed thoughtfully for better perceived performance.
