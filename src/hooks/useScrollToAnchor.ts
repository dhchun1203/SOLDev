import { useCallback } from 'react'

const HEADER_SELECTOR = '.site-header'
const DEFAULT_HEADER_HEIGHT = 88
const GAP = 8

export function useScrollToAnchor() {
  const scrollToAnchor = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const header = document.querySelector(HEADER_SELECTOR) as HTMLElement | null
        const headerHeight = header?.offsetHeight ?? DEFAULT_HEADER_HEIGHT
        const offset = headerHeight + GAP
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      })
    })
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, closeMenu?: () => void) => {
      const href = (e.currentTarget.getAttribute('href') || '').trim()
      if (!href.startsWith('#')) {
        closeMenu?.()
        return
      }
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) {
        closeMenu?.()
        return
      }
      e.preventDefault()
      closeMenu?.()
      scrollToAnchor(id)
    },
    [scrollToAnchor]
  )

  return { scrollToAnchor, handleNavClick }
}
