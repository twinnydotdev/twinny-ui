<script lang="ts">
  import { URL_MARKETPLACE, URL_DOCS, URL_GITHUB } from '$lib/const'
  import Mark from './Mark.svelte'
  import { reveal } from '$lib/reveal'
</script>

<section class="section closing">
  <div class="wrap inner" use:reveal={0}>
    <div class="glyph" aria-hidden="true"><Mark size={56} /></div>
    <h2>Install it. Point it at a model. That is the whole onboarding.</h2>
    <div class="ctas">
      <a class="btn primary" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer"
        >install for VS Code</a
      >
      <a class="btn ghost" href={URL_DOCS} target="_blank" rel="noopener noreferrer"
        >read the docs</a
      >
      <a class="btn ghost" href={URL_GITHUB} target="_blank" rel="noopener noreferrer"
        >star on github</a
      >
    </div>
  </div>
</section>

<style>
  .closing {
    position: relative;
    overflow: hidden;
  }
  .closing::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 60% at 50% 100%, var(--accent-soft), transparent 70%);
    pointer-events: none;
  }
  .inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 28px;
  }
  .glyph {
    color: var(--ink-3);
  }
  h2 {
    max-width: 22ch;
    font-size: clamp(26px, 3.6vw, 42px);
  }
  .ctas {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
</style>
