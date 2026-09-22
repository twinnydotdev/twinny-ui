# CLAUDE.md - twinny.dev website

## Commands

- `npm run dev` - dev server
- `npm run build` - production build to `build/` (adapter-node, pages prerendered)
- `npm run check` - svelte-check
- `npm run lint` / `npm run format` - prettier + eslint

## Design

The site follows the twinny extension sidebar and the twinny-server admin page: dark ground
(`#0d1012`), one green accent (`#23d18b`), Geist for headings and body, IBM Plex Mono for labels, buttons, code and
every UI mock, hairline borders, 3px corners, no shadows, no gradients except a faint
radial glow. All tokens live in `src/app.css`; do not introduce new colours in components.

- Every section opens with a `.label` (uppercase, tracked, green tick) and a `.section-head`.
- Grids use `minmax(0, 1fr)` tracks so long monospace lines never widen a column on phones.
- Fonts are self-hosted via `@fontsource`. The only third-party request is the Google tag in
  `src/app.html`; do not add other scripts or trackers.
- Copy is short, dry, specific and vendor-neutral in the visible home-page copy: no model or
  runtime names there. Runtime names are allowed in the home page's meta description and
  structured data (people search for them), on `/with/<runtime>` and `/for/<situation>` pages
  built from `src/lib/intent.ts` (facts from the docs' provider pages), and on `/vs/<slug>`
  comparison pages built from `src/lib/compare.ts`. Every vendor fact and price on a /vs page
  was read from the vendor's own pricing page on the date in `CHECKED`; update both together.
- Structured data is emitted through `jsonLd()` in `src/lib/seo.ts`, never as a literal
  `<script type="application/ld+json">` in a component: Svelte reads its braces and renders it
  empty.
- `/changelog` and `/changelog.xml` render `src/lib/changelog.md`, a copy of the extension
  repository's CHANGELOG.md refreshed by `scripts/changelog.mjs` at build time; the sitemap
  takes `lastmod` from git.
- Install and star counts come from `src/lib/stats.json`, refreshed by `scripts/stats.mjs` at
  build time and shown rounded down ("72,000+"). Do not type numbers into components.
- The "in the open" block (`Maker.svelte`) names nobody: no maintainer name, no photo, no team,
  no "one person" framing. It is the public record only: installs, stars, year, licence.
- Prices, seat rules and the trial's size live in `src/lib/const.ts` (the trial must match
  `TRIAL_DAYS`/`TRIAL_SEATS` in ../twinny-licence). `/api/trial` forwards to the licence service
  with `LICENSE_TRIAL_URL` and `LICENSE_TRIAL_SECRET` from `.env`. Claims about the product must match the docs at
  ../twinny-docs; do not invent features, prices or numbers.

## Code style

- 2-space indent, 100-char width, single quotes, no semicolons (see `.prettierrc`)
- Svelte 5 runes (`$props()`, `$state`, `$derived`); scoped `<style>` blocks, no Tailwind
- External URLs only in `src/lib/const.ts`

## Checking layout

Headless Chrome never lays out narrower than 500px. To check phone widths, screenshot a
wrapper page with an `<iframe width="390">` pointing at the dev server.
