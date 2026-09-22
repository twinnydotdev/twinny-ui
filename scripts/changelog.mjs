// Refreshes src/lib/changelog.md from the extension repository's CHANGELOG.md before a build,
// so every release is a page on twinny.dev. A failed fetch keeps the committed copy.
import { readFileSync, writeFileSync } from 'node:fs'

const file = new URL('../src/lib/changelog.md', import.meta.url)
try {
  const r = await fetch('https://raw.githubusercontent.com/twinnydotdev/twinny/main/CHANGELOG.md', {
    signal: AbortSignal.timeout(10000)
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const text = await r.text()
  if (!/^## \d+\.\d+/m.test(text)) throw new Error('no release headings')
  if (text !== readFileSync(file, 'utf8')) {
    writeFileSync(file, text)
    console.log('changelog: updated')
  } else console.log('changelog: unchanged')
} catch (e) {
  console.warn('changelog: not read,', e instanceof Error ? e.message : e)
}
