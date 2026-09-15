<script lang="ts">
  import { reveal } from '$lib/reveal'
  import { URL_DOCS_QUICKSTART } from '$lib/const'
  const steps = [
    {
      t: 'install the extension',
      d: 'From the VS Code marketplace. No sign-up, no key, no telemetry prompt.',
      c: 'code --install-extension rjmacarthy.twinny'
    },
    {
      t: 'point it at a server',
      d: 'On first run twinny looks for Ollama, LM Studio, llama.cpp or QVAC on localhost and offers what it finds. Or add any OpenAI-compatible endpoint.',
      c: 'ollama pull qwen2.5-coder:7b'
    },
    {
      t: 'type',
      d: 'Suggestions appear as you pause. Open the sidebar to chat, press Ctrl+I to edit in place. Everything is a plain VS Code command you can rebind.',
      c: '</> twinny · ready'
    }
  ]
</script>

<section class="section how">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">getting started</span>
        <h2>Three steps, no account.</h2>
      </div>
      <p>
        There is nothing to sign in to because there is nothing on our side. The extension talks to
        the server you name and nobody else. <a
          href={URL_DOCS_QUICKSTART}
          target="_blank"
          rel="noopener noreferrer">Quick start</a
        >.
      </p>
    </div>
    <ol>
      {#each steps as s, i}
        <li use:reveal={i * 90}>
          <span class="n num">0{i + 1}</span>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
          <code><span class="dollar">{i === 2 ? '' : '$'}</span>{s.c}</code>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  ol {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: s;
  }
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 22px;
    border-top: 1px solid var(--line-2);
  }
  li::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 40px;
    height: 1px;
    background: var(--accent);
  }
  .n {
    color: var(--ink-3);
    font-size: var(--fs-xs);
    letter-spacing: 0.1em;
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  li p {
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.65;
    flex: 1;
  }
  code {
    display: block;
    margin-top: 6px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    background: var(--bg-2);
    color: var(--ink);
    font-size: 11.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dollar {
    color: var(--accent);
    margin-right: 8px;
  }
  .dollar:empty {
    margin: 0;
  }
  @media (max-width: 800px) {
    ol {
      grid-template-columns: minmax(0, 1fr);
      gap: 28px;
    }
  }
</style>
