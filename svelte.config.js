import adapter from '@sveltejs/adapter-node'

import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    sveltekit(),
  ],
  kit: {
    adapter: adapter()
  }
}

export default config
