<script lang="ts">
  import { reveal } from '$lib/reveal'
  import { URL_DOCS } from '$lib/const'

  const features = [
    {
      n: '01',
      title: 'autocomplete',
      body: 'Fill-in-the-middle suggestions as you type, streamed as ghost text. twinny sees the code around the cursor, your open files and your recent edits, and stops the stream when the suggestion reaches a sensible end.',
      demo: [
        ['dim', 'const user = await db.users.'],
        ['ghost', 'findUnique({ where: { id } })']
      ],
      doc: 'features/code-completion/'
    },
    {
      n: '02',
      title: 'chat that knows the repo',
      body: 'Type @ to attach a file, a symbol, the current problems, the git diff, the terminal’s last output, or a search of the workspace index. Every source is bounded, so a small model is never swamped.',
      demo: [
        ['acc', '@files  @symbols  @workspace'],
        ['acc', '@problems  @git  @terminal']
      ],
      doc: 'features/chat/'
    },
    {
      n: '03',
      title: 'inline edit',
      body: 'Ctrl+I, describe the change, and the result streams into the editor as a diff. Accept or reject per hunk, refine with another instruction, and nothing is kept until you say so.',
      demo: [
        ['del', '- for (let i = 0; i < xs.length; i++)'],
        ['add', '+ for (const x of xs)']
      ],
      doc: 'features/inline-edit/'
    },
    {
      n: '04',
      title: 'workspace index',
      body: 'Embeds the workspace with your embeddings model into a hybrid keyword and vector index, reranked before it reaches the prompt. Updated on save, rebuilt only when the model changes.',
      demo: [
        ['dim', '1,204 files · 18,932 chunks'],
        ['acc', 'nomic-embed-text · up to date']
      ],
      doc: 'features/workspace-index/'
    },
    {
      n: '05',
      title: 'code review',
      body: 'Review the working tree, the branch against a base, or a GitHub pull request. The diff is split into parts sized for the model’s context window, and the review lands in chat so you can ask follow-ups.',
      demo: [
        ['dim', 'review branch  ent → main'],
        ['acc', '34 files · 3 parts · streaming']
      ],
      doc: 'features/code-review/'
    },
    {
      n: '06',
      title: 'terminal',
      body: 'Describe a command and get one line for your shell and platform, shown before it runs. When a command fails, twinny reads the output, finds the file and line, and offers the fix as a diff.',
      demo: [
        ['dim', '$ npm test  ✗  src/app.ts:42'],
        ['acc', 'fix in editor  ·  ask in chat']
      ],
      doc: 'features/terminal/'
    }
  ]

  const also = [
    'commit messages',
    'next-edit suggestions',
    'prompt templates',
    'full-screen chat',
    'status bar and logs',
    'per-language toggles'
  ]
</script>

<section class="section" id="features">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">features</span>
        <h2>Everything you would expect. On models you chose.</h2>
      </div>
      <p>
        Each feature is a small, explicit thing in the editor, designed to work well with a 7B model
        on a laptop and to get out of the way.
      </p>
    </div>

    <div class="grid">
      {#each features as f, i}
        <article class="card" use:reveal={i * 60}>
          <header>
            <span class="n num">{f.n}</span>
            <h3>{f.title}</h3>
          </header>
          <p>{f.body}</p>
          <div class="demo" aria-hidden="true">
            {#each f.demo as [kind, line]}
              <span class={kind}>{line}</span>
            {/each}
          </div>
          <a class="doc" href="{URL_DOCS}{f.doc}" target="_blank" rel="noopener noreferrer"
            >docs →</a
          >
        </article>
      {/each}
    </div>

    <div class="also">
      <span class="label bare">also</span>
      <ul>
        {#each also as a}<li>{a}</li>{/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 28px 26px 26px;
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
    color: var(--accent);
    font-size: var(--fs-xs);
    letter-spacing: 0.1em;
  }
  h3 {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .card p {
    color: var(--ink-2);
    font-size: var(--fs-sm);
    line-height: 1.65;
    flex: 1;
  }
  .demo {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    background: var(--bg-2);
    font-size: 11px;
    line-height: 1.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  .demo .acc {
    color: var(--accent);
  }
  .demo .del {
    color: var(--bad);
  }
  .demo .add {
    color: var(--accent);
  }
  .doc {
    align-self: flex-start;
    border: 0;
    color: var(--ink-3);
    font-size: var(--fs-xs);
    letter-spacing: 0.06em;
  }
  .card:hover .doc {
    color: var(--accent);
  }
  .also {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 24px;
    margin-top: 28px;
  }
  .also ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--fs-sm);
    color: var(--ink-2);
  }
  .also li::before {
    content: '+ ';
    color: var(--ink-3);
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
