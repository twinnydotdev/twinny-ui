<script lang="ts">
  import Compare from '$lib/components/Compare.svelte'
  import { RIVALS } from '$lib/compare'

  const rival = RIVALS.find((r) => r.slug === 'windsurf')!
</script>

<Compare {rival} />
