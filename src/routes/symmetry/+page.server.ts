import { registerEmailAddress } from '$lib/service/registrations.service'

export const actions = {
  register: async ({ request }: { request: Request }) => {
    try {
      return await registerEmailAddress(request)
    } catch (e) {
      return e
    }
  }
}
