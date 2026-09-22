<script lang="ts">
  import Compare from '$lib/components/Compare.svelte'
  import { RIVALS } from '$lib/compare'

  const rival = RIVALS.find((r) => r.slug === 'tabnine')!
</script>

<Compare {rival} />
