<script lang="ts">
  import { URL_DOCS, URL_GITHUB, URL_VSCODE_MARKETPLACE, URL_TWINNYDOTDEV } from '$lib/const'
  import { t } from '$lib/translations'
  import Analytics from '$lib/analytics/index.svelte'
  import '../app.postcss'
</script>

<svelte:head>
  <title>twinny</title>
  <meta name="description" content="The free and private AI extension for Visual Studio Code." />
</svelte:head>

<template lang="pug">
  Analytics
  div(class='flex h-[100vh] flex-col p-2 text-gray-300')
    header(class=`
        flex
        justify-between
        items-center
        px-4 py-2
      `)
      a(href='/')
        h1(class='text-xl font-bold flex-grow select-none') {$t('common.title')}
      div
        a(class='ml-3'
          href='/symmetry'
        ) {$t('common.symmetry')}
        a(class='ml-3'
          href='{URL_GITHUB}'
          target='_blank'
          rel='noopener noreferrer nofollow'
        ) {$t('common.github')}
        a(class='ml-3'
          href='{URL_DOCS}'
          target='_blank'
          rel='noopener noreferrer nofollow'
        ) {$t('common.docs')}

    div(class='flex grow flex-col items-center justify-center')
      slot
    footer(class=`
      flex
      justify-between
      items-center
      w-full
      px-4 py-2
    `)
      a(
        href='/sponsor'
      )
        span.text-red-500.mr-1 🖤
        span {$t('common.sponsor')}
      a(
        href='{URL_TWINNYDOTDEV}'
        target='_blank'
        rel='noopener noreferrer nofollow'
      ) {$t('common.contact')}
</template>
