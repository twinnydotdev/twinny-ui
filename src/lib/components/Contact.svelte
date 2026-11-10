<script lang="ts">
  import { onMount } from 'svelte'

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

<p class="intro">
  Enterprise, invoices, a call, or anything else. A reply within one business day, to the address
  you give.
</p>
<form method="post" action="/api/contact" onsubmit={submit}>
  <label>
    name
    <input name="name" type="text" required maxlength="100" autocomplete="name" />
  </label>
  <label>
    work email
    <input name="email" type="email" required maxlength="254" autocomplete="email" />
  </label>
  <label>
    organisation
    <input name="org" type="text" maxlength="120" autocomplete="organization" />
  </label>
  <label>
    developers
    <input name="seats" type="number" min="1" max="100000" inputmode="numeric" />
  </label>
  <label class="full">
    message
    <textarea name="message" rows="4" required minlength="10" maxlength="4000"></textarea>
  </label>
  <label class="full check">
    <input name="call" type="checkbox" value="yes" />
    I would like a call
  </label>
  <label class="hp" aria-hidden="true">
    website
    <input name="website" type="text" tabindex="-1" autocomplete="off" />
  </label>
  <div class="full foot">
    <button class="btn primary" type="submit" disabled={phase === 'sending'}>
      {phase === 'sending' ? 'sending…' : 'send'}
    </button>
    <p class="status" aria-live="polite">
      {#if phase === 'sent'}
        <span class="ok">sent.</span> The reply comes to the address you gave.
      {:else if phase === 'error'}
        {error}
      {:else}
        Nothing is stored. It arrives as one email.
      {/if}
    </p>
  </div>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 20px;
    font-family: var(--mono);
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    color: var(--ink-3);
    font-size: var(--fs-xs);
  }
  .full {
    grid-column: 1 / -1;
  }
  input,
  textarea {
    width: 100%;
    padding: 9px 0;
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--line-2);
    border-radius: 0;
    color: var(--ink);
    font: inherit;
    font-size: 14px;
  }
  textarea {
    resize: vertical;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-bottom-color: var(--ink);
  }
  .check {
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: var(--fs-sm);
  }
  .check input {
    width: auto;
    accent-color: var(--ink);
  }
  .hp {
    position: absolute;
    left: -9999px;
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 20px;
    margin-top: 8px;
  }
  .status {
    color: var(--ink-3);
    font-size: var(--fs-xs);
  }
  .ok {
    color: var(--signal);
  }
  @media (max-width: 640px) {
    form {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  .intro {
    margin-bottom: 28px;
    max-width: 64ch;
    color: var(--ink-2);
  }
</style>
