<script lang="ts">
  import { URL_MARKETPLACE, PRICE_TEAM, URL_DEMO } from '$lib/const'
  import EditorMock from './EditorMock.svelte'
  import Copy from './Copy.svelte'
  import { reveal } from '$lib/reveal'
  import { pointer } from '$lib/motion'

  // The headline lands one word at a time; the accent phrase underlines itself last.
  const head: [string, boolean][] = [
    ['The', false],
    ['coding', false],
    ['assistant', false],
    ['that', false],
    ['never', true],
    ['leaves', true],
    ['your', false],
    ['network.', false]
  ]
</script>

<section class="hero" use:pointer>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="glow" aria-hidden="true"></div>
  <div class="wrap">
    <div class="intro">
      <div class="pills" use:reveal={0}>
        <span class="pill"><i></i>open source · MIT</span>
        <span class="pill">self-hosted</span>
        <span class="pill">VS Code</span>
      </div>
      <h1 use:reveal={60}>
        {#each head as [word, quiet], i}
          <span class="w" class:quiet style="--i: {i}">{word}</span>{' '}
        {/each}
      </h1>
      <p class="lede" use:reveal={160}>
        Autocomplete, chat, inline edit and code review in VS Code, on models you run. Any
        OpenAI-compatible server, on a laptop, in your data centre, or pooled from the team's own
        computers. No account, nothing phones home.
      </p>
      <div class="ctas" use:reveal={240}>
        <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">
          install for VS Code
        </a>
        <a class="btn ghost" href={URL_DEMO} target="_blank" rel="noopener noreferrer">
          try the live demo
        </a>
        <Copy text="npx twinny-server quickstart" label="for your team" />
      </div>
      <p class="fine" use:reveal={300}>
        Free for individuals and teams of five. Team seats from ${PRICE_TEAM} a month.
        <a href="#pricing">Pricing</a>.
      </p>
    </div>

    <div class="demo" use:reveal={200}>
      <div class="frame">
        <svg class="trace" aria-hidden="true" preserveAspectRatio="none">
          <rect x="0.5" y="0.5" width="100%" height="100%" pathLength="100" />
          <rect class="run" x="0.5" y="0.5" width="100%" height="100%" pathLength="100" />
        </svg>
        <span class="tag tl">your network</span>
        <span class="tag br">nothing leaves</span>
        <EditorMock />
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding-block: clamp(56px, 8vw, 104px) clamp(48px, 6vw, 88px);
    overflow: hidden;
  }
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 56px 56px;
    background-position: center top;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 20%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 20%, transparent 100%);
    opacity: 0.7;
    pointer-events: none;
  }
  .grid-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 40% 30% at 70% 10%, var(--accent-soft), transparent 70%);
  }
  @keyframes scan {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    8% {
      opacity: 0.45;
    }
    60% {
      opacity: 0.25;
    }
    75%,
    100% {
      transform: translateY(70vh);
      opacity: 0;
    }
  }
  /* The faint radial glow follows the pointer. */
  .glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      520px circle at var(--mx, 50%) var(--my, 30%),
      var(--accent-soft),
      transparent 60%
    );
    opacity: var(--hover, 0);
    transition: opacity 0.6s ease;
    pointer-events: none;
  }
  .wrap {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 48px 56px;
    align-items: center;
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }
  h1 {
    font-size: clamp(38px, 4.6vw, 60px);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1.02;
  }
  .w {
    display: inline-block;
    opacity: 0;
    transform: translateY(0.35em);
    transition:
      opacity 0.6s cubic-bezier(0.2, 0.7, 0.2, 1),
      transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
    transition-delay: calc(60ms + var(--i) * 55ms);
  }
  :global(h1.in) .w {
    opacity: 1;
    transform: none;
  }
  .quiet {
    position: relative;
    color: var(--accent);
  }
  .quiet::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.04em;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
    transition-delay: calc(700ms + var(--i) * 120ms);
  }
  :global(h1.in) .quiet::after {
    transform: scaleX(1);
  }
  .lede {
    margin-top: 24px;
    max-width: 46ch;
    color: var(--ink-2);
    font-size: var(--fs-md);
    line-height: 1.55;
  }
  .ctas {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
  }
  .fine {
    margin-top: 18px;
    color: var(--ink-3);
    font-size: var(--fs-sm);
  }
  .demo {
    min-width: 0;
  }
  /* The network boundary: a hairline frame with one short segment circling it. */
  .frame {
    position: relative;
    padding: 12px;
  }
  .trace {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }
  .trace rect {
    fill: none;
    stroke: var(--line-2);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .trace .run {
    stroke: var(--accent);
    stroke-dasharray: 10 90;
    stroke-dashoffset: 0;
    animation: run 7s linear infinite;
  }
  @keyframes run {
    to {
      stroke-dashoffset: -100;
    }
  }
  .tag {
    position: absolute;
    z-index: 1;
    padding: 2px 7px;
    background: var(--bg);
    color: var(--ink-3);
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .tag.tl {
    top: -7px;
    left: 14px;
  }
  .tag.br {
    bottom: -7px;
    right: 14px;
    color: var(--accent);
  }
  @media (max-width: 1100px) {
    .wrap {
      grid-template-columns: minmax(0, 1fr);
    }
    .lede {
      max-width: 60ch;
    }
  }
  @media (max-width: 480px) {
    .frame {
      padding: 8px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .w,
    .quiet::after {
      transition: none;
      opacity: 1;
      transform: none;
    }
    .glow,
    .trace .run {
      display: none;
    }
  }
</style>
