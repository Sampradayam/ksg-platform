# Global Search Demo

Small React + Vite demo that implements a debounced global search with highlighted matches.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Files

- `package.json` – project manifest and scripts
- `index.html` – app mount point
- `src/main.jsx` – app entry
- `src/App.jsx` – the provided search UI, debounce hook, highlight component and mock API

## Notes

- This uses a mock `searchApi` with a 500ms simulated latency. Replace with real API calls as needed.
