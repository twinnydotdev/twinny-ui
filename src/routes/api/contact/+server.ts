// The enterprise enquiry form. One JSON (or form-encoded) POST, validated here, sent on
// through the Resend API to CONTACT_TO with the sender as reply-to. Nothing is stored; the
// log carries status words only. Needs RESEND_API_KEY, CONTACT_TO and CONTACT_FROM.
import { json, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import type { RequestHandler } from './$types'

export const prerender = false

const LIMITS = { name: 100, email: 254, org: 120, message: 4000 }
const MIN_MESSAGE = 10
const MIN_ELAPSED_MS = 3000
const MAX_BODY = 16 * 1024
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Sliding windows per client and overall, in memory: the site runs as one process.
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

function str(v: unknown) {
  return (typeof v === 'string' ? v : '').replace(/\r\n?/g, '\n').trim()
}

function validate(input: Record<string, unknown>) {
  const name = str(input.name)
  const email = str(input.email)
  const org = str(input.org)
  const seats = str(input.seats)
  const message = str(input.message)
  if (name.length < 2 || name.length > LIMITS.name || /\n/.test(name))
    return { error: 'Please give your name.' }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email || /[\n,;<>]/.test(email))
    return { error: 'That email address does not look right.' }
  if (org.length > LIMITS.org || /\n/.test(org)) return { error: 'Organisation is too long.' }
  if (seats && !/^\d{1,6}$/.test(seats)) return { error: 'Developers should be a number.' }
  if (message.length < MIN_MESSAGE) return { error: 'Say a little more in the message.' }
  if (message.length > LIMITS.message) return { error: 'The message is too long.' }
  return { values: { name, email, org, seats, message } }
}

async function send(v: {
  name: string
  email: string
  org: string
  seats: string
  message: string
}) {
  const subject = `[twinny] ${v.org || v.name}${v.seats ? ` · ${v.seats} developers` : ''}`
  const text = [
    `New enquiry via twinny.dev`,
    ``,
    `Name:         ${v.name}`,
    `Email:        ${v.email}`,
    `Organisation: ${v.org || '(not given)'}`,
    `Developers:   ${v.seats || '(not given)'}`,
    ``,
    `Message:`,
    v.message,
    ``,
    `---`,
    `Received ${new Date().toISOString()}`
  ].join('\n')
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: v.email,
        subject,
        text
      }),
      signal: controller.signal
    })
    const body = (await r.json().catch(() => ({}))) as { id?: string; message?: string }
    return r.ok && body.id
      ? { ok: true as const, id: body.id }
      : { ok: false as const, status: r.status, error: body.message || `HTTP ${r.status}` }
  } finally {
    clearTimeout(timer)
  }
}

function log(...parts: unknown[]) {
  console.log(new Date().toISOString(), 'contact', ...parts)
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const type = (request.headers.get('content-type') || '').split(';')[0].trim()
  const isForm = type === 'application/x-www-form-urlencoded'
  // A browser without JavaScript posts the form itself and gets sent back to the section.
  const answer = (status: number, ok: boolean, error?: string) => {
    if (isForm) redirect(303, `/?sent=${ok ? 1 : 0}#contact`)
    return json(ok ? { ok } : { ok, error }, { status })
  }

  const now = Date.now()
  if (!allowed(all, 60, now)) {
    log('429 global')
    return answer(429, false, 'The form is busy right now. Try again a little later.')
  }
  let ip = 'unknown'
  try {
    ip = getClientAddress()
  } catch {
    /* no address header: not behind the proxy */
  }
  const mine = perIp.get(ip) ?? []
  perIp.set(ip, mine)
  if (!allowed(mine, 5, now)) {
    log('429 ip')
    return answer(429, false, 'Too many messages from this connection. Try again later.')
  }

  let data: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY) return answer(413, false, 'The message is too large.')
    if (type === 'application/json') data = JSON.parse(raw)
    else if (isForm) data = Object.fromEntries(new URLSearchParams(raw))
    else return answer(415, false, 'Unsupported content type.')
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('shape')
  } catch {
    return answer(400, false, 'Could not read the form.')
  }

  // Honeypot filled, or submitted faster than a person types: answer as if sent, send nothing.
  const tooFast = !isForm && !(Number(data.elapsed) >= MIN_ELAPSED_MS)
  if (str(data.website) || tooFast) {
    log('200 dropped', str(data.website) ? 'honeypot' : 'too-fast')
    return answer(200, true)
  }

  const v = validate(data)
  if ('error' in v) {
    log('400 validation')
    return answer(400, false, v.error)
  }
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    log('503 not-configured')
    return answer(503, false, 'The form is not set up yet, so the message was not sent.')
  }
  try {
    const r = await send(v.values)
    if (r.ok) {
      log('200 sent', 'id=' + r.id)
      return answer(200, true)
    }
    log('502 upstream', 'status=' + r.status, 'error=' + r.error)
  } catch (e) {
    log('502 upstream', e instanceof Error ? e.name : 'error')
  }
  return answer(502, false, 'The email service did not accept the message. Try again.')
}
