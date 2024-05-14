<script lang="ts">
  export let buttonText = ''
</script>

<template lang="pug">
    button(class=`
      font-bold
      py-3
      px-6
      rounded
      transition-all
      duration-200
      bg-rose-500
    `) {buttonText}
</template>
