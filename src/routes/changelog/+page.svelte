<script lang="ts">
  import { RELEASES } from '$lib/changelog'
  import { URL_GITHUB, URL_SITE } from '$lib/const'
</script>

<svelte:head>
  <title>twinny changelog: every release of the extension and twinny-server</title>
  <meta
    name="description"
    content="What changed in each release of the twinny VS Code extension and the twinny-server team gateway, newest first. Also as an RSS feed."
  />
  <meta property="og:title" content="twinny changelog" />
  <meta
    property="og:description"
    content="Every release of the extension and the gateway, newest first."
  />
  <meta property="og:url" content="{URL_SITE}/changelog" />
</svelte:head>

<section class="section">
  <div class="wrap doc">
    <span class="label">changelog</span>
    <h1>Every release, newest first.</h1>
    <p class="lede">
      The extension and twinny-server are built from one tree and share a version number. This page
      is the repository's
      <a href="{URL_GITHUB}/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer"
        >CHANGELOG.md</a
      >, one page per release, and an <a href="/changelog.xml">RSS feed</a>.
    </p>
    <ol class="list">
      {#each RELEASES as r}
        <li>
          <a href="/changelog/{r.version}"><span class="v num">{r.label}</span></a>
          <span class="d num">{r.date}</span>
          <p>{r.summary}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .doc {
    max-width: 72ch;
  }
  h1 {
    font-size: clamp(28px, 4vw, 40px);
    margin: 12px 0 10px;
  }
  .lede {
    color: var(--ink-2);
    line-height: 1.6;
  }
  .list {
    margin: 32px 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--line);
  }
  li {
    display: grid;
    grid-template-columns: 7ch minmax(0, 1fr);
    gap: 4px 20px;
    padding: 18px 0;
    border-bottom: 1px solid var(--line);
  }
  .v {
    font-family: var(--mono);
    font-weight: 600;
    color: var(--accent);
  }
  .d {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    color: var(--ink-3);
  }
  li p {
    grid-column: 2;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
</style>
