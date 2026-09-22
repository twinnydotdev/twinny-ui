<script lang="ts">
  import { URL_SITE, URL_MARKETPLACE } from '$lib/const'
  import { jsonLd, breadcrumbs } from '$lib/seo'

  let { data } = $props()
  const r = $derived(data.release)
  const title = $derived(
    `twinny ${r.version}: ${r.summary.slice(0, 80)}${r.summary.length > 80 ? '…' : ''}`
  )
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="twinny {r.version}, released {r.date}. {r.summary}" />
  <meta property="og:title" content="twinny {r.version}" />
  <meta property="og:description" content={r.summary} />
  <meta property="og:url" content="{URL_SITE}/changelog/{r.version}" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(
    breadcrumbs([
      ['twinny', '/'],
      ['changelog', '/changelog'],
      [r.version, `/changelog/${r.version}`]
    ])
  )}
</svelte:head>

<section class="section">
  <div class="wrap doc">
    <span class="label"><a href="/changelog">changelog</a></span>
    <h1><span class="num">{r.label}</span> <span class="d num">{r.date}</span></h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
    <div class="body">{@html r.html}</div>
    <nav class="pager">
      {#if data.newer}<a href="/changelog/{data.newer.version}">← {data.newer.version}</a>{/if}
      <a class="btn" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >install for VS Code</a
      >
      {#if data.older}<a href="/changelog/{data.older.version}">{data.older.version} →</a>{/if}
    </nav>
  </div>
</section>

<style>
  .doc {
    max-width: 72ch;
  }
  .label a {
    color: inherit;
  }
  h1 {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 16px;
    font-size: clamp(28px, 4vw, 40px);
    margin: 12px 0 18px;
  }
  .d {
    font-family: var(--mono);
    font-size: var(--fs-sm);
    font-weight: 400;
    color: var(--ink-3);
    letter-spacing: 0;
  }
  .body {
    color: var(--ink-2);
    line-height: 1.65;
  }
  .body :global(h3) {
    margin: 28px 0 10px;
    font-size: 17px;
    color: var(--ink);
  }
  .body :global(p) {
    margin: 0 0 12px;
  }
  .body :global(ul) {
    margin: 0 0 14px;
    padding-left: 20px;
  }
  .body :global(li) {
    margin: 0 0 8px;
  }
  .body :global(strong) {
    color: var(--ink);
    font-weight: 600;
  }
  .body :global(code) {
    font-family: var(--mono);
    font-size: 0.92em;
    color: var(--ink);
  }
  .pager {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 36px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    font-family: var(--mono);
    font-size: var(--fs-sm);
  }
</style>
