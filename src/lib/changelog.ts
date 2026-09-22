// The extension repository's CHANGELOG.md, split into releases. One page per release under
// /changelog/<version>, the whole thing at /changelog, and an RSS feed at /changelog.xml.
import { marked } from 'marked'
import raw from './changelog.md?raw'

export interface Release {
  version: string
  /** What the heading says: "4.2.1", or "4.0.14 to 4.0.18" for a grouped entry. */
  label: string
  /** ISO date from the heading, "4.2.1 · 2026-09-22". */
  date: string
  /** The first paragraph, plain text, for lists and the feed summary. */
  summary: string
  html: string
}

// "## 4.2.1 · 2026-09-22", or a grouped "## 4.0.14 to 4.0.18 · 2026-09-13" (the page and feed take
// the last version of the range and the first date).
const HEADING =
  /^## (\d+\.\d+(?:\.\d+)?)(?:\s+to\s+(\d+\.\d+(?:\.\d+)?))?\s+·\s+(\d{4}-\d{2}-\d{2})[^\n]*$/gm

const strip = (md: string) =>
  md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim()

const parse = (): Release[] => {
  const out: Release[] = []
  const matches = [...raw.matchAll(HEADING)]
  for (const [i, m] of matches.entries()) {
    const start = (m.index ?? 0) + m[0].length
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? raw.length) : raw.length
    const body = raw.slice(start, end).trim()
    // Headings inside a release are h3 in the file; the page's own h2 is the version.
    const summary = strip(body.split(/\n\s*\n/)[0] ?? '').replace(/^#+\s*/, '')
    out.push({
      version: m[1],
      date: m[2],
      summary,
      html: marked.parse(body, { async: false }) as string
    })
  }
  return out
}

export const RELEASES: Release[] = parse()
export const latest = () => RELEASES[0]
