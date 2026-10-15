<script lang="ts">
  import { URL_GITHUB, URL_DOCS } from '$lib/const'
  import { jsonLd, breadcrumbs } from '$lib/seo'

  // Every connection the extension and the gateway can make, from the docs (privacy, devices,
  // plugins, secret shield, policy). Keep in step with ../twinny-docs when a plugin is added.
  // [from, to, when, what goes]
  const links: [string, string, string, string][] = [
    [
      'VS Code',
      'Your model server or gateway',
      'Always',
      'Prompts and the code context you attach. This is the only connection twinny needs.'
    ],
    [
      'Gateway',
      'Model servers',
      'Always',
      'The same requests, to the backends you configured, on your network.'
    ],
    [
      'Teammate’s computer',
      'Gateway',
      'If someone shares',
      'It connects out to the gateway with its own key; nothing dials in. Prompts stream through it and are not kept there.'
    ],
    [
      'VS Code',
      'A hosted API',
      'Only if a developer adds one',
      'Prompts, with secrets replaced by placeholders first. Team policy can forbid any provider but the gateway.'
    ],
    [
      'VS Code',
      'A paired device',
      'Only if you pair one',
      'Direct and encrypted between your two machines. The DHT that finds them learns a key and an address, never traffic.'
    ],
    [
      'Gateway',
      'Your git host',
      'Git or shared-context plugin on',
      'Reads pull requests and issues, clones the repositories you name for shared context, posts reviews if you allow it.'
    ],
    [
      'Gateway',
      'Your chat webhooks',
      'Notification plugin on',
      'Event lines: a review finished, a backend went down, a sign-in.'
    ],
    ['Gateway', 'Your identity provider', 'SSO plugin on', 'An OpenID Connect sign-in.'],
    [
      'Gateway',
      'Your backup bucket',
      'Backup plugin on',
      'A nightly archive, encrypted before it leaves the machine if you set a passphrase.'
    ],
    [
      'Extension or gateway',
      'twinny, rjmacarthy.xyz',
      'Never',
      'No telemetry, no update check, no crash reports, no licence check. There is no endpoint.'
    ]
  ]

  const kept: [string, string][] = [
    [
      'Usage',
      'Time, capability, key, model alias, outcome and duration per request. On the gateway’s disk, 30 days.'
    ],
    [
      'Content',
      'Not kept. An admin with a licence can switch recording on per feature; developers are told before they connect, and records are deleted after 90 days by default.'
    ],
    [
      'Keys',
      'One per developer, shown once, stored as a hash, revoked live. Requests name a model alias and cannot carry a URL, credential or path.'
    ],
    [
      'Audit log',
      'Every admin change, hash-chained so an edited or removed line shows. Filter and export it.'
    ],
    [
      'Chat history',
      'On the developer’s own machine, in VS Code’s storage and ~/.twinny. Theirs to delete.'
    ]
  ]

  const controls: [string, string][] = [
    [
      'Policy',
      'Team-only providers, locked models, routing rules that keep a workspace on local backends, a team system prompt. Shown to each developer before they connect.'
    ],
    [
      'Agent rules',
      'Turn agent mode off, make every command ask or take commands away, make every change wait for review, keep the agent out of paths, switch MCP servers off.'
    ],
    [
      'Secret shield',
      'Tokens, keys and passwords in a prompt are replaced with placeholders before it leaves the machine, and put back in the reply.'
    ],
    [
      'Read-only admins',
      'An admin key that can see usage, people and the audit log and change nothing. For the auditor.'
    ],
    ['SSO', 'Sign-in through your identity provider, restricted to your email domains.'],
    ['Metrics', 'Prometheus at /metrics, for the dashboards you already have.']
  ]

  const title = 'Security: what twinny sends, keeps and lets you control'
  const description =
    'Every connection twinny and its gateway can make, what is stored and where, and the controls a security review asks for. Nothing goes to twinny. Open source, MIT.'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(
    breadcrumbs([
      ['twinny', '/'],
      ['security', '/security']
    ])
  )}
</svelte:head>

<section class="section top">
  <div class="wrap">
    <span class="label">security</span>
    <h1>Nothing leaves your network unless you send it.</h1>
    <p class="lede">
      For the security review: every connection twinny can make, what it keeps and where, and what
      an admin controls. All of it is checkable in the <a
        href={URL_GITHUB}
        target="_blank"
        rel="noopener noreferrer">source</a
      >.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">data flow</span>
        <h2>One path, inside your walls.</h2>
      </div>
      <p>The extension talks to one server. The gateway talks to your models.</p>
    </div>

    <div
      class="flow"
      role="img"
      aria-label="VS Code to gateway to model servers, all inside your network; nothing to twinny"
    >
      <div class="net">
        <span class="tag">your network</span>
        <div class="path">
          <div class="box">VS Code<small>a key per developer</small></div>
          <span class="arrow" aria-hidden="true">→</span>
          <div class="box us">twinny-server<small>keys · policy · audit</small></div>
          <span class="arrow" aria-hidden="true">→</span>
          <div class="box">model servers<small>yours, or a teammate’s GPU</small></div>
        </div>
      </div>
      <div class="outside">
        <div class="line never"><span>→ twinny, rjmacarthy.xyz</span><b>never</b></div>
        <div class="line opt">
          <span>→ hosted API, git host, webhooks, identity provider, backup bucket</span><b
            >only what you switch on</b
          >
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <span class="label">every connection</span>
    <div class="table" role="table">
      <div class="tr th" role="row">
        <span role="columnheader">from</span><span role="columnheader">to</span><span
          role="columnheader">when</span
        ><span role="columnheader">what goes</span>
      </div>
      {#each links as [from, to, when, what]}
        <div class="tr" class:no={when === 'Never'} role="row">
          <span role="cell">{from}</span><span role="cell">{to}</span><span role="cell" class="when"
            >{when}</span
          ><span role="cell" class="what">{what}</span>
        </div>
      {/each}
    </div>
    <p class="fine">
      VS Code updates extensions from the Marketplace on its own; install twinny as a VSIX to bring
      updates in by hand. twinny itself never checks.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap two">
    <div>
      <span class="label">what is kept</span>
      <dl>
        {#each kept as [k, v]}
          <dt>{k}</dt>
          <dd>{v}</dd>
        {/each}
      </dl>
    </div>
    <div>
      <span class="label">what an admin controls</span>
      <dl>
        {#each controls as [k, v]}
          <dt>{k}</dt>
          <dd>{v}</dd>
        {/each}
      </dl>
      <p class="fine">Policy, agent rules, recording and plugins need a licence.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <span class="label">for the reviewer</span>
    <dl class="review">
      <dt>The code</dt>
      <dd>
        The extension and the gateway are one MIT repository. The only private piece is the licence
        issuer, and it only signs seat counts.
      </dd>
      <dt>The licence check</dt>
      <dd>
        A token with the organisation, seats, dates and features, signed with Ed25519 and verified
        by the gateway against a public key it ships with. Offline, once.
      </dd>
      <dt>A DPA</dt>
      <dd>
        There is no data to process: twinny receives nothing from your developers or your gateway.
        The vendor record is the licence: organisation name, seats, expiry and the email it was sent
        to. See <a href="/privacy">privacy</a>.
      </dd>
      <dt>Air-gapped</dt>
      <dd>
        Every part runs with no internet: bring the VSIX and twinny-server in by hand. See <a
          href="/for/air-gapped">air-gapped</a
        >.
      </dd>
      <dt>More detail</dt>
      <dd>
        <a href="{URL_DOCS}teams/policy/" target="_blank" rel="noopener noreferrer">policy</a>,
        <a href="{URL_DOCS}teams/recording/" target="_blank" rel="noopener noreferrer">recording</a
        >,
        <a href="{URL_DOCS}teams/operations/" target="_blank" rel="noopener noreferrer">audit log</a
        >
        in the docs, or ask through the <a href="/#contact">contact form</a>.
      </dd>
    </dl>
  </div>
</section>

<style>
  .top {
    border-top: 0;
    padding-top: clamp(40px, 6vw, 80px);
  }
  h1 {
    margin-top: 18px;
    font-size: clamp(32px, 4.6vw, 56px);
    letter-spacing: -0.04em;
    line-height: 1.05;
    max-width: 20ch;
  }
  .lede {
    margin-top: 20px;
    max-width: 66ch;
    color: var(--ink-2);
    font-size: var(--fs-md);
    line-height: 1.6;
  }
  .flow {
    font-family: var(--mono);
    font-size: var(--fs-sm);
  }
  .net {
    position: relative;
    padding: 34px 20px 22px;
    border: 1px dashed var(--accent-line);
    border-radius: var(--r);
  }
  .tag {
    position: absolute;
    top: 10px;
    left: 14px;
    color: var(--accent);
    font-size: var(--fs-xs);
    letter-spacing: var(--track);
    text-transform: uppercase;
  }
  .path {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }
  .box {
    padding: 14px;
    border: 1px solid var(--line-2);
    border-radius: var(--r);
    background: var(--panel);
    color: var(--ink);
  }
  .box.us {
    border-color: var(--accent-line);
  }
  .box small {
    display: block;
    margin-top: 4px;
    color: var(--ink-3);
    font-size: var(--fs-xs);
  }
  .arrow {
    color: var(--accent);
  }
  .outside {
    display: grid;
    gap: 1px;
    margin-top: 14px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 6px 16px;
    padding: 12px 14px;
    background: var(--bg);
    color: var(--ink-2);
  }
  .line b {
    font-weight: 400;
    font-size: var(--fs-xs);
    letter-spacing: var(--track);
    text-transform: uppercase;
  }
  .never b {
    color: var(--bad);
  }
  .opt b {
    color: var(--ink-3);
  }
  .table {
    margin-top: 24px;
    border: 1px solid var(--line);
    font-size: var(--fs-sm);
  }
  .tr {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 2.6fr);
    gap: 16px;
    padding: 12px 16px;
    border-top: 1px solid var(--line);
  }
  .tr:first-child {
    border-top: 0;
  }
  .th {
    color: var(--ink-3);
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: var(--track);
    text-transform: uppercase;
  }
  .when {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    color: var(--accent);
  }
  .no .when {
    color: var(--bad);
  }
  .what {
    color: var(--ink-2);
    line-height: 1.55;
  }
  .two {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 48px;
  }
  dl {
    margin: 20px 0 0;
    max-width: 72ch;
  }
  dt {
    margin-top: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  dd {
    margin: 8px 0 0;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
  .fine {
    margin-top: 20px;
    color: var(--ink-3);
    font-size: var(--fs-sm);
  }
  @media (max-width: 800px) {
    .path {
      grid-template-columns: minmax(0, 1fr);
    }
    .arrow {
      justify-self: center;
      transform: rotate(90deg);
    }
    .th {
      display: none;
    }
    .tr {
      grid-template-columns: minmax(0, 1fr);
      gap: 4px;
    }
    .tr span:nth-child(2)::before {
      content: '→ ';
      color: var(--ink-3);
    }
    .two {
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
    }
  }
</style>
