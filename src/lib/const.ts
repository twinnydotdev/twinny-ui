export const URL_MARKETPLACE =
  'https://marketplace.visualstudio.com/items?itemName=rjmacarthy.Twinny'
// A real gateway with real models behind it, open to anyone: read-only admin page, guest keys for VS Code.
export const URL_DEMO = 'https://demo.twinny.dev'
export const URL_DOCS = 'https://twinnydotdev.github.io/twinny-docs/'
export const URL_DOCS_TEAMS = 'https://twinnydotdev.github.io/twinny-docs/teams/overview/'
export const URL_DOCS_LICENSING = 'https://twinnydotdev.github.io/twinny-docs/teams/licensing/'
export const URL_DOCS_QUICKSTART =
  'https://twinnydotdev.github.io/twinny-docs/getting-started/quick-start/'
export const URL_DOCS_PROVIDERS = 'https://twinnydotdev.github.io/twinny-docs/providers/'
export const URL_DOCS_PLUGINS = 'https://twinnydotdev.github.io/twinny-docs/teams/plugins/'
export const URL_DOCS_CHANGELOG = 'https://twinnydotdev.github.io/twinny-docs/reference/whats-new/'
export const URL_GITHUB = 'https://github.com/twinnydotdev/twinny'
export const URL_GITHUB_SERVER =
  'https://github.com/twinnydotdev/twinny/tree/main/packages/twinny-server'
export const URL_DISCUSSIONS = 'https://github.com/twinnydotdev/twinny/discussions'
export const URL_X = 'https://x.com/twinnydotdev'
export const URL_COMPANY = 'https://rjmacarthy.xyz'
export const COMPANY = 'rjmacarthy.xyz'

// Checkout. The Team link is a Stripe Payment Link (yearly, quantity is seats); the licence
// service (twinny-license serve) turns the payment into a token on its claim page.
// Enterprise is invoice or purchase order, so it goes through the contact form (#contact).
export const URL_BUY_TEAM = 'https://buy.stripe.com/eVq00igUndD80qW6AR7Zu00'

// Pricing, per seat per month, billed yearly.
export const PRICE_TEAM = 6
export const PRICE_ENTERPRISE = 10
export const FREE_SEATS = 5
export const ENTERPRISE_MIN_SEATS = 50
