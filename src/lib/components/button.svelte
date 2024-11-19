<script lang="ts">
  interface Props {
    buttonText?: string
  }

  let { buttonText = '' }: Props = $props()
</script>

<button class="font-bold py-3 px-6 rounded transition-all duration-200 bg-rose-500">
  {buttonText}
</button>
