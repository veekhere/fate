<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import ThemeIcon from './ThemeIcon.vue'

const route = useRoute()
const open = ref(false)
const header = ref<HTMLElement | null>(null)
const { theme, toggleTheme } = useTheme()

const mobileQuery = window.matchMedia('(max-width: 760px)')

function closeMenu() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

function onPointerDown(event: PointerEvent) {
  if (!open.value || !header.value) return
  if (!header.value.contains(event.target as Node)) closeMenu()
}

function onViewportChange() {
  if (!mobileQuery.matches) closeMenu()
}

watch(() => route.fullPath, closeMenu)

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerDown)
  mobileQuery.addEventListener('change', onViewportChange)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
  mobileQuery.removeEventListener('change', onViewportChange)
  document.body.style.overflow = ''
})
</script>

<template>
  <header ref="header" class="header">
    <RouterLink class="brand" to="/" aria-label="Nexus home">
      <span class="brand-mark" aria-hidden="true" />
      <span class="brand-name">Nexus</span>
    </RouterLink>

    <div class="desktop-tools">
      <nav class="nav" aria-label="Main">
        <RouterLink class="nav-link" :class="{ active: route.name === 'home' }" to="/">
          Home
        </RouterLink>
        <RouterLink class="nav-link" :class="{ active: route.name === 'about' }" to="/about">
          About
        </RouterLink>
      </nav>
      <button
        class="icon-btn theme-btn"
        type="button"
        :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        :aria-pressed="theme === 'dark'"
        @click="toggleTheme"
      >
        <ThemeIcon :theme="theme" />
      </button>
    </div>

    <button
      class="icon-btn burger"
      type="button"
      :aria-expanded="open"
      aria-controls="site-menu"
      @click="open = !open"
    >
      <span class="burger-icon" :data-open="open" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
    </button>

    <div v-show="open" id="site-menu" class="menu">
      <nav class="menu-nav" aria-label="Mobile">
        <RouterLink class="menu-link" :class="{ active: route.name === 'home' }" to="/">
          Home
        </RouterLink>
        <RouterLink class="menu-link" :class="{ active: route.name === 'about' }" to="/about">
          About
        </RouterLink>
      </nav>

      <div class="menu-theme" role="group" aria-label="Theme">
        <span class="menu-theme-label">Theme</span>
        <button class="theme-choice" type="button" @click="toggleTheme">
          <ThemeIcon :theme="theme" />
          <span>{{ theme === 'dark' ? 'Dark' : 'Light' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0;
  position: relative;
  z-index: 5;
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

.desktop-tools {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav {
  display: flex;
  gap: 0.35rem;
}

.nav-link,
.menu-link {
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  border-radius: 8px;
}

.nav-link {
  padding: 0.45rem 0.85rem;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover,
.menu-link:hover {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.nav-link.active,
.menu-link.active {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

.icon-btn,
.theme-choice {
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  font: inherit;
}

.icon-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.icon-btn:hover,
.theme-choice:hover {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.icon-btn:focus-visible,
.theme-choice:focus-visible,
.nav-link:focus-visible,
.menu-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.icon-btn :deep(svg),
.theme-choice :deep(svg) {
  width: 1.2rem;
  height: 1.2rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.burger {
  display: none;
}

.burger-icon {
  width: 1.05rem;
  height: 0.8rem;
  display: grid;
  align-content: space-between;
}

.burger-icon span {
  display: block;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
  transform-origin: center;
  transition: transform 0.2s var(--ease), opacity 0.2s ease;
}

.burger-icon[data-open='true'] span:nth-child(1) {
  transform: translateY(0.32rem) rotate(45deg);
}

.burger-icon[data-open='true'] span:nth-child(2) {
  opacity: 0;
}

.burger-icon[data-open='true'] span:nth-child(3) {
  transform: translateY(-0.32rem) rotate(-45deg);
}

.menu {
  position: absolute;
  top: calc(100% - 0.35rem);
  right: 0;
  width: min(17.5rem, calc(100vw - 2.5rem));
  padding: 0.45rem;
  border-radius: 14px;
  background: color-mix(in srgb, var(--paper) 94%, white);
  border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  box-shadow: 0 18px 40px color-mix(in srgb, var(--ink) 14%, transparent);
}

.menu-nav {
  display: grid;
}

.menu-link {
  padding: 0.8rem 0.85rem;
  font-weight: 600;
  color: var(--ink);
}

.menu-theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0.35rem 0.35rem 0.2rem;
  padding: 0.7rem 0.15rem 0.35rem 0.5rem;
  border-top: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
}

.menu-theme-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-deep);
}

.theme-choice {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  font-weight: 600;
  color: var(--ink);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

@media (max-width: 760px) {
  .desktop-tools {
    display: none;
  }

  .burger {
    display: inline-flex;
  }
}

@media (min-width: 761px) {
  .menu {
    display: none !important;
  }
}
</style>
