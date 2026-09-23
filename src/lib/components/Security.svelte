<script lang="ts">
  import { reveal } from '$lib/reveal'
  import { URL_GITHUB, PRICE_ENTERPRISE } from '$lib/const'
  import { reducedMotion, whenVisible } from '$lib/motion'
  import { flip } from 'svelte/animate'

  type Row = { id: number; t: string; c: string; k: string; a: string; r: string; d: string }
  const seed: [string, string, string, string, string, string][] = [
    ['10:12:03', 'fim', 'alice', 'coder', 'ok', '412ms'],
    ['10:12:04', 'chat', 'bo', 'chat', 'ok', '2.1s'],
    ['10:12:06', 'fim', 'alice', 'coder', 'ok', '388ms'],
    ['10:12:09', 'embed', 'chen', 'embed', 'ok', '61ms'],
    ['10:12:11', 'chat', 'dana', 'chat', 'timeout', '30.0s'],
    ['10:12:12', 'fim', 'eli', 'coder', 'ok', '402ms']
  ]
  let rows = $state<Row[]>(seed.map(([t, c, k, a, r, d], id) => ({ id, t, c, k, a, r, d })))

  // The log keeps writing while it is on screen. Rows are made up but plausible:
  // fim in the hundreds of ms, chat in seconds, an embed in tens of ms, a rare timeout.
  const kinds: [string, string[], string, [number, number], string][] = [
    ['fim', ['alice', 'eli', 'dana', 'chen'], 'coder', [340, 480], 'ms'],
    ['fim', ['alice', 'bo'], 'coder', [340, 480], 'ms'],
    ['chat', ['bo', 'dana', 'alice'], 'chat', [1.2, 3.6], 's'],
    ['embed', ['chen', 'eli'], 'embed', [40, 90], 'ms'],
    ['review', ['bo'], 'chat', [4.1, 8.8], 's']
  ]
  let clock = 10 * 3600 + 12 * 60 + 12
  let nextId = seed.length
  const pad = (n: number) => String(n).padStart(2, '0')
  const rnd = (lo: number, hi: number) => lo + Math.random() * (hi - lo)
  function push() {
    clock += 1 + Math.floor(Math.random() * 3)
    const t = `${pad(Math.floor(clock / 3600))}:${pad(Math.floor(clock / 60) % 60)}:${pad(clock % 60)}`
    const [c, who, a, [lo, hi], unit] = kinds[Math.floor(Math.random() * kinds.length)]
    const k = who[Math.floor(Math.random() * who.length)]
    const timeout = Math.random() < 1 / 16
    const took = rnd(lo, hi)
    const d = timeout ? '30.0s' : unit === 'ms' ? `${Math.round(took)}ms` : `${took.toFixed(1)}s`
    rows = [...rows.slice(1), { id: nextId++, t, c, k, a, r: timeout ? 'timeout' : 'ok', d }]
  }
  function live(node: HTMLElement) {
    if (reducedMotion()) return
    let timer: ReturnType<typeof setInterval> | undefined
    const stop = whenVisible(node, () => {
      timer = setInterval(push, 1900)
    })
    return {
      destroy() {
        stop()
        clearInterval(timer)
      }
    }
  }

  const faq = [
    [
      'Does anything leave our network?',
      'No. The extension talks to the server you configure and the gateway talks to its backends. No update check, no crash reporter, no usage ping, no licence check. It runs air-gapped: Node 18 and your inference server are the whole dependency list.'
    ],
    [
      'Is pooling teammates’ computers safe?',
      'The sharer connects out to the gateway with their own key; nothing dials in. Prompts stream through the machine and are not stored there. Developers are told which models may run on a teammate’s computer, and admins can disconnect any of them.'
    ],
    [
      'What is recorded?',
      'By default, metadata: time, capability, key, alias, outcome, duration. Content is a separate switch per route, off unless an admin turns it on, kept on your gateway, disclosed to developers and deleted after 90 days.'
    ],
    [
      'How are keys handled?',
      'One per developer, shown once, stored as a hash, revoked live. Requests name a model alias; they cannot carry a URL, credential or path.'
    ],
    [
      'Can we control what developers use?',
      'Yes. Policy restricts which provider kinds may be added and locks the team models, enforced inside each developer’s VS Code.'
    ],
    [
      'Can our security team read the code?',
      'All of it. The extension and the gateway are one MIT repository. The private piece is the licence issuer, and it only signs seat counts.'
    ]
  ]

  const compare = [
    ['Where prompts go', 'A vendor’s cloud', 'Your own servers'],
    ['Whose GPUs', 'The vendor’s', 'Yours, or pooled from the team'],
    ['Who picks the model', 'The vendor', 'You'],
    ['Telemetry', 'On by default', 'None. There is no endpoint.'],
    ['Air-gapped', 'No', 'Yes'],
    ['Per seat, per month', 'Typically $19–39', `$0 to $${PRICE_ENTERPRISE}`]
  ]
</script>

<section class="section" id="security">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">security</span>
        <h2>Built for code that cannot leave the building.</h2>
      </div>
      <p>
        Banks, exchanges, defence, healthcare, anyone shipping under NDA. The answers your security
        review will ask for, in one place.
      </p>
    </div>

    <div class="split">
      <div class="log panel" use:reveal={0} use:live>
        <div class="bar">
          <span class="t">the whole request log</span><span class="dim"
            >~/.twinny/server/usage/</span
          >
        </div>
        <div class="head" aria-hidden="true">
          <span>time</span><span>cap</span><span>key</span><span>alias</span><span>result</span
          ><span class="r">took</span>
        </div>
        {#each rows as row, i (row.id)}
          <div
            class="row"
            style="--d: {row.id < seed.length ? i * 70 : 0}ms"
            animate:flip={{ duration: 260 }}
            aria-hidden="true"
          >
            <span class="dim num">{row.t}</span>
            <span class="cap">{row.c}</span>
            <span>{row.k}</span>
            <span class="muted">{row.a}</span>
            <span class={row.r === 'ok' ? 'ok' : 'bad'}>{row.r}</span>
            <span class="r num muted">{row.d}</span>
          </div>
        {/each}
        <div class="note">
          Every field, by default. Content recording is a separate switch, and it is off.
        </div>
      </div>

      <div class="compare panel" use:reveal={100}>
        <div class="bar"><span class="t">hosted assistant vs twinny</span></div>
        <table>
          <thead>
            <tr><td></td><th scope="col">hosted</th><th scope="col" class="us">twinny</th></tr>
          </thead>
          <tbody>
            {#each compare as [k, a, b], i}
              <tr style="--i: {i}"><th scope="row">{k}</th><td>{a}</td><td class="us">{b}</td></tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <dl class="faq">
      {#each faq as [q, a], i}
        <div use:reveal={i * 50}>
          <dt>{q}</dt>
          <dd>{a}</dd>
        </div>
      {/each}
    </dl>

    <p class="src muted">
      Every claim above is checkable in the <a
        href={URL_GITHUB}
        target="_blank"
        rel="noopener noreferrer">source</a
      >.
    </p>
  </div>
</section>

<style>
  .split {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: 20px;
    font-family: var(--mono);
  }
  .bar {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 9px 14px;
    border-bottom: 1px solid var(--line);
    font-size: var(--fs-xs);
    color: var(--ink-2);
    background: var(--bg);
  }
  .bar .t {
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .log {
    font-size: 12px;
    overflow: hidden;
  }
  .head,
  .row {
    display: grid;
    grid-template-columns: 80px 60px 70px 70px 1fr 64px;
    gap: 12px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--line);
    white-space: nowrap;
  }
  .head {
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .row {
    opacity: 0;
  }
  :global(.log.in) .row {
    animation: in 0.5s ease both;
    animation-delay: var(--d);
  }
  .row:last-child {
    box-shadow: inset 2px 0 0 var(--accent-line);
  }
  .row:hover {
    background: var(--panel-2);
  }
  .r {
    text-align: right;
  }
  .cap {
    color: var(--s1);
  }
  .ok {
    color: var(--accent);
  }
  .bad {
    color: var(--warn);
  }
  .note {
    padding: 10px 14px;
    font-size: var(--fs-xs);
    color: var(--ink-3);
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

  .compare table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  .compare th,
  .compare td {
    text-align: left;
    padding: 9px 14px;
    border-bottom: 1px solid var(--line);
    vertical-align: top;
  }
  .compare thead th {
    color: var(--ink-2);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .compare tbody th {
    color: var(--ink-2);
    font-weight: 400;
    width: 38%;
  }
  .compare td {
    color: var(--ink-3);
  }
  .compare .us {
    color: var(--ink);
  }
  .compare thead .us {
    color: var(--accent);
  }
  .compare tr:last-child th,
  .compare tr:last-child td {
    border-bottom: 0;
  }
  .compare tbody tr {
    opacity: 0;
  }
  :global(.compare.in) tbody tr {
    animation: in 0.5s ease both;
    animation-delay: calc(var(--i) * 70ms + 150ms);
  }

  .faq {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px 40px;
    margin: 56px 0 0;
  }
  .faq div {
    padding-top: 14px;
    border-top: 1px solid var(--line-2);
  }
  dt {
    font-family: var(--display);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.015em;
  }
  dd {
    margin: 6px 0 0;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
  .src {
    margin-top: 36px;
    font-size: var(--fs-sm);
  }
  @media (max-width: 960px) {
    .split {
      grid-template-columns: minmax(0, 1fr);
    }
    .faq {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .head,
    .row {
      grid-template-columns: 64px 50px 56px 1fr 60px;
      gap: 8px;
      padding-inline: 12px;
      font-size: 11px;
    }
    .r {
      display: none;
    }
    .faq {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
