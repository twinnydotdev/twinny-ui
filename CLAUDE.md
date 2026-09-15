# CLAUDE.md - twinny.dev website

## Commands

- `npm run dev` - dev server
- `npm run build` - production build to `build/` (adapter-node, pages prerendered)
- `npm run check` - svelte-check
- `npm run lint` / `npm run format` - prettier + eslint

## Design

The site follows the twinny extension sidebar and the twinny-server admin page: dark ground
(`#0d1012`), one green accent (`#23d18b`), monospace everywhere (Martian Mono for display,
IBM Plex Mono for body), hairline borders, 3px corners, no shadows, no gradients except a faint
radial glow. All tokens live in `src/app.css`; do not introduce new colours in components.

- Every section opens with a `.label` (uppercase, tracked, green tick) and a `.section-head`.
- Grids use `minmax(0, 1fr)` tracks so long monospace lines never widen a column on phones.
- Fonts are self-hosted via `@fontsource`; the site makes no third-party requests and has no
  analytics. Keep it that way.
- Copy is lowercase-leaning, dry, specific. Claims about the product must match the docs at
  ../twinny-docs; do not invent features, prices or numbers.

## Code style

- 2-space indent, 100-char width, single quotes, no semicolons (see `.prettierrc`)
- Svelte 5 runes (`$props()`, `$state`, `$derived`); scoped `<style>` blocks, no Tailwind
- External URLs only in `src/lib/const.ts`

## Checking layout

Headless Chrome never lays out narrower than 500px. To check phone widths, screenshot a
wrapper page with an `<iframe width="390">` pointing at the dev server.
