// The fonts are self-hosted and subset by script, so the browser only learns their URLs once
// the stylesheet has been parsed. Preloading the Latin faces used above the fold (Geist for
// headings and body; Plex Mono 400/500/600 for labels, buttons and the editor mock) lets them
// arrive with the HTML. The other subsets and the italic stay lazy. Pages are prerendered, so
// the links are baked into the HTML at build time.
import type { Handle } from '@sveltejs/kit'

const ABOVE_THE_FOLD =
  /\/(geist-latin-wght-normal|ibm-plex-mono-latin-[456]00-normal)\.[^/]+\.woff2$/

export const handle: Handle = ({ event, resolve }) =>
  resolve(event, {
    preload: ({ type, path }) =>
      type === 'js' || type === 'css' || (type === 'font' && ABOVE_THE_FOLD.test(path))
  })
