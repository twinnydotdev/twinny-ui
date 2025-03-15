<script>
  import { Marked } from 'marked'

  const marked = new Marked()

  const markdown = marked.parse(`
  ## Terms of Service for Twinny.dev
**Effective Date: 01 March 2025**

### Twinny.dev
Twinny.dev provides a platform for developers to access tools, APIs, and resources to build and deploy applications (the "Services"). These Terms of Service ("Terms") govern your use of the Twinny.dev website, tools, APIs, and other services, except where separate terms apply ("Additional Terms").

The Services are provided by an individual trading as Twinny.dev, based in the United Kingdom ("Twinny.dev" or "I"/"me"). By accessing or using our Services, you agree to these Terms, forming a legally binding agreement between you and me under English law.

---

### 1. Accessing the Services
**Age Requirements.** You must be at least 13 years old to use the Services. If you're under 18, you need parental or guardian consent to create an account. I'll terminate accounts breaching this rule.

**Twinny.dev Accounts.** Some Services require an account. You must provide accurate, up-to-date information and not share your login details. You're responsible for all activity on your account. Report unauthorised use by contacting me via X at \`@twinnydotdev\`.

**Admin Accounts.** Admin accounts allow you to manage users and workspaces. You're liable for actions by authorised users under your admin account.

---

### 2. Using the Services
**Services.** We grant you a non-exclusive, revocable right to use the Services as per these Terms, UK laws (including the UK GDPR), and our documentation. Paid subscriptions may unlock extra features, detailed on our site.

**Restrictions.** We own all rights to the Services. You must not:
- Use the Services illegally or in breach of these Terms;
- Infringe third-party rights (e.g., copyright, privacy) via the Services;
- Reverse engineer, decompile, or hack the Services (except as allowed by law);
- Undermine the Services' security or functionality;
- Sell or transfer API keys without our written permission;
- Use the Services to develop competing products or services;
- Overload, spam, or disrupt the Services through excessive or malicious use.

---

### 3. Your User Data
**Your Data.** You may submit input (e.g., code, queries) to the Services ("Input") and receive output (e.g., results, generated content) ("Output"), collectively "Your Data." You retain ownership of Input and own all Output, subject to UK law. We assign any rights we might have in Output to you.

**Responsibility.** You're solely responsible for Your Data's legality and use. Ensure you have rights to Input and assess Output for your needs. Don't pass off AI-generated Output as human-made.

**How We Use Your Data.** We collect and store Your Data to provide the Services. We don't currently use it to train our systems, but we may use it later for purposes like improving the Services, financial analysis, or other legitimate business needs. I'll notify you via X (\`@twinnydotdev\`) or in-product notice at least 30 days before any such use begins, giving you the chance to opt out. Data is processed per our Privacy Policy and UK GDPR.

---

### 4. Warranties; Disclaimer
**Our Warranties.** We warrant the Services will materially match our documentation when used correctly.

**Your Warranties.** You confirm you're authorised to agree to these Terms and will use the Services lawfully.

**Disclaimer.** Beyond our warranties, the Services are "as is." We don't guarantee uninterrupted, error-free operation or suitability for your specific needs. Implied warranties (e.g., merchantability) are excluded to the fullest extent permitted by UK law.

---

### 5. Liability
**Limitation of Liability.** I'm not liable for indirect, special, or consequential damages (e.g., lost profits, data loss), even if warned of the risk. My total liability is capped at the greater of fees you paid me in the last 12 months or £100, unless UK law mandates otherwise. Nothing limits liability for death, personal injury, or fraud.

**Indemnity.** You agree to indemnify and hold me harmless from claims, losses, or damages arising from your use of the Services, breach of these Terms, or infringement of third-party rights.

---

### 6. Term, Suspension, and Termination
**Term.** These Terms start when you use the Services or accept them and continue until terminated.

**Suspension/Termination.** We may suspend or terminate your access if you breach these Terms, fail to pay fees, or if required by law or to protect Twinny.dev or others. I reserve the right to suspend or terminate Services at my discretion with reasonable notice, except in urgent cases (e.g., security threats). Appeal by contacting me via X at \`@twinnydotdev\`. You can terminate via your account settings.

**Effects.** Termination doesn't affect accrued rights (e.g., unpaid fees). Surviving provisions (e.g., liability limits, indemnity) remain in force.

---

### 7. General
**Governing Law.** These Terms are governed by English law. Disputes will be resolved exclusively in the courts of England and Wales.

**Entire Agreement.** These Terms, plus any Additional Terms, form the full agreement unless otherwise agreed in writing.

**Force Majeure.** I'm not liable for delays or failures due to events beyond my control (e.g., natural disasters, cyberattacks).

**Amendments.** I may update these Terms with 14 days' notice via X (\`@twinnydotdev\`) or the Services. Continued use after changes means you accept them.

**No Waiver.** Failure to enforce any provision doesn't waive it.

**Contact.** For support or queries, contact me via X at \`@twinnydotdev\`.

---

### 8. Additional Protections
**Third-Party Services.** The Services may integrate third-party tools or APIs. I'm not responsible for their performance, availability, or terms.

**Feedback.** Any feedback you provide about the Services is non-confidential and grants me a perpetual, royalty-free license to use it for any purpose.

**Severability.** If any provision is unenforceable, the rest of these Terms remain valid.
`)
</script>

<div class="max-w-3xl mx-auto px-6 py-8 rounded-lg shadow-md">
  <div class="prose prose-slate max-w-none text-white">
    {@html markdown}
  </div>
</div>

<style>
  :global(.prose h1) {
    @apply text-3xl font-bold text-gray-200 mb-8;
  }

  :global(.prose h2) {
    @apply text-xl font-semibold text-gray-200 mb-4 mt-8;
  }

  :global(.prose h3) {
    @apply text-xl font-semibold text-gray-200 mb-4 mt-8;
  }

  :global(strong) {
    @apply text-sm font-semibold text-gray-200 mb-4 mt-8;
  }

  :global(.prose li) {
    @apply mb-2;
  }

  :global(hr) {
    margin: 20px 0 !important;
  }
</style>
