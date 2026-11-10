# Fate

Vue 3 + TypeScript app with a home page and two menu sections.

## Stack

- Vue 3 (`script setup`)
- TypeScript
- Vue Router 4
- Vite

## Pages

- `/` — Home
- `/equipment?level=…` — Equipment stub (tier selected in the «Уровень» submenu)
- `/rating?category=…` — Rating stub (category selected in the «Категория» submenu)

The selected submenu item lives in the query string, so it survives reloads and can be shared.

## Live

https://veekhere.github.io/fate/

The site is published from the `gh-pages` branch. GitHub Pages serves unknown paths with `404.html`, so `/rating?category=tier-11` still opens the Vue app.

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
