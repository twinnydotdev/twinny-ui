# twinny.dev

The website for [twinny](https://github.com/twinnydotdev/twinny), the private AI coding
assistant for VS Code, and twinny-server, its team gateway.

SvelteKit 2 + Svelte 5, no CSS framework, self-hosted fonts, no analytics and no
third-party requests. Pages are prerendered and served by `@sveltejs/adapter-node`.

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # → build/
node build         # serve the production build (PORT=3000)
```

`docker build -t twinny-ui .` builds the same thing into an image.

## Layout

- `src/app.css` — the design tokens, shared with the extension sidebar and the gateway admin
  page: dark ground, one green accent, monospace, hairlines, square corners.
- `src/routes/+layout.svelte` — nav and footer.
- `src/routes/+page.svelte` — the landing page, composed from `src/lib/components/`.
- `src/lib/const.ts` — every external URL.
