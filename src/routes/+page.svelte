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
    PRICE_ENTERPRISE,
    FREE_SEATS,
    ENTERPRISE_MIN_SEATS,
    TRIAL_DAYS
  } from '$lib/const'
  import { jsonLd, softwareApplication, faqPage, HOME_FAQ } from '$lib/seo'

  // Every line is from the docs: getting-started/introduction and features/status-and-logs.
  const spec = [
    ['account', 'none'],
    ['telemetry', 'none'],
    ['relay', 'none'],
    ['requests go to', 'the server you set, and nowhere else'],
    ['source', 'MIT']
  ]

  const features = [
    [
      'autocomplete',
      'features/code-completion/',
      'Fill-in-the-middle ghost text as you type. Works well on a small model.'
    ],
    [
      'chat',
      'features/chat/',
      'Attach a file, a symbol, the problems panel, the git diff, the terminal or the index with @.'
    ],
    [
      'inline edit',
      'features/inline-edit/',
      'Ctrl+I, say what to change, accept or reject each hunk. Nothing is kept until you say so.'
    ],
    [
      'code review',
      'features/code-review/',
      'The working tree, a branch against its base, or a GitHub pull request.'
    ],
    [
      'agent mode',
      'features/agent-mode/',
      'Reads, searches, edits files and runs commands, each step shown. Commands ask first. Undo any file.'
    ],
    [
      'terminal',
      'features/terminal/',
      'Commands from a description, shown before they run. Failures traced to the file and line.'
    ],
    [
      'index',
      'features/workspace-index/',
      'A keyword and vector index of the workspace, reranked, updated on save.'
    ]
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
    <h1>Nothing leaves your machine<br />unless you point it somewhere.</h1>
    <p class="lede">
      twinny is an AI coding assistant for VS Code. It runs on models you host: a laptop, a box
      under a desk, or one gateway for the whole team.
    </p>
    <p class="go">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >install for VS Code</a
      >
      <a href={URL_OPENVSX} target="_blank" rel="noopener noreferrer">open vsx</a>
      <a href={URL_DEMO} target="_blank" rel="noopener noreferrer">live demo</a>
    </p>
    <dl class="spec">
      {#each spec as [k, v]}
        <div>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <section id="features">
    <h2>what it does</h2>
    <dl class="rows">
      {#each features as [name, doc, body]}
        <div>
          <dt><a href="{URL_DOCS}{doc}" target="_blank" rel="noopener noreferrer">{name}</a></dt>
          <dd>{body}</dd>
        </div>
      {/each}
    </dl>
    <p class="note">Every one is a plain VS Code command you can rebind.</p>
  </section>

  <section id="teams">
    <h2>for a team</h2>
    <p>
      One gateway in front of your models. Keys per developer, an admin page, usage per person, any
      provider configured live, and teammates' computers pooled as a backend.
    </p>
    <div class="cmd"><Copy text="npx twinny-server quickstart" /></div>
    <p class="note">
      <a href={URL_DOCS_TEAMS} target="_blank" rel="noopener noreferrer">how the gateway works</a>
    </p>
  </section>

  <section id="pricing">
    <h2>pricing</h2>
    <table>
      <tbody>
        <tr>
          <th scope="row">free</th>
          <td class="num">$0</td>
          <td>up to {FREE_SEATS} seats, forever. The whole extension and the gateway.</td>
          <td><a href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">install</a></td>
        </tr>
        <tr>
          <th scope="row">personal</th>
          <td class="num">${PRICE_PERSONAL}</td>
          <td>
            once, for good. One person, one key on all your machines: policy, plugins,
            recording, every future update.
          </td>
          <td><a href={URL_BUY_PERSONAL} target="_blank" rel="noopener noreferrer">buy</a></td>
        </tr>
        <tr>
          <th scope="row">team</th>
          <td class="num">${PRICE_TEAM}</td>
          <td>
            per seat a month, billed yearly, for seats beyond the free {FREE_SEATS}. Policy,
            plugins, recording, email support.
          </td>
          <td>
            <a href={URL_BUY_TEAM} target="_blank" rel="noopener noreferrer">buy</a>
            <a href="#trial">{TRIAL_DAYS}-day trial</a>
          </td>
        </tr>
        <tr>
          <th scope="row">enterprise</th>
          <td class="num">${PRICE_ENTERPRISE}</td>
          <td>
            per seat a month, from {ENTERPRISE_MIN_SEATS} seats. One licence for every gateway, a named
            contact, invoice or purchase order.
          </td>
          <td><a href="#contact">contact</a></td>
        </tr>
      </tbody>
    </table>
    <p class="note">
      The licence is a signed token, checked locally. The gateway never calls home.
      <a href={URL_DOCS_LICENSING} target="_blank" rel="noopener noreferrer">licensing</a>
    </p>
    <Trial />
  </section>

  <section id="contact">
    <h2>contact</h2>
    <Contact />
  </section>
</div>

<style>
  .doc {
    max-width: 760px;
    font-family: var(--mono);
    font-size: 14px;
    line-height: 1.75;
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
    padding-block: clamp(64px, 14vw, 168px) clamp(40px, 6vw, 72px);
  }
  h1 {
    font-family: var(--mono);
    font-size: clamp(22px, 3.3vw, 34px);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.3;
    text-wrap: initial;
  }
  .lede {
    margin-top: 28px;
    max-width: 60ch;
    color: var(--ink-2);
  }
  .go {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 28px;
    margin-top: 36px;
  }
  .go a:not(.btn) {
    color: var(--ink-2);
  }
  .spec {
    margin: 56px 0 0;
    max-width: 520px;
    color: var(--ink-2);
  }
  .spec div {
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  /* dot leaders */
  .spec dt {
    display: flex;
    flex: 1 1 auto;
    gap: 12px;
    white-space: nowrap;
    color: var(--ink-3);
  }
  .spec dt::after {
    content: '';
    flex: 1;
    min-width: 24px;
    border-bottom: 1px dotted var(--line-2);
    transform: translateY(-4px);
  }
  .spec dd {
    margin: 0;
    color: var(--ink);
    text-align: right;
  }
  section:not(.hero) {
    padding-top: clamp(48px, 7vw, 80px);
    scroll-margin-top: 16px;
  }
  h2 {
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
    font-family: var(--mono);
    font-size: var(--fs-sm);
    font-weight: 400;
    letter-spacing: 0;
    color: var(--ink-3);
  }
  h2::before {
    content: '# ';
  }
  section > p {
    max-width: 64ch;
    color: var(--ink-2);
  }
  .rows {
    margin: 0;
  }
  .rows div {
    display: grid;
    grid-template-columns: 14ch minmax(0, 1fr);
    gap: 4px 24px;
    padding-block: 10px;
  }
  .rows dt :global(a) {
    color: var(--ink);
  }
  .rows dd {
    margin: 0;
    color: var(--ink-2);
  }
  .note {
    margin-top: 20px;
    color: var(--ink-3) !important;
    font-size: var(--fs-sm);
  }
  .note :global(a) {
    color: var(--ink-2);
  }
  .cmd {
    margin-top: 24px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 12px 16px 12px 0;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--line);
  }
  th {
    font-weight: 500;
    color: var(--ink);
    white-space: nowrap;
  }
  td {
    color: var(--ink-2);
  }
  td.num {
    color: var(--ink);
  }
  td:last-child {
    padding-right: 0;
    text-align: right;
    white-space: nowrap;
  }
  td:last-child a + a {
    margin-left: 14px;
  }
  @media (max-width: 640px) {
    .rows div {
      grid-template-columns: minmax(0, 1fr);
    }
    tr {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2px 16px;
      padding-block: 12px;
      border-bottom: 1px solid var(--line);
    }
    th,
    td {
      padding: 0;
      border: 0;
    }
    td:nth-child(3),
    td:last-child {
      grid-column: 1 / -1;
      text-align: left;
    }
    .spec dd {
      white-space: normal;
    }
  }
</style>
