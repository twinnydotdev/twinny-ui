<script lang="ts">
  import { URL_DOCS, URL_GITHUB, URL_TWINNYDOTDEV } from '$lib/const'
  import { t, locale } from '$lib/translations'
  import Analytics from '$lib/analytics/index.svelte'
  import '../app.postcss'
  import '@fontsource/geist-sans'

  const languages = [
    { code: 'en', label: 'en' },
    { code: 'zh-CN', label: '简' },
    { code: 'zh-TW', label: '繁' },
    { code: 'ja', label: '日' },
    { code: 'ko', label: '한' },
    { code: 'fr', label: 'fr' },
    { code: 'de', label: 'de' }
  ]

  function handleLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement
    locale.set(select.value)
    document.cookie = `lang=${select.value} ;`
  }
</script>

<svelte:head>
  <title>Twinny - Privacy-First AI Extension & Symmetry Network</title>
  <meta name="title" content="Twinny - Free AI Extension for VS Code & Symmetry Network" />
  <meta
    name="description"
    content="The free and private AI extension for Visual Studio Code and home of the Symmetry inference network. Enhance your development with privacy-focused AI assistance."
  />
  <meta
    name="keywords"
    content="VS Code extension, AI assistant, Symmetry inference network, private AI, code completion, developer tools, privacy-focused AI"
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Twinny - Private AI Extension & Symmetry Network" />
  <meta
    property="og:description"
    content="Free, privacy-focused AI extension for VS Code. Home of the Symmetry inference network for enhanced development workflows."
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Twinny - VS Code AI Extension & Symmetry" />
  <meta
    name="twitter:description"
    content="Free and private AI coding assistant, featuring the Symmetry inference network for smarter development."
  />

  <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet" />

  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Twinny",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "VS Code",
      "description": "Free and private AI extension for Visual Studio Code, featuring the Symmetry inference network for enhanced development"
    }
  </script>
</svelte:head>

<Analytics />

<div class="flex min-h-[100vh] flex-col px-4 sm:px-6 text-secondary-100">
  <header class="relative z-10 py-6">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <a href="/" class="flex items-center group" aria-label="Home">
          <h1
            class="text-xl font-bold group-hover:text-rose-500 transition-colors duration-300"
            itemscope
            itemtype="http://schema.org/SoftwareApplication"
          >
            <span itemprop="name" class="text-secondary-100">
              {$t('common.title')}
            </span>
          </h1>
        </a>

        <nav aria-label="Main navigation" class="flex items-center space-x-6">
          <a
            class="text-sm font-medium hover:text-rose-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-rose-500 after:transition-all hover:after:w-full"
            href="/symmetry"
            aria-label="Symmetry"
          >
            {$t('common.symmetry')}
          </a>
          <a
            class="text-sm font-medium hover:text-rose-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-rose-500 after:transition-all hover:after:w-full"
            href={URL_DOCS}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Documentation"
          >
            {$t('common.docs')}
          </a>

          <div class="relative">
            <select
              class="appearance-none text-sm font-medium py-1 pl-2 pr-8 rounded-lg bg-secondary-800 border border-secondary-700 focus:outline-none focus:ring-1 focus:ring-rose-500"
              on:change={handleLanguageChange}
              value={$locale}
              aria-label="Select language"
            >
              {#each languages as { code, label }}
                <option class="bg-secondary-800" value={code}>
                  {label}
                </option>
              {/each}
            </select>
            <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>

  <slot />

  <footer class="py-6 border-t border-secondary-800">
    <div class="container mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <a
          href="/sponsor"
          class="flex items-center group space-x-1 hover:text-rose-500 transition-colors"
          aria-label="Sponsor project"
        >
          <span class="text-rose-500 transition-colors" aria-hidden="true">❤️</span>
          <span>{$t('common.sponsor')}</span>
        </a>

        <div class="flex items-center space-x-6">
          <a
            href='/blog'
            class="text-sm font-medium hover:text-rose-500 transition-colors"
            aria-label="Blog"
          >
            {$t('common.blog')}
          </a>
          <a
            class="text-sm font-medium hover:text-rose-500 transition-colors"
            href={URL_GITHUB}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="GitHub repository"
          >
            {$t('common.github')}
          </a>
          <a
            href={URL_TWINNYDOTDEV}
            class="text-sm font-medium hover:text-rose-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Contact us"
          >
            {$t('common.contact')}
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>
