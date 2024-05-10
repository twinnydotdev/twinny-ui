import type { RequestHandler } from './$types'

import { getResponse } from '$lib/utils'

export const GET = (async () => {
  return getResponse('pong')
}) satisfies RequestHandler
