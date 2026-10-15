<script lang="ts">
  import Intent from '$lib/components/Intent.svelte'
  import { INTENTS } from '$lib/intent'

  const intent = INTENTS.find((i) => i.kind === 'from' && i.slug === 'roo-code')!
</script>

<Intent {intent} />
