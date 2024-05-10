<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import logo from '$lib/assets/twinny-logo.svg'
  import { URL_VSCODE_MARKETPLACE } from '$lib/const'
  import { t } from '$lib/translations'
</script>

<svelte:head>
  <title>twinny.dev</title>
  <meta name="description" content="twinny" />
</svelte:head>

<template lang="pug">
  div
    img(
      alt="twinny logo"
      class="h-32 w-auto mx-auto flex-shrink-0 mt-24 brightness-200 contrast-200"
      src="{logo}"
    )
    h1(class=`
      flex
      font-medium
      grow
      items-center
      justify-center
      pt-10
      pb-4
      text-white
      text-4xl
      max-w-screen-lg
      mx-auto
      max-w-xl
      text-center
      leading-normal
  `) {$t('common.subtitle')}
    div(class="flex grow gap-3 items-center justify-center pb-10")
      a(href="{URL_VSCODE_MARKETPLACE}" target="_blank" rel="noreferrer noopener")
        Button(buttonText="{$t('common.download')}")
      a(href="{URL_VSCODE_MARKETPLACE}" target="_blank" rel="noreferrer noopener")
        Button(buttonText="{$t('common.sponsor')}" variant="secondary")
    hr(class="w-full border-gray-600 mb-6")
    div(class="flex flex-col gap-3 items-center justify-center")
      p(class="text-center font-bold text-gray-400 my-1") {$t('common.subscribe_label')}
      div(class="flex flex-wrap gap-2 items-center justify-center")
        input(
          type="email"
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
        Button(buttonText="{$t('common.subscribe')}")
</template>
