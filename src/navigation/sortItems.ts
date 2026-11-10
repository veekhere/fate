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

function equipmentTier(id: string): { tier: number; preferential: boolean } | null {
  const match = /^(\d+)(-preferential)?$/.exec(id)
  if (!match) return null
  return { tier: Number(match[1]), preferential: match[2] !== undefined }
}

function compareItems(
  a: string,
  b: string,
  labels: Record<string, string>,
  collator: Intl.Collator,
) {
  const left = equipmentTier(a)
  const right = equipmentTier(b)
  // The same tier's preferential variant is listed before the plain one.
  if (left && right && left.tier === right.tier && left.preferential !== right.preferential) {
    return left.preferential ? -1 : 1
  }
  return collator.compare(labels[a] ?? a, labels[b] ?? b)
}

/** Ascending order of the labels the user actually sees, with digits compared as numbers. */
export function sortedByLabel(
  items: readonly string[],
  labels: Record<string, string>,
  locale: Locale,
): string[] {
  const collator = collatorFor(locale)
  return [...items].sort((a, b) => compareItems(a, b, labels, collator))
}
