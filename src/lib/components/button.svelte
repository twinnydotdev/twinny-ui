<script lang="ts">
  interface Props {
    buttonText?: string
    disabled?: boolean
  }

  let { buttonText = '', disabled }: Props = $props()
</script>

<button disabled={disabled} class="font-bold py-3 px-6 rounded transition-all duration-200 bg-rose-500">
  {buttonText}
</button>
