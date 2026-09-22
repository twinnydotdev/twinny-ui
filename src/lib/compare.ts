// The comparison pages under /vs. The only place on the site that names another product.
// Every vendor fact here was read from the vendor's own pricing page on the date below; when
// one changes, change it here and the date with it. Prices are list prices, per user, per month.
import { PRICE_TEAM, FREE_SEATS } from './const'

export const CHECKED = 'September 2026'

export interface Rival {
  slug: string
  name: string
  /** The search phrase the page answers, e.g. "self-hosted GitHub Copilot alternative". */
  phrase: string
  title: string
  description: string
  intro: string
  /** Rows: [label, them, twinny]. */
  rows: [string, string, string][]
  /** Fair play: when the other product is the better choice. */
  pickThem: string[]
  pickUs: string[]
}

const TWINNY_PRICE = `Free for ${FREE_SEATS} seats on a gateway; $${PRICE_TEAM} per extra seat, billed yearly.`

export const RIVALS: Rival[] = [
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    phrase: 'a self-hosted GitHub Copilot alternative',
    title: 'twinny vs GitHub Copilot: the self-hosted alternative',
    description:
      'GitHub Copilot sends code to GitHub to be completed. twinny does the same job in VS Code against a model server on your own machine or network, open source and free for five developers.',
    intro:
      'Copilot is a hosted service: the editor sends your code to GitHub, and GitHub sends it on to the model. That is fine for most teams and impossible for some. twinny is the same set of features in VS Code against a model you run, so nothing leaves the building.',
    rows: [
      [
        'Where your code goes',
        "GitHub's servers, then the model provider",
        'Your own model server, on a laptop or in your data centre'
      ],
      ['Who runs the model', 'GitHub', 'You, on any OpenAI-compatible server'],
      ['Works with no internet', 'No', 'Yes'],
      ['Editor', 'VS Code, JetBrains, Visual Studio, Neovim, Xcode', 'VS Code'],
      ['Source', 'Closed', 'Open, MIT'],
      ['Account required', 'GitHub account per user', 'None'],
      [
        'Team administration',
        'Through the GitHub organisation',
        'twinny-server: keys, usage, policy and an admin page on your network'
      ],
      ['List price per user per month', 'Business $19, Enterprise $39', TWINNY_PRICE]
    ],
    pickThem: [
      'Your code is already on GitHub.com and your security review is fine with that.',
      'You want the frontier hosted models with nothing to run.',
      'You need JetBrains or Visual Studio, not VS Code.'
    ],
    pickUs: [
      'Code must not leave the network, or the network has no internet.',
      'You already have GPUs, or a private inference endpoint, and want them used.',
      'You want to read the source of the thing that reads your source.'
    ]
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    phrase: 'a self-hosted alternative to Cursor',
    title: 'twinny vs Cursor: keep VS Code, keep your code',
    description:
      'Cursor is a separate editor with hosted models behind it. twinny stays inside the VS Code you have, against a model server you run. Open source, free for five developers.',
    intro:
      'Cursor is an editor of its own, a fork of VS Code, with the AI features wired to models it hosts. twinny is an extension for the VS Code you already have, wired to a model server of your choosing. Which is right depends on whether a new editor is acceptable and whether your code may leave the machine.',
    rows: [
      [
        'Where your code goes',
        "Cursor's servers, then the model provider",
        'Your own model server, on a laptop or in your data centre'
      ],
      ['Who runs the model', 'Cursor', 'You, on any OpenAI-compatible server'],
      ['Works with no internet', 'No', 'Yes'],
      ['Editor', 'Its own editor, a VS Code fork', 'An extension for VS Code'],
      ['Source', 'Closed', 'Open, MIT'],
      ['Account required', 'Cursor account per user', 'None'],
      [
        'Team administration',
        "Cursor's dashboard",
        'twinny-server: keys, usage, policy and an admin page on your network'
      ],
      ['List price per user per month', 'Individual $20, Teams $40', TWINNY_PRICE]
    ],
    pickThem: [
      'You want the most polished hosted agent experience and a new editor is fine.',
      'Your team is small, unregulated, and nobody has to approve where code goes.'
    ],
    pickUs: [
      'Switching editors is not on the table, or extensions and settings must stay as they are.',
      'Code must not leave the network, or you have your own inference to use.',
      'You want to see what is sent, and to whom, in the source.'
    ]
  },
  {
    slug: 'tabnine',
    name: 'Tabnine',
    phrase: 'an open-source alternative to Tabnine',
    title: 'twinny vs Tabnine: on-prem without the enterprise contract',
    description:
      'Tabnine offers private and air-gapped deployment on its enterprise tier. twinny is on-prem by design, open source, free for five developers and $6 a seat after that.',
    intro:
      'Tabnine is the closest of the established tools: it can be deployed on your own infrastructure, air-gapped if needed, on its enterprise tier. twinny starts from that position for everyone. The difference is the contract, the price, and the source.',
    rows: [
      [
        'Where your code goes',
        'Tabnine SaaS, or your own deployment on the enterprise tier',
        'Your own model server, always'
      ],
      [
        'Who runs the model',
        'Tabnine, or you on the enterprise tier',
        'You, on any OpenAI-compatible server'
      ],
      ['Works with no internet', 'On the air-gapped enterprise deployment', 'Yes'],
      ['Editor', 'VS Code, JetBrains, Visual Studio, Eclipse and others', 'VS Code'],
      ['Source', 'Closed', 'Open, MIT'],
      ['Account required', 'Tabnine account per user', 'None'],
      [
        'Team administration',
        "Tabnine's admin console",
        'twinny-server: keys, usage, policy and an admin page on your network'
      ],
      [
        'List price per user per month',
        '$39, or $59 for the agentic tier, billed yearly',
        TWINNY_PRICE
      ]
    ],
    pickThem: [
      'You need JetBrains, Eclipse or Visual Studio as well as VS Code.',
      'You want a vendor to run the models for you and a contract to point at.'
    ],
    pickUs: [
      'You want on-prem at a price a team lead can approve without procurement.',
      'You already run a model server and want the editor side to just use it.',
      'You want to read the code that handles your code.'
    ]
  }
]
