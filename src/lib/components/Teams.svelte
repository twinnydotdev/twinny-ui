<script lang="ts">
  import { reveal } from '$lib/reveal'
  import Copy from './Copy.svelte'
  import { URL_DOCS_TEAMS, URL_GITHUB_SERVER } from '$lib/const'
  import { countup } from '$lib/motion'

  const points = [
    [
      'A key per developer',
      'Requested from VS Code, approved with a short code, stored as a hash, revoked live. Offboarding is one click.'
    ],
    [
      'Usage per person',
      'Requests, failures and tokens by developer, model and the machine that served them. Never the content.'
    ],
    [
      'Team defaults and policy',
      'Set the models once. Restrict which providers developers may add.'
    ],
    ['Any backend, live', 'Swap the model on the admin page. The next request uses it.'],
    [
      'Pooled computers, under your control',
      'Only a named key can share. Sharers see one line of consent, admins see who serves what and can disconnect a machine.'
    ],
    [
      'Recording, if you want it',
      'Keep prompts and replies on your gateway for audit, review and training data. Off by default, disclosed to every developer.'
    ]
  ]

  const peers = [
    ['alice@desktop', 'coder · embed', '1 / 2', 312],
    ['bo@mbp', 'coder', '0 / 2', 188],
    ['chen@lab-1', 'coder · chat', '2 / 2', 540]
  ]

  const devs = [
    { name: 'alice', v: [62, 28, 10], total: 1284 },
    { name: 'bo', v: [40, 45, 15], total: 968 },
    { name: 'chen', v: [72, 20, 8], total: 812 },
    { name: 'dana', v: [30, 60, 10], total: 640 },
    { name: 'eli', v: [55, 35, 10], total: 296 }
  ]
  const models = ['coder', 'chat', 'embed']
  const colors = ['var(--s1)', 'var(--s6)', 'var(--s3)']
</script>

<section class="section teams" id="teams">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">teams · twinny-server</span>
        <h2>One gateway in your data centre. The whole team behind it.</h2>
      </div>
      <p>
        twinny-server sits between developers and your inference servers, or the team's own
        computers. Keys, usage, policy and an admin page, in one process you run.
      </p>
    </div>

    <div
      class="flow"
      use:reveal={0}
      aria-label="developer laptops connect over HTTPS to twinny-server, which talks to your inference servers"
    >
      <div class="node">
        <span class="label bare">developer laptops</span>
        <strong>VS Code + twinny</strong>
        <span class="muted">personal key</span>
      </div>
      <div class="pipe"><span>HTTPS</span></div>
      <div class="node hot">
        <span class="label bare">your network</span>
        <strong>twinny-server</strong>
        <span class="muted">keys · usage · policy · admin</span>
      </div>
      <div class="pipe"><span>private</span></div>
      <div class="node">
        <span class="label bare">your inference servers</span>
        <strong>Any OpenAI-compatible backend</strong>
        <span class="muted">on-prem GPUs, a private cloud, or teammates' computers</span>
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
<span class="d">$</span> npx twinny-server quickstart
<span class="o">wrote twinny.gateway.json</span>
<span class="o">admin key (shown once): twk_5f3a…9c</span>
<span class="o">listening on 127.0.0.1:8765 · 3 aliases · 1 key</span>
<span class="o"
            >backend gpu-1 <span class="ok">ok</span> · gpu-2 <span class="ok">ok</span
            > · team <span class="ok">3 sharing</span></span
          >
<span class="o">admin: http://127.0.0.1:8765/admin</span>

<span class="c"># or the container: ghcr.io/twinnydotdev/twinny-server</span>
<span class="c"># in VS Code: Providers → Connect to team</span></pre>
        <div class="bar bottom">
          <Copy text="npx twinny-server quickstart" />
          <a href={URL_GITHUB_SERVER} target="_blank" rel="noopener noreferrer">package source</a>
        </div>
      </div>

      <div class="admin panel" use:reveal={160} aria-label="admin page, illustration">
        <div class="bar">
          <span class="t">twinny<span class="accent">-server</span> · admin</span>
          <span class="spacer"></span>
          <span class="pill"><i></i>2 backends ok · 3 sharing</span>
        </div>
        <div class="tiles">
          <div class="tile">
            <span class="l">requests · 7d</span><span class="v num" use:countup={{ to: 4000 }}
              >4,000</span
            >
          </div>
          <div class="tile">
            <span class="l">developers</span><span class="v num">5 <small>/ 5 seats</small></span>
          </div>
          <div class="tile"><span class="l">failures</span><span class="v num">3</span></div>
          <div class="tile">
            <span class="l">p50 latency</span><span class="v num"
              ><span use:countup={{ to: 412, ms: 900 }}>412</span><small>ms</small></span
            >
          </div>
        </div>
        <div class="chart">
          <span class="l">usage by developer</span>
          <ul>
            {#each devs as d, i}
              <li style="--i: {i}">
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

    <div class="pool" id="pool">
      <div class="pool-text" use:reveal={0}>
        <span class="label">team pool</span>
        <h3>No GPU server yet? Pool the computers the team already has.</h3>
        <p>
          A developer flips <em>Share this computer</em> in VS Code. Their extension connects out to the
          gateway and serves the models on their local server to the rest of the team, least loaded first.
          No port to open, no firewall rule, no extra seat.
        </p>
        <ul>
          <li>Prompts stream through the sharer's machine and are not stored there.</li>
          <li>Every developer is told which models may run on a teammate's computer.</li>
          <li>A sharer going offline fails over to the next machine with the model.</li>
        </ul>
      </div>

      <div class="pool-mocks">
        <div class="share panel" use:reveal={80} aria-label="share card in VS Code, illustration">
          <div class="bar">
            <span class="t">twinny · providers</span>
            <span class="spacer"></span>
            <span class="dim">VS Code</span>
          </div>
          <div class="share-body">
            <div class="share-head">
              <span class="switch" aria-hidden="true"><i></i></span>
              <strong>Share this computer with the team</strong>
            </div>
            <div class="kv"><span class="l">local server</span><span>localhost:11434</span></div>
            <div class="kv"><span class="l">at once</span><span>2 requests</span></div>
            <p class="status">
              <i class="dot"></i>Online · sharing coder, embed · <span class="num">14</span> served
            </p>
          </div>
        </div>

        <div
          class="peers panel"
          use:reveal={160}
          aria-label="admin page, sharing now, illustration"
        >
          <div class="bar">
            <span class="t">admin · sharing now</span>
            <span class="spacer"></span>
            <span class="pill"><i></i>3 computers</span>
          </div>
          <div class="phead">
            <span>who</span><span>models</span><span class="r">busy</span><span class="r"
              >served</span
            >
          </div>
          {#each peers as [who, m, busy, served], i}
            <div class="prow" style="--d: {i * 80}ms">
              <span>{who}</span>
              <span class="muted">{m}</span>
              <span class="r num">{busy}</span>
              <span class="r num muted">{served}</span>
            </div>
          {/each}
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
        >Free for five developers, pooling included. The licence only changes the seat count and
        switches on policy and recording.</span
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
    font-family: var(--mono);
    font-size: var(--fs-xs);
  }
  .node strong {
    font-family: var(--display);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-top: 6px;
  }
  .node.hot {
    position: relative;
    border-color: var(--accent-line);
    background: var(--panel);
    box-shadow: inset 0 0 0 1px var(--accent-soft);
  }
  .node.hot::after {
    content: '';
    position: absolute;
    top: 14px;
    right: 14px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
    animation: pulse 2.2s ease-out infinite;
  }
  @keyframes pulse {
    60%,
    100% {
      box-shadow: 0 0 0 9px transparent;
    }
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
  /* A packet crosses each pipe in turn. */
  .pipe::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 6px;
    margin-top: -3px;
    background: var(--accent);
    animation: packet 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .flow > .pipe:nth-child(4)::after {
    animation-delay: 1.3s;
  }
  @keyframes packet {
    0% {
      transform: translateX(0);
      opacity: 0;
    }
    12% {
      opacity: 1;
    }
    88% {
      opacity: 1;
    }
    100% {
      transform: translateX(106px);
      opacity: 0;
    }
  }
  .pipe span {
    position: relative;
    padding: 2px 6px;
    background: var(--bg-2);
    color: var(--ink-3);
    font-family: var(--mono);
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
    font-family: var(--mono);
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
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.03em;
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
    transform: scaleX(0);
  }
  :global(.admin.in) .bar-row {
    animation: grow 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
    animation-delay: calc(var(--i) * 70ms);
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
    to {
      transform: scaleX(1);
    }
  }

  .pool {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 40px;
    align-items: start;
    margin-top: 64px;
    padding-top: 40px;
    border-top: 1px solid var(--line-2);
  }
  .pool-text h3 {
    margin-top: 14px;
    font-size: clamp(22px, 2.6vw, 30px);
    letter-spacing: -0.03em;
    line-height: 1.15;
  }
  .pool-text p {
    margin-top: 14px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.65;
  }
  .pool-text em {
    font-style: normal;
    color: var(--ink);
    font-family: var(--mono);
    font-size: 12px;
  }
  .pool-text ul {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.5;
  }
  .pool-text li::before {
    content: '+';
    margin-right: 10px;
    color: var(--accent);
    font-family: var(--mono);
  }
  .pool-mocks {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: var(--mono);
    min-width: 0;
  }
  .share-body {
    padding: 16px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
  }
  .share-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }
  .share-head strong {
    font-family: var(--display);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.015em;
  }
  .switch {
    position: relative;
    flex: none;
    width: 34px;
    height: 18px;
    border: 1px solid var(--accent-line);
    background: var(--accent-soft);
    border-radius: 999px;
  }
  .switch i {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--ink-3);
  }
  :global(.share.in) .switch i {
    animation: flip 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s forwards;
  }
  @keyframes flip {
    to {
      transform: translateX(16px);
      background: var(--accent);
    }
  }
  .kv {
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 12px;
    color: var(--ink);
  }
  .kv .l {
    align-self: center;
  }
  .status {
    margin-top: 4px;
    padding-top: 10px;
    border-top: 1px solid var(--line);
    color: var(--ink-2);
    font-size: 11.5px;
  }
  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
    vertical-align: 1px;
  }
  .peers {
    font-size: 12px;
    overflow: hidden;
  }
  .phead,
  .prow {
    display: grid;
    grid-template-columns: 120px 1fr 56px 64px;
    gap: 12px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--line);
    white-space: nowrap;
  }
  .phead {
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .prow {
    opacity: 0;
  }
  :global(.peers.in) .prow {
    animation: in 0.5s ease both;
    animation-delay: var(--d);
  }
  .prow:last-child {
    border-bottom: 0;
  }
  .prow:hover {
    background: var(--panel-2);
  }
  .r {
    text-align: right;
  }
  @keyframes in {
    from {
      opacity: 0;
      transform: translateX(-6px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .points {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px 40px;
    margin: 56px 0 0;
    padding: 0;
    list-style: none;
  }
  .points li {
    padding-top: 14px;
    border-top: 1px solid var(--line-2);
  }
  .points h3 {
    font-size: 16px;
    letter-spacing: -0.015em;
  }
  .points p {
    margin-top: 6px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
  .foot-cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 24px;
    margin-top: 44px;
    font-size: var(--fs-sm);
  }

  @media (max-width: 960px) {
    .two,
    .pool {
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
    .pipe::after {
      left: 50%;
      top: 0;
      margin: 0 0 0 -3px;
      animation-name: packet-v;
    }
    @keyframes packet-v {
      0% {
        transform: translateY(0);
        opacity: 0;
      }
      12% {
        opacity: 1;
      }
      88% {
        opacity: 1;
      }
      100% {
        transform: translateY(42px);
        opacity: 0;
      }
    }
    .tiles {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .phead,
    .prow {
      grid-template-columns: 104px 1fr 48px 56px;
      gap: 8px;
      padding-inline: 12px;
      font-size: 11px;
    }
  }
  @media (max-width: 560px) {
    .points {
      grid-template-columns: minmax(0, 1fr);
    }
    .admin .bar .pill {
      display: none;
    }
  }
</style>
