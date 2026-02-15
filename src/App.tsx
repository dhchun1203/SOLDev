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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elementsToObserve = document.querySelectorAll(
      '.section-header, .info-card, .portfolio-card, .price-card, .work-card, .pricing-lead'
    )

    elementsToObserve.forEach((el) => {
      observerRef.current?.observe(el)
    })

    let rafId = 0
    const handleScroll = () => {
      const y = window.scrollY
      const header = document.querySelector('.site-header')
      if (y > 50) header?.classList.add('scrolled')
      else header?.classList.remove('scrolled')

      const shouldShow = y > 300
      if (shouldShow !== scrollTopRef.current) {
        scrollTopRef.current = shouldShow
        setShowScrollTop(shouldShow)
      }
    }
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      elementsToObserve.forEach((el) => observerRef.current?.unobserve(el))
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
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
