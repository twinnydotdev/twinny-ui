<script lang="ts">
  import { t } from '$lib/translations'
  import logo from '$lib/assets/twinny-logo.svg'
</script>

<template lang="pug">
  h1(class="text-4xl font-bold") {$t('common.hey')}
  p(class="mt-4 text-2xl") {$t('common.build')}
  p(class="mt-4 text-1xl")
    span {$t('common.looking')}
    span {$t('common.contact')}
      a(href="/projects" class="text-blue-500 hover:underline")
        | {$t('common.rjmacarthyxyz')}
</template>
