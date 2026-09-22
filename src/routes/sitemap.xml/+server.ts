// Prerendered sitemap. Static routes are listed here; the comparison, intent and changelog pages
// come from their data files. lastmod is the last commit that touched the files behind a route,
// so it only moves when the page does.
import { execFileSync } from 'node:child_process'
import { URL_SITE } from '$lib/const'
import { RIVALS } from '$lib/compare'
import { INTENTS, intentPath } from '$lib/intent'
import { RELEASES } from '$lib/changelog'
import type { RequestHandler } from './$types'

export const prerender = true

const ROUTES: [string, string[]][] = [
  ['/', ['src/routes/+page.svelte', 'src/lib/components', 'src/lib/const.ts']],
  ['/privacy', ['src/routes/privacy']],
  ['/changelog', ['src/lib/changelog.md']],
  ...RIVALS.map((r): [string, string[]] => [
    `/vs/${r.slug}`,
    ['src/lib/compare.ts', 'src/lib/components/Compare.svelte']
  ]),
  ...INTENTS.map((i): [string, string[]] => [
    intentPath(i),
    ['src/lib/intent.ts', 'src/lib/components/Intent.svelte']
  ])
]

const lastmod = (paths: string[]) => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      encoding: 'utf8'
    }).trim()
  } catch {
    return ''
  }
}

export const GET: RequestHandler = () => {
  const url = (path: string, mod: string) =>
    `  <url><loc>${URL_SITE}${path}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}</url>`
  const urls = [
    ...ROUTES.map(([path, files]) => url(path, lastmod(files))),
    ...RELEASES.map((r) => url(`/changelog/${r.version}`, r.date))
  ].join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
