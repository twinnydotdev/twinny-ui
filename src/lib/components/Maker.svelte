<script lang="ts">
  import { reveal } from '$lib/reveal'
  import {
    MAINTAINED_SINCE,
    URL_GITHUB,
    URL_MARKETPLACE,
    URL_OPENVSX,
    URL_DISCUSSIONS,
    URL_DOCS_CHANGELOG,
    URL_X
  } from '$lib/const'
  import { INSTALLS_ALL, STARS, fmt } from '$lib/stats'

  // [big, small, href]: a tile links out when it has somewhere to point.
  const facts: [string, string, string?][] = [
    [fmt(INSTALLS_ALL), 'installs, Marketplace and Open VSX'],
    [fmt(STARS), 'stars on GitHub', URL_GITHUB],
    [String(MAINTAINED_SINCE), 'in development, in public, since'],
    ['MIT', 'the extension, the gateway and the licence check']
  ]
</script>

<section class="section" id="maker">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">in the open</span>
        <h2>Built in public since {MAINTAINED_SINCE}.</h2>
      </div>
      <p>
        Every commit, issue and release is on
        <a href={URL_GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>, the licence check
        included. No sales team and no investors. The form below goes straight to the people who
        make twinny.
      </p>
    </div>
    <div class="facts" use:reveal={0}>
      {#each facts as [big, small, href], i}
        <div class="fact" style="--i: {i}">
          <span class="big num">{big}</span>
          {#if i === 0}
            <span class="small"
              >installs,
              <a href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">Marketplace</a>
              and <a href={URL_OPENVSX} target="_blank" rel="noopener noreferrer">Open VSX</a></span
            >
          {:else if href}
            <a class="small" {href} target="_blank" rel="noopener noreferrer">{small}</a>
          {:else}
            <span class="small">{small}</span>
          {/if}
        </div>
      {/each}
    </div>
    <p class="links" use:reveal={80}>
      Every commit is public. The security review can read the source, the licence check and the
      audit log format before anyone signs anything.
      <a href={URL_GITHUB} target="_blank" rel="noopener noreferrer">source</a> ·
      <a href={URL_DOCS_CHANGELOG} target="_blank" rel="noopener noreferrer">changelog</a> ·
      <a href={URL_DISCUSSIONS} target="_blank" rel="noopener noreferrer">discussions</a> ·
      <a href={URL_X} target="_blank" rel="noopener noreferrer">@twinnydotdev</a>
    </p>
  </div>
</section>

<style>
  .facts {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .fact {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 26px 24px;
    background: var(--bg);
  }
  .big {
    font-family: var(--display);
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .small {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: 0.03em;
    color: var(--ink-2);
  }
  .small a,
  a.small {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: var(--line-2);
    text-underline-offset: 3px;
  }
  .small a:hover,
  a.small:hover {
    color: var(--accent);
    text-decoration-color: var(--accent);
  }
  .links {
    margin-top: 22px;
    color: var(--ink-3);
    font-size: var(--fs-sm);
    max-width: 78ch;
  }
  @media (max-width: 800px) {
    .facts {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
