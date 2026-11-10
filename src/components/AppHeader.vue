<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useMenuBar } from '../composables/useMenuBar'
import { useTheme } from '../composables/useTheme'
import type { Locale } from '../i18n/messages'
import { isSectionId, sectionIds, type SectionId } from '../navigation/catalog'
import DesktopMenu from './DesktopMenu.vue'
import MobileSection from './MobileSection.vue'
import ThemeIcon from './ThemeIcon.vue'

const route = useRoute()
const open = ref(false)
const expanded = ref<SectionId | null>(null)
const header = ref<HTMLElement | null>(null)
const menuBar = useMenuBar()
const { theme, toggleTheme } = useTheme()
const { locale, t, setLocale, toggleLocale } = useLocale()

const locales: { value: Locale; label: string }[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
]

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
  else menuBar.close()
}

function toggleSection(id: SectionId) {
  expanded.value = expanded.value === id ? null : id
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
    menuBar.close()
  },
)

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) {
    const section = route.params.section
    expanded.value = route.name === 'section' && isSectionId(section) ? section : null
  }
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
    <RouterLink class="brand" to="/" :aria-label="t.nav.brandHome">
      <svg class="brand-mark" viewBox="0 0 24 28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 1.2 21.2 4.8v8.1c0 6.1-3.9 10.4-9.2 13.1C6.7 23.3 2.8 19 2.8 12.9V4.8L12 1.2z"
        />
      </svg>
      <span class="brand-name">Fate</span>
    </RouterLink>

    <div class="desktop-tools">
      <nav class="nav" :aria-label="t.nav.label">
        <RouterLink class="nav-link" :class="{ active: route.name === 'home' }" to="/">
          {{ t.nav.home }}
        </RouterLink>
        <DesktopMenu v-for="id in sectionIds" :key="id" :section="id" />
      </nav>
      <span class="tools-divider" aria-hidden="true" />
      <button
        class="icon-btn lang-btn"
        type="button"
        :aria-label="t.locale.switchTo"
        :title="t.locale.switchTo"
        @click="toggleLocale"
      >
        {{ locale.toUpperCase() }}
      </button>
      <button
        class="icon-btn"
        type="button"
        :aria-label="theme === 'dark' ? t.theme.toLight : t.theme.toDark"
        :title="theme === 'dark' ? t.theme.toLight : t.theme.toDark"
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
      <span class="sr-only">{{ open ? t.nav.closeMenu : t.nav.openMenu }}</span>
    </button>

    <div v-show="open" id="site-menu" class="menu">
      <nav class="menu-nav" :aria-label="t.nav.mobileLabel">
        <RouterLink class="menu-link" :class="{ active: route.name === 'home' }" to="/">
          {{ t.nav.home }}
        </RouterLink>
        <MobileSection
          v-for="id in sectionIds"
          :key="id"
          :section="id"
          :expanded="expanded === id"
          @toggle="toggleSection(id)"
        />
      </nav>

      <div class="menu-settings">
        <div class="menu-row" role="group" :aria-label="t.theme.label">
          <span class="menu-label">{{ t.theme.label }}</span>
          <button class="theme-choice" type="button" @click="toggleTheme">
            <ThemeIcon :theme="theme" />
            <span>{{ theme === 'dark' ? t.theme.dark : t.theme.light }}</span>
          </button>
        </div>

        <div class="menu-row" role="group" :aria-label="t.locale.label">
          <span class="menu-label">{{ t.locale.label }}</span>
          <div class="segmented">
            <button
              v-for="item in locales"
              :key="item.value"
              class="segment"
              type="button"
              :lang="item.value"
              :aria-pressed="locale === item.value"
              @click="setLocale(item.value)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
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
  cursor: pointer;
}

.brand-mark {
  width: 0.95rem;
  height: 1.12rem;
  color: var(--accent);
  display: block;
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

.tools-divider {
  width: 1px;
  height: 1.25rem;
  margin: 0 0.35rem;
  background: color-mix(in srgb, var(--ink) 16%, transparent);
}

.lang-btn {
  width: auto;
  min-width: 2.5rem;
  padding: 0 0.55rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.nav-link,
.menu-link {
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
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

/* Lines share one centre point so the open state forms a symmetric X. */
.burger-icon {
  position: relative;
  width: 18px;
  height: 14px;
}

.burger-icon span {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 2px;
  margin-top: -1px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.22s var(--ease), opacity 0.15s ease;
}

.burger-icon span:nth-child(1) {
  transform: translateY(-6px);
}

.burger-icon span:nth-child(3) {
  transform: translateY(6px);
}

.burger-icon[data-open='true'] span:nth-child(1) {
  transform: rotate(45deg);
}

.burger-icon[data-open='true'] span:nth-child(2) {
  opacity: 0;
}

.burger-icon[data-open='true'] span:nth-child(3) {
  transform: rotate(-45deg);
}

.menu {
  position: absolute;
  top: calc(100% - 0.35rem);
  right: 0;
  width: min(21rem, calc(100vw - 2.5rem));
  max-height: calc(100svh - 5.5rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.45rem;
  border-radius: 14px;
  background: color-mix(in srgb, var(--paper) 94%, white);
  border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  box-shadow: var(--shadow-panel);
  transition: box-shadow 0.25s var(--ease);
}

.menu-nav {
  display: grid;
  gap: 0.1rem;
}

.menu-link {
  padding: 0.8rem 0.85rem;
  font-weight: 600;
  color: var(--ink);
}

.menu-settings {
  display: grid;
  gap: 0.15rem;
  margin: 0.35rem 0.35rem 0.2rem;
  padding-top: 0.45rem;
  border-top: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
}

.menu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 2.6rem;
  padding: 0 0.15rem 0 0.5rem;
}

.segmented {
  display: inline-flex;
  padding: 3px;
  border-radius: 9px;
  background: color-mix(in srgb, var(--ink) 7%, transparent);
}

.segment {
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.35rem 0.6rem;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.segment:hover {
  color: var(--ink);
}

.segment[aria-pressed='true'] {
  background: var(--paper);
  color: var(--ink);
  box-shadow: var(--shadow-rest);
}

.segment:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.menu-label {
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
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
