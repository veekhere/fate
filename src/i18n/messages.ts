const en = {
  meta: {
    home: 'Nexus',
    about: 'About — Nexus',
  },
  nav: {
    label: 'Main',
    mobileLabel: 'Mobile',
    brandHome: 'Nexus home',
    home: 'Home',
    about: 'About',
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
    headline: 'Build calm interfaces that move with purpose.',
    lede: 'A Vue 3 + TypeScript starter with routing, typed views, and a focused visual system.',
    explore: 'Explore the stack',
    docs: 'Vue docs',
  },
  about: {
    kicker: 'About',
    title: 'What this starter includes',
    summary:
      'Nexus is a small multi-page Vue app meant as a clean base: routing, typed pages, and a visual direction you can extend without fighting defaults.',
    stack: [
      {
        title: 'Vue 3',
        detail: 'Composition API with <script setup> for concise typed components.',
      },
      {
        title: 'TypeScript',
        detail: 'Strict typing across views, router meta, and shared modules.',
      },
      {
        title: 'Vue Router',
        detail: 'Named routes for Home and About with history mode navigation.',
      },
      {
        title: 'Vite',
        detail: 'Fast HMR and a zero-config path from scaffolding to production build.',
      },
    ],
  },
}

export type Messages = typeof en

const ru: Messages = {
  meta: {
    home: 'Nexus',
    about: 'О проекте — Nexus',
  },
  nav: {
    label: 'Основная навигация',
    mobileLabel: 'Мобильная навигация',
    brandHome: 'Nexus, на главную',
    home: 'Главная',
    about: 'О проекте',
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
    headline: 'Спокойные интерфейсы, в которых движение имеет смысл.',
    lede: 'Стартер на Vue 3 и TypeScript с роутингом, типизированными страницами и цельной визуальной системой.',
    explore: 'Посмотреть стек',
    docs: 'Документация Vue',
  },
  about: {
    kicker: 'О проекте',
    title: 'Что входит в стартер',
    summary:
      'Nexus — небольшое многостраничное приложение на Vue, задуманное как чистая основа: роутинг, типизированные страницы и визуальный стиль, который легко развивать.',
    stack: [
      {
        title: 'Vue 3',
        detail: 'Composition API и <script setup> для компактных типизированных компонентов.',
      },
      {
        title: 'TypeScript',
        detail: 'Строгая типизация страниц, мета-данных роутера и общих модулей.',
      },
      {
        title: 'Vue Router',
        detail: 'Именованные маршруты для главной и страницы «О проекте» в режиме history.',
      },
      {
        title: 'Vite',
        detail: 'Быстрый HMR и путь от заготовки до продакшен-сборки без настройки.',
      },
    ],
  },
}

export const messages = { en, ru }

export type Locale = keyof typeof messages
