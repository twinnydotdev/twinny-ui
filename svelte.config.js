import adapter from '@sveltejs/adapter-node'
import { mdsvex } from 'mdsvex';

import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    sveltekit(),
    mdsvex({
      extensions: ['.svx', '.md'],
    })
  ],
  kit: {
    adapter: adapter()
  }
}

export default config
