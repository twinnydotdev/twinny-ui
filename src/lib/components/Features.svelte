<script lang="ts">
  import { reveal } from '$lib/reveal'
  import { URL_DOCS } from '$lib/const'
  import { pointer } from '$lib/motion'

  const features = [
    {
      n: '01',
      title: 'Autocomplete',
      body: 'Fill-in-the-middle suggestions as you type, streamed as ghost text and cut off at a sensible end. Tuned to work well with a 7B model.',
      demo: [
        ['dim', 'const user = await db.users.'],
        ['ghost', 'findUnique({ where: { id } })']
      ],
      doc: 'features/code-completion/'
    },
    {
      n: '02',
      title: 'Chat that knows the repo',
      body: 'Type @ to attach a file, a symbol, the problems panel, the git diff, the terminal, or a search of the workspace index.',
      demo: [
        ['acc', '@files  @symbols  @workspace'],
        ['acc', '@problems  @git  @terminal']
      ],
      doc: 'features/chat/'
    },
    {
      n: '03',
      title: 'Inline edit',
      body: 'Ctrl+I, describe the change, review it as a diff in the editor. Accept or reject per hunk. Nothing is kept until you say so.',
      demo: [
        ['del', '- for (let i = 0; i < xs.length; i++)'],
        ['add', '+ for (const x of xs)']
      ],
      doc: 'features/inline-edit/'
    },
    {
      n: '04',
      title: 'Workspace index',
      body: 'A hybrid keyword and vector index of the workspace, reranked before it reaches the prompt and updated on save.',
      demo: [
        ['dim', '1,204 files · 18,932 chunks'],
        ['acc', 'index up to date']
      ],
      doc: 'features/workspace-index/'
    },
    {
      n: '05',
      title: 'Code review',
      body: 'Review the working tree, a branch against its base, or a GitHub pull request. The review lands in chat so you can ask follow-ups.',
      demo: [
        ['dim', 'review branch  feature → main'],
        ['acc', '34 files · 3 parts · streaming']
      ],
      doc: 'features/code-review/'
    },
    {
      n: '06',
      title: 'Terminal',
      body: 'Write a command from a description, shown before it runs. When one fails, twinny finds the file and line and offers the fix as a diff.',
      demo: [
        ['dim', '$ npm test  ✗  src/app.ts:42'],
        ['acc', 'fix in editor  ·  ask in chat']
      ],
      doc: 'features/terminal/'
    }
  ]
</script>

<section class="section" id="features">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">features</span>
        <h2>Everything you expect from an assistant. Nothing you don't.</h2>
      </div>
      <p>
        Small, explicit features in the editor. Every one is a plain VS Code command you can rebind.
      </p>
    </div>

    <div class="grid" use:pointer>
      {#each features as f, i}
        <article class="card" use:reveal={i * 60}>
          <header>
            <span class="n num">{f.n}</span>
            <h3>{f.title}</h3>
          </header>
          <p>{f.body}</p>
          <div class="demo" aria-hidden="true">
            {#each f.demo as [kind, line], k}
              <span class={kind} class:last={k === f.demo.length - 1}>{line}</span>
            {/each}
          </div>
          <a class="doc" href="{URL_DOCS}{f.doc}" target="_blank" rel="noopener noreferrer"
            >docs →</a
          >
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  /* The hairlines between cards light up around the pointer. Cards are opaque,
     so only the 1px gaps show the glow. */
  .grid::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: radial-gradient(
      440px circle at var(--mx, -999px) var(--my, -999px),
      var(--accent),
      transparent 65%
    );
    opacity: calc(var(--hover, 0) * 0.9);
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .card {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px 26px 24px;
    background: var(--bg);
    transition: background 0.18s ease;
  }
  .card:hover {
    background: var(--panel);
  }
  .card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .card:hover::before {
    width: 100%;
  }
  header {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  .n {
    font-family: var(--mono);
    color: var(--accent);
    font-size: var(--fs-xs);
    letter-spacing: 0.1em;
  }
  h3 {
    font-size: 19px;
    letter-spacing: -0.02em;
  }
  .card p {
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.6;
    flex: 1;
  }
  .demo {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    background: var(--bg-2);
    font-family: var(--mono);
    font-size: 11px;
    line-height: 1.6;
    white-space: nowrap;
    overflow: hidden;
  }
  .demo span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .demo .dim {
    color: var(--ink-3);
  }
  .demo .ghost {
    color: var(--ink-3);
    font-style: italic;
  }
  .demo .acc,
  .demo .add {
    color: var(--accent);
  }
  .demo .del {
    color: var(--bad);
  }
  /* On hover the demo replays: ghost text types in, the last line lands. */
  .card:hover .demo .ghost {
    animation: type 0.8s steps(26) both;
  }
  .card:hover .demo .ghost::after {
    content: '';
    display: inline-block;
    width: 6px;
    height: 1em;
    margin-left: 2px;
    vertical-align: -0.15em;
    background: var(--accent);
    animation: blink 0.9s steps(1) infinite;
  }
  .card:hover .demo .last:not(.ghost) {
    animation: land 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both;
  }
  .card:hover .demo .del {
    animation: strike 0.5s ease 0.3s forwards;
  }
  @keyframes type {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  @keyframes land {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
  }
  @keyframes strike {
    to {
      opacity: 0.45;
      text-decoration: line-through;
    }
  }
  .doc {
    align-self: flex-start;
    border: 0;
    color: var(--ink-3);
    font-family: var(--mono);
    font-size: var(--fs-xs);
    letter-spacing: 0.06em;
  }
  .card:hover .doc {
    color: var(--accent);
  }
  @media (max-width: 960px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 620px) {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
