<script lang="ts">
  import type { Rival } from '$lib/compare'
  import { CHECKED } from '$lib/compare'
  import { URL_MARKETPLACE, URL_DEMO, URL_SITE } from '$lib/const'
  import { reveal } from '$lib/reveal'

  let { rival }: { rival: Rival } = $props()
</script>

<svelte:head>
  <title>{rival.title}</title>
  <meta name="description" content={rival.description} />
  <meta property="og:title" content={rival.title} />
  <meta property="og:description" content={rival.description} />
  <meta property="og:url" content="{URL_SITE}/vs/{rival.slug}" />
</svelte:head>

<section class="section top">
  <div class="wrap">
    <span class="label">compare</span>
    <h1>twinny, {rival.phrase}.</h1>
    <p class="lede">{rival.intro}</p>
    <div class="ctas">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >install for VS Code</a
      >
      <a class="btn ghost" href={URL_DEMO} target="_blank" rel="noopener noreferrer"
        >try the live demo</a
      >
      <a class="btn ghost" href="/#pricing">pricing</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="table panel" use:reveal={0}>
      <div class="row head">
        <span></span>
        <span>{rival.name}</span>
        <span class="accent">twinny</span>
      </div>
      {#each rival.rows as [label, them, us]}
        <div class="row">
          <span class="k">{label}</span>
          <span>{them}</span>
          <span class="us">{us}</span>
        </div>
      {/each}
    </div>
    <p class="fine">
      {rival.name} facts and prices are from its own pricing page, read in {CHECKED}. They change;
      the page will be corrected when they do. twinny prices are per seat per month, billed yearly.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap two">
    <div use:reveal={0}>
      <span class="label">pick {rival.name} when</span>
      <ul>
        {#each rival.pickThem as line}<li>{line}</li>{/each}
      </ul>
    </div>
    <div use:reveal={80}>
      <span class="label">pick twinny when</span>
      <ul>
        {#each rival.pickUs as line}<li>{line}</li>{/each}
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <span class="label">the same job, on your network</span>
    <h2>Autocomplete, chat, inline edit and code review in VS Code.</h2>
    <p class="lede">
      Every feature is on the <a href="/#features">home page</a>, the team gateway under
      <a href="/#teams">teams</a>, and the answers a security review asks for under
      <a href="/#security">security</a>. Free for five developers, a trial for thirty days, and no
      call needed to buy.
    </p>
    <div class="ctas">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >install for VS Code</a
      >
      <a class="btn ghost" href="/#trial">30-day team trial</a>
    </div>
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
  h2 {
    margin-top: 18px;
    font-size: clamp(26px, 3.2vw, 38px);
    letter-spacing: -0.03em;
    max-width: 24ch;
  }
  .lede {
    margin-top: 20px;
    max-width: 66ch;
    color: var(--ink-2);
    font-size: var(--fs-md);
    line-height: 1.6;
  }
  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .table {
    overflow: hidden;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr) minmax(0, 4fr);
    gap: 16px;
    padding: 16px 20px;
    border-top: 1px solid var(--line);
    font-size: var(--fs-sm);
    line-height: 1.55;
  }
  .row:first-child {
    border-top: 0;
  }
  .row.head {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: var(--track);
    text-transform: uppercase;
    color: var(--ink-2);
    background: var(--panel-2);
  }
  .k {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: 0.03em;
    color: var(--ink-3);
    text-transform: uppercase;
  }
  .us {
    color: var(--ink);
  }
  .row:not(.head) span:nth-child(2) {
    color: var(--ink-2);
  }
  .fine {
    margin-top: 16px;
    color: var(--ink-3);
    font-size: var(--fs-xs);
    font-family: var(--mono);
    line-height: 1.6;
    max-width: 90ch;
  }
  .two {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  }
  ul {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: var(--ink-2);
    font-size: var(--fs);
    line-height: 1.55;
  }
  li {
    padding-left: 22px;
    position: relative;
  }
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 12px;
    height: 1px;
    background: var(--accent);
  }
  @media (max-width: 720px) {
    .row {
      grid-template-columns: minmax(0, 1fr);
      gap: 6px;
    }
    .row.head span:first-child {
      display: none;
    }
    .two {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
