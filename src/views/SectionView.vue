<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { isSectionId, sections, type SectionId } from '../navigation/catalog'

const route = useRoute()
const { t } = useLocale()

const section = computed<SectionId>(() => {
  const value = route.params.section
  return isSectionId(value) ? value : 'equipment'
})
const config = computed(() => sections[section.value])
const labels = computed(() => t.value.sections[section.value])
const itemLabels = computed(
  () =>
    ({
      ...labels.value.outside,
      ...labels.value.items,
    }) as Record<string, string>,
)

const raw = computed(() => {
  const value = route.query[config.value.queryKey]
  return typeof value === 'string' ? value : null
})
const known = computed(() => [...config.value.outside, ...config.value.items])
const item = computed(() =>
  raw.value !== null && known.value.includes(raw.value) ? raw.value : null,
)
const choiceLabel = computed(() =>
  item.value !== null && config.value.outside.includes(item.value)
    ? t.value.stub.selected
    : labels.value.menuTitle,
)
const query = computed(() =>
  raw.value === null ? null : `?${config.value.queryKey}=${raw.value}`,
)
</script>

<template>
  <section class="stub">
    <p class="kicker">{{ t.stub.kicker }}</p>
    <h1>{{ labels.title }}</h1>

    <dl class="card">
      <div class="row">
        <dt>{{ choiceLabel }}</dt>
        <dd>
          <strong v-if="item" class="value" data-testid="selected-item">
            {{ itemLabels[item] }}
          </strong>
          <span v-else class="empty">{{ t.stub.nothing }}</span>
        </dd>
      </div>

      <div class="row">
        <dt>{{ t.stub.query }}</dt>
        <dd>
          <code v-if="query">{{ query }}</code>
          <span v-else class="empty">—</span>
        </dd>
      </div>
    </dl>

    <p v-if="raw !== null && !item" class="warning">
      {{ t.stub.unknown }} <code>{{ raw }}</code>
    </p>

    <p class="hint">{{ item ? t.stub.hint : t.stub.pick }}</p>
  </section>
</template>

<style scoped>
.stub {
  max-width: 40rem;
  padding: 2.5rem 0 4rem;
  animation: page-in 0.55s var(--ease) both;
}

.kicker {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-deep);
}

h1 {
  margin: 0 0 1.75rem;
  font-family: var(--display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 750;
  letter-spacing: -0.045em;
  line-height: 1.05;
  color: var(--ink);
}

.card {
  margin: 0;
  padding: 0.35rem 1.25rem;
  border-radius: 14px;
  background: color-mix(in srgb, var(--paper) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  box-shadow: var(--shadow-rest);
}

.row {
  display: grid;
  grid-template-columns: minmax(8rem, 11rem) 1fr;
  gap: 0.5rem 1.25rem;
  align-items: baseline;
  padding: 1rem 0;
}

.row + .row {
  border-top: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
}

dt {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

dd {
  margin: 0;
  color: var(--ink);
}

.value {
  font-family: var(--display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.empty {
  color: var(--muted);
}

code {
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 0.9rem;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  color: var(--accent-deep);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  word-break: break-all;
}

.warning {
  margin: 1rem 0 0;
  color: var(--accent-deep);
}

.hint {
  margin: 1.25rem 0 0;
  color: var(--muted);
}

@keyframes page-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
