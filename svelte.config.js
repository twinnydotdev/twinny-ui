import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-node';

import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    sveltekit(),
    preprocess({
      postcss: true
    })
  ],
  compilerOptions: {
    dev: process.env.DEVELOPMENT
  },
  kit: {
    adapter: adapter()
  }
}

export default config
