<script lang="ts">
  import { t } from '$lib/translations'
  import Register from '$lib/components/register.svelte'
  import Passage from '$lib/components/passage.svelte'
  const chapter1 = $t('common.chapter1').split('\n')
  const chapter2 = $t('common.chapter2').split('\n')
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
      Passage(paragraphs="{chapter1}" passageTitle="{$t('common.chapter1_title')}")
      p.text-center.my-8 ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧
      Passage(paragraphs="{chapter2}" passageTitle="{$t('common.chapter2_title')}")
    div.mt-3
      Register
</template>
