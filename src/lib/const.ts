export const URL_MARKETPLACE =
  'https://marketplace.visualstudio.com/items?itemName=rjmacarthy.Twinny'
// A real gateway with real models behind it, open to anyone: read-only admin page, guest keys for VS Code.
export const URL_DEMO = 'https://demo.twinny.dev'
export const URL_DOCS = 'https://docs.twinny.dev/'
export const URL_DOCS_TEAMS = 'https://docs.twinny.dev/teams/overview/'
export const URL_DOCS_LICENSING = 'https://docs.twinny.dev/teams/licensing/'
export const URL_DOCS_QUICKSTART = 'https://docs.twinny.dev/getting-started/quick-start/'
export const URL_DOCS_PROVIDERS = 'https://docs.twinny.dev/providers/'
export const URL_DOCS_PLUGINS = 'https://docs.twinny.dev/teams/plugins/'
export const URL_DOCS_CHANGELOG = 'https://docs.twinny.dev/reference/whats-new/'
export const URL_GITHUB = 'https://github.com/twinnydotdev/twinny'
export const URL_GITHUB_SERVER =
  'https://github.com/twinnydotdev/twinny/tree/main/packages/twinny-server'
export const URL_DISCUSSIONS = 'https://github.com/twinnydotdev/twinny/discussions'
export const URL_X = 'https://x.com/twinnydotdev'
export const URL_COMPANY = 'https://rjmacarthy.xyz'
export const COMPANY = 'rjmacarthy.xyz'

// The "in the open" block: no names, no photos, no team; just the public record.
export const MAINTAINED_SINCE = 2023

// Checkout. The Team link is a Stripe Payment Link (yearly, quantity is seats); the licence
// service (twinny-license serve) turns the payment into a token on its claim page.
// Enterprise is invoice or purchase order, so it goes through the contact form (#contact).
export const URL_BUY_TEAM = 'https://buy.stripe.com/eVq00igUndD80qW6AR7Zu00'

// Pricing, per seat per month, billed yearly.
export const PRICE_TEAM = 6
export const PRICE_ENTERPRISE = 10
export const FREE_SEATS = 5
export const ENTERPRISE_MIN_SEATS = 50

// The free trial: a Team token for a month, issued by the licence service through /api/trial.
// Must match TRIAL_DAYS and TRIAL_SEATS in twinny-licence.
export const TRIAL_DAYS = 30
export const TRIAL_SEATS = 25

// This site. Canonical URLs, Open Graph and the sitemap are built from it.
export const URL_SITE = 'https://twinny.dev'
