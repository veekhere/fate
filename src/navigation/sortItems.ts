import type { Locale } from '../i18n/messages'

const collators = new Map<Locale, Intl.Collator>()

function collatorFor(locale: Locale) {
  let collator = collators.get(locale)
  if (!collator) {
    collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'base' })
    collators.set(locale, collator)
  }
  return collator
}

/** Ascending order of the labels the user actually sees, with digits compared as numbers. */
export function sortedByLabel(
  items: readonly string[],
  labels: Record<string, string>,
  locale: Locale,
): string[] {
  const collator = collatorFor(locale)
  return [...items].sort((a, b) => collator.compare(labels[a] ?? a, labels[b] ?? b))
}
