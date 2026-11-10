<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useMenuBar } from '../composables/useMenuBar'
import { sectionLocation, sections, type SectionId } from '../navigation/catalog'
import { sortedByLabel } from '../navigation/sortItems'

const props = defineProps<{ section: SectionId }>()

const route = useRoute()
const { locale, t } = useLocale()
const menuBar = useMenuBar()

const trigger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const place = ref({ top: 0, left: 0, maxHeight: 0 })
const titleId = useId()
const panelId = useId()

const config = computed(() => sections[props.section])
const labels = computed(() => t.value.sections[props.section])
const itemLabels = computed(() => ({
  ...(labels.value.outside as Record<string, string>),
  ...(labels.value.items as Record<string, string>),
}))
const outsideItems = computed(() => config.value.outside)
const items = computed(() => sortedByLabel(config.value.items, itemLabels.value, locale.value))
const open = computed(() => menuBar.active.value === props.section)
const current = computed(
  () => route.name === 'section' && route.params.section === props.section,
)
const selected = computed(() =>
  current.value ? route.query[config.value.queryKey] : undefined,
)

function itemLinks() {
  return Array.from(panel.value?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? [])
}

function focusItem(index: number) {
  const items = itemLinks()
  if (!items.length) return
  items[(index + items.length) % items.length]?.focus()
}

function position() {
  if (!trigger.value || !panel.value) return
  const rect = trigger.value.getBoundingClientRect()
  const margin = 12
  const top = rect.bottom + 6
  const width = panel.value.offsetWidth
  const left = Math.max(margin, Math.min(rect.left - 6, window.innerWidth - width - margin))
  place.value = { top, left, maxHeight: window.innerHeight - top - margin }
}

async function show(focus?: 'first' | 'last') {
  menuBar.open(props.section)
  await nextTick()
  position()
  if (focus === 'first') focusItem(0)
  if (focus === 'last') focusItem(-1)
}

function hide(returnFocus = false) {
  menuBar.close()
  if (returnFocus) trigger.value?.focus()
}

function onTriggerEnter(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  show()
}

function onTriggerLeave(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  menuBar.scheduleClose()
}

function onTriggerClick(event: MouseEvent) {
  // A mouse already opened the window on hover; a click must not close it again.
  if ((event as PointerEvent).pointerType === 'mouse') {
    show()
    return
  }
  open.value ? hide() : show()
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    show('first')
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    show('last')
  } else if (event.key === 'Escape' && open.value) {
    hide(true)
  }
}

function onPanelKeydown(event: KeyboardEvent) {
  const items = itemLinks()
  const index = items.indexOf(document.activeElement as HTMLElement)
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusItem(index + 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    focusItem(index < 0 ? -1 : index - 1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    focusItem(0)
  } else if (event.key === 'End') {
    event.preventDefault()
    focusItem(-1)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    hide(true)
  } else if (event.key === 'Tab') {
    hide()
  }
}

function onItemPointerMove(event: PointerEvent) {
  const item = event.currentTarget as HTMLElement
  if (document.activeElement !== item) item.focus({ preventScroll: true })
}

function onPanelLeave() {
  const focused = document.activeElement as HTMLElement | null
  if (focused && panel.value?.contains(focused)) focused.blur()
  menuBar.scheduleClose()
}

function onDocumentPointerDown(event: PointerEvent) {
  const target = event.target as Node
  if (trigger.value?.contains(target) || panel.value?.contains(target)) return
  hide()
}

function onViewportChange() {
  hide()
}

watch(open, (value) => {
  if (value) {
    document.addEventListener('pointerdown', onDocumentPointerDown)
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, { passive: true })
  } else {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    window.removeEventListener('resize', onViewportChange)
    window.removeEventListener('scroll', onViewportChange)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  window.removeEventListener('resize', onViewportChange)
  window.removeEventListener('scroll', onViewportChange)
})
</script>

<template>
  <button
    ref="trigger"
    class="trigger"
    :class="{ active: current, open }"
    type="button"
    aria-haspopup="menu"
    :aria-expanded="open"
    :aria-controls="open ? panelId : undefined"
    @pointerenter="onTriggerEnter"
    @pointerleave="onTriggerLeave"
    @click="onTriggerClick"
    @keydown="onTriggerKeydown"
  >
    {{ labels.title }}
    <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" />
    </svg>
  </button>

  <Teleport to="body">
    <Transition name="window">
      <div
        v-if="open"
        :id="panelId"
        ref="panel"
        class="window"
        role="menu"
        :aria-label="labels.title"
        :style="{
          top: `${place.top}px`,
          left: `${place.left}px`,
          maxHeight: `${place.maxHeight}px`,
        }"
        @pointerenter="menuBar.cancelClose"
        @pointerleave="onPanelLeave"
        @keydown="onPanelKeydown"
      >
        <RouterLink
          v-for="item in outsideItems"
          :key="item"
          class="window-item"
          role="menuitemradio"
          tabindex="-1"
          :aria-checked="selected === item"
          :to="sectionLocation(section, item)"
          @pointermove="onItemPointerMove"
          @click="hide()"
        >
          <svg class="check" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          <span>{{ itemLabels[item] }}</span>
        </RouterLink>
        <div v-if="outsideItems.length" class="window-rule" role="separator" />
        <div role="group" :aria-labelledby="titleId">
          <div :id="titleId" class="window-title" role="presentation">
            {{ labels.menuTitle }}
          </div>
          <RouterLink
            v-for="item in items"
            :key="item"
            class="window-item"
            role="menuitemradio"
            tabindex="-1"
            :aria-checked="selected === item"
            :to="sectionLocation(section, item)"
            @pointermove="onItemPointerMove"
            @click="hide()"
          >
            <svg class="check" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            <span>{{ itemLabels[item] }}</span>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  padding: 0.45rem 0.6rem 0.45rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.trigger:hover,
.trigger.open {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.trigger.active {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

.trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.caret {
  width: 0.7rem;
  height: 0.7rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.7;
  transition: transform 0.2s var(--ease);
}

.trigger.open .caret {
  transform: rotate(180deg);
}

.window {
  position: fixed;
  z-index: 50;
  width: max-content;
  min-width: 13rem;
  max-width: min(24rem, calc(100vw - 24px));
  padding: 5px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-radius: 11px;
  background: color-mix(in srgb, var(--paper) 80%, transparent);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  box-shadow: var(--shadow-panel);
  transform-origin: top left;
}

.window-rule {
  height: 1px;
  margin: 4px 6px;
  background: color-mix(in srgb, var(--ink) 12%, transparent);
}

.window-title {
  padding: 0.35rem 0.6rem 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.window-item {
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.75rem 0.38rem 0.4rem;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.3;
  color: var(--ink);
  text-decoration: none;
  outline: none;
  cursor: pointer;
}

.window-item:focus {
  background: var(--accent);
  color: #fff;
}

.check {
  width: 0.9rem;
  height: 0.9rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  visibility: hidden;
}

.window-item[aria-checked='true'] .check {
  visibility: visible;
}

.window-item[aria-checked='true'] {
  font-weight: 600;
}

.window-enter-active {
  transition: opacity 0.14s ease, transform 0.14s var(--ease);
}

.window-leave-active {
  transition: opacity 0.1s ease;
}

.window-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.window-leave-to {
  opacity: 0;
}
</style>
