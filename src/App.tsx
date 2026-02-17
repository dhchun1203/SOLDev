import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

import {
  navLinks,
  ctaLabel,
  footerDescription,
  copyright,
  siteName,
} from './config/site'
import { useScrollToAnchor } from './hooks/useScrollToAnchor'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { HeroCosmic } from './sections/HeroCosmic'
import { OpenOffer } from './sections/OpenOffer'
import { Introduce } from './sections/Introduce'
import { PricingLead } from './sections/PricingLead'
import { Pricing } from './sections/Pricing'
import { Tech } from './sections/Tech'

const ChatBot = lazy(() => import('./components/ChatBot'))

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const scrollSentinelRef = useRef<HTMLDivElement>(null)
  const scrollTopRef = useRef(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollToAnchor, handleNavClick } = useScrollToAnchor()

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      handleNavClick(e, () => setMenuOpen(false))
    },
    [handleNavClick]
  )

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  /* Animate-in: IntersectionObserver only, no scroll read */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elementsToObserve = document.querySelectorAll(
      '.section-header, .info-card, .portfolio-card, .price-card, .work-card, .pricing-lead'
    )
    elementsToObserve.forEach((el) => observerRef.current?.observe(el))
    return () => {
      elementsToObserve.forEach((el) => observerRef.current?.unobserve(el))
    }
  }, [])

  /* Header .scrolled + scroll-to-top visibility: IntersectionObserver only (no scroll listener) */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const headerEl = document.querySelector('.site-header')
    const sentinel = scrollSentinelRef.current
    if (!headerEl || !sentinel) return

    const headerObserver = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (!e) return
        if (e.isIntersecting) headerEl.classList.remove('scrolled')
        else headerEl.classList.add('scrolled')
      },
      { rootMargin: '-50px 0px 0px 0px', threshold: 0 }
    )
    headerObserver.observe(sentinel)

    const scrollTopObserver = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (!e) return
        const shouldShow = !e.isIntersecting
        if (shouldShow === scrollTopRef.current) return
        scrollTopRef.current = shouldShow
        setShowScrollTop(shouldShow)
      },
      { rootMargin: '-300px 0px 0px 0px', threshold: 0 }
    )
    scrollTopObserver.observe(sentinel)

    return () => {
      headerObserver.disconnect()
      scrollTopObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const footerDescriptionNode = (
    <>
      {footerDescription.split('\n').map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  )

  return (
    <div className="page">
      <Header
        navLinks={navLinks}
        ctaLabel={ctaLabel}
        onNavClick={onNavClick}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        siteName={siteName}
        logoHomeHref="#hero"
      />

      <main>
        {/* Sentinel for IntersectionObserver only (no scroll read). Header: past 50px = .scrolled; past 300px = show scroll-to-top. */}
        <div ref={scrollSentinelRef} aria-hidden className="scroll-sentinel" />
        <HeroCosmic scrollToAnchor={scrollToAnchor} />
        <OpenOffer scrollToAnchor={scrollToAnchor} />
        <Introduce scrollToAnchor={scrollToAnchor} />
        <PricingLead scrollToAnchor={scrollToAnchor} />
        <Pricing />
        <Tech />
      </main>

      <Footer
        navLinks={navLinks}
        copyright={copyright}
        footerDescription={footerDescriptionNode}
        siteName={siteName}
        logoHomeHref="#hero"
        onLogoClick={(e) => {
          e.preventDefault()
          scrollToAnchor('hero')
        }}
      />

      <ScrollToTop
        visible={showScrollTop}
        onClick={scrollToTop}
        ariaLabel="맨 위로 이동"
      />

      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  )
}

export default App
