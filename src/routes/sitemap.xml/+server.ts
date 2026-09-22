// Prerendered sitemap. Add a route here when a page is added; robots.txt points crawlers at it.
import { URL_SITE } from '$lib/const'
import type { RequestHandler } from './$types'

export const prerender = true

const ROUTES = ['/', '/privacy']

export const GET: RequestHandler = () => {
  const urls = ROUTES.map((path) => `  <url><loc>${URL_SITE}${path}</loc></url>`).join('\n')
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
