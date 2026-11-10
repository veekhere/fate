import { ref } from 'vue'
import type { SectionId } from '../navigation/catalog'

const active = ref<SectionId | null>(null)
let closeTimer: number | undefined

// Shared across menu bar items so only one submenu window is open at a time.
export function useMenuBar() {
  function open(id: SectionId) {
    window.clearTimeout(closeTimer)
    active.value = id
  }

  function close() {
    window.clearTimeout(closeTimer)
    active.value = null
  }

  // A short delay lets the pointer cross the gap between trigger and window.
  function scheduleClose(delay = 180) {
    window.clearTimeout(closeTimer)
    closeTimer = window.setTimeout(() => {
      active.value = null
    }, delay)
  }

  function cancelClose() {
    window.clearTimeout(closeTimer)
  }

  return { active, open, close, scheduleClose, cancelClose }
}
