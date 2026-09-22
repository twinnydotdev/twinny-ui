// Install and star counts, refreshed by scripts/stats.mjs at build time and shown rounded
// down: "72,000+" stays true for a while after the build.
import stats from './stats.json'

export const INSTALLS = stats.installs
export const STARS = stats.stars

/** 72090 -> "72,000+", 3648 -> "3,600+". Rounds down to two significant figures. */
export const roughly = (n: number) => {
  const unit = Math.pow(10, Math.max(0, Math.floor(Math.log10(n)) - 1))
  return Math.floor(n / unit) * unit
}
export const fmt = (n: number) => roughly(n).toLocaleString('en') + '+'
