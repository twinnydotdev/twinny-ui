import { registerEmailAddress } from '$lib/service/registrations.service.js'

export const actions = {
  register: async ({ request }) => {
    try {
      await registerEmailAddress(request)
      return { success: true }
    } catch (e) {
      return e
    }
  }
}
