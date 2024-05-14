import { registerEmailAddress } from '$lib/service/registrations.service.js'

export const actions = {
  register: async ({ request }: { request: Request }) => {
    try {
      return await registerEmailAddress(request)
    } catch (e) {
      return e
    }
  }
}
