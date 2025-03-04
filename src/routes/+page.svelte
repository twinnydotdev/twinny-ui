<script lang="ts">
  import logo from '$lib/assets/twinny-logo.svg'
  import { URL_VSCODE_MARKETPLACE } from '$lib/const'
  import { t } from '$lib/translations'
  import Button from '$lib/components/button.svelte'
  import Register from '$lib/components/register.svelte'
  import type { ActionData } from '../routes/$types'
  export let form: ActionData
</script>

<div class="w-full max-w-4xl">
  <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
    <!-- Left content -->
    <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
      <img
        alt="twinny logo"
        class="h-40 w-auto"
        src={logo}
      />

      <h2 class="mt-8 text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight max-w-2xl">
        {$t('common.subtitle')}
      </h2>

      <p class="mt-4 text-secondary-300 text-lg max-w-xl">
        Enhance your development experience with privacy-focused AI assistance, powered by the cutting-edge Symmetry inference network.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 mt-8">
        <a href={URL_VSCODE_MARKETPLACE} target="_blank" rel="noreferrer noopener">
          <button class="btn-primary">
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L20 8.00004V16L12 20L4 16V8.00004L12 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {$t('common.install')}
            </span>
          </button>
        </a>
        <a href="/symmetry" rel="noreferrer noopener">
          <button class="btn-secondary">
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {$t('common.try-symmetry')}
            </span>
          </button>
        </a>
      </div>
    </div>

    <!-- Right content - card -->
    <div class="w-full max-w-md">
      <div class="card">
        <h3 class="text-xl font-bold mb-4 text-center text-white">
          {$t('common.subscribe_label')}
        </h3>
        <Register {form} />
      </div>
    </div>
  </div>

  <!-- Features section -->
  <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card hover:-translate-y-1 transition-all">
      <svg class="w-10 h-10 text-rose-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9M21 9L12 3L3 9M21 9H3M16 14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V11H16V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3 class="text-lg font-bold mb-2 text-white">Privacy-First</h3>
      <p class="text-secondary-300">Your code stays private. Twinny prioritizes your data security above all else.</p>
    </div>

    <div class="card hover:-translate-y-1 transition-all">
      <svg class="w-10 h-10 text-rose-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.01V16M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <h3 class="text-lg font-bold mb-2 text-white">Symmetry Network</h3>
      <p class="text-secondary-300">Advanced AI inference network designed for developers, by developers.</p>
    </div>

    <div class="card hover:-translate-y-1 transition-all">
      <svg class="w-10 h-10 text-rose-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3 class="text-lg font-bold mb-2 text-white">VS Code Integration</h3>
      <p class="text-secondary-300">Seamlessly integrated with VS Code for a natural coding experience.</p>
    </div>
  </div>
</div>
