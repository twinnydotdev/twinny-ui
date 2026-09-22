<script lang="ts">
  import Intent from '$lib/components/Intent.svelte'
  import { INTENTS } from '$lib/intent'

  const intent = INTENTS.find((i) => i.kind === 'with' && i.slug === 'ollama')!
</script>

<Intent {intent} />
