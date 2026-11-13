<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import { t } from './i18n/messages'
import { isSectionId } from './navigation/catalog'

const route = useRoute()

watchEffect(() => {
  const section = route.params.section
  document.title =
    route.name === 'section' && isSectionId(section)
      ? `${t.sections[section].title} — Fate`
      : 'Fate'
})
</script>

<template>
  <div class="shell">
    <div class="atmosphere" aria-hidden="true" />
    <div class="frame">
      <AppHeader />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  position: relative;
  min-height: 100svh;
  overflow: clip;
}

.atmosphere {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 12% -10%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%),
    radial-gradient(ellipse 55% 45% at 95% 10%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 50%),
    linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%);
  z-index: -1;
}

.atmosphere::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    linear-gradient(color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, #000 30%, transparent 95%);
}

.frame {
  width: min(1120px, calc(100% - 2.5rem));
  margin: 0 auto;
  min-height: 100svh;
}
</style>
