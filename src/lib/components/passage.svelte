<script lang="ts">
  export let paragraphs: string = ''
  export let passageTitle: string = ''
</script>

<template lang="pug">
  div.passage
    h2.text-2xl {passageTitle}
    +each('paragraphs as paragraph')
      p(class=`
        mt-4
        text-gray-400
        max-w-screen-lg
        text-xl
        leading-normal
        text-justify
      `) {paragraph}
</template>
