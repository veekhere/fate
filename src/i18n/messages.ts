import type { EquipmentLevel, RatingCategory } from '../navigation/catalog'

const en = {
  nav: {
    label: 'Main',
    mobileLabel: 'Mobile',
    brandHome: 'Fate home',
    home: 'Home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  theme: {
    label: 'Theme',
    light: 'Light',
    dark: 'Dark',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  locale: {
    label: 'Language',
    switchTo: 'Switch language to Russian',
  },
  home: {
    headline: 'Equipment and vehicle ratings in one place.',
    lede: 'Pick an equipment tier or a rating category from the menu.',
  },
  sections: {
    equipment: {
      title: 'Equipment',
      menuTitle: 'Tier',
      items: {
        '11-8': '11–8',
        '8-preferential': '8 (preferential)',
      } satisfies Record<EquipmentLevel, string>,
    },
    rating: {
      title: 'Rating',
      menuTitle: 'Category',
      items: {
        'premium-8': 'Tier VIII premium vehicles',
        'premium-9': 'Tier IX premium vehicles',
        'battle-pass': 'Battle Pass shop vehicles',
        newcomers: 'Vehicles for newcomers',
        'heavy-10': 'Current Tier X heavy tanks',
        'medium-10': 'Current Tier X medium tanks',
        'td-10': 'Current Tier X tank destroyers',
        training: 'Vehicles for training',
        'bond-premium': 'Bond shop premium vehicles',
        'premium-8-income': 'Tier VIII premium earnings',
        'premium-9-income': 'Tier IX premium earnings',
        'global-map-10': 'Tier X Global Map vehicles',
        'bond-10': 'Tier X bond shop vehicles',
        frontline: 'Frontline mode vehicles',
        onslaught: 'Onslaught shop vehicles',
        'tier-11': 'Tier XI vehicles',
      } satisfies Record<RatingCategory, string>,
    },
  },
  stub: {
    kicker: 'Placeholder page',
    selected: 'Selected',
    nothing: 'Nothing selected',
    query: 'Address parameter',
    unknown: 'The address contains an unknown value:',
    hint: 'The choice is stored in the address bar, so it stays after a reload.',
    pick: 'Choose an item in the menu above.',
  },
}

export type Messages = typeof en

const ru: Messages = {
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
  locale: {
    label: 'Язык',
    switchTo: 'Переключить язык на английский',
  },
  home: {
    headline: 'Оборудование и рейтинги техники в одном месте.',
    lede: 'Выберите уровень оборудования или категорию рейтинга в меню.',
  },
  sections: {
    equipment: {
      title: 'Оборудование',
      menuTitle: 'Уровень',
      items: {
        '11-8': '11-8',
        '8-preferential': '8 (льготный)',
      },
    },
    rating: {
      title: 'Рейтинг',
      menuTitle: 'Категория',
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
      },
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

export const messages = { en, ru }

export type Locale = keyof typeof messages
