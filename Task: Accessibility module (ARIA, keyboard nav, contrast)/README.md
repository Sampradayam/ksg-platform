# Task: Accessibility module (ARIA, keyboard nav, contrast)

Files added:

- `App.jsx` — React component implementing keyboard navigation, ARIA roles, and a simple form. Includes Escape handling, focus management, and aria-expanded on the dialog trigger.
- `App.css` — Styles supporting high contrast, visible focus outlines, and a skip link that becomes visible on focus.

Corrections and small improvements made:

- Added `e.preventDefault()` to form submit to avoid page reload in this demo and included a placeholder handler.
- Added `aria-expanded` to the dialog trigger button for better accessibility.
- Added null checks when focusing elements (guards for server-side rendering or unexpected states).
- Ensured CSS blocks are complete and focused outline is visible (contrast-friendly color).

How to use:

Place these files into your React project (for example, a Vite or Create React App setup). Import `App.jsx` as the main component (e.g., in `src/main.jsx`) and ensure `App.css` is imported by `App.jsx` or `main.jsx`.

If you want, I can:

- Create a full minimal React project scaffolding around this (Vite/CRA) and wire the files in.
- Add a focus trap for the dialog (recommended for production dialogs).
- Add unit tests and accessibility linting (eslint-plugin-jsx-a11y).
