<script lang="ts">
  import logo from '$lib/assets/twinny-logo.svg'
  import { URL_VSCODE_MARKETPLACE } from '$lib/const'
  import { t } from '$lib/translations'
  import Button from '$lib/components/button.svelte'
  import Register from '$lib/components/register.svelte'
  import type { ActionData } from '../routes/$types'
  export let form: ActionData
</script>

<div>
  <img
    alt="twinny logo"
    class="h-32 w-auto mx-auto flex-shrink-0 mt-24 brightness-200 contrast-200"
    src={logo}
  />
  <h2
    class="flex font-medium grow items-center justify-center pt-10 pb-4 text-white text-4xl mx-auto max-w-xl text-center leading-normal"
  >
    {$t('common.subtitle')}
  </h2>
  <div class="flex grow gap-3 items-center justify-center pb-10">
    <a href={URL_VSCODE_MARKETPLACE} target="_blank" rel="noreferrer noopener">
      <Button buttonText={$t('common.install')} />
    </a>
  </div>
  <hr class="w-full border-stone-600 mb-6" />
  <p class="text-center font-bold my-1">{$t('common.subscribe_label')}</p>
  <Register {form} />
</div>
