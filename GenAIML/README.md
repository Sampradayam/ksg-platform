# Error & Empty States UI — Code Explanation

This project is a single-page HTML application that displays common empty and error states used in web applications.

## What it shows
- No Data Available
- Network Error
- 404 – Page Not Found

## Structure
All code lives in a single file: error_empty_states2.html

## How it works
The HTML provides a single container with id `app`. JavaScript dynamically injects UI cards into this container.

CSS styles the layout with a dark theme, centered cards, and buttons.

An I18N object stores all user-facing text so it can be changed or translated easily.

A reusable function `createCard(title, message, showButton)` builds each UI card.

The function `renderHome()` clears the container and renders three cards for the three states.

The call `renderHome()` runs when the page loads, displaying all states.

Each card uses role="alert" for accessibility so screen readers can announce messages.
