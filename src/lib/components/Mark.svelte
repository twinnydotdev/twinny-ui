<script lang="ts">
  import { MARK_PATH, MARK_TRANSFORM, MARK_VIEWBOX } from '$lib/mark'
  /* `draw`: the outline traces itself, then fills. Triggered by a `.in` ancestor. */
  let { size = 22, draw = false }: { size?: number; draw?: boolean } = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox={MARK_VIEWBOX}
  width={size}
  height={size * (135.15 / 157.34)}
  aria-hidden="true"
  class="mark"
  class:draw
>
  <path d={MARK_PATH} transform={MARK_TRANSFORM} pathLength="1" />
</svg>

<style>
  .mark {
    display: inline-block;
    flex-shrink: 0;
    color: currentColor;
    overflow: visible;
  }
  path {
    fill: currentColor;
  }
  .draw path {
    fill: transparent;
    stroke: var(--accent);
    stroke-width: 1.5;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    vector-effect: non-scaling-stroke;
    transition:
      stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1),
      fill 0.8s ease 1.5s,
      stroke 0.6s ease 1.8s;
  }
  :global(.in) .draw path {
    stroke-dashoffset: 0;
    fill: currentColor;
    stroke: transparent;
  }
  @media (prefers-reduced-motion: reduce) {
    .draw path {
      transition: none;
      stroke-dashoffset: 0;
      fill: currentColor;
      stroke: transparent;
    }
  }
</style>
