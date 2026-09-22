// RSS feed of releases, prerendered. Linked from the layout head so readers find it.
import { RELEASES } from '$lib/changelog'
import { URL_SITE } from '$lib/const'
import type { RequestHandler } from './$types'

export const prerender = true

const esc = (s: string) =>
  s.replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&#39;', '"': '&quot;' })[c] as string
  )

export const GET: RequestHandler = () => {
  const items = RELEASES.map(
    (r) => `    <item>
      <title>twinny ${esc(r.version)}</title>
      <link>${URL_SITE}/changelog/${esc(r.version)}</link>
      <guid isPermaLink="true">${URL_SITE}/changelog/${esc(r.version)}</guid>
      <pubDate>${new Date(r.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${esc(r.summary)}</description>
      <content:encoded><![CDATA[${r.html}]]></content:encoded>
    </item>`
  ).join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>twinny releases</title>
    <link>${URL_SITE}/changelog</link>
    <atom:link href="${URL_SITE}/changelog.xml" rel="self" type="application/rss+xml" />
    <description>Every release of the twinny VS Code extension and the twinny-server team gateway.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
