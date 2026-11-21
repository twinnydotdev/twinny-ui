<script lang="ts">
  import Copy from '$lib/components/Copy.svelte'
  import Trial from '$lib/components/Trial.svelte'
  import Contact from '$lib/components/Contact.svelte'
  import {
    URL_MARKETPLACE,
    URL_OPENVSX,
    URL_DEMO,
    URL_DOCS,
    URL_DOCS_TEAMS,
    URL_DOCS_LICENSING,
    URL_BUY_TEAM,
    URL_BUY_PERSONAL,
    PRICE_TEAM,
    PRICE_PERSONAL,
    FREE_SEATS
  } from '$lib/const'
  import { INSTALLS_ALL, fmt } from '$lib/stats'
  import { jsonLd, softwareApplication, faqPage, HOME_FAQ } from '$lib/seo'

  // Every line is from the docs' feature pages.
  const features = [
    ['Autocomplete', 'features/code-completion/', 'finishes your line as you type.'],
    ['Chat', 'features/chat/', 'knows your files, your diff and your terminal.'],
    ['Inline edit', 'features/inline-edit/', 'makes the change you describe, once you accept it.'],
    ['Code review', 'features/code-review/', 'for your changes, a branch or a pull request.'],
    ['Agent mode', 'features/agent-mode/', 'does the legwork, and asks before running commands.']
  ]
</script>

<svelte:head>
  <title>twinny: self-hosted AI coding assistant for VS Code</title>
  <meta
    name="description"
    content="Local AI code completion, chat, inline edit and code review in VS Code, on models you run: Ollama, llama.cpp, LM Studio or any OpenAI-compatible server. One gateway for the whole team. Open source, no telemetry. Free for five developers."
  />
  <meta property="og:title" content="twinny: self-hosted AI coding assistant for VS Code" />
  <meta
    property="og:description"
    content="Code completion, chat, inline edit and review on models you run. Nothing leaves your network. Free for individuals and teams of five."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(softwareApplication())}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(faqPage(HOME_FAQ))}
</svelte:head>

<div class="doc wrap">
  <section class="hero">
    <h1>AI for your editor that stays at home.</h1>
    <p>
      twinny brings autocomplete, chat, edits and code review to VS Code, running on models you
      choose. Your laptop, the box under your desk, or a server your team shares.
    </p>
    <p class="go">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >Install for VS Code</a
      >
      <a href={URL_OPENVSX} target="_blank" rel="noopener noreferrer">Open VSX</a>
      <a href={URL_DEMO} target="_blank" rel="noopener noreferrer">Live demo</a>
    </p>
    <p class="note">
      Free and open source. No account, no telemetry. Installed {fmt(INSTALLS_ALL)} times.
    </p>
  </section>

  <section id="features">
    <h2>What's inside</h2>
    <ul>
      {#each features as [name, doc, body]}
        <li>
          <a href="{URL_DOCS}{doc}" target="_blank" rel="noopener noreferrer">{name}</a>
          {body}
        </li>
      {/each}
    </ul>
  </section>

  <section id="pricing">
    <h2>Support twinny</h2>
    <p>
      twinny is free and open source. A Personal licence is the best way to support it: ${PRICE_PERSONAL}
      once, yours for good, with every future update.
    </p>
    <p class="go">
      <a class="btn primary" href={URL_BUY_PERSONAL} target="_blank" rel="noopener noreferrer"
        >Get a Personal licence, ${PRICE_PERSONAL}</a
      >
    </p>
    <p class="note">
      One key for all your machines, plus policy, plugins and recording on your own gateway. For one
      person. It replaces the gateway's {FREE_SEATS} free seats with one; remove it and they come back.
      <a href={URL_DOCS_LICENSING} target="_blank" rel="noopener noreferrer">Licensing</a>
    </p>
  </section>

  <section id="teams">
    <h2>For teams</h2>
    <p>
      Run one gateway and everyone gets their own key. It's free for up to {FREE_SEATS} developers, then
      ${PRICE_TEAM} per extra seat a month, billed yearly.
    </p>
    <div class="cmd"><Copy text="npx twinny-server quickstart" /></div>
    <p class="note">
      <a href={URL_BUY_TEAM} target="_blank" rel="noopener noreferrer">Buy seats</a>
      <span aria-hidden="true">·</span>
      <a href={URL_DOCS_TEAMS} target="_blank" rel="noopener noreferrer">How it works</a>
    </p>
    <Trial />
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <Contact />
  </section>
</div>

<style>
  /* The header and footer line up with the column on this page only. */
  :global(body:has(.doc) :is(.top, .foot) .wrap) {
    max-width: 620px;
  }
  .doc {
    max-width: 620px;
    font-size: 17px;
    line-height: 1.65;
  }
  .doc :global(a) {
    border-bottom: 1px solid var(--line-2);
  }
  .doc :global(a:hover) {
    color: var(--ink);
    border-bottom-color: var(--ink-2);
  }
  .doc :global(a.btn) {
    border-bottom: 1px solid var(--accent);
  }
  .hero {
    padding-block: clamp(72px, 15vw, 160px) 0;
  }
  h1 {
    margin-bottom: 24px;
    font-size: clamp(36px, 7vw, 54px);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.05;
  }
  section:not(.hero) {
    padding-top: clamp(64px, 10vw, 104px);
    scroll-margin-top: 16px;
  }
  h2 {
    margin-bottom: 16px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  section > p {
    color: var(--ink-2);
  }
  section > p + p {
    margin-top: 14px;
  }
  .go {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 24px;
    margin-top: 28px !important;
    font-size: 15px;
  }
  .note {
    margin-top: 18px !important;
    font-size: 14px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    color: var(--ink-2);
  }
  li + li {
    margin-top: 6px;
  }
  li a {
    color: var(--ink);
  }
  .cmd {
    margin-top: 20px;
  }
</style>
