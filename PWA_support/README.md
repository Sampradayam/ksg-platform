# PWA React App

Converted the original static PWA files into a minimal React app (Vite) structure.

Files added/changed:

- `package.json` - scripts and dependencies for Vite + React
- `index.html` - React entry that mounts `#root`
- `src/main.jsx` - React entrypoint
- `src/App.jsx` - main App component (includes install prompt handling)
- `src/serviceWorkerRegistration.js` - registers `/service-worker.js`
- `src/index.css` - minimal styles
- Original `manifest.json`, `service-worker.js`, and `offline.html` were left in place.

How to run:

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
npm run preview
```

Notes:

- The app registers the existing `/service-worker.js` at load. The service worker and offline page were preserved and copied from the original project.
- If you prefer a Create React App or different bundler, I can adapt the files.
