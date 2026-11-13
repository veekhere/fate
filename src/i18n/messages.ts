import type { EquipmentLevel, RatingCategory } from '../navigation/catalog'

export const t = {
  nav: {
    label: 'Основная навигация',
    mobileLabel: 'Мобильная навигация',
    brandHome: 'Fate, на главную',
    home: 'Главная',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
  },
  theme: {
    label: 'Тема',
    light: 'Светлая',
    dark: 'Тёмная',
    toLight: 'Включить светлую тему',
    toDark: 'Включить тёмную тему',
  },
  home: {
    headline: 'Оборудование и рейтинги техники в одном месте.',
    lede: 'Выберите уровень оборудования или категорию рейтинга в меню.',
  },
  sections: {
    equipment: {
      title: 'Оборудование',
      menuTitle: 'По уровню',
      outside: {
        all: 'Вся техника',
      },
      items: {
        '11': '11',
        '10': '10',
        '9': '9',
        '8': '8',
        '8-preferential': '8 (льготный)',
      } satisfies Record<EquipmentLevel, string>,
    },
    rating: {
      title: 'Рейтинг',
      menuTitle: 'Категория',
      outside: {},
      items: {
        'premium-8': 'Премиум техника 8 уровня',
        'premium-9': 'Премиум техника 9 уровня',
        'battle-pass': 'Техника магазина боевого пропуска',
        newcomers: 'Техника для новичков',
        'heavy-10': 'Актуальные ТТ-10',
        'medium-10': 'Актуальные СТ-10',
        'td-10': 'Актуальные ПТ-10',
        training: 'Техника для обучения',
        'bond-premium': 'Премиум техника бонового магазина',
        'premium-8-income': 'Доходность премиум техники 8 уровня',
        'premium-9-income': 'Доходность премиум техники 9 уровня',
        'global-map-10': 'Техника 10 уровня за «Глобальную Карту»',
        'bond-10': 'Техника 10 уровня бонового магазина',
        frontline: 'Техника для режима «Линия Фронта»',
        onslaught: 'Техника магазина режима «Натиск»',
        'tier-11': 'Техника 11 уровня',
      } satisfies Record<RatingCategory, string>,
    },
  },
  stub: {
    kicker: 'Страница-заглушка',
    selected: 'Выбрано',
    nothing: 'Ничего не выбрано',
    query: 'Параметр в адресе',
    unknown: 'В адресе неизвестное значение:',
    hint: 'Выбор хранится в адресной строке, поэтому сохраняется после перезагрузки.',
    pick: 'Выберите пункт в меню выше.',
  },
}
