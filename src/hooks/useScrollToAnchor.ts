import { useCallback } from 'react'

const HEADER_SELECTOR = '.site-header'
const DEFAULT_HEADER_HEIGHT = 88
const GAP = 0
const BADGE_SECTION_GAP = 110
const DURATION_MS = 400

const BADGE_SELECTORS: Record<string, string> = {
  works: '.works-badge',
  tech: '.tech-badge',
  pricing: '.pricing-badge',
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function useScrollToAnchor() {
  const scrollToAnchor = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const header = document.querySelector(HEADER_SELECTOR) as HTMLElement | null
        const headerHeight = header?.offsetHeight ?? DEFAULT_HEADER_HEIGHT
        const badgeSelector = BADGE_SELECTORS[id]
        const useBadgeGap = !!badgeSelector
        const offset = headerHeight + (useBadgeGap ? BADGE_SECTION_GAP : GAP)
        const scrollTarget = badgeSelector
          ? (el.querySelector(badgeSelector) as HTMLElement | null) ?? el
          : el
        const rect = scrollTarget.getBoundingClientRect()
        const scrollY = window.scrollY
        const targetY = Math.max(0, rect.top + scrollY - offset)
        const startY = window.scrollY
        const distance = targetY - startY
        const startTime = performance.now()

        const html = document.documentElement
        const prevScrollBehavior = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'

        const tick = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / DURATION_MS, 1)
          const eased = easeOutCubic(progress)
          const currentY = Math.round(startY + distance * eased)
          html.scrollTop = currentY
          document.body.scrollTop = currentY
          window.scrollTo({ top: currentY, left: 0, behavior: 'auto' })

          if (progress < 1) {
            requestAnimationFrame(tick)
          } else {
            html.scrollTop = targetY
            document.body.scrollTop = targetY
            window.scrollTo({ top: targetY, left: 0, behavior: 'auto' })
            html.style.scrollBehavior = prevScrollBehavior
          }
        }
        requestAnimationFrame(tick)
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
      setTimeout(() => scrollToAnchor(id), 0)
    },
    [scrollToAnchor]
  )

  return { scrollToAnchor, handleNavClick }
}
