<script setup lang="ts">
const stack = [
  {
    title: 'Vue 3',
    detail: 'Composition API with <script setup> for concise typed components.',
  },
  {
    title: 'TypeScript',
    detail: 'Strict typing across views, router meta, and shared modules.',
  },
  {
    title: 'Vue Router',
    detail: 'Named routes for Home and About with history mode navigation.',
  },
  {
    title: 'Vite',
    detail: 'Fast HMR and a zero-config path from scaffolding to production build.',
  },
] as const
</script>

<template>
  <section class="about">
    <header class="intro">
      <p class="kicker">About</p>
      <h1>What this starter includes</h1>
      <p class="summary">
        Nexus is a small multi-page Vue app meant as a clean base: routing, typed pages,
        and a visual direction you can extend without fighting defaults.
      </p>
    </header>

    <ul class="stack-list">
      <li v-for="item in stack" :key="item.title" class="stack-item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.detail }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.about {
  padding: 1.5rem 0 4rem;
  animation: page-in 0.65s var(--ease) both;
}

.intro {
  max-width: 38rem;
  margin-bottom: 2.75rem;
}

.kicker {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-deep);
}

.intro h1 {
  margin: 0 0 1rem;
  font-family: var(--display);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 750;
  letter-spacing: -0.045em;
  line-height: 1.05;
  color: var(--ink);
}

.summary {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.6;
  color: var(--muted);
}

.stack-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
}

.stack-item {
  display: grid;
  grid-template-columns: minmax(7rem, 10rem) 1fr;
  gap: 1rem 1.5rem;
  padding: 1.35rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  animation: page-in 0.7s var(--ease) both;
}

.stack-item:nth-child(2) {
  animation-delay: 0.06s;
}
.stack-item:nth-child(3) {
  animation-delay: 0.12s;
}
.stack-item:nth-child(4) {
  animation-delay: 0.18s;
}

.stack-item h2 {
  margin: 0;
  font-family: var(--display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.stack-item p {
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
}

@keyframes page-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .stack-item {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
