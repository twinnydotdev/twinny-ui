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
    { code: 'de', label: 'de' },
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

<div class="flex h-[100vh] flex-col p-2 text-gray-300">
  <header class="flex justify-between items-center px-4 py-2">
    <a href="/" aria-label="Home">
      <h1
        class="text-xl font-bold flex-grow select-none"
        itemscope
        itemtype="http://schema.org/SoftwareApplication"
      >
        <span itemprop="name">{$t('common.title')}</span>
      </h1>
    </a>
    <nav aria-label="Main navigation" class="flex items-center">
      <a
        class="ml-3 hover:text-gray-100 transition-colors"
        href={URL_GITHUB}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="GitHub repository"
      >
        {$t('common.github')}
      </a>
      <a
        class="ml-3 hover:text-gray-100 transition-colors"
        href={URL_DOCS}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Documentation"
      >
        {$t('common.docs')}
      </a>
      <select
        class="ml-3 bg-[#1c1917] rounded transition-colors focus:outline-none"
        on:change={handleLanguageChange}
        value={$locale}
        aria-label="Select language"
      >
        {#each languages as { code, label }}
          <option class="bg-[#1c1917]" value={code}>
            {label}
          </option>
        {/each}
      </select>
    </nav>
  </header>

  <main class="flex grow flex-col items-center justify-center">
    <slot />
  </main>

  <footer class="flex justify-between items-center w-full px-4 py-2">
    <a href="/sponsor" class="hover:text-gray-100 transition-colors" aria-label="Sponsor project">
      <span class="text-red-500 mr-1" aria-hidden="true">🖤</span>
      <span>{$t('common.sponsor')}</span>
    </a>
    <a
      href={URL_TWINNYDOTDEV}
      class="hover:text-gray-100 transition-colors"
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="Contact us"
    >
      {$t('common.contact')}
    </a>
  </footer>
</div>
