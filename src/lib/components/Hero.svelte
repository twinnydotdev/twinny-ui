<script lang="ts">
  import { URL_MARKETPLACE, URL_GITHUB } from '$lib/const'
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
        <span class="pill">VS Code</span>
        <span class="pill">runs on your hardware</span>
      </div>
      <h1 use:reveal={80}>
        AI pair programmer.<br />
        <span class="quiet">Runs locally,</span> minds its own business.
      </h1>
      <p class="lede" use:reveal={160}>
        Autocomplete, chat, inline edit and code review in VS Code, on models you run: Ollama,
        llama.cpp, LM Studio, QVAC, or any OpenAI-compatible server. Your code never leaves the
        building, and there is no account to make.
      </p>
      <div class="ctas" use:reveal={240}>
        <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">
          install for VS Code
        </a>
        <Copy text="npx twinny-server init" label="for your team" />
      </div>
      <p class="fine" use:reveal={300}>
        Free for individuals and teams up to five. <a
          href={URL_GITHUB}
          target="_blank"
          rel="noopener noreferrer">Read the source</a
        >, it is short.
      </p>
    </div>

    <div class="demo" use:reveal={200}>
      <EditorMock />
      <div class="caption">
        <span class="label">live</span>
        <span class="muted"
          >a fill-in-the-middle suggestion, streamed and accepted. built from HTML, not a
          screenshot.</span
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
    font-size: clamp(34px, 4.4vw, 54px);
    font-weight: 600;
    font-stretch: 78%;
    letter-spacing: -0.03em;
    line-height: 1.06;
  }
  .quiet {
    color: var(--ink-2);
  }
  .lede {
    margin-top: 24px;
    max-width: 50ch;
    color: var(--ink-2);
    font-size: var(--fs-md);
    line-height: 1.6;
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
