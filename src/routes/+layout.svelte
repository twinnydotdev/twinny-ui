<script lang="ts">
  import '../app.css'
  import { URL_DOCS, URL_GITHUB, URL_MARKETPLACE, URL_SITE } from '$lib/const'
  import Mark from '$lib/components/Mark.svelte'
  import { page } from '$app/state'

  let { children } = $props()
  // One canonical per route, without hash or query: /#pricing is still the home page.
  let canonical = $derived(URL_SITE + page.url.pathname)

  const compare = [
    ['/vs/github-copilot', 'vs copilot'],
    ['/vs/cursor', 'vs cursor'],
    ['/vs/tabnine', 'vs tabnine'],
    ['/with/ollama', 'ollama'],
    ['/with/llama-cpp', 'llama.cpp'],
    ['/with/lm-studio', 'lm studio'],
    ['/for/air-gapped', 'air-gapped'],
    ['/for/regulated-teams', 'regulated teams'],
    ['/from/continue', 'from continue'],
    ['/from/roo-code', 'from roo code']
  ]
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="twinny" />
  <meta property="og:image" content="{URL_SITE}/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="twinny — the AI coding assistant that stays inside your network"
  />
  <link rel="alternate" type="application/rss+xml" title="twinny releases" href="/changelog.xml" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="{URL_SITE}/og.png" />
</svelte:head>

<a class="skip" href="#main">skip to content</a>
<header class="top">
  <div class="wrap row">
    <a href="/" class="brand" aria-label="twinny home">
      <Mark size={16} />
      <span>twinny</span>
    </a>
    <nav aria-label="Main">
      <a href="/#pricing">pricing</a>
      <a href={URL_DOCS} target="_blank" rel="noopener noreferrer">docs</a>
      <a href={URL_GITHUB} target="_blank" rel="noopener noreferrer">source</a>
      <a class="install" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">install</a
      >
    </nav>
  </div>
</header>
<main id="main">
  {@render children()}
</main>
<footer class="foot">
  <div class="wrap">
    <p>
      {#each compare as [href, text], i}{#if i}<span class="sep">·</span>{/if}<a {href}>{text}</a
        >{/each}
    </p>
    <p>
      <a href="/changelog">changelog</a><span class="sep">·</span><a href="/security">security</a
      ><span class="sep">·</span><a href="/#contact">contact</a><span class="sep">·</span><a
        href="/privacy">privacy</a
      ><span class="sep">·</span><span class="dim">MIT · no account · no telemetry</span>
    </p>
  </div>
</footer>

<style>
  .skip {
    position: absolute;
    left: 8px;
    top: -60px;
    z-index: 100;
    padding: 8px 12px;
    background: var(--ink);
    color: var(--bg);
    border: 0;
  }
  .skip:focus {
    top: 8px;
  }
  .top,
  .foot {
    font-family: var(--mono);
    font-size: var(--fs-sm);
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 64px;
  }
  a {
    border: 0;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: var(--ink);
    font-weight: 500;
  }
  nav {
    display: flex;
    align-items: center;
    gap: clamp(14px, 3vw, 28px);
  }
  nav a {
    color: var(--ink-2);
  }
  nav a:hover,
  .foot a:hover {
    color: var(--ink);
  }
  nav .install {
    color: var(--ink);
  }
  nav .install::after {
    content: ' ↗';
    color: var(--ink-3);
  }
  .foot {
    margin-top: clamp(64px, 10vw, 120px);
    padding-block: 28px 40px;
    border-top: 1px solid var(--line);
    color: var(--ink-3);
    font-size: var(--fs-xs);
    line-height: 2;
  }
  .foot a {
    color: var(--ink-3);
  }
  .sep {
    margin-inline: 8px;
    color: var(--line-2);
  }
  @media (max-width: 420px) {
    nav a:first-child {
      display: none;
    }
  }
</style>
