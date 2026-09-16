/*
 * Small motion helpers shared by the components. Everything here is inert under
 * prefers-reduced-motion: values land at their end state and nothing loops.
 */

export function reducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Runs `fn` the first time the node scrolls into view, with a small margin. */
export function whenVisible(node: Element, fn: () => void, rootMargin = '0px 0px -8% 0px') {
  if (typeof IntersectionObserver === 'undefined') {
    fn()
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect()
        fn()
      }
    },
    { rootMargin, threshold: 0.1 }
  )
  io.observe(node)
  return () => io.disconnect()
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts the node's text from 0 to `to` once it scrolls into view.
 * `use:countup={{ to: 4000, ms: 1200 }}`; formats with a thousands separator.
 */
export function countup(node: HTMLElement, opts: { to: number; ms?: number; suffix?: string }) {
  const fmt = (n: number) => Math.round(n).toLocaleString('en') + (opts.suffix ?? '')
  node.textContent = fmt(reducedMotion() ? opts.to : 0)
  let raf = 0
  const stop = whenVisible(node, () => {
    if (reducedMotion()) return
    const ms = opts.ms ?? 1200
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms)
      node.textContent = fmt(opts.to * easeOut(p))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  })
  return {
    destroy() {
      stop()
      cancelAnimationFrame(raf)
    }
  }
}

/**
 * Tracks the pointer over a node and writes `--mx` / `--my` (px, relative to the
 * node) plus `--hover` (0|1). Cheap: one rAF per frame at most, no layout reads
 * except a cached rect refreshed on enter.
 */
export function pointer(node: HTMLElement) {
  let rect: DOMRect | null = null
  let raf = 0
  let x = 0
  let y = 0
  const paint = () => {
    raf = 0
    node.style.setProperty('--mx', `${x}px`)
    node.style.setProperty('--my', `${y}px`)
  }
  const enter = () => {
    rect = node.getBoundingClientRect()
    node.style.setProperty('--hover', '1')
  }
  const move = (e: PointerEvent) => {
    if (!rect) rect = node.getBoundingClientRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    if (!raf) raf = requestAnimationFrame(paint)
  }
  const leave = () => {
    rect = null
    node.style.setProperty('--hover', '0')
  }
  node.addEventListener('pointerenter', enter)
  node.addEventListener('pointermove', move, { passive: true })
  node.addEventListener('pointerleave', leave)
  return {
    destroy() {
      cancelAnimationFrame(raf)
      node.removeEventListener('pointerenter', enter)
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
    }
  }
}
