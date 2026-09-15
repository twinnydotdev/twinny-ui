<script lang="ts">
  import { URL_DOCS_PROVIDERS } from '$lib/const'
  const local = ['Ollama', 'llama.cpp', 'LM Studio', 'QVAC', 'OpenAI-compatible']
  const hosted = [
    'OpenAI',
    'Anthropic',
    'OpenRouter',
    'Mistral',
    'Groq',
    'DeepSeek',
    'Cohere',
    'Perplexity'
  ]
</script>

<section class="providers">
  <div class="wrap row">
    <span class="label">works with</span>
    <ul>
      {#each local as p}<li class="strong">{p}</li>{/each}
      <li class="sep" aria-hidden="true"></li>
      {#each hosted as p}<li>{p}</li>{/each}
    </ul>
    <a class="more" href={URL_DOCS_PROVIDERS} target="_blank" rel="noopener noreferrer"
      >all providers</a
    >
  </div>
</section>

<style>
  .providers {
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: var(--bg-2);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 28px;
    padding-block: 18px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 22px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--fs-sm);
    color: var(--ink-3);
  }
  .strong {
    color: var(--ink);
  }
  .sep {
    width: 1px;
    height: 14px;
    background: var(--line-2);
  }
  .more {
    margin-left: auto;
    font-size: var(--fs-xs);
    color: var(--ink-2);
    letter-spacing: 0.04em;
  }
</style>
