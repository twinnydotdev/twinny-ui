<script lang="ts">
  import { enhance } from '$app/forms'
  import { t } from '$lib/translations'
  import Button from '$lib/components/button.svelte'
  let { form } = $props()
</script>

<div class="flex flex-col gap-3 items-center justify-center mt-4">
  <form
    action="?/register"
    method="POST"
    class="flex flex-wrap gap-2 items-center justify-center"
    use:enhance
  >
    <label for="email">
      <input
        id="email"
        name="email"
        type="email"
        placeholder={$t('common.subscribe_placeholder')}
        class="w-full px-4 text-base font-medium tracking-wide text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out focus:outline-none h-[48px] focus:border-rose-500"
      />
    </label>
    <Button buttonText={$t('common.subscribe')} />
  </form>

  {#if form?.success}
    <p class="text-center font-bold text-green-500 my-1">
      {$t('common.thanks')}
    </p>
  {/if}

  {#if form?.error}
    <p class="text-center font-bold text-red-500 my-1">
      {$t('common.subscribe_error')}
    </p>
  {/if}
</div>
