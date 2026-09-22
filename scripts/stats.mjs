// Refreshes src/lib/stats.json from the Marketplace and GitHub before a build. The numbers are
// baked into the prerendered pages, so the browser never asks a third party for them. Any
// failure keeps the committed values: the build never depends on either API being up.
import { readFileSync, writeFileSync } from 'node:fs'

const file = new URL('../src/lib/stats.json', import.meta.url)
const current = JSON.parse(readFileSync(file, 'utf8'))
const next = { ...current }

const withTimeout = (ms) => AbortSignal.timeout(ms)

try {
  const r = await fetch(
    'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;api-version=3.0-preview.1'
      },
      body: JSON.stringify({
        filters: [{ criteria: [{ filterType: 7, value: 'rjmacarthy.twinny' }] }],
        flags: 256
      }),
      signal: withTimeout(10000)
    }
  )
  const stats = (await r.json()).results?.[0]?.extensions?.[0]?.statistics ?? []
  const installs = stats.find((s) => s.statisticName === 'install')?.value
  if (Number.isFinite(installs) && installs > 0) next.installs = Math.round(installs)
} catch (e) {
  console.warn('stats: marketplace not read,', e instanceof Error ? e.message : e)
}

try {
  const r = await fetch('https://api.github.com/repos/twinnydotdev/twinny', {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'twinny.dev build' },
    signal: withTimeout(10000)
  })
  const stars = (await r.json()).stargazers_count
  if (Number.isFinite(stars) && stars > 0) next.stars = stars
} catch (e) {
  console.warn('stats: github not read,', e instanceof Error ? e.message : e)
}

if (next.installs !== current.installs || next.stars !== current.stars) {
  next.updated = new Date().toISOString().slice(0, 10)
  writeFileSync(file, JSON.stringify(next, null, 2) + '\n')
  console.log(`stats: installs ${next.installs}, stars ${next.stars}`)
} else {
  console.log('stats: unchanged')
}
