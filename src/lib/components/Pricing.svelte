<script lang="ts">
  import { reveal } from '$lib/reveal'
  import {
    URL_MARKETPLACE,
    URL_BUY_TEAM,
    URL_DOCS_LICENSING,
    PRICE_TEAM,
    PRICE_ENTERPRISE,
    FREE_SEATS,
    ENTERPRISE_MIN_SEATS,
    COMPANY,
    URL_DEMO,
    TRIAL_DAYS
  } from '$lib/const'

  import { Tween } from 'svelte/motion'
  import Trial from './Trial.svelte'
  import { cubicOut } from 'svelte/easing'

  // The slider is eased: most teams are under fifty, so the first third of the
  // track covers 1–50 and the rest runs on to 500.
  const MAX_SEATS = 500
  const STEPS = 200
  const CURVE = 2.5
  const toSeats = (v: number) => Math.round(1 + Math.pow(v / STEPS, CURVE) * (MAX_SEATS - 1))
  const toPos = (n: number) => Math.pow((n - 1) / (MAX_SEATS - 1), 1 / CURVE) * STEPS
  let v = $state(Math.round(toPos(20)))
  const seats = $derived(toSeats(v))
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en')
  // The first five seats are free for everyone; a team pays for the ones beyond them.
  const teamYear = $derived(Math.max(0, seats - FREE_SEATS) * PRICE_TEAM * 12)
  const entYear = $derived(Math.max(seats, ENTERPRISE_MIN_SEATS) * PRICE_ENTERPRISE * 12)
  const teamShown = Tween.of(() => teamYear, { duration: 320, easing: cubicOut })
  const entShown = Tween.of(() => entYear, { duration: 320, easing: cubicOut })
  const pick = $derived(
    seats <= FREE_SEATS ? 'free' : seats >= ENTERPRISE_MIN_SEATS ? 'enterprise' : 'team'
  )
  const ticks = [
    [FREE_SEATS, `≤ ${FREE_SEATS} free`],
    [ENTERPRISE_MIN_SEATS, `${ENTERPRISE_MIN_SEATS}+ enterprise`]
  ] as const
</script>

<section class="section pricing" id="pricing">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">pricing</span>
        <h2>Per seat, per year. No quote, no call.</h2>
      </div>
      <p>
        A seat is an active key on your gateway. Revoke a key and the seat is free again. Everything
        in the extension and the gateway is in every tier; you pay for seats, policy, recording,
        plugins and support. Where the usual tools ask $19 a seat, twinny asks ${PRICE_TEAM}.
      </p>
    </div>

    <div class="cols">
      <article class="plan" class:pick={pick === 'free'} use:reveal={0}>
        <header>
          <span class="label bare">free</span>
          {#if pick === 'free'}<em class="tag">your size</em>{/if}
          <div class="price"><span class="big">$0</span></div>
          <span class="muted">forever, not a trial · up to {FREE_SEATS} seats on a gateway</span>
        </header>
        <ul>
          <li>the whole extension, MIT</li>
          <li>twinny-server: admin page, usage per developer, keys, sign-in codes</li>
          <li>any provider, local or hosted, configured live</li>
          <li>pool teammates' computers as a backend</li>
          <li>community support</li>
        </ul>
        <a class="btn" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">install</a>
        <a class="btn ghost" href={URL_DEMO} target="_blank" rel="noopener noreferrer"
          >see it live</a
        >
      </article>

      <article class="plan hot" class:pick={pick === 'team'} use:reveal={80}>
        <header>
          <span class="label bare">team</span>
          {#if pick === 'team'}<em class="tag">your size</em>{/if}
          <div class="price">
            <span class="big">${PRICE_TEAM}</span><span class="per">/ seat / month</span>
          </div>
          <span class="muted"
            >billed yearly, ${PRICE_TEAM * 12} for each seat beyond the free {FREE_SEATS}</span
          >
        </header>
        <ul>
          <li>everything in free</li>
          <li>your first {FREE_SEATS} seats stay free; buy only the ones beyond them</li>
          <li>policy: team-only providers, locked models, routing rules, a team system prompt</li>
          <li>
            plugins: pull requests and issues reviewed by your own models, Slack, SSO sign-in,
            shared context, backups
          </li>
          <li>recording: keep prompts and replies on your gateway for audit and training export</li>
          <li>email support</li>
          <li>
            a signed token, installed in a minute, checked locally; the gateway never calls home
          </li>
        </ul>
        <a class="btn primary" href={URL_BUY_TEAM} target="_blank" rel="noopener noreferrer"
          >buy seats</a
        >
        <a class="btn ghost" href="#trial">{TRIAL_DAYS}-day trial, no card</a>
      </article>

      <article class="plan" class:pick={pick === 'enterprise'} use:reveal={160}>
        <header>
          <span class="label bare">enterprise</span>
          {#if pick === 'enterprise'}<em class="tag">your size</em>{/if}
          <div class="price">
            <span class="big">${PRICE_ENTERPRISE}</span><span class="per">/ seat / month</span>
          </div>
          <span class="muted">billed yearly · from {ENTERPRISE_MIN_SEATS} seats</span>
        </header>
        <ul>
          <li>everything in team</li>
          <li>one organisation licence covering any number of gateways</li>
          <li>priority support with a named contact</li>
          <li>invoice or purchase-order billing</li>
        </ul>
        <a class="btn" href="#contact">contact us</a>
      </article>
    </div>

    <div class="calc panel" use:reveal={200}>
      <div class="calc-head">
        <label for="seats">how many developers?</label>
        <output for="seats" class="num">{seats}</output>
      </div>
      <input
        id="seats"
        type="range"
        min="0"
        max={STEPS}
        step="1"
        bind:value={v}
        aria-valuetext="{seats} developers"
        style="--p: {(v / STEPS) * 100}%"
      />
      <div class="ticks" aria-hidden="true">
        {#each ticks as [n, text]}
          <span style="left: {(toPos(n) / STEPS) * 100}%"><i></i>{text}</span>
        {/each}
      </div>
      <div class="totals">
        <div class:on={pick === 'free'}>
          <span class="k">free</span>
          <span class="v num">{seats <= FREE_SEATS ? '$0' : `up to ${FREE_SEATS} seats`}</span>
        </div>
        <div class:on={pick === 'team'}>
          <span class="k">team</span>
          <span class="v num"
            >{seats <= FREE_SEATS ? '$0' : fmt(teamShown.current)}<small>/ year</small></span
          >
        </div>
        <div class:on={pick === 'enterprise'}>
          <span class="k">enterprise</span>
          <span class="v num"
            >{fmt(entShown.current)}<small
              >/ year{seats < ENTERPRISE_MIN_SEATS
                ? ` at ${ENTERPRISE_MIN_SEATS} seats`
                : ''}</small
            ></span
          >
        </div>
      </div>
      <p class="fine">
        Pay by card. The licence token appears on your licence page and by email; paste it into the
        admin page. Renewals reissue the same licence. Prices in USD, issued by {COMPANY}.
        <a href={URL_DOCS_LICENSING} target="_blank" rel="noopener noreferrer"
          >How licensing works</a
        >.
      </p>
    </div>
    <Trial />
  </div>
</section>

<style>
  .cols {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .plan {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 30px 28px;
    background: var(--bg);
    transition: background 0.2s ease;
  }
  .plan.hot {
    background: var(--panel);
    box-shadow: inset 0 1px 0 var(--accent);
  }
  .plan.pick {
    background: var(--panel-2);
  }
  header {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .tag {
    position: absolute;
    top: -2px;
    right: 0;
    padding: 2px 7px;
    border: 1px solid var(--accent-line);
    color: var(--accent);
    font-family: var(--mono);
    font-style: normal;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    animation: tag 0.3s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
  @keyframes tag {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
  }
  .price {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-top: 8px;
  }
  .big {
    font-family: var(--display);
    font-size: 40px;
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 1;
  }
  .per {
    font-family: var(--mono);
    color: var(--ink-2);
    font-size: var(--fs-sm);
  }
  header .muted {
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: 0.03em;
  }
  ul {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--fs-sm);
    color: var(--ink-2);
  }
  li::before {
    content: '+';
    margin-right: 10px;
    color: var(--accent);
    font-family: var(--mono);
  }

  .calc {
    margin-top: 20px;
    padding: 22px 26px;
    font-family: var(--mono);
  }
  .calc-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 12px;
  }
  .calc-head label {
    color: var(--ink-2);
    font-size: var(--fs-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .calc-head output {
    font-family: var(--display);
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    height: 28px;
    margin: 0;
    background: transparent;
    cursor: pointer;
  }
  input[type='range']:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  input[type='range']::-webkit-slider-runnable-track {
    height: 1px;
    background: linear-gradient(90deg, var(--accent) var(--p), var(--line-2) var(--p));
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -6.5px;
    border: 0;
    border-radius: 2px;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--bg);
    transition: transform 0.12s ease;
  }
  input[type='range']:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }
  input[type='range']::-moz-range-track {
    height: 1px;
    background: var(--line-2);
  }
  input[type='range']::-moz-range-progress {
    height: 1px;
    background: var(--accent);
  }
  input[type='range']::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border: 0;
    border-radius: 2px;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--bg);
  }
  .ticks {
    position: relative;
    height: 22px;
    margin-top: -6px;
    font-size: 10px;
    color: var(--ink-3);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .ticks span {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    white-space: nowrap;
  }
  .ticks i {
    width: 1px;
    height: 6px;
    background: var(--line-2);
  }
  .totals {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin-top: 18px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .totals div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 12px 14px;
    background: var(--panel);
    transition: background 0.2s ease;
  }
  .totals div.on {
    background: var(--bg);
    box-shadow: inset 0 1px 0 var(--accent);
  }
  .totals .k {
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .totals .v {
    font-family: var(--display);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .totals small {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--ink-2);
    margin-left: 6px;
  }
  .fine {
    margin-top: 14px;
    color: var(--ink-3);
    font-size: var(--fs-xs);
  }
  @media (max-width: 900px) {
    .cols {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 560px) {
    .totals {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
