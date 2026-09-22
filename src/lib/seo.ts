// Structured data, emitted as a string: Svelte reads the braces of inline JSON as expressions,
// so a literal <script type="application/ld+json"> in a component renders empty.
import { URL_SITE, URL_MARKETPLACE, PRICE_TEAM, FREE_SEATS, TRIAL_DAYS } from './const'
import { INSTALLS, RATING, RATING_COUNT } from './stats'

export const jsonLd = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

export const softwareApplication = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'twinny',
  url: URL_SITE + '/',
  downloadUrl: URL_MARKETPLACE,
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'AI coding assistant',
  operatingSystem: 'Windows, macOS, Linux (Visual Studio Code 1.93 or newer)',
  softwareRequirements: 'Visual Studio Code',
  license: 'https://opensource.org/licenses/MIT',
  isAccessibleForFree: true,
  description:
    'Self-hosted AI coding assistant for VS Code: code completion, chat, inline edit and code review on a model server you run. Open source, no telemetry.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      description: `Free for individuals and teams of up to ${FREE_SEATS}.`
    },
    {
      '@type': 'Offer',
      name: 'Team',
      price: String(PRICE_TEAM),
      priceCurrency: 'USD',
      description: `Per seat per month beyond the free ${FREE_SEATS}, billed yearly. ${TRIAL_DAYS}-day trial.`
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: RATING,
    ratingCount: RATING_COUNT,
    bestRating: 5,
    worstRating: 1
  },
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: 'https://schema.org/DownloadAction',
    userInteractionCount: INSTALLS
  },
  author: { '@type': 'Organization', name: 'twinny', url: URL_SITE }
})

export const faqPage = (qa: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
})

export const breadcrumbs = (trail: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: URL_SITE + path
  }))
})

/** The questions the pricing section answers, as the docs answer them. */
export const HOME_FAQ: [string, string][] = [
  [
    'Is twinny free?',
    `Yes. The VS Code extension is MIT licensed and free for everyone. The team gateway, twinny-server, is free for up to ${FREE_SEATS} developers on a gateway, for good.`
  ],
  [
    'Does my code leave my network?',
    'No. The extension talks only to the model server you configure: on your machine, on another of your computers, or on a gateway on your network. There is no account, no telemetry and no call home, and the licence check runs offline.'
  ],
  [
    'Which model servers work with twinny?',
    'Any OpenAI-compatible server, plus native support for Ollama, llama.cpp and LM Studio. A team can also pool its own computers behind one gateway.'
  ],
  [
    'What does a team seat cost?',
    `$${PRICE_TEAM} per seat per month beyond the free ${FREE_SEATS}, billed yearly. A seat is an active key on your gateway; revoke a key and the seat is free again. A ${TRIAL_DAYS}-day trial with every feature is issued by email, no card.`
  ],
  [
    'Does twinny work with no internet access?',
    'Yes. Everything, the licence check included, works on a network with no internet connection.'
  ]
]
