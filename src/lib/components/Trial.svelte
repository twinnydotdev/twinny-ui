<script lang="ts">
  import { onMount } from 'svelte'
  import { reveal } from '$lib/reveal'
  import { TRIAL_DAYS, TRIAL_SEATS, URL_DOCS_LICENSING } from '$lib/const'

  type State = 'idle' | 'sending' | 'sent' | 'error'
  let phase = $state<State>('idle')
  let error = $state('')
  let pageUrl = $state('')
  let opened = 0
  onMount(() => {
    opened = Date.now()
  })

  async function submit(e: SubmitEvent) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    data.elapsed = String(Date.now() - opened)
    phase = 'sending'
    error = ''
    try {
      const r = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
      const body = await r.json().catch(() => ({}))
      if (r.ok && body.ok) {
        phase = 'sent'
        pageUrl = body.url || ''
        form.reset()
      } else {
        phase = 'error'
        error = body.error || 'The trial was not issued. Try again in a minute.'
      }
    } catch {
      phase = 'error'
      error = 'The trial was not issued. Try again in a minute.'
    }
  }
</script>

<div class="trial panel" id="trial" use:reveal={240}>
  <div class="intro">
    <span class="label">{TRIAL_DAYS}-day trial</span>
    <h3>Try Team before buying. No card.</h3>
    <p>
      A token by email: {TRIAL_SEATS} seats, policy, recording and plugins, for {TRIAL_DAYS} days. Paste
      it into the admin page. When it ends the gateway goes back to the free plan; nothing is deleted,
      and seats bought later carry on from there. One trial per address.
      <a href={URL_DOCS_LICENSING} target="_blank" rel="noopener noreferrer">How licensing works</a
      >.
    </p>
  </div>
  <form method="post" action="/api/trial" onsubmit={submit}>
    <label>
      <span>work email</span>
      <input name="email" type="email" required maxlength="254" autocomplete="email" />
    </label>
    <label>
      <span>team or organisation</span>
      <input name="org" type="text" required maxlength="120" autocomplete="organization" />
    </label>
    <label class="hp" aria-hidden="true">
      <span>website</span>
      <input name="website" type="text" tabindex="-1" autocomplete="off" />
    </label>
    <div class="foot">
      <button class="btn primary" type="submit" disabled={phase === 'sending'}>
        {phase === 'sending' ? 'issuing…' : 'send me a trial token'}
      </button>
      <p class="status" aria-live="polite">
        {#if phase === 'sent'}
          <span class="ok">✓ issued.</span>
          {#if pageUrl}
            Your token is on <a href={pageUrl} target="_blank" rel="noopener noreferrer"
              >your licence page</a
            >.
          {:else}
            The token is in your inbox, with the install line. Check spam if it is not.
          {/if}
        {:else if phase === 'error'}
          {error}
        {:else}
          The address is kept on the licence only, as its contact. No list, no follow-up.
        {/if}
      </p>
    </div>
  </form>
</div>

<style>
  .trial {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 28px 48px;
    margin-top: 28px;
    padding: 28px;
  }
  .intro h3 {
    margin-top: 14px;
    font-size: clamp(22px, 2.4vw, 28px);
    letter-spacing: -0.03em;
  }
  .intro p {
    margin-top: 12px;
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
  }
  form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px 20px;
    align-content: start;
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
  input {
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
  input:hover {
    border-color: var(--ink-3);
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }
  .hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .foot {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 20px;
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
  @media (max-width: 800px) {
    .trial {
      grid-template-columns: minmax(0, 1fr);
      padding: 20px 16px;
    }
  }
  @media (max-width: 640px) {
    form {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
