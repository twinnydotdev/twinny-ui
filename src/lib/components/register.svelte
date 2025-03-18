<script lang="ts">
  import { enhance } from '$app/forms'
  import { t } from '$lib/translations'
  import Button from '$lib/components/button.svelte'
  import { slide } from 'svelte/transition'

  let { form } = $props()
  let email = $state()
</script>

<div class="w-full">
  <form
    action="?/register"
    method="POST"
    class="flex flex-col sm:flex-row gap-3 items-stretch"
    use:enhance
  >
    <div class="flex-grow">
      <label for="email" class="sr-only">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        bind:value={email}
        placeholder={$t('common.subscribe_placeholder')}
        class="form-input h-full"
        required
      />
    </div>
    <button class="btn-primary">
      <span class="flex items-center">
        {$t('common.subscribe')}
      </span>
    </button>
  </form>

  {#if form?.success}
    <div transition:slide class="mt-3 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-md">
      <p class="text-sm font-medium text-green-400">
        {$t('common.thanks')}
      </p>
    </div>
  {/if}

  {#if form?.error}
    <div transition:slide class="mt-3 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-md">
      <p class="text-sm font-medium text-red-400">
        {$t('common.subscribe_error')}
      </p>
    </div>
  {/if}
</div>
