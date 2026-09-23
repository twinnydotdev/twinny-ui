<script lang="ts">
  import { onMount } from 'svelte'
  import { reveal } from '$lib/reveal'
  import { ENTERPRISE_MIN_SEATS } from '$lib/const'

  type State = 'idle' | 'sending' | 'sent' | 'error'
  let phase = $state<State>('idle')
  let error = $state('')
  let opened = 0
  onMount(() => {
    opened = Date.now()
    if (location.search.includes('sent=1')) phase = 'sent'
  })

  async function submit(e: SubmitEvent) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    data.elapsed = String(Date.now() - opened)
    phase = 'sending'
    error = ''
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
      const body = await r.json().catch(() => ({}))
      if (r.ok && body.ok) {
        phase = 'sent'
        form.reset()
      } else {
        phase = 'error'
        error = body.error || 'The message was not sent. Try again in a minute.'
      }
    } catch {
      phase = 'error'
      error = 'The message was not sent. Try again in a minute.'
    }
  }
</script>

<section class="section" id="contact">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">contact</span>
        <h2>Enterprise, or anything else.</h2>
      </div>
      <p>
        {ENTERPRISE_MIN_SEATS} seats or more, an invoice or a purchase order, a named contact. Say who
        you are and how many developers; you hear back within one business day. Rather talk? Tick the
        box and say when suits.
      </p>
    </div>

    <form class="panel" method="post" action="/api/contact" onsubmit={submit} use:reveal={60}>
      <label>
        <span>name</span>
        <input name="name" type="text" required maxlength="100" autocomplete="name" />
      </label>
      <label>
        <span>work email</span>
        <input name="email" type="email" required maxlength="254" autocomplete="email" />
      </label>
      <label>
        <span>organisation</span>
        <input name="org" type="text" maxlength="120" autocomplete="organization" />
      </label>
      <label>
        <span>developers</span>
        <input name="seats" type="number" min="1" max="100000" inputmode="numeric" />
      </label>
      <label class="full">
        <span>message</span>
        <textarea name="message" rows="5" required minlength="10" maxlength="4000"></textarea>
      </label>
      <label class="full check">
        <input name="call" type="checkbox" value="yes" />
        <span>I would like a call. Twenty minutes, screen share, your questions.</span>
      </label>
      <label class="hp" aria-hidden="true">
        <span>website</span>
        <input name="website" type="text" tabindex="-1" autocomplete="off" />
      </label>
      <div class="full foot">
        <button class="btn primary" type="submit" disabled={phase === 'sending'}>
          {phase === 'sending' ? 'sending…' : 'send'}
        </button>
        <p class="status" aria-live="polite">
          {#if phase === 'sent'}
            <span class="ok">✓ sent.</span> The reply comes to the address you gave.
          {:else if phase === 'error'}
            {error}
          {:else}
            Nothing is stored. The message goes by email to the people who make twinny.
          {/if}
        </p>
      </div>
    </form>
  </div>
</section>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px 20px;
    padding: 28px;
    font-family: var(--mono);
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  label span {
    color: var(--ink-3);
    font-size: var(--fs-xs);
    letter-spacing: var(--track);
    text-transform: uppercase;
  }
  input,
  textarea {
    width: 100%;
    min-width: 0;
    padding: 0 12px;
    height: 44px;
    border: 1px solid var(--line-2);
    border-radius: var(--r);
    background: var(--bg);
    color: var(--ink);
    font: inherit;
    font-size: var(--fs-sm);
    transition: border-color 0.12s ease;
  }
  textarea {
    height: auto;
    padding: 11px 12px;
    line-height: 1.55;
    resize: vertical;
  }
  input:hover,
  textarea:hover {
    border-color: var(--ink-3);
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--accent);
  }
  .full {
    grid-column: 1 / -1;
  }
  .check {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .check input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .check input {
    width: 16px;
    height: 16px;
    padding: 0;
    accent-color: var(--accent);
    flex: none;
  }
  .check span {
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink-2);
    font-size: var(--fs-sm);
  }
  .hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 20px;
    margin-top: 4px;
  }
  .status {
    margin: 0;
    color: var(--ink-3);
    font-size: var(--fs-xs);
    line-height: 1.5;
  }
  .ok {
    color: var(--accent);
  }
  .btn[disabled] {
    opacity: 0.6;
    cursor: default;
  }
  @media (max-width: 640px) {
    form {
      grid-template-columns: minmax(0, 1fr);
      padding: 20px 16px;
    }
  }
</style>
