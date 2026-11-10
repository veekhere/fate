# Fate

Vue 3 + TypeScript starter with Vue Router and two pages.

## Stack

- Vue 3 (`script setup`)
- TypeScript
- Vue Router 4
- Vite

## Pages

- `/` — Home
- `/about` — About / stack overview

## Live

https://veekhere.github.io/fate/

The site is published from the `gh-pages` branch. GitHub Pages serves unknown paths with `404.html`, so `/about` still opens the Vue app.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

To publish a new build:

```bash
./scripts/deploy-pages.sh
```
