<script lang="ts">
  import { reveal } from '$lib/reveal'
  import {
    URL_MARKETPLACE,
    URL_BUY_TEAM,
    URL_BUY_ENTERPRISE,
    URL_DOCS_LICENSING,
    PRICE_TEAM,
    PRICE_ENTERPRISE,
    FREE_SEATS,
    ENTERPRISE_MIN_SEATS,
    COMPANY
  } from '$lib/const'

  let seats = $state(20)
  const fmt = (n: number) => '$' + n.toLocaleString('en')
  const teamYear = $derived(seats <= FREE_SEATS ? 0 : seats * PRICE_TEAM * 12)
  const entYear = $derived(Math.max(seats, ENTERPRISE_MIN_SEATS) * PRICE_ENTERPRISE * 12)
  const pick = $derived(
    seats <= FREE_SEATS ? 'free' : seats >= ENTERPRISE_MIN_SEATS ? 'enterprise' : 'team'
  )
</script>

<section class="section pricing" id="pricing">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">pricing</span>
        <h2>Per seat, per year. No quote, no call.</h2>
      </div>
      <p>
        A seat is an active key on your gateway. Revoke a key and the seat is free again. The editor
        and the gateway are the same in every tier; you are paying for seats, policy and recording.
      </p>
    </div>

    <div class="cols">
      <article class="plan" class:pick={pick === 'free'} use:reveal={0}>
        <header>
          <span class="label bare">free</span>
          <div class="price"><span class="big">$0</span></div>
          <span class="muted">forever · up to {FREE_SEATS} seats on a gateway</span>
        </header>
        <ul>
          <li>the whole extension, MIT</li>
          <li>twinny-server with admin page and usage</li>
          <li>any provider, local or hosted</li>
          <li>pool teammates' computers as a backend</li>
        </ul>
        <a class="btn" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">install</a>
      </article>

      <article class="plan hot" class:pick={pick === 'team'} use:reveal={80}>
        <header>
          <span class="label bare">team</span>
          <div class="price">
            <span class="big">${PRICE_TEAM}</span><span class="per">/ seat / month</span>
          </div>
          <span class="muted">billed yearly · from {FREE_SEATS + 1} seats</span>
        </header>
        <ul>
          <li>everything in free</li>
          <li>as many seats as you buy</li>
          <li>policy: allowed providers, locked team models</li>
          <li>a signed token; the gateway never calls home to check it</li>
        </ul>
        <a class="btn primary" href={URL_BUY_TEAM} target="_blank" rel="noopener noreferrer"
          >buy seats</a
        >
      </article>

      <article class="plan" class:pick={pick === 'enterprise'} use:reveal={160}>
        <header>
          <span class="label bare">enterprise</span>
          <div class="price">
            <span class="big">${PRICE_ENTERPRISE}</span><span class="per">/ seat / month</span>
          </div>
          <span class="muted">billed yearly · from {ENTERPRISE_MIN_SEATS} seats</span>
        </header>
        <ul>
          <li>everything in team</li>
          <li>recording: keep prompts and replies on your gateway for audit and training export</li>
          <li>several gateways under one licence</li>
          <li>priority support with a named contact</li>
          <li>procurement paperwork: security questionnaire, DPA, invoicing</li>
        </ul>
        <a class="btn" href={URL_BUY_ENTERPRISE} target="_blank" rel="noopener noreferrer"
          >buy seats</a
        >
      </article>
    </div>

    <div class="calc panel" use:reveal={200}>
      <div class="calc-head">
        <label for="seats">how many developers?</label>
        <output for="seats" class="num">{seats}</output>
      </div>
      <input id="seats" type="range" min="1" max="500" step="1" bind:value={seats} />
      <div class="totals">
        <div class:on={pick === 'free'}>
          <span class="k">free</span>
          <span class="v num">{seats <= FREE_SEATS ? '$0' : `up to ${FREE_SEATS} seats`}</span>
        </div>
        <div class:on={pick === 'team'}>
          <span class="k">team</span>
          <span class="v num"
            >{seats <= FREE_SEATS ? '$0' : fmt(teamYear)}<small>/ year</small></span
          >
        </div>
        <div class:on={pick === 'enterprise'}>
          <span class="k">enterprise</span>
          <span class="v num"
            >{fmt(entYear)}<small
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
    display: flex;
    flex-direction: column;
    gap: 6px;
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
    width: 100%;
    margin: 0;
    accent-color: var(--accent);
    cursor: pointer;
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
