<script setup lang="ts">
import { computed, useId } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { sectionLocation, sections, type SectionId } from '../navigation/catalog'
import { sortedByLabel } from '../navigation/sortItems'

const props = defineProps<{ section: SectionId; expanded: boolean }>()
const emit = defineEmits<{ toggle: [] }>()

const route = useRoute()
const { locale, t } = useLocale()
const buttonId = useId()
const panelId = useId()

const config = computed(() => sections[props.section])
const labels = computed(() => t.value.sections[props.section])
const itemLabels = computed(() => labels.value.items as Record<string, string>)
const items = computed(() => sortedByLabel(config.value.items, itemLabels.value, locale.value))
const current = computed(
  () => route.name === 'section' && route.params.section === props.section,
)
const selected = computed(() =>
  current.value ? route.query[config.value.queryKey] : undefined,
)
</script>

<template>
  <div class="section" :class="{ current }">
    <button
      :id="buttonId"
      class="section-trigger"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="emit('toggle')"
    >
      <span>{{ labels.title }}</span>
      <svg class="indicator" :data-expanded="expanded" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 6 8 10 12 6" />
      </svg>
    </button>

    <div
      :id="panelId"
      class="section-panel"
      role="region"
      :aria-labelledby="buttonId"
      :data-expanded="expanded"
      :inert="expanded ? undefined : true"
    >
      <div class="section-inner">
        <p class="section-title">{{ labels.menuTitle }}</p>
        <RouterLink
          v-for="item in items"
          :key="item"
          class="section-item"
          :aria-current="selected === item ? 'page' : undefined"
          :to="sectionLocation(section, item)"
        >
          <svg class="check" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          <span>{{ itemLabels[item] }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  text-align: left;
  padding: 0.8rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
}

.section-trigger:hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.current .section-trigger {
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

.section-trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.indicator {
  flex: none;
  width: 1.05rem;
  height: 1.05rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: var(--muted);
  transition: transform 0.25s var(--ease);
}

.indicator[data-expanded='true'] {
  transform: rotate(180deg);
  color: var(--accent);
}

.section-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s var(--ease);
}

.section-panel[data-expanded='true'] {
  grid-template-rows: 1fr;
}

.section-inner {
  min-height: 0;
  overflow: hidden;
  margin-left: 0.85rem;
  border-left: 2px solid color-mix(in srgb, var(--accent) 35%, transparent);
}

.section-title {
  margin: 0.45rem 0 0.2rem;
  padding: 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.section-item {
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 0.45rem;
  margin-left: 0.3rem;
  padding: 0.55rem 0.75rem 0.55rem 0.45rem;
  border-radius: 7px;
  font-size: 0.9rem;
  line-height: 1.3;
  color: var(--ink);
  text-decoration: none;
}

.section-item:last-child {
  margin-bottom: 0.35rem;
}

.section-item:hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.section-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.section-item[aria-current='page'] {
  font-weight: 700;
  color: var(--accent-deep);
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

.section-item[aria-current='page'] .check {
  visibility: visible;
}
</style>
