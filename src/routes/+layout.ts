import { loadTranslations } from '$lib/translations'

export const load = async ({ url }: { url: URL }) => {
  await loadTranslations('en', url.pathname)
}
