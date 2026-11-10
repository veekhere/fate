import type { RouteLocationRaw } from 'vue-router'

export const equipmentOutside = ['all'] as const
export const equipmentLevels = ['11', '10', '9', '8', '8-preferential'] as const

export const ratingCategories = [
  'premium-8',
  'premium-9',
  'battle-pass',
  'newcomers',
  'heavy-10',
  'medium-10',
  'td-10',
  'training',
  'bond-premium',
  'premium-8-income',
  'premium-9-income',
  'global-map-10',
  'bond-10',
  'frontline',
  'onslaught',
  'tier-11',
] as const

export type EquipmentLevel = (typeof equipmentLevels)[number]
export type RatingCategory = (typeof ratingCategories)[number]

export const sections = {
  equipment: {
    queryKey: 'level',
    outside: equipmentOutside as readonly string[],
    items: equipmentLevels as readonly string[],
  },
  rating: {
    queryKey: 'category',
    outside: [] as readonly string[],
    items: ratingCategories as readonly string[],
  },
}

export type SectionId = keyof typeof sections

export const sectionIds = Object.keys(sections) as SectionId[]

export function isSectionId(value: unknown): value is SectionId {
  return typeof value === 'string' && value in sections
}

export function sectionLocation(section: SectionId, item: string): RouteLocationRaw {
  return {
    name: 'section',
    params: { section },
    query: { [sections[section].queryKey]: item },
  }
}
