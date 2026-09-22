// Install and star counts, refreshed by scripts/stats.mjs at build time and shown rounded
// down: "72,000+" stays true for a while after the build.
import stats from './stats.json'

/** Marketplace installs alone; the Marketplace's own headline number. */
export const INSTALLS = stats.installs
/**
 * Installs across the two stores the extension is on: the Marketplace's install count plus
 * Open VSX's download count (the only figure Open VSX reports). The Marketplace's own download
 * count is higher because it includes updates; it is kept in the file but not shown.
 */
export const INSTALLS_ALL = stats.installs + stats.openVsxDownloads
export const STARS = stats.stars
/** The Marketplace's average rating and how many people gave one. */
export const RATING = stats.rating
export const RATING_COUNT = stats.ratingCount

/** 72090 -> "72,000+", 3648 -> "3,600+". Rounds down to two significant figures. */
export const roughly = (n: number) => {
  const unit = Math.pow(10, Math.max(0, Math.floor(Math.log10(n)) - 1))
  return Math.floor(n / unit) * unit
}
export const fmt = (n: number) => roughly(n).toLocaleString('en') + '+'
