# SEO & Social Sharing React Module

This folder contains the React component(s) extracted from the provided PDF. It's a lightweight module that provides:

- Meta tags (title, description, keywords)
- OpenGraph tags (og:title, og:description, og:image, og:url)
- A small visual share-preview component for authoring UIs

Files added:

- `src/components/SeoSocialSharing.jsx` — main components (MetaTags, OpenGraphTags, SharePreview, SeoSocialSharing)
- `src/index.jsx` — package entry exports
- `src/HomeExample.jsx` — small example page using the component
- `package.json` — minimal metadata and runtime deps

How to use

1. Install the dependencies in your app (not necessary inside this folder if you integrate into an existing project):

   npm install react react-dom react-helmet-async react-i18next

2. Import the component into your app:

   import SeoSocialSharing from 'path/to/seo-social-sharing-module/src/components/SeoSocialSharing'

3. Provide i18n keys (the components use `react-i18next` and call `t(key)` for titles/descriptions). If you don't use i18n, replace `t(config.titleKey)` with static strings or provide a minimal `useTranslation` shim.

Notes

- This module was extracted from a PDF — it is intentionally minimal to make it easy to drop into an existing React app.
- No build tooling provided here — wire into your app's build (CRA, Next.js, Vite, etc.).
