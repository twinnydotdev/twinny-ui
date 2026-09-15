/** Adds `in` once the element scrolls into view. Safe without IntersectionObserver. */
export function reveal(node: HTMLElement, delay = 0) {
  node.classList.add('reveal')
  node.style.setProperty('--d', `${delay}ms`)
  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('in')
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          node.classList.add('in')
          io.disconnect()
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )
  io.observe(node)
  return {
    destroy() {
      io.disconnect()
    }
  }
}
