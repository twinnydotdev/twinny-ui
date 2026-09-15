<script lang="ts">
  let { size = 22 }: { size?: number } = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 157.34 135.15"
  width={size}
  height={size * (135.15 / 157.34)}
  aria-hidden="true"
  class="mark"
>
  <use href="/mark.svg#m" />
</svg>

<style>
  .mark {
    display: inline-block;
    flex-shrink: 0;
    color: currentColor;
  }
</style>
