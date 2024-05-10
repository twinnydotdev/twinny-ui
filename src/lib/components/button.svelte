<script lang="ts">
  export let buttonText = ''
  export let variant = 'primary'

  const primary = `
      bg-blue-500
      text-white
      font-bold
      py-3
      px-6
      rounded
      transition-all
      duration-200
    `
  const secondary = `
      ${primary}
      bg-rose-500
    `

  const variants = {
    primary,
    secondary
  }

  const className = variants[variant as keyof typeof variants]
</script>

<template lang="pug">
    button(class!="{className}") {buttonText}
</template>
