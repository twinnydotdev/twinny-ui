import i18n from 'sveltekit-i18n'
import languages from './languages.json'

export const defaultLocale = 'en'

const config = {
  translations: {
    en: { languages },
    'zh-CN': { languages },
    'zh-TW': { languages },
    'ja': { languages },
    'ko': { languages },
    'fr': { languages },
    'de': { languages },
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default
    },
    {
      locale: 'zh-CN',
      key: 'common',
      loader: async () => (await import('./zh-CN/common.json')).default
    },
    {
      locale: 'zh-TW',
      key: 'common',
      loader: async () => (await import('./zh-TW/common.json')).default
    },
    {
      locale: 'ja',
      key: 'common',
      loader: async () => (await import('./ja/common.json')).default
    },
    {
      locale: 'ko',
      key: 'common',
      loader: async () => (await import('./ko/common.json')).default
    },
    {
      locale: 'fr',
      key: 'common',
      loader: async () => (await import('./fr/common.json')).default
    },
    {
      locale: 'de',
      key: 'common',
      loader: async () => (await import('./de/common.json')).default
    }
  ]
}

export const {
  t,
  locale,
  locales,
  loading,
  loadTranslations,
  translations,
  addTranslations,
  setLocale,
  setRoute
} = new i18n(config)
