<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="header">
    <RouterLink class="brand" to="/" aria-label="Nexus home">
      <span class="brand-mark" aria-hidden="true" />
      <span class="brand-name">Nexus</span>
    </RouterLink>

    <nav class="nav" aria-label="Main">
      <RouterLink
        class="nav-link"
        :class="{ active: route.name === 'home' }"
        to="/"
      >
        Home
      </RouterLink>
      <RouterLink
        class="nav-link"
        :class="{ active: route.name === 'about' }"
        to="/about"
      >
        About
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem 0;
  position: relative;
  z-index: 2;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: var(--ink);
}

.brand-mark {
  width: 0.85rem;
  height: 0.85rem;
  background: var(--accent);
  border-radius: 2px;
  transform: rotate(12deg);
  animation: mark-in 0.7s var(--ease) both;
}

.brand-name {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.03em;
}

.nav {
  display: flex;
  gap: 0.35rem;
}

.nav-link {
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.nav-link.active {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

@keyframes mark-in {
  from {
    opacity: 0;
    transform: rotate(12deg) scale(0.6);
  }
  to {
    opacity: 1;
    transform: rotate(12deg) scale(1);
  }
}
</style>
