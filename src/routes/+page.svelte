<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/button.svelte'
  import logo from '$lib/assets/twinny-logo.svg'
  import { URL_VSCODE_MARKETPLACE } from '$lib/const'
  import { t } from '$lib/translations'
  export let form
</script>

<template lang="pug">
  div
    img(
      alt='twinny logo'
      class='h-32 w-auto mx-auto flex-shrink-0 mt-24 brightness-200 contrast-200'
      src='{logo}'
    )
    h2(class=`
      flex font-medium
      grow items-center justify-center
      pt-10 pb-4
      text-white text-4xl
      max-w-screen-lg mx-auto max-w-xl
      text-center leading-normal
  `) {$t('common.subtitle')}
    div(class='flex grow gap-3 items-center justify-center pb-10')
      a(href='{URL_VSCODE_MARKETPLACE}' target='_blank' rel='noreferrer noopener')
        Button(buttonText="{$t('common.download')}")
    hr(class='w-full border-stone-600 mb-6')
    div(class='flex flex-col gap-3 items-center justify-center')
      p(class='text-center font-bold  my-1') {$t('common.subscribe_label')}
      form(action='?/register' method='POST' class='flex flex-wrap gap-2 items-center justify-center' use:enhance)
        label(for='email')
          input(
            id='email'
            name='email' type='email'
            placeholder="{$t('common.subscribe_placeholder')}"
            class=`w-full px-4
            text-base font-medium
            tracking-wide text-gray-700
            bg-white border border-gray-300
            rounded-lg shadow-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            h-[48px]
            focus:border-rose-500`
          )
        Button(
          buttonText="{$t('common.subscribe')}"
        )
      +if('form?.success')
        p(class=`
          text-center
          font-bold
          text-green-500 my-1
        `) {$t('common.thanks')}
</template>
