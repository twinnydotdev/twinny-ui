<script lang="ts">
  let { text, label = '' }: { text: string; label?: string } = $props()
  let done = $state(false)
  let t: ReturnType<typeof setTimeout>

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      done = true
      clearTimeout(t)
      t = setTimeout(() => (done = false), 1600)
    } catch {
      /* clipboard unavailable: the text is still selectable */
    }
  }
</script>

<button class="copy" onclick={copy} title="Copy to clipboard" aria-live="polite">
  <span class="dollar">$</span>
  <span class="cmd">{text}</span>
  {#if label}<span class="lbl">{label}</span>{/if}
  <span class="ico" aria-hidden="true">{done ? '✓' : '⧉'}</span>
  <span class="sr-only">{done ? 'copied' : 'copy'}</span>
</button>

<style>
  .copy {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 44px;
    padding: 0 14px 0 14px;
    border: 1px solid var(--line-2);
    border-radius: var(--r);
    background: var(--bg);
    color: var(--ink);
    font-size: var(--fs-sm);
    white-space: nowrap;
    transition: border-color 0.12s ease;
  }
  .copy:hover {
    border-color: var(--accent-line);
  }
  .dollar {
    color: var(--accent);
  }
  .cmd {
    user-select: all;
  }
  .lbl {
    color: var(--ink-3);
    font-size: var(--fs-xs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding-left: 8px;
    border-left: 1px solid var(--line);
  }
  .ico {
    color: var(--ink-3);
    font-size: 13px;
  }
  .copy:hover .ico {
    color: var(--accent);
  }
</style>
