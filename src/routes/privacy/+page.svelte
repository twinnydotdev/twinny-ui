<svelte:head>
  <title>privacy — twinny</title>
  <meta
    name="description"
    content="What twinny, twinny-server and this website collect. Short answer: nothing."
  />
</svelte:head>

<section class="section">
  <div class="wrap doc">
    <span class="label">privacy</span>
    <h1>What is collected</h1>
    <h2>the extension</h2>
    <p>
      twinny sends prompts to the inference server you configured and to nobody else. It makes no
      other network requests: no update check, no crash reporting, no usage statistics. Chat history
      and the workspace index are stored on your machine, under <code>~/.twinny</code>
      and VS Code's own storage, and are yours to delete.
    </p>
    <h2>twinny-server</h2>
    <p>
      By default the gateway records the time, capability, key name, model alias, outcome and
      duration of each request, in files on the machine it runs on, deleted after 30 days. It never
      contacts twinny or rjmacarthy.xyz, including to check a licence.
    </p>
    <p>
      An administrator with a licence can switch on recording of request content per route: chat,
      autocomplete or embeddings. Records stay on the gateway, are deleted after 90 days by default,
      and every developer sees what is recorded before they connect and while they are connected.
      Whether to record is the team's decision, not ours.
    </p>
    <p>
      A developer can share their computer with the team. Teammates' prompts then run on that
      machine through the local server the sharer chose, streamed back through the gateway and not
      kept on the sharer's machine. Usage records name the machine that served each request. Every
      developer is told which models may run on a teammate's computer before they connect.
    </p>
    <h2>buying a licence</h2>
    <p>
      Checkout runs on Stripe. rjmacarthy.xyz keeps a record of each licence issued: organisation
      name, seat count, expiry and the email the token was sent to. Nothing about your gateway or
      its use is ever sent to us.
    </p>
    <h2>this website</h2>
    <p>
      Static pages. Fonts are served from this domain. The site uses Google Analytics to count
      visits; nothing you type into twinny or your gateway ever reaches it. The server keeps
      ordinary access logs for a short time to keep the site up. The contact form sends what you
      type as one email to us through Resend, a mail API; the site keeps no copy.
    </p>
    <p class="muted">
      twinny is made by <a href="https://rjmacarthy.xyz">rjmacarthy.xyz</a>. Questions: the
      <a href="/#contact">contact form</a>
      or
      <a href="https://x.com/twinnydotdev">@twinnydotdev</a>.
    </p>
    <p><a href="/">← back</a></p>
  </div>
</section>

<style>
  .doc {
    max-width: 68ch;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  h1 {
    font-size: clamp(28px, 4vw, 40px);
    margin: 12px 0 10px;
  }
  h2 {
    font-size: 16px;
    margin-top: 18px;
  }
  p {
    color: var(--ink-2);
  }
</style>
