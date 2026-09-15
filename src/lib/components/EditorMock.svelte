<script lang="ts">
  /*
   * A VS Code window built from hairlines. The left pane replays a
   * fill-in-the-middle completion: ghost text streams in, Tab accepts it, the
   * gutter flashes green, and it loops. The right pane is the chat with an
   * @git mention and its context line. Nothing here is a screenshot.
   */
  import { onMount } from 'svelte'

  const ghostLines = [
    '    if (timer) clearTimeout(timer)',
    '    timer = setTimeout(() => fn(...args), wait)',
    '  }',
    '}'
  ]

  type Phase = 'typing' | 'offer' | 'accepted' | 'reset'
  let phase = $state<Phase>('typing')
  let typed = $state('')
  let reduced = $state(false)

  const full = ghostLines.join('\n')

  onMount(() => {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      typed = full
      phase = 'accepted'
      return
    }
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      if (phase === 'typing') {
        i += 1
        typed = full.slice(0, i)
        if (i >= full.length) {
          phase = 'offer'
          t = setTimeout(tick, 1100)
        } else {
          const ch = full[i - 1]
          t = setTimeout(tick, ch === '\n' ? 140 : 14 + Math.random() * 22)
        }
      } else if (phase === 'offer') {
        phase = 'accepted'
        t = setTimeout(tick, 2600)
      } else if (phase === 'accepted') {
        phase = 'reset'
        t = setTimeout(tick, 420)
      } else {
        i = 0
        typed = ''
        phase = 'typing'
        t = setTimeout(tick, 500)
      }
    }
    t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  })

  const shown = $derived(typed.split('\n'))
</script>

<div class="win" aria-label="twinny in VS Code, illustration">
  <div class="tabs">
    <span class="tab on"><i class="dot ts"></i>debounce.ts</span>
    <span class="tab"><i class="dot ts"></i>completion.ts</span>
    <span class="tab dimmed">…</span>
    <span class="spacer"></span>
    <span class="side-title">twinny</span>
  </div>

  <div class="body">
    <div
      class="editor"
      class:offer={phase === 'offer'}
      class:accepted={phase === 'accepted'}
      class:reset={phase === 'reset'}
    >
      <ol class="code">
        <li>
          <span class="kw">export</span> <span class="kw">function</span>
          <span class="fn">debounce</span>(fn: <span class="ty">Fn</span>, wait =
          <span class="nu">300</span>) &#123;
        </li>
        <li>
          <span class="kw">let</span> timer: <span class="ty">Timer</span> |
          <span class="ty">undefined</span>
        </li>
        <li>
          <span class="kw">return</span> (...args: <span class="ty">unknown</span>[]) =&gt; &#123;
        </li>
        {#each ghostLines as line, n}
          {#if n < shown.length}
            <li class="g" class:cursor={n === shown.length - 1 && phase === 'typing'}>
              {shown[n]}
            </li>
          {:else}
            <li class="empty"></li>
          {/if}
        {/each}
        <li class="empty"></li>
      </ol>
      <div class="hint" aria-hidden="true">
        <kbd>Tab</kbd> accept <span class="sep">·</span> <kbd>Esc</kbd> dismiss
      </div>
    </div>

    <aside class="chat">
      <div class="msg user">
        <span class="who">you</span>
        <p>why does the test for <span class="mention">@git</span> changes fail on windows?</p>
        <div class="chips"><span>@git · 2 files · +41 −6</span></div>
      </div>
      <div class="msg bot">
        <span class="who">twinny <span class="dim">· chat-14b</span></span>
        <p>
          The diff splits paths on <code>'/'</code>. On Windows <code>git status</code> still prints
          forward slashes, but <code>path.join</code> in the test builds the expected path with
          <code>'\\'</code>, so the comparison fails. Use <code>path.posix</code> for both:
        </p>
        <pre><span class="dm">- path.join(dir, name)</span>
<span class="ad">+ path.posix.join(dir, name)</span></pre>
        <div class="actions">
          <span>copy</span><span>new file</span><span class="accent">apply</span>
        </div>
        <div class="ctx">
          <span class="dim">context</span> git diff · src/test/suite/git.test.ts
        </div>
      </div>
      <div class="input">
        <span class="caret">▍</span><span class="ph">ask about your code… @ to attach</span>
      </div>
    </aside>
  </div>

  <div class="status">
    <span class="accent">&lt;/&gt; twinny</span>
    <span>fim · coder-7b · local</span>
    <span class="hide-sm">chat · gateway :8765</span>
    <span class="spacer"></span>
    <span class="hide-sm">TypeScript</span>
  </div>
</div>

<style>
  .win {
    --edit-bg: var(--panel);
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--line-2);
    border-radius: 4px;
    background: var(--edit-bg);
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.6;
    color: var(--ink);
    overflow: hidden;
  }
  .tabs,
  .status {
    display: flex;
    align-items: center;
    gap: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    color: var(--ink-2);
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
  }
  .status {
    border-bottom: 0;
    border-top: 1px solid var(--line);
    gap: 18px;
    padding: 5px 12px;
  }
  .tab {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    border-right: 1px solid var(--line);
  }
  .tab.on {
    background: var(--edit-bg);
    color: var(--ink);
    box-shadow: inset 0 1px 0 var(--accent);
  }
  .tab.dimmed {
    color: var(--ink-3);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 1px;
    background: var(--s1);
  }
  .spacer {
    flex: 1;
  }
  .side-title {
    padding: 8px 14px;
    border-left: 1px solid var(--line);
    width: 36%;
    min-width: 230px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: var(--ink-2);
  }

  .body {
    display: flex;
    min-height: 300px;
  }
  .editor {
    position: relative;
    flex: 1;
    min-width: 0;
    padding: 14px 0 12px;
    overflow: hidden;
  }
  .code {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: ln;
  }
  .code li {
    position: relative;
    padding-left: 48px;
    padding-right: 14px;
    white-space: pre;
    counter-increment: ln;
    min-height: 1.6em;
  }
  .code li::before {
    content: counter(ln);
    position: absolute;
    left: 0;
    width: 32px;
    text-align: right;
    color: var(--ink-3);
    font-variant-numeric: tabular-nums;
    transition: color 0.3s ease;
  }
  .kw {
    color: var(--s6);
  }
  .fn {
    color: var(--s1);
  }
  .ty {
    color: var(--s3);
  }
  .nu {
    color: var(--s4);
  }
  .code .g {
    color: var(--ink-3);
    font-style: italic;
    transition: color 0.35s ease;
  }
  .code .g.cursor::after {
    content: '';
    display: inline-block;
    width: 7px;
    height: 1.1em;
    margin-left: 1px;
    vertical-align: -0.2em;
    background: var(--accent);
    animation: blink 1s steps(1) infinite;
  }
  .accepted .code .g {
    color: var(--ink);
    font-style: normal;
  }
  .accepted .code .g::before {
    color: var(--accent);
  }
  .reset .code .g {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .hint {
    position: absolute;
    right: 14px;
    bottom: 12px;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid var(--line-2);
    border-radius: 3px;
    background: var(--bg);
    color: var(--ink-2);
    font-size: 10.5px;
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
  .hint kbd {
    font-size: 10px;
    padding: 0 4px;
  }
  .sep {
    color: var(--ink-3);
  }
  .offer .hint {
    opacity: 1;
    transform: none;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .chat {
    width: 36%;
    min-width: 230px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 14px 14px 12px;
    border-left: 1px solid var(--line);
    background: var(--bg);
    font-size: 11.5px;
  }
  .msg {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .msg p {
    color: var(--ink);
    line-height: 1.55;
  }
  .who {
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .mention {
    color: var(--accent);
    border-bottom: 1px solid var(--accent-line);
  }
  .chips {
    display: flex;
    gap: 8px;
    color: var(--ink-3);
    font-size: 10.5px;
  }
  .chips span {
    border-bottom: 1px solid var(--line-2);
  }
  .chat code {
    color: var(--accent);
    font-size: 11px;
  }
  .chat pre {
    margin: 4px 0 0;
    padding: 8px 10px;
    border: 1px solid var(--line);
    background: var(--panel);
    font-size: 10.5px;
    line-height: 1.5;
    white-space: pre;
    overflow: hidden;
  }
  .dm {
    color: var(--bad);
  }
  .ad {
    color: var(--accent);
  }
  .actions {
    display: flex;
    gap: 12px;
    color: var(--ink-3);
    font-size: 10.5px;
  }
  .ctx {
    color: var(--ink-3);
    font-size: 10.5px;
    border-top: 1px solid var(--line);
    padding-top: 6px;
  }
  .input {
    margin-top: auto;
    display: flex;
    gap: 6px;
    padding: 8px 10px;
    border: 1px solid var(--line-2);
    background: var(--panel);
    color: var(--ink-3);
  }
  .caret {
    color: var(--accent);
    animation: blink 1s steps(1) infinite;
  }

  @media (max-width: 700px) {
    .chat,
    .side-title,
    .hide-sm {
      display: none;
    }
    .body {
      min-height: 0;
    }
    .win {
      font-size: 11px;
    }
    .code li {
      padding-left: 40px;
    }
  }
  @media (max-width: 480px) {
    .status {
      gap: 12px;
    }
  }
</style>
