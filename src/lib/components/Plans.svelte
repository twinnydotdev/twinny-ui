<script lang="ts">
  import { reveal } from '$lib/reveal'
  import { URL_DOCS_LICENSING, URL_MARKETPLACE, URL_X, URL_DISCUSSIONS } from '$lib/const'
</script>

<section class="section plans" id="plans">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">plans</span>
        <h2>Free for you. Free for five of you.</h2>
      </div>
      <p>
        A seat is an active key on the gateway. Revoked keys do not count, so offboarding frees the
        seat at once. Everything the gateway does is in both plans.
      </p>
    </div>

    <div class="cols">
      <article class="plan" use:reveal={0}>
        <header>
          <span class="label bare">individual</span>
          <h3>free</h3>
          <span class="muted">forever · MIT</span>
        </header>
        <ul>
          <li>the whole extension</li>
          <li>any provider, local or hosted</li>
          <li>no account, no telemetry</li>
        </ul>
        <a class="btn" href={URL_MARKETPLACE} target="_blank" rel="noopener noreferrer">install</a>
      </article>

      <article class="plan" use:reveal={80}>
        <header>
          <span class="label bare">team · twinny-server</span>
          <h3>free <span class="dim">/ 5 seats</span></h3>
          <span class="muted">permanent</span>
        </header>
        <ul>
          <li>the gateway, admin page, usage per developer</li>
          <li>key management and sign-in with a code</li>
          <li>live configuration, any backend</li>
        </ul>
        <a class="btn" href={URL_DOCS_LICENSING} target="_blank" rel="noopener noreferrer"
          >how seats work</a
        >
      </article>

      <article class="plan hot" use:reveal={160}>
        <header>
          <span class="label bare">team · licensed</span>
          <h3>per seat <span class="dim">/ year</span></h3>
          <span class="muted">as many seats as you buy</span>
        </header>
        <ul>
          <li>everything in the free team plan</li>
          <li>seats beyond five</li>
          <li>team policy: allowed providers, locked defaults</li>
          <li>a signed token you install once; the gateway never calls home to check it</li>
        </ul>
        <div class="row">
          <a class="btn primary" href={URL_X} target="_blank" rel="noopener noreferrer"
            >message @twinnydotdev</a
          >
          <a href={URL_DISCUSSIONS} target="_blank" rel="noopener noreferrer"
            >or open a discussion</a
          >
        </div>
      </article>
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
  }
  .plan.hot {
    background: var(--panel);
    box-shadow: inset 0 1px 0 var(--accent);
  }
  header {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  h3 {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.04em;
    margin-top: 6px;
  }
  h3 .dim {
    font-size: 16px;
    font-weight: 400;
  }
  header .muted {
    font-size: var(--fs-xs);
    letter-spacing: 0.04em;
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
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 18px;
    font-size: var(--fs-sm);
  }
  @media (max-width: 900px) {
    .cols {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
