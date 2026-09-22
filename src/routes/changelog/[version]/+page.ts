import { error } from '@sveltejs/kit'
import { RELEASES } from '$lib/changelog'
import type { EntryGenerator, PageLoad } from './$types'

export const entries: EntryGenerator = () => RELEASES.map((r) => ({ version: r.version }))

export const load: PageLoad = ({ params }) => {
  const release = RELEASES.find((r) => r.version === params.version)
  if (!release) error(404, 'No such release')
  const i = RELEASES.indexOf(release)
  return { release, newer: RELEASES[i - 1], older: RELEASES[i + 1] }
}
