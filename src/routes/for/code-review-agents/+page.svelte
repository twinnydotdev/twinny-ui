<script lang="ts">
  import Intent from '$lib/components/Intent.svelte'
  import Contact from '$lib/components/Contact.svelte'
  import { INTENTS } from '$lib/intent'

  const intent = INTENTS.find((i) => i.kind === 'for' && i.slug === 'code-review-agents')!
</script>

<Intent {intent} />

<section class="section" id="early-access">
  <div class="wrap">
    <span class="label">early access: agents that open draft pull requests</span>
    <Contact
      intro="CI fixes, dependency updates and tests, as drafts on your gateway. Say what you would hand to them and roughly how many developers you have."
      tag="agents early access"
    />
  </div>
</section>
