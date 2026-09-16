<script lang="ts">
  /*
   * A strip of the short claims, scrolling like a tape. The list is rendered
   * twice so the loop is seamless; it pauses under the pointer and does not
   * move under prefers-reduced-motion.
   */
  const items = [
    'no telemetry',
    'no account',
    'MIT licensed',
    'air-gapped',
    'any OpenAI-compatible server',
    'autocomplete',
    'chat',
    'inline edit',
    'code review',
    'workspace index',
    'terminal',
    'one gateway for the team',
    'pooled computers',
    'a key per developer',
    'recording off by default',
    'nothing phones home'
  ]
</script>

<div class="wire" aria-label="in short">
  <div class="tape">
    {#each [0, 1] as copy}
      <ul aria-hidden={copy === 1}>
        {#each items as item}
          <li><i></i>{item}</li>
        {/each}
      </ul>
    {/each}
  </div>
</div>

<style>
  .wire {
    position: relative;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: var(--bg-2);
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }
  .tape {
    display: flex;
    width: max-content;
    animation: tape 70s linear infinite;
  }
  .wire:hover .tape {
    animation-play-state: paused;
  }
  ul {
    display: flex;
    flex: none;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 11px 24px 11px 10px;
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-2);
    white-space: nowrap;
  }
  li i {
    width: 5px;
    height: 5px;
    background: var(--accent);
    opacity: 0.8;
  }
  @keyframes tape {
    to {
      transform: translateX(-50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tape {
      animation: none;
    }
  }
</style>
