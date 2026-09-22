// The free trial form. One JSON (or form-encoded) POST, validated here, forwarded to the licence
// service's /trial route with the shared secret; the service signs a 30-day token and emails it.
// Nothing is stored here. Needs LICENSE_TRIAL_URL and LICENSE_TRIAL_SECRET.
import { json, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import type { RequestHandler } from './$types'

export const prerender = false

const LIMITS = { email: 254, org: 120 }
const MIN_ELAPSED_MS = 2000
const MAX_BODY = 8 * 1024
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const perIp = new Map<string, number[]>()
const all: number[] = []
const HOUR = 60 * 60 * 1000
function allowed(list: number[], limit: number, now: number) {
  while (list.length && list[0] <= now - HOUR) list.shift()
  if (list.length >= limit) return false
  list.push(now)
  return true
}
setInterval(
  () => {
    const cutoff = Date.now() - HOUR
    for (const [k, v] of perIp) if (!v.some((t) => t > cutoff)) perIp.delete(k)
  },
  10 * 60 * 1000
)

const str = (v: unknown) => (typeof v === 'string' ? v : '').replace(/\s+/g, ' ').trim()

function log(...parts: unknown[]) {
  console.log(new Date().toISOString(), 'trial', ...parts)
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const type = (request.headers.get('content-type') || '').split(';')[0].trim()
  const isForm = type === 'application/x-www-form-urlencoded'
  const answer = (status: number, ok: boolean, extra: Record<string, unknown> = {}) => {
    if (isForm) redirect(303, `/?trial=${ok ? 1 : 0}#trial`)
    return json({ ok, ...extra }, { status })
  }
  const fail = (status: number, error: string) => answer(status, false, { error })

  const now = Date.now()
  if (!allowed(all, 30, now)) {
    log('429 global')
    return fail(429, 'The form is busy right now. Try again a little later.')
  }
  let ip = 'unknown'
  try {
    ip = getClientAddress()
  } catch {
    /* not behind the proxy */
  }
  const mine = perIp.get(ip) ?? []
  perIp.set(ip, mine)
  if (!allowed(mine, 3, now)) {
    log('429 ip')
    return fail(429, 'Too many requests from this connection. Try again later.')
  }

  let data: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY) return fail(413, 'The request is too large.')
    if (type === 'application/json') data = JSON.parse(raw)
    else if (isForm) data = Object.fromEntries(new URLSearchParams(raw))
    else return fail(415, 'Unsupported content type.')
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('shape')
  } catch {
    return fail(400, 'Could not read the form.')
  }

  // Honeypot filled, or submitted faster than a person types: answer as if sent, do nothing.
  const tooFast = !isForm && !(Number(data.elapsed) >= MIN_ELAPSED_MS)
  if (str(data.website) || tooFast) {
    log('200 dropped', str(data.website) ? 'honeypot' : 'too-fast')
    return answer(200, true, { emailed: true })
  }

  const email = str(data.email)
  const org = str(data.org)
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email || /[,;<>]/.test(email))
    return fail(400, 'That email address does not look right.')
  if (org.length < 2 || org.length > LIMITS.org)
    return fail(400, 'Give the team or organisation a name.')

  if (!env.LICENSE_TRIAL_URL || !env.LICENSE_TRIAL_SECRET) {
    log('503 not-configured')
    return fail(
      503,
      'Trials are not set up yet. Use the contact form and one will be issued by hand.'
    )
  }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const r = await fetch(env.LICENSE_TRIAL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.LICENSE_TRIAL_SECRET}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, org }),
      signal: controller.signal
    })
    const body = (await r.json().catch(() => ({}))) as {
      ok?: boolean
      emailed?: boolean
      url?: string
      error?: { message?: string }
    }
    if (r.ok && body.ok) {
      log('200 issued', body.emailed ? 'emailed' : 'page')
      return answer(200, true, { emailed: !!body.emailed, ...(body.url ? { url: body.url } : {}) })
    }
    // 409 (already had one) and 429 (daily cap) carry a message worth showing as it is.
    if (r.status === 409 || r.status === 429 || r.status === 400) {
      log(`${r.status} refused`)
      return fail(r.status, body.error?.message || 'The trial was not issued.')
    }
    log('502 upstream', 'status=' + r.status)
  } catch (e) {
    log('502 upstream', e instanceof Error ? e.name : 'error')
  } finally {
    clearTimeout(timer)
  }
  return fail(502, 'The licence service did not answer. Try again in a minute.')
}
