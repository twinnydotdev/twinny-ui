// The pages under /with and /for: one search intent each, built from this file. Facts about a
// runtime come from its page in ../twinny-docs/src/content/docs/providers; keep them in step.
import { URL_DOCS, PRICE_TEAM, FREE_SEATS, TRIAL_DAYS } from './const'

export interface Intent {
  /** URL: /with/<slug> for a runtime, /for/<slug> for a situation. */
  kind: 'with' | 'for'
  slug: string
  /** The search phrase, used in the title. */
  phrase: string
  title: string
  description: string
  h1: string
  intro: string
  /** Numbered: what to do. */
  steps: string[]
  /** [heading, text] */
  points: [string, string][]
  faq: [string, string][]
  /** Docs page for the details, relative to URL_DOCS. */
  doc: string
  docLabel: string
}

const TEAM_POINT: [string, string] = [
  'One gateway for the team',
  `twinny-server sits on the machine with the models and gives every developer a key, usage per person, policy and an admin page. Free for ${FREE_SEATS} developers, $${PRICE_TEAM} a seat after that, ${TRIAL_DAYS}-day trial.`
]

export const INTENTS: Intent[] = [
  {
    kind: 'with',
    slug: 'ollama',
    phrase: 'VS Code extension for Ollama',
    title: 'twinny: the VS Code extension for Ollama',
    description:
      'Code completion, chat, inline edit and code review in VS Code against Ollama on your machine. Found on port 11434 at first start, models picked from ollama list. Open source, free.',
    h1: 'VS Code, with Ollama doing the work.',
    intro:
      'Ollama is the local server twinny supports best. It runs as a background service, pulls models with one command, and has native endpoints for completion and embeddings as well as an OpenAI-compatible chat API. twinny finds it on its usual port the first time it starts and sets up a provider for every job it has a model for.',
    steps: [
      'Install Ollama from ollama.com and pull a chat model, a small completion model, and an embedding model if you want the workspace index.',
      'Install twinny from the Marketplace. On first start it finds Ollama on port 11434 and lists its models; pick one per job.',
      'Type. Completions appear as ghost text; Ctrl+I edits in place; the sidebar has chat, review and the index.'
    ],
    points: [
      [
        'Native endpoints',
        'Autocomplete uses /api/generate with a fill-in-the-middle template chosen from the model name; embeddings use /api/embed; chat uses the /v1 chat API. Model names are Ollama tags, exactly as ollama list prints them.'
      ],
      [
        'Another machine, same Ollama',
        'Pair two of your computers with a code and use the GPU on the other one over an encrypted peer-to-peer link. No account, no relay.'
      ],
      [
        'Tuned for small models',
        'Completion is cut off at a sensible end and works well with a 1.5B to 7B coder model; chat and edits are happy on 7B.'
      ],
      TEAM_POINT
    ],
    faq: [
      [
        'Which Ollama models should I use?',
        'A coder instruct model for chat and edits, a small base coder model for completion, and an embedding model for the index. The supported-models page in the docs lists what works on what hardware.'
      ],
      [
        'Does twinny need Ollama running on the same machine?',
        'No. Point a provider at any Ollama address on your network, pair a second computer through Devices, or run a team gateway in front of it.'
      ],
      [
        'Does anything leave my machine?',
        'Only the requests to the Ollama address you configured. No telemetry, no account, no update check.'
      ]
    ],
    doc: 'providers/ollama/',
    docLabel: 'Ollama in the docs'
  },
  {
    kind: 'with',
    slug: 'llama-cpp',
    phrase: 'VS Code with llama.cpp',
    title: 'twinny: VS Code code completion and chat with llama.cpp',
    description:
      'Use llama-server from llama.cpp for autocomplete, chat, inline edit and code review in VS Code. Your GGUF, your context size, your GPU offload. Open source, free.',
    h1: 'VS Code, straight onto llama-server.',
    intro:
      'llama.cpp is the engine behind most local servers. Running its own llama-server gives you full control of the model file, context size, GPU offload and threads, with the least overhead. twinny talks to it directly: one server per model, on whatever ports you choose.',
    steps: [
      'Download a GGUF and start llama-server with the context size and GPU offload you want. Add --embedding if the same server should answer embedding requests.',
      'In twinny, Add provider, then llama.cpp. Set the port for each job; a second llama-server on another port can serve a smaller completion model.',
      'Type. Completions stream as ghost text; the fill-in-the-middle template is picked from the model name, or by hand for a renamed file.'
    ],
    points: [
      [
        'Nothing between you and the model',
        'No daemon, no model manager: the GGUF you chose, the flags you set. twinny sends the prompt and shows the answer.'
      ],
      [
        'One server per job',
        'A 7B instruct model on one port for chat and edits, a 1.5B base model on another for completion. Each provider in twinny points at its own port.'
      ],
      [
        'Every feature',
        'Autocomplete, chat with @-mentions of files, symbols, the diff and the terminal, inline edit as a reviewable diff, code review of a branch or a pull request.'
      ],
      TEAM_POINT
    ],
    faq: [
      [
        'Which template does completion use?',
        'twinny detects the fill-in-the-middle template from the model name (Qwen, CodeLlama, DeepSeek, StarCoder and others). If a file is renamed, choose the template in the provider.'
      ],
      [
        'Can one llama-server do everything?',
        'It can serve chat and completion for one model. For a smaller completion model, run a second server on another port. Embeddings need --embedding on the server that answers them.'
      ],
      [
        'Does twinny support the llama.cpp infill endpoint?',
        'twinny renders the fill-in-the-middle prompt itself and sends it to the completion route, so any llama-server build works.'
      ]
    ],
    doc: 'providers/llama-cpp/',
    docLabel: 'llama.cpp in the docs'
  },
  {
    kind: 'with',
    slug: 'lm-studio',
    phrase: 'VS Code with LM Studio',
    title: 'twinny: VS Code code completion and chat with LM Studio',
    description:
      "Use LM Studio's local server for autocomplete, chat, inline edit and code review in VS Code. Start the server on port 1234, add the provider, type. Open source, free.",
    h1: 'VS Code, with LM Studio behind it.',
    intro:
      "LM Studio is a desktop app for finding, downloading and running models with a graphical interface. Its OpenAI-compatible local server can serve all three of twinny's jobs: chat, completion and embeddings. twinny asks the server what it has loaded and fills in the model for each.",
    steps: [
      'In LM Studio, download an instruct coder model for chat, a small base coder model for completion, and an embedding model if you want the index. Start the server on the Developer tab; the default port is 1234.',
      'In twinny, Add provider, then LM Studio. It lists the models the server reports and picks the first match for each job.',
      'Type. If a request says the model is not found, load it in LM Studio or switch on just-in-time loading.'
    ],
    points: [
      [
        'Several models at once',
        'LM Studio can keep more than one model loaded when memory allows, so chat and completion can be different models on the same server.'
      ],
      [
        'Another machine',
        "Turn on Serve on Local Network in LM Studio and point the provider at that machine's address."
      ],
      [
        'Context per model',
        "The context length is set per model in LM Studio's settings. Raise it for code review and long chats."
      ],
      TEAM_POINT
    ],
    faq: [
      [
        'What is the model name?',
        "The identifier LM Studio's server reports, shown on the Developer tab; usually the repository name in lower case."
      ],
      [
        'Which routes does twinny use?',
        'Chat on /v1, completion on /v1/completions with a fill-in-the-middle prompt, embeddings on /v1/embeddings.'
      ],
      [
        'Does anything leave my machine?',
        'Only the requests to the LM Studio address you configured. No telemetry, no account.'
      ]
    ],
    doc: 'providers/lm-studio/',
    docLabel: 'LM Studio in the docs'
  },
  {
    kind: 'for',
    slug: 'air-gapped',
    phrase: 'an air-gapped AI coding assistant',
    title: 'twinny: an air-gapped AI coding assistant for VS Code',
    description:
      'AI code completion, chat and review on a network with no internet at all. The extension, the gateway and the licence check all work offline. Open source, free for five developers.',
    h1: 'Works on a network with no internet. All of it.',
    intro:
      'Every part of twinny runs without an internet connection: the extension in VS Code, the model server it talks to, the team gateway, and the licence check, which is a signature verified against a public key built into the gateway. Nothing phones home because there is nothing to phone.',
    steps: [
      'Bring the extension in as a VSIX and the model weights on whatever medium your network allows. Install a model server on a machine inside.',
      'Run twinny-server on that machine: one process, no dependencies, a config file. Give each developer a key from the admin page.',
      'Install the licence token, if you have one, by pasting it on the admin page. It is checked locally and never again.'
    ],
    points: [
      [
        'No call home, by construction',
        'The extension makes no request except to the server you configured. The gateway never contacts twinny, not even to check the licence. The privacy page lists every request the software can make.'
      ],
      [
        'Records you control',
        'By default the gateway keeps time, key, model and outcome per request, on its own disk, for 30 days. Recording content is a separate switch, off by default and disclosed to every developer.'
      ],
      [
        'An audit trail',
        'Every admin change goes to a hash-chained log with filters and export. Read-only admin keys let an auditor look without touching. Prometheus metrics at /metrics.'
      ],
      [
        'Open source, all of it',
        'The extension, the gateway and the licence verification are MIT. A security review can read what handles the code before anyone signs anything.'
      ]
    ],
    faq: [
      [
        'How is the licence checked without internet?',
        'The token carries the organisation, seat count, dates and features, signed with Ed25519. The gateway verifies the signature against a public key it ships with. That is the whole check.'
      ],
      [
        'How do developers get the extension?',
        'From the Marketplace where there is access, or as a VSIX file installed by hand or through your own extension gallery.'
      ],
      [
        'What about updates?',
        'twinny never checks for them. You bring a new VSIX or a new twinny-server package in when you choose to.'
      ]
    ],
    doc: 'teams/gateway/',
    docLabel: 'Running a gateway'
  },
  {
    kind: 'for',
    slug: 'regulated-teams',
    phrase: 'an AI coding assistant for banks and regulated teams',
    title: 'twinny: AI code completion for banks, defence and regulated teams',
    description:
      'An AI coding assistant your security review can approve: code never leaves the network, no vendor account, an audit log, read-only admin access, open source. Free for five developers.',
    h1: 'Built for code that cannot leave the building.',
    intro:
      'Banks, exchanges, defence, healthcare, anyone shipping under NDA: the question is never whether the assistant is good, it is where the code goes. With twinny it goes to a server you run and nowhere else, and the answers a security review asks for are on one page.',
    steps: [
      'Run a model server on your own hardware or a private inference endpoint, and twinny-server in front of it, inside the network.',
      'Give each developer a key from the admin page. Set team policy: which providers may be used, which models, a system prompt before every chat.',
      'Hand the auditor a read-only admin key and the export of the hash-chained audit log.'
    ],
    points: [
      [
        'Where the code goes',
        'To the server you configured, over your network, and to nothing else. No vendor account, no telemetry, no update check. Works with no internet at all.'
      ],
      [
        'Policy the extension enforces',
        'Team-only providers, locked models, routing rules that keep a workspace on local backends, a team system prompt. Shown to every developer for consent before they connect.'
      ],
      [
        'Recording, if you need it',
        'Keep prompts and replies on the gateway for review, audit and training data. Off by default, disclosed to every developer, deleted after a retention period you set.'
      ],
      [
        'Procurement-shaped billing',
        `$${PRICE_TEAM} a seat by card, or an invoice or purchase order from ${50} seats with a named contact. One organisation licence covers any number of gateways.`
      ]
    ],
    faq: [
      [
        'Is there a DPA, or a vendor to assess?',
        'There is no data to process: twinny receives nothing. The assessment is of software you run, and its source is public.'
      ],
      [
        'Can we restrict which models developers use?',
        'Yes. Team policy can lock the defaults and forbid any provider other than the gateway.'
      ],
      [
        'Who sees usage?',
        'Admins see requests, failures and tokens per developer and model on the admin page. Content is never recorded unless an admin switches recording on, and then every developer is told.'
      ]
    ],
    doc: 'teams/policy/',
    docLabel: 'Team policy in the docs'
  }
]

export const intentPath = (i: Intent) => `/${i.kind}/${i.slug}`
export const intentDoc = (i: Intent) => URL_DOCS + i.doc
