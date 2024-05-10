import { loadTranslations } from '$lib/translations'

export const load = async ({ url }) => {
  await loadTranslations('en', url.pathname)
}
