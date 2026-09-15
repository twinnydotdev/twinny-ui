<script lang="ts">
  import { URL_MARKETPLACE, PRICE_TEAM } from '$lib/const'
  import EditorMock from './EditorMock.svelte'
  import Copy from './Copy.svelte'
  import { reveal } from '$lib/reveal'
</script>

<section class="hero">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap">
    <div class="intro">
      <div class="pills" use:reveal={0}>
        <span class="pill"><i></i>open source · MIT</span>
        <span class="pill">self-hosted</span>
        <span class="pill">VS Code</span>
      </div>
      <h1 use:reveal={80}>
        The coding assistant that <span class="quiet">never leaves</span> your network.
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
        <Copy text="npx twinny-server quickstart" label="for your team" />
      </div>
      <p class="fine" use:reveal={300}>
        Free for individuals and teams of five. Team seats from ${PRICE_TEAM} a month.
        <a href="#pricing">Pricing</a>.
      </p>
    </div>

    <div class="demo" use:reveal={200}>
      <EditorMock />
      <div class="caption">
        <span class="label">live</span>
        <span class="muted"
          >a completion, streamed and accepted. built from HTML, not a screenshot.</span
        >
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
  .quiet {
    color: var(--accent);
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
  .caption {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 14px;
    font-family: var(--mono);
    font-size: var(--fs-xs);
  }
  @media (max-width: 1100px) {
    .wrap {
      grid-template-columns: minmax(0, 1fr);
    }
    .lede {
      max-width: 60ch;
    }
  }
</style>
