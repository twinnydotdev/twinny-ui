<script lang="ts">
  import { reveal } from '$lib/reveal'
  import Copy from './Copy.svelte'
  import { URL_DOCS_TEAMS, URL_GITHUB_SERVER } from '$lib/const'

  const points = [
    [
      'a key per developer',
      'Created and revoked on the admin page or the command line, effective in a second, stored as hashes. A leaving developer frees their seat at once.'
    ],
    [
      'usage per person and per model',
      'Requests, failures and token counts by key and model. Never prompts, never completions, never headers.'
    ],
    [
      'one connection for the team',
      'A developer enters the address and requests a key. They read you a short code, you approve it, the key arrives in VS Code by itself.'
    ],
    [
      'team defaults and policy',
      'Set the chat, autocomplete and embeddings models once. Optionally restrict which provider kinds developers may add, enforced in their VS Code.'
    ],
    [
      'any backend, live',
      'Ollama, llama.cpp, LM Studio, QVAC or an OpenAI-compatible server. Change a model on the admin page and the next request uses it.'
    ],
    [
      'one process, no dependencies',
      'Node 18 or newer. One JSON config file. Docker image and compose file included. Nothing phones home, including to twinny.'
    ]
  ]

  // Usage by developer for the last seven days, as the admin page draws it.
  const devs = [
    { name: 'alice', v: [62, 28, 10], total: 1284 },
    { name: 'bo', v: [40, 45, 15], total: 968 },
    { name: 'chen', v: [72, 20, 8], total: 812 },
    { name: 'dana', v: [30, 60, 10], total: 640 },
    { name: 'eli', v: [55, 35, 10], total: 296 }
  ]
  const models = ['coder', 'chat-14b', 'embed']
  const colors = ['var(--s1)', 'var(--s6)', 'var(--s3)']
</script>

<section class="section teams" id="teams">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">teams · twinny-server</span>
        <h2>One gateway on your GPU box. The whole team behind it.</h2>
      </div>
      <p>
        twinny-server runs on the machine with the models and serves chat, autocomplete and
        embeddings to every developer. Keys, usage, an admin page and a licence, in one process.
      </p>
    </div>

    <div
      class="flow"
      use:reveal={0}
      aria-label="developer laptops connect over HTTPS to twinny-server, which talks to your model backends"
    >
      <div class="node">
        <span class="label bare">developer laptops</span>
        <strong>VS Code + twinny</strong>
        <span class="muted">personal key</span>
      </div>
      <div class="pipe"><span>HTTPS</span></div>
      <div class="node hot">
        <span class="label bare">your GPU machine</span>
        <strong>twinny-server</strong>
        <span class="muted">keys · usage · admin · policy · licence</span>
      </div>
      <div class="pipe"><span>localhost</span></div>
      <div class="node">
        <span class="label bare">backends</span>
        <strong>Ollama · llama.cpp · LM Studio</strong>
        <span class="muted">QVAC · OpenAI-compatible</span>
      </div>
    </div>

    <div class="two">
      <div class="term panel" use:reveal={80}>
        <div class="bar">
          <span class="t">quick start</span>
          <span class="spacer"></span>
          <span class="dim">bash</span>
        </div>
        <pre><span class="c"># on the machine with the models</span>
<span class="d">$</span> npx twinny-server init
<span class="d">$</span> npx twinny-server keys create alice
<span class="o">key for alice (shown once): twk_5f3a…9c</span>
<span class="d">$</span> npx twinny-server serve --config twinny.gateway.json
<span class="o">listening on 127.0.0.1:8765 · 3 aliases · 1 key active</span>
<span class="o">ollama <span class="ok">ok</span> · llama.cpp <span class="ok">ok</span></span>
<span class="o">admin page: http://127.0.0.1:8765/admin</span>

<span class="c"># in VS Code: Providers → Connect to team</span></pre>
        <div class="bar bottom">
          <Copy text="npx twinny-server init" />
          <a href={URL_GITHUB_SERVER} target="_blank" rel="noopener noreferrer">package source</a>
        </div>
      </div>

      <div class="admin panel" use:reveal={160} aria-label="admin page, illustration">
        <div class="bar">
          <span class="t">twinny<span class="accent">-server</span> · admin</span>
          <span class="spacer"></span>
          <span class="pill"><i></i>2 backends ok</span>
        </div>
        <div class="tiles">
          <div class="tile">
            <span class="l">requests · 7d</span><span class="v num">4,000</span>
          </div>
          <div class="tile">
            <span class="l">developers</span><span class="v num">5 <small>/ 5 seats</small></span>
          </div>
          <div class="tile"><span class="l">failures</span><span class="v num">3</span></div>
          <div class="tile">
            <span class="l">p50 latency</span><span class="v num">412<small>ms</small></span>
          </div>
        </div>
        <div class="chart">
          <span class="l">usage by developer</span>
          <ul>
            {#each devs as d}
              <li>
                <span class="name">{d.name}</span>
                <span class="bar-row" style="--w: {(d.total / devs[0].total) * 100}%">
                  {#each d.v as pct, i}
                    <i style="flex: {pct}; background: {colors[i]}" title={models[i]}></i>
                  {/each}
                </span>
                <span class="num tot">{d.total.toLocaleString('en')}</span>
              </li>
            {/each}
          </ul>
          <div class="legend">
            {#each models as m, i}<span><i style="background: {colors[i]}"></i>{m}</span>{/each}
          </div>
        </div>
      </div>
    </div>

    <ul class="points">
      {#each points as [t, d], i}
        <li use:reveal={i * 50}>
          <h3>{t}</h3>
          <p>{d}</p>
        </li>
      {/each}
    </ul>

    <div class="foot-cta">
      <a class="btn" href={URL_DOCS_TEAMS} target="_blank" rel="noopener noreferrer"
        >teams documentation</a
      >
      <span class="muted"
        >Free for up to five developers. Nothing is gated behind the licence except seats and
        policy.</span
      >
    </div>
  </div>
</section>

<style>
  .teams {
    background: var(--bg-2);
  }
  .flow {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 112px minmax(0, 1.2fr) 112px minmax(0, 1fr);
    align-items: stretch;
    margin-bottom: 20px;
  }
  .node {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 18px 20px;
    border: 1px solid var(--line-2);
    background: var(--bg);
    font-size: var(--fs-sm);
  }
  .node strong {
    font-family: var(--display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin-top: 6px;
  }
  .node.hot {
    border-color: var(--accent-line);
    background: var(--panel);
    box-shadow: inset 0 0 0 1px var(--accent-soft);
  }
  .pipe {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pipe::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: repeating-linear-gradient(90deg, var(--accent) 0 6px, transparent 6px 12px);
    animation: dash 1.2s linear infinite;
  }
  .pipe span {
    position: relative;
    padding: 2px 6px;
    background: var(--bg-2);
    color: var(--ink-3);
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  @keyframes dash {
    to {
      background-position: 12px 0;
    }
  }

  .two {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  .bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 14px;
    border-bottom: 1px solid var(--line);
    font-size: var(--fs-xs);
    color: var(--ink-2);
  }
  .bar .t {
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .bar.bottom a {
    white-space: nowrap;
  }
  .bar.bottom {
    border-bottom: 0;
    border-top: 1px solid var(--line);
    justify-content: space-between;
    padding: 12px 14px;
  }
  .bar.bottom :global(.copy) {
    height: 36px;
  }
  .spacer {
    flex: 1;
  }
  .term,
  .admin {
    min-width: 0;
  }
  .term {
    display: flex;
    flex-direction: column;
  }
  .term pre {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 16px 16px 18px;
    font-size: 12px;
    line-height: 1.75;
    overflow-x: auto;
    color: var(--ink);
  }
  .c {
    color: var(--ink-3);
  }
  .d {
    color: var(--accent);
    margin-right: 6px;
  }
  .o {
    color: var(--ink-2);
  }
  .ok {
    color: var(--accent);
  }

  .admin {
    display: flex;
    flex-direction: column;
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border-bottom: 1px solid var(--line);
  }
  .tile {
    display: flex;
    flex-direction: column;
    padding: 12px 14px;
    background: var(--panel);
  }
  .l {
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .v {
    margin-top: 2px;
    font-family: var(--display);
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .v small {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--ink-2);
    margin-left: 4px;
  }
  .chart {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .chart ul {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .chart li {
    display: grid;
    grid-template-columns: 48px 1fr 52px;
    align-items: center;
    gap: 10px;
    font-size: 11px;
  }
  .name {
    color: var(--ink-2);
  }
  .bar-row {
    display: flex;
    gap: 2px;
    width: var(--w);
    height: 12px;
    transform-origin: left;
    animation: grow 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
  .bar-row i {
    display: block;
    height: 100%;
    opacity: 0.9;
  }
  .tot {
    color: var(--ink-2);
    text-align: right;
  }
  .legend {
    display: flex;
    gap: 14px;
    color: var(--ink-3);
    font-size: 10.5px;
  }
  .legend i {
    display: inline-block;
    width: 9px;
    height: 9px;
    margin-right: 6px;
    vertical-align: -1px;
  }
  @keyframes grow {
    from {
      transform: scaleX(0);
    }
  }

  .points {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px 40px;
    margin: 64px 0 0;
    padding: 0;
    list-style: none;
  }
  .points li {
    padding-top: 16px;
    border-top: 1px solid var(--line-2);
  }
  .points h3 {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .points p {
    margin-top: 8px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.65;
  }
  .foot-cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 24px;
    margin-top: 48px;
    font-size: var(--fs-sm);
  }

  @media (max-width: 960px) {
    .two {
      grid-template-columns: minmax(0, 1fr);
    }
    .points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 760px) {
    .flow {
      grid-template-columns: minmax(0, 1fr);
    }
    .pipe {
      height: 48px;
    }
    .pipe::before {
      left: 50%;
      right: auto;
      top: 0;
      bottom: 0;
      width: 1px;
      height: auto;
      background: repeating-linear-gradient(180deg, var(--accent) 0 6px, transparent 6px 12px);
    }
    .tiles {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 560px) {
    .points {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
