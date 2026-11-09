<script setup lang="ts">
defineProps<{
  theme: 'light' | 'dark'
}>()
</script>

<template>
  <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path
      d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
    />
  </svg>
  <svg v-else viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16.5 13.2A6.2 6.2 0 0 1 10.8 5 6.4 6.4 0 1 0 19 14.6a6.6 6.6 0 0 1-2.5-1.4z" />
  </svg>
</template>

<style scoped>
svg {
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
