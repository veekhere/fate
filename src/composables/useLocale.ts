import { computed, ref } from 'vue'
import { messages, type Locale } from '../i18n/messages'

const STORAGE_KEY = 'nexus-locale'
const locale = ref<Locale>('en')
let ready = false

function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ru'
}

function readLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) return stored

  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

function applyLocale(value: Locale) {
  document.documentElement.lang = value
}

export function useLocale() {
  if (!ready) {
    ready = true
    locale.value = readLocale()
    applyLocale(locale.value)
  }

  const t = computed(() => messages[locale.value])

  function setLocale(value: Locale) {
    locale.value = value
    localStorage.setItem(STORAGE_KEY, value)
    applyLocale(value)
  }

  function toggleLocale() {
    setLocale(locale.value === 'ru' ? 'en' : 'ru')
  }

  return { locale, t, setLocale, toggleLocale }
}
