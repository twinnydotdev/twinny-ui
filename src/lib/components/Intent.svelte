<script lang="ts">
  import type { Intent } from '$lib/intent'
  import { intentDoc, intentPath } from '$lib/intent'
  import { URL_MARKETPLACE, URL_DEMO, URL_SITE } from '$lib/const'
  import { jsonLd, faqPage, breadcrumbs } from '$lib/seo'
  import { reveal } from '$lib/reveal'

  let { intent }: { intent: Intent } = $props()
  const path = $derived(intentPath(intent))
</script>

<svelte:head>
  <title>{intent.title}</title>
  <meta name="description" content={intent.description} />
  <meta property="og:title" content={intent.title} />
  <meta property="og:description" content={intent.description} />
  <meta property="og:url" content="{URL_SITE}{path}" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(faqPage(intent.faq))}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(
    breadcrumbs([
      ['twinny', '/'],
      [intent.kind === 'with' ? 'with' : 'for', path],
      [intent.h1, path]
    ])
  )}
</svelte:head>

<section class="section top">
  <div class="wrap">
    <span class="label">{intent.kind === 'with' ? 'twinny with' : 'twinny for'}</span>
    <h1>{intent.h1}</h1>
    <p class="lede">{intent.intro}</p>
    <div class="ctas">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >install for VS Code</a
      >
      <a class="btn ghost" href={intentDoc(intent)} target="_blank" rel="noopener noreferrer"
        >{intent.docLabel}</a
      >
      <a class="btn ghost" href={URL_DEMO} target="_blank" rel="noopener noreferrer">live demo</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <span class="label">three steps</span>
    <ol class="steps" use:reveal={0}>
      {#each intent.steps as step, i}
        <li>
          <span class="n num">0{i + 1}</span>
          <p>{step}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="points">
      {#each intent.points as [head, body], i}
        <div class="point" use:reveal={i * 60}>
          <h3>{head}</h3>
          <p>{body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <span class="label">questions</span>
    <dl class="faq" use:reveal={0}>
      {#each intent.faq as [q, a]}
        <dt>{q}</dt>
        <dd>{a}</dd>
      {/each}
    </dl>
    <p class="fine">
      Everything else is on the <a href="/">home page</a>: features, the team gateway, security and
      <a href="/#pricing">pricing</a>.
    </p>
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
  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .steps li {
    padding: 24px;
    background: var(--bg);
  }
  .n {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    color: var(--accent);
    letter-spacing: var(--track);
  }
  .steps p {
    margin-top: 12px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
  .points {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 48px;
  }
  .point h3 {
    font-size: 19px;
    letter-spacing: -0.02em;
  }
  .point p {
    margin-top: 10px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
  .faq {
    margin: 24px 0 0;
    max-width: 72ch;
  }
  dt {
    margin-top: 22px;
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
    margin-top: 36px;
    color: var(--ink-3);
    font-size: var(--fs-sm);
  }
  @media (max-width: 800px) {
    .steps,
    .points {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
