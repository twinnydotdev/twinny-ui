import { registerEmailAddress } from '$lib/service/registrations.service'
import type { Actions } from '@sveltejs/kit'

export const actions = {
  register: async ({ request }) => {
    try {
      const result = await registerEmailAddress(request)
      return result // { success: true } or { error: true }
    } catch (e) {
      return { error: true }
    }
  }
} satisfies Actions
