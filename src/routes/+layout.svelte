<script lang="ts">
  import { URL_DOCS, URL_GITHUB, URL_VSCODE_MARKETPLACE, URL_RJMACARTHy } from '$lib/const'
  import { t } from '$lib/translations'
  import '../app.postcss'
</script>

<svelte:head>
  <title>twinny</title>
  <meta name="description" content="The free and private AI extension for Visual Studio Code." />
</svelte:head>

<template lang="pug">
  div(class="flex h-[100vh] w-[100vw] flex-col p-6 text-gray-300")
    header(class=`
        flex
        justify-between
        items-center
        px-4 py-2
      `)
      a(href="/")
        h1(class="text-xl font-bold flex-grow select-none") {$t('common.title')}
      div
        a(class="ml-4"
          href="/about"
        ) {$t('common.about')}
        a(class="ml-4"
          href="{URL_GITHUB}"
          target="_blank"
          rel="noopener noreferrer nofollow"
        ) {$t('common.github')}
        a(class="ml-4"
          href="{URL_DOCS}"
          target="_blank"
          rel="noopener noreferrer nofollow"
        ) {$t('common.docs')}
    div(class="flex grow flex-col items-center justify-center pb-20")
      slot
    footer(class="flex justify-end")
      a(href="{URL_RJMACARTHy}" target="_blank" rel="noopener noreferrer nofollow") {$t('common.rjmacarthy')}
</template>
