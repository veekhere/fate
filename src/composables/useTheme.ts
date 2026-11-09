import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'nexus-theme'
const theme = ref<Theme>('light')
let ready = false

function readTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme) {
  document.documentElement.dataset.theme = value
}

export function useTheme() {
  if (!ready) {
    ready = true
    theme.value = readTheme()
    applyTheme(theme.value)
  }

  function toggleTheme() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = next
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }

  return { theme, toggleTheme }
}
