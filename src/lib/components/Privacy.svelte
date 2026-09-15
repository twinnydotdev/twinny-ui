<script lang="ts">
  import { reveal } from '$lib/reveal'
  const rows = [
    ['10:12:03', 'fim', 'alice', 'coder', 'ok', '412ms'],
    ['10:12:04', 'chat', 'bo', 'chat-14b', 'ok', '2.1s'],
    ['10:12:06', 'fim', 'alice', 'coder', 'ok', '388ms'],
    ['10:12:09', 'embed', 'chen', 'embed', 'ok', '61ms'],
    ['10:12:11', 'chat', 'dana', 'chat-14b', 'timeout', '30.0s'],
    ['10:12:12', 'fim', 'eli', 'coder', 'ok', '402ms']
  ]
  const facts = [
    [
      'no external requests',
      'The extension talks to the server you configured. The gateway talks to its backends. Neither talks to twinny; there is no update check, no crash reporter, no usage ping.'
    ],
    [
      'metadata only',
      'Logs and usage records hold the time, the capability, the key, the alias, the outcome and the duration. Never a prompt, a completion, a header or a backend body.'
    ],
    [
      'keys as hashes',
      'Access keys are shown once and stored hashed. Revoking one takes effect within a second and needs no restart.'
    ],
    [
      'no redirects',
      'The extension never follows a redirect, so a token only ever goes to the origin you typed.'
    ],
    [
      'requests name aliases',
      'A request names a model alias and a capability. It cannot carry a URL, a credential or a path to the backend.'
    ],
    [
      'MIT, front to back',
      'The extension and the gateway are one repository you can read in an afternoon. The licence issuer is the only private piece, and it only signs seat counts.'
    ]
  ]
</script>

<section class="section" id="privacy">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">privacy</span>
        <h2>Nothing leaves the building. Here is the whole log.</h2>
      </div>
      <p>
        Below is everything twinny-server records about a request. It is the full width of the
        table. There is no other table.
      </p>
    </div>

    <div class="log panel" use:reveal={0}>
      <div class="head">
        <span>time</span><span>cap</span><span>key</span><span>alias</span><span>result</span><span
          class="r">took</span
        >
      </div>
      {#each rows as [t, c, k, a, r, d], i}
        <div class="row" style="--d: {i * 70}ms">
          <span class="dim num">{t}</span>
          <span class="cap">{c}</span>
          <span>{k}</span>
          <span class="muted">{a}</span>
          <span class={r === 'ok' ? 'ok' : 'bad'}>{r}</span>
          <span class="r num muted">{d}</span>
        </div>
      {/each}
      <div class="note">
        <span class="dim">$ ls ~/.twinny/server/usage/</span>
        <span class="muted"
          >one file per day, deleted after 30 days. back up the config and keys.json, nothing else
          exists.</span
        >
      </div>
    </div>

    <ul class="facts">
      {#each facts as [t, d], i}
        <li use:reveal={i * 50}>
          <h3>{t}</h3>
          <p>{d}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .log {
    font-size: 12px;
    overflow: hidden;
  }
  .head,
  .row {
    display: grid;
    grid-template-columns: 90px 70px 90px 110px 1fr 80px;
    gap: 12px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--line);
    white-space: nowrap;
  }
  .head {
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--bg);
  }
  .row {
    animation: in 0.5s ease both;
    animation-delay: var(--d);
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
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    padding: 12px 16px;
    font-size: var(--fs-xs);
    background: var(--bg);
  }
  @keyframes in {
    from {
      opacity: 0;
      transform: translateX(-6px);
    }
  }
  .facts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px 40px;
    margin: 56px 0 0;
    padding: 0;
    list-style: none;
  }
  .facts li {
    padding-top: 16px;
    border-top: 1px solid var(--line-2);
  }
  h3 {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .facts p {
    margin-top: 8px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.65;
  }
  @media (max-width: 760px) {
    .head,
    .row {
      grid-template-columns: 64px 52px 56px 1fr 60px;
      gap: 8px;
      padding-inline: 12px;
      font-size: 11px;
    }
    .r {
      display: none;
    }
    .facts {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
