<script lang="ts">
  import { URL_DOCS, URL_GITHUB, URL_X } from '$lib/const'
  import { t } from '$lib/translations'
  import '../app.postcss'
</script>

<svelte:head>
  <title>twinny</title>
  <meta name="description" content="The free and private AI extension for Visual Studio Code." />
</svelte:head>

<template lang="pug">
  div(class="p-6 text-gray-300")
    header(class=`
        flex
        justify-between
        items-center
        px-4 py-2
      `)
      h1(class="text-xl font-bold flex-grow")
        a(href="/" class="hover:underlin") {$t('common.title')}
      a(class="hover:text-whit ml-4"
        href="{URL_GITHUB}"
        target="_blank"
        rel="noopener noreferrer nofollow"
      ) {$t('common.github')}
      a(class="hover:text-white ml-4"
        href="{URL_DOCS}"
        target="_blank"
        rel="noopener noreferrer nofollow"
      ) {$t('common.docs')}
    div(class="flex grow flex-col items-center justify-center pb-20")
      slot
    div(class="flex justify-end text-white")
      a(href="{URL_X}" target="_blank" rel="noopener noreferrer nofollow") {$t('common.rjmacarthy')}
</template>
