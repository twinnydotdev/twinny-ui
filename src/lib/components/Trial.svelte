<script lang="ts">
  import { onMount } from 'svelte'
  import { TRIAL_DAYS, TRIAL_SEATS, URL_DOCS_LICENSING } from '$lib/const'

  type State = 'idle' | 'sending' | 'sent' | 'error'
  let phase = $state<State>('idle')
  let error = $state('')
  let pageUrl = $state('')
  let opened = 0
  let widget: HTMLDivElement
  let widgetId: string | undefined
  const SITE_KEY = '0x4AAAAAAF509ROLomQc-Xtp'
  onMount(() => {
    opened = Date.now()
    const w = window as any
    const render = () => (widgetId = w.turnstile.render(widget, { sitekey: SITE_KEY, action: 'trial' }))
    if (w.turnstile) return void render()
    w.onTurnstileLoad = render
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'
    s.async = true
    document.head.append(s)
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
    // Tokens are single-use: fresh one for any retry.
    if (widgetId !== undefined) (window as any).turnstile?.reset(widgetId)
  }
</script>

<div class="trial" id="trial">
  <p class="intro">
    <span class="k">{TRIAL_DAYS}-day trial, no card.</span> A Team token by email: {TRIAL_SEATS} seats,
    policy, recording and plugins. When it ends the gateway goes back to free; nothing is deleted. One
    per address.
    <a href={URL_DOCS_LICENSING} target="_blank" rel="noopener noreferrer">licensing</a>
  </p>
  <form method="post" action="/api/trial" onsubmit={submit}>
    <label>
      work email
      <input name="email" type="email" required maxlength="254" autocomplete="email" />
    </label>
    <label>
      team or organisation
      <input name="org" type="text" required maxlength="120" autocomplete="organization" />
    </label>
    <label class="hp" aria-hidden="true">
      website
      <input name="website" type="text" tabindex="-1" autocomplete="off" />
    </label>
    <div class="full" bind:this={widget}></div>
    <div class="full foot">
      <button class="btn" type="submit" disabled={phase === 'sending'}>
        {phase === 'sending' ? 'issuing…' : 'send me a trial token'}
      </button>
      <p class="status" aria-live="polite">
        {#if phase === 'sent'}
          <span class="ok">issued.</span>
          {#if pageUrl}
            Your token is on <a href={pageUrl} target="_blank" rel="noopener noreferrer"
              >your licence page</a
            >.
          {:else}
            The token is in your inbox. Check spam if it is not.
          {/if}
        {:else if phase === 'error'}
          {error}
        {:else}
          The address is kept on the licence only. No list, no follow-up.
        {/if}
      </p>
    </div>
  </form>
</div>

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
  input {
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
  input:focus {
    outline: none;
    border-bottom-color: var(--ink);
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
  .trial {
    margin-top: 40px;
    padding: 24px;
    border: 1px solid var(--line);
    scroll-margin-top: 16px;
  }
  .intro {
    margin-bottom: 20px;
    color: var(--ink-2);
  }
  .k {
    color: var(--ink);
  }
</style>
