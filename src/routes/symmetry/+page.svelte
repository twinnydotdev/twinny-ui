<script lang="ts">
  import { t } from '$lib/translations'
  import Register from '$lib/components/register.svelte'
</script>

<template lang="pug">
  div(class='flex justify-center flex-col items-center gap-3')
    a(href='https://github.com/twinnydotdev/symmetry' target='_blank' rel='noopener noreferrer nofollow')
      h2(class=`
        text-3xl
        flex-grow
        select-none
      `) {$t('common.symmetry')}
    div
      p(class=`
        mt-4
        text-gray-400
        max-w-screen-lg
        text-xl
        leading-normal
        text-justify
      `) {$t('common.passage')}
    Register
</template>
