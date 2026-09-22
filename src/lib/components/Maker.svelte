<script lang="ts">
  import { reveal } from '$lib/reveal'
  import {
    MAKER,
    MAKER_HANDLE,
    MAINTAINED_SINCE,
    URL_MAKER_GITHUB,
    URL_GITHUB,
    URL_DISCUSSIONS,
    URL_DOCS_CHANGELOG,
    URL_X
  } from '$lib/const'
  import { INSTALLS, STARS, fmt } from '$lib/stats'

  const facts = [
    [fmt(INSTALLS), 'installs from the Marketplace'],
    [fmt(STARS), 'stars on GitHub'],
    [String(MAINTAINED_SINCE), 'first commit, still the same maintainer'],
    ['MIT', 'the extension, the gateway and the licence check']
  ]
</script>

<section class="section" id="maker">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">who makes this</span>
        <h2>One maintainer, in the open.</h2>
      </div>
      <p>
        twinny is written and maintained by {MAKER},
        <a href={URL_MAKER_GITHUB} target="_blank" rel="noopener noreferrer">{MAKER_HANDLE}</a>
        on GitHub, since {MAINTAINED_SINCE}. No sales team and no investors. The person who answers
        the form below is the person who wrote the code.
      </p>
    </div>
    <div class="facts" use:reveal={0}>
      {#each facts as [big, small], i}
        <div class="fact" style="--i: {i}">
          <span class="big num">{big}</span>
          <span class="small">{small}</span>
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
