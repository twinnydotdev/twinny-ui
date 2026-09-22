<script lang="ts">
  import '../app.css'
  import {
    URL_DOCS,
    URL_GITHUB,
    URL_MARKETPLACE,
    URL_OPENVSX,
    URL_X,
    URL_DISCUSSIONS,
    URL_COMPANY,
    COMPANY,
    URL_DEMO,
    URL_SITE
  } from '$lib/const'
  import Mark from '$lib/components/Mark.svelte'
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'

  let { children } = $props()
  let open = $state(false)
  let progress = $state(0)
  let active = $state('')
  // One canonical per route, without hash or query: /#pricing is still the home page.
  let canonical = $derived(URL_SITE + page.url.pathname)

  // A hairline under the header fills as you read; the nav underlines the section in view.
  onMount(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      progress = max > 0 ? Math.min(1, h.scrollTop / max) : 0
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  })

  let io: IntersectionObserver | undefined
  afterNavigate(() => {
    io?.disconnect()
    active = ''
    if (typeof IntersectionObserver === 'undefined') return
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active = e.target.id
          else if (active === e.target.id) active = ''
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    for (const id of ['features', 'teams', 'security', 'pricing']) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
  })

  const nav = [
    { href: '/#features', label: 'features' },
    { href: '/#teams', label: 'teams' },
    { href: '/#security', label: 'security' },
    { href: '/#pricing', label: 'pricing' },
    { href: URL_DEMO, label: 'live demo', external: true },
    { href: URL_DOCS, label: 'docs', external: true },
    { href: URL_GITHUB, label: 'github', external: true }
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
  <meta name="twitter:site" content="@twinnydotdev" />
  <meta name="twitter:image" content="{URL_SITE}/og.png" />
</svelte:head>

<a class="skip" href="#main">skip to content</a>

<header class="top" class:open>
  <div class="wrap row">
    <a href="/" class="brand" aria-label="twinny home" onclick={() => (open = false)}>
      <Mark size={20} />
      <span>twinny</span>
    </a>

    <nav aria-label="Main" class="links">
      {#each nav as item}
        <a
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          class:on={!item.external && item.href === `/#${active}`}
          onclick={() => (open = false)}>{item.label}</a
        >
      {/each}
    </nav>

    <div class="cta">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">
        install
        <span class="k">VS CODE</span>
      </a>
    </div>

    <button class="burger" aria-label="Menu" aria-expanded={open} onclick={() => (open = !open)}>
      <span></span><span></span>
    </button>
  </div>
  <div class="progress" style="transform: scaleX({progress})" aria-hidden="true"></div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="/" class="brand" aria-label="twinny home">
          <Mark size={18} />
          <span>twinny</span>
        </a>
        <p class="muted">
          The AI coding assistant that stays inside your network. Open source, MIT licensed. Made by <a
            href={URL_COMPANY}
            target="_blank"
            rel="noopener noreferrer">{COMPANY}</a
          >.
        </p>
        <p class="dim">© {new Date().getFullYear()} {COMPANY}</p>
      </div>
      <div>
        <div class="label bare">product</div>
        <ul>
          <li><a href="/#features">features</a></li>
          <li><a href="/#teams">teams</a></li>
          <li><a href="/#security">security</a></li>
          <li><a href="/#pricing">pricing</a></li>
          <li>
            <a href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">marketplace</a>
          </li>
          <li><a href={URL_OPENVSX} target="_blank" rel="noopener noreferrer">open vsx</a></li>
        </ul>
      </div>
      <div>
        <div class="label bare">compare</div>
        <ul>
          <li><a href="/vs/github-copilot">vs GitHub Copilot</a></li>
          <li><a href="/vs/cursor">vs Cursor</a></li>
          <li><a href="/vs/tabnine">vs Tabnine</a></li>
          <li><a href="/with/ollama">with Ollama</a></li>
          <li><a href="/with/llama-cpp">with llama.cpp</a></li>
          <li><a href="/with/lm-studio">with LM Studio</a></li>
          <li><a href="/for/air-gapped">air-gapped</a></li>
          <li><a href="/for/regulated-teams">regulated teams</a></li>
        </ul>
      </div>
      <div>
        <div class="label bare">learn</div>
        <ul>
          <li><a href={URL_DOCS} target="_blank" rel="noopener noreferrer">documentation</a></li>
          <li><a href="/changelog">changelog</a></li>
          <li>
            <a
              href="{URL_DOCS}getting-started/quick-start/"
              target="_blank"
              rel="noopener noreferrer">quick start</a
            >
          </li>
          <li>
            <a
              href="{URL_DOCS}providers/supported-models/"
              target="_blank"
              rel="noopener noreferrer">supported models</a
            >
          </li>
          <li>
            <a href="{URL_DOCS}teams/overview/" target="_blank" rel="noopener noreferrer"
              >twinny-server</a
            >
          </li>
        </ul>
      </div>
      <div>
        <div class="label bare">community</div>
        <ul>
          <li><a href={URL_GITHUB} target="_blank" rel="noopener noreferrer">github</a></li>
          <li>
            <a href={URL_DISCUSSIONS} target="_blank" rel="noopener noreferrer">discussions</a>
          </li>
          <li><a href={URL_X} target="_blank" rel="noopener noreferrer">@twinnydotdev</a></li>
          <li><a href="/#maker">in the open</a></li>
          <li><a href="/#contact">contact</a></li>
          <li><a href="/privacy">privacy</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

<style>
  .skip {
    position: absolute;
    left: 8px;
    top: -60px;
    z-index: 100;
    padding: 8px 12px;
    background: var(--accent);
    color: var(--accent-ink);
    border: 0;
  }
  .skip:focus {
    top: 8px;
  }

  .top {
    position: sticky;
    top: 0;
    z-index: 50;
    background: color-mix(in srgb, var(--bg) 84%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 32px;
    height: 60px;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 0;
    font-family: var(--display);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .brand:hover {
    color: var(--accent);
  }
  .links {
    display: flex;
    gap: 26px;
    margin-left: 8px;
  }
  .links a {
    border: 0;
    color: var(--ink-2);
    font-family: var(--mono);
    font-size: var(--fs-sm);
    letter-spacing: 0.02em;
    position: relative;
  }
  .links a::after {
    content: '';
    position: absolute;
    left: 0;
    right: 100%;
    bottom: -4px;
    height: 1px;
    background: var(--accent);
    transition: right 0.18s ease;
  }
  .links a:hover {
    color: var(--ink);
  }
  .links a:hover::after,
  .links a.on::after {
    right: 0;
  }
  .links a.on {
    color: var(--ink);
  }
  .progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background: var(--accent);
    transform-origin: left;
    transform: scaleX(0);
    pointer-events: none;
  }
  .cta {
    margin-left: auto;
  }
  .cta .btn {
    height: 36px;
    padding-inline: 14px;
  }
  .burger {
    display: none;
    width: 36px;
    height: 36px;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    align-items: center;
  }
  .burger span {
    display: block;
    width: 18px;
    height: 1px;
    background: var(--ink);
    transition: transform 0.2s ease;
  }
  .open .burger span:first-child {
    transform: translateY(3.5px) rotate(45deg);
  }
  .open .burger span:last-child {
    transform: translateY(-3.5px) rotate(-45deg);
  }

  @media (max-width: 760px) {
    .row {
      gap: 16px;
    }
    .cta {
      display: none;
    }
    .burger {
      display: flex;
      margin-left: auto;
    }
    /* The open menu is a panel under the bar; the page behind it does not move. */
    .links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      gap: 0;
      margin: 0;
      padding: 0 var(--gutter) 8px;
      background: var(--bg);
      border-bottom: 1px solid var(--line);
    }
    .links a {
      padding: 12px 0;
      border-bottom: 1px solid var(--line);
      font-size: var(--fs);
    }
    .links a:last-child {
      border-bottom: 0;
    }
    .links a::after {
      display: none;
    }
    .open .links {
      display: flex;
    }
    .top.open {
      background: var(--bg);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  .foot {
    border-top: 1px solid var(--line);
    padding-block: 56px 28px;
    background: var(--bg-2);
  }
  .foot-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 32px;
  }
  .foot-brand p {
    max-width: 38ch;
    margin-top: 16px;
    font-size: var(--fs-sm);
  }
  .foot-brand .dim {
    margin-top: 24px;
    font-size: var(--fs-xs);
  }
  .foot ul {
    list-style: none;
    margin: 14px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .foot li a {
    border: 0;
    color: var(--ink-2);
    font-family: var(--mono);
    font-size: var(--fs-sm);
  }
  .foot li a:hover {
    color: var(--accent);
  }
  @media (max-width: 760px) {
    .foot-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .foot-brand {
      grid-column: 1 / -1;
    }
  }
</style>
