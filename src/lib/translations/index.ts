import i18n from 'sveltekit-i18n'
import languages from './languages.json'

const config = {
  translations: {
    en: { languages }
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default
    }
  ]
}

export const { t, locale, locales, loading, loadTranslations } = new i18n(config)
