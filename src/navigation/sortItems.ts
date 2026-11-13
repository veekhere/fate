const collator = new Intl.Collator('ru', { numeric: true, sensitivity: 'base' })

function equipmentTier(id: string): { tier: number; preferential: boolean } | null {
  const match = /^(\d+)(-preferential)?$/.exec(id)
  if (!match) return null
  return { tier: Number(match[1]), preferential: match[2] !== undefined }
}

function compareItems(a: string, b: string, labels: Record<string, string>) {
  const left = equipmentTier(a)
  const right = equipmentTier(b)
  // The same tier's preferential variant is listed before the plain one.
  if (left && right && left.tier === right.tier && left.preferential !== right.preferential) {
    return left.preferential ? -1 : 1
  }
  return collator.compare(labels[a] ?? a, labels[b] ?? b)
}

/** Ascending order of the Russian labels, with digits compared as numbers. */
export function sortedByLabel(items: readonly string[], labels: Record<string, string>): string[] {
  return [...items].sort((a, b) => compareItems(a, b, labels))
}
