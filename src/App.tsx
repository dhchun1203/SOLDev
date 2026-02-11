import { lazy, useCallback, useEffect, useRef, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Code, Code2, Zap, Sparkles, ArrowRight, Gift, TrendingDown, Layers, Folder, CheckCircle2, Globe } from 'lucide-react'
import './App.css'

const ChatBot = lazy(() => import('./components/ChatBot'))

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '#hero', label: '오픈 특가' },
  { href: '#introduce', label: '소개' },
  { href: '#works', label: '포트폴리오' },
  { href: '#tech', label: '기술사양' },
  { href: '#pricing', label: '가격' },
]

const stroke = { strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function CardIcon({ type }: { type: string }) {
  const size = 24
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', ...stroke }
  switch (type) {
    case 'tag':
      return (
        <svg {...common}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...common}>
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...common}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      )
    case 'code':
      return (
        <svg {...common}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'credit':
      return (
        <svg {...common}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    case 'flow':
      return (
        <svg {...common}>
          <rect x="2" y="4" width="8" height="6" rx="1" />
          <rect x="14" y="14" width="8" height="6" rx="1" />
          <path d="M10 7h4l4 4-4 4h-4" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
        </svg>
      )
  }
}

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const scrollTopRef = useRef(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const [, setMousePos] = useState({ x: 0, y: 0 })

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const nx = x * 2 - 1
    const ny = y * 2 - 1
    requestAnimationFrame(() => setMousePos({ x: nx, y: ny }))
  }, [])

  const handleHeroMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
  }, [])
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    // Intersection Observer 설정
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            // 한 번만 애니메이션 실행되도록 옵저버 해제
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    // 관찰할 요소들 선택 (히어로 섹션 제외)
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

  // 모바일 메뉴 열림 시 body 스크롤 잠금
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

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo logo-new" href="#hero" onClick={closeMenu}>
            <motion.div
              className="logo-inner"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="logo-icon-wrap">
                <motion.div
                  className="logo-icon-glow"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="logo-icon-box">
                  <span className="logo-icon-sol">SOL</span>
                </div>
                <motion.div
                  className="logo-accent-dot"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="logo-text-wrap">
                <span className="logo-text-gradient">SOLDev</span>
                <motion.div
                  className="logo-code-wrap"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Code className="logo-code-icon" aria-hidden />
                </motion.div>
              </div>
            </motion.div>
          </a>
          <nav className="nav header-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="cta" type="button">
              문의하기
            </button>
          </div>
          <button
            type="button"
            className={`header-menu-btn ${menuOpen ? 'header-menu-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            <span className="header-menu-btn-inner">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 */}
      <div
        className={`side-menu ${menuOpen ? 'side-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div
          className="side-menu-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
        <aside className="side-menu-drawer">
          <nav className="side-menu-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
          </nav>
          <div className="side-menu-actions">
            <button className="cta" type="button" onClick={closeMenu}>
              문의하기
            </button>
          </div>
        </aside>
      </div>

      <main>
        <motion.section
          ref={heroRef}
          className="hero-cosmic"
          aria-label="메인 비주얼"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          <div className="hero-cosmic-bg" aria-hidden="true" />
          <div className="hero-cosmic-mesh" aria-hidden="true">
            <div className="hero-cosmic-mesh-1" />
            <div className="hero-cosmic-mesh-2" />
            <div className="hero-cosmic-mesh-3" />
          </div>
          <div className="hero-cosmic-orbs" aria-hidden="true">
            <motion.div
              className="hero-cosmic-orb hero-cosmic-orb-1"
              animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="hero-cosmic-orb hero-cosmic-orb-2"
              animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, -30, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="hero-cosmic-orb hero-cosmic-orb-3"
              animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div className="hero-cosmic-floats">
            <motion.div
              className="hero-cosmic-float hero-cosmic-float-tl"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              <div className="hero-cosmic-float-card hero-cosmic-float-card-code">
                <Code2 size={32} strokeWidth={2} />
              </div>
            </motion.div>
            <motion.div
              className="hero-cosmic-float hero-cosmic-float-tr"
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              <div className="hero-cosmic-float-card hero-cosmic-float-card-zap">
                <Zap size={40} strokeWidth={2} />
              </div>
            </motion.div>
            <motion.div
              className="hero-cosmic-float hero-cosmic-float-ml"
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              <div className="hero-cosmic-float-card hero-cosmic-float-card-spark">
                <Sparkles size={28} strokeWidth={2} />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-cosmic-inner"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              hidden: {},
            }}
          >
            <motion.div
              className="hero-cosmic-badge"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Sparkles className="hero-cosmic-badge-icon" size={16} strokeWidth={2} />
              <span>SOLDev · 웹서비스 제작</span>
            </motion.div>
            <motion.div
              className="hero-cosmic-title-wrap"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
            >
              <h1 className="hero-cosmic-title">
                <span className="hero-cosmic-title-white">실제로 </span>
                <span className="hero-cosmic-title-gradient-wrap">
                  <span className="hero-cosmic-title-gradient">쓰이는</span>
                  <motion.div
                    className="hero-cosmic-title-glow"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden
                  />
                </span>
                <br />
                <span className="hero-cosmic-title-white">웹서비스</span>
              </h1>
              <motion.div
                className="hero-cosmic-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                <p>메뉴얼이 아닌 <span className="hero-cosmic-subtitle-bold">현장에서 바로 쓰이는</span>,</p>
                <p>
                  오픈하자마자 바로{' '}
                  <span className="hero-cosmic-highlight-wrap">
                    <span className="hero-cosmic-highlight">운영되는 웹서비스</span>
                    <span className="hero-cosmic-highlight-underline" aria-hidden />
                  </span>
                  가 필요하다면?
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="hero-cosmic-actions"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
            >
              <motion.a
                href="#introduce"
                className="hero-cosmic-btn hero-cosmic-btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hero-cosmic-btn-inner">
                  포트폴리오 보기
                  <ArrowRight className="hero-cosmic-btn-arrow" size={20} strokeWidth={2} />
                </span>
              </motion.a>
              <motion.a
                href="#pricing"
                className="hero-cosmic-btn hero-cosmic-btn-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                가격 확인하기
              </motion.a>
            </motion.div>
            <motion.div
              className="hero-cosmic-metrics"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ delay: 0.55 }}
            >
              <span className="hero-cosmic-metric">
                <span className="hero-cosmic-metric-dot hero-cosmic-metric-dot-green" /> 평균 제작 기간 3-5일
              </span>
              <span className="hero-cosmic-metric">
                <span className="hero-cosmic-metric-dot hero-cosmic-metric-dot-blue" /> 고객 맞춤 제작
              </span>
              <span className="hero-cosmic-metric">
                <span className="hero-cosmic-metric-dot hero-cosmic-metric-dot-purple" /> 최신 기술 스택
              </span>
            </motion.div>
          </motion.div>

          <a
            href="#hero"
            className="hero-cosmic-scroll-hint"
            aria-label="아래 섹션으로 스크롤"
          >
            <span className="hero-cosmic-scroll-hint-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </a>
        </motion.section>

        {/* 오픈 특가 섹션 */}
        <section id="hero" className="open-offer">
          <div className="open-offer-bg" aria-hidden="true" />
          <div className="open-offer-orbs" aria-hidden="true">
            <div className="open-offer-orb open-offer-orb-tr" />
            <div className="open-offer-orb open-offer-orb-bl" />
          </div>
          <div className="open-offer-container">
            <div className="open-offer-grid">
              <motion.div
                className="open-offer-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="open-offer-badge">
                  <Gift size={16} strokeWidth={2} className="open-offer-badge-icon" />
                  <span>LIMITED OFFER</span>
                </div>
                <p className="open-offer-subheader">SOLDEV &gt; 오픈 특가 진행 중</p>
                <h2 className="open-offer-title">
                  <span className="open-offer-title-gradient">오픈 특가로</span>
                  <br />
                  <span className="open-offer-title-white">시작하는</span>
                  <br />
                  <span className="open-offer-title-white">포트폴리오 구축</span>
                </h2>
                <div className="open-offer-desc">
                  <p className="open-offer-desc-lead">
                    서비스 런칭 초기에만 오픈 특가로 진행합니다.
                  </p>
                  <p className="open-offer-desc-sub">
                    정상가 기준의 절반 금액이지만 구성은 동일하며, 차후 정상가로 진행합니다.
                  </p>
                </div>
                <div className="open-offer-actions">
                  <motion.button
                    type="button"
                    className="open-offer-btn open-offer-btn-primary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    오픈 특가 문의
                  </motion.button>
                  <motion.button
                    type="button"
                    className="open-offer-btn open-offer-btn-secondary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    작업 범위 보기
                  </motion.button>
                </div>
                <div className="open-offer-stats">
                  <motion.div className="open-offer-stat open-offer-stat-green" whileHover={{ scale: 1.05 }}>
                    <div className="open-offer-stat-glow open-offer-stat-glow-green" aria-hidden />
                    <div className="open-offer-stat-inner">
                      <span className="open-offer-stat-label">베이직</span>
                      <span className="open-offer-stat-value">20만 원</span>
                      <span className="open-offer-stat-sub">오픈특가</span>
                    </div>
                  </motion.div>
                  <motion.div className="open-offer-stat open-offer-stat-blue" whileHover={{ scale: 1.05 }}>
                    <div className="open-offer-stat-glow open-offer-stat-glow-blue" aria-hidden />
                    <div className="open-offer-stat-inner">
                      <span className="open-offer-stat-label">서비스형</span>
                      <span className="open-offer-stat-value">40만 원</span>
                      <span className="open-offer-stat-sub">오픈특가</span>
                    </div>
                  </motion.div>
                  <motion.div className="open-offer-stat open-offer-stat-purple" whileHover={{ scale: 1.05 }}>
                    <div className="open-offer-stat-glow open-offer-stat-glow-purple" aria-hidden />
                    <div className="open-offer-stat-inner">
                      <span className="open-offer-stat-label">그로스</span>
                      <span className="open-offer-stat-value">80만 원</span>
                      <span className="open-offer-stat-sub">오픈특가</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="open-offer-right"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="open-offer-card-wrap">
                  <div className="open-offer-card-glow" aria-hidden />
                  <div className="open-offer-card">
                    <div className="open-offer-card-image">
                      <img
                        src="https://images.unsplash.com/photo-1661169398420-e8d229fb39f4?w=1080&q=80"
                        alt="포트폴리오 워크스페이스"
                        loading="lazy"
                      />
                      <div className="open-offer-card-image-overlay" aria-hidden />
                    </div>
                    <div className="open-offer-card-body">
                      <div className="open-offer-card-badge">
                        <TrendingDown size={16} strokeWidth={2} className="open-offer-card-badge-icon" />
                        <span>오픈 특가 이벤트</span>
                      </div>
                      <h3 className="open-offer-card-title">포트폴리오 활용 가능</h3>
                      <div className="open-offer-card-desc">
                        <p>작업 결과물은 포트폴리오로 활용할 수 있습니다.</p>
                        <p className="open-offer-card-desc-sub">
                          민감한 개인 정보 혹은 회사명은 노출되지 않도록 게시됩니다.
                        </p>
                      </div>
                      <motion.button
                        type="button"
                        className="open-offer-card-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        상세 안내 보기
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="offer-details">
          <div className="offer-details-bg" aria-hidden="true" />
          <div className="offer-details-inner">
            <motion.div
              className="offer-details-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="offer-details-badge">OFFER</div>
              <h2 className="offer-details-title">
                <span className="offer-details-title-gradient">오픈 특가로</span>
                <br />
                <span className="offer-details-title-white">부담 없이 시작하세요</span>
              </h2>
              <p className="offer-details-desc">
                포트폴리오 구축 목적의 한정 수량 혜택으로 진행합니다.
                <br />
                정상가와 동일한 품질을 특가로 경험해 보세요.
              </p>
            </motion.div>

            <div className="offer-details-cards">
              <motion.div
                className="offer-details-card-wrap offer-details-card-wrap-purple"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="offer-details-card-glow offer-details-card-glow-purple" aria-hidden />
                <div className="offer-details-card">
                  <motion.div
                    className="offer-details-card-icon-wrap offer-details-card-icon-purple"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="offer-details-card-icon-blur" aria-hidden />
                    <div className="offer-details-card-icon-inner">
                      <Layers size={32} strokeWidth={2} />
                    </div>
                  </motion.div>
                  <h3 className="offer-details-card-heading">오픈 특가 조건</h3>
                  <ul className="offer-details-list">
                    <li className="offer-details-list-item">
                      <CheckCircle2 size={24} strokeWidth={2} className="offer-details-check" />
                      <span>정상가 기준의 작업 품질/구성 동일 제공</span>
                    </li>
                    <li className="offer-details-list-item">
                      <CheckCircle2 size={24} strokeWidth={2} className="offer-details-check" />
                      <span>한정 수량 완료 시 특가 종료 후 정상가 전환</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="offer-details-card-wrap offer-details-card-wrap-blue"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="offer-details-card-glow offer-details-card-glow-blue" aria-hidden />
                <div className="offer-details-card">
                  <motion.div
                    className="offer-details-card-icon-wrap offer-details-card-icon-blue"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <div className="offer-details-card-icon-blur" aria-hidden />
                    <div className="offer-details-card-icon-inner">
                      <Folder size={32} strokeWidth={2} />
                    </div>
                  </motion.div>
                  <h3 className="offer-details-card-heading">포트폴리오 활용</h3>
                  <div className="offer-details-card-text">
                    <p>작업 결과물은 포트폴리오로 활용될 수 있습니다.</p>
                    <p className="offer-details-card-text-sub">민감 정보와 계정 정보는 노출하지 않습니다.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="introduce" className="introduce-section">
          <div className="introduce-bg" aria-hidden="true" />
          <div className="introduce-orbs" aria-hidden="true">
            <div className="introduce-orb introduce-orb-tl" />
            <div className="introduce-orb introduce-orb-br" />
          </div>
          <div className="introduce-inner">
            <motion.div
              className="introduce-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="introduce-badge">INTRODUCE</div>
              <h2 className="introduce-title">
                <span className="introduce-title-gradient">이런 결과물을</span>
                <br />
                <span className="introduce-title-white">제공합니다</span>
              </h2>
              <p className="introduce-desc">
                기획부터 개발까지, 실제로 쓰이는 웹 서비스를 한 번에 완성해 드립니다.
                <br />
                웹사이트가 아닌 <span className="introduce-desc-highlight">운영 가능한 웹서비스</span>를 만나 보세요.
              </p>
            </motion.div>

            <div className="introduce-cards">
              <motion.div
                className="introduce-card-wrap introduce-card-wrap-blue"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="introduce-card-glow introduce-card-glow-blue" aria-hidden />
                <div className="introduce-card">
                  <motion.div
                    className="introduce-card-icon-wrap introduce-card-icon-blue"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="introduce-card-icon-blur" aria-hidden />
                    <div className="introduce-card-icon-inner">
                      <Globe size={32} strokeWidth={2} />
                    </div>
                  </motion.div>
                  <div className="introduce-card-heading-block">
                    <p className="introduce-card-label">제공 형태</p>
                    <h3 className="introduce-card-title">웹사이트가 아닌 웹서비스</h3>
                  </div>
                  <p className="introduce-card-text">
                    이 상품은 &quot;웹사이트&quot;가 아니라{' '}
                    <span className="introduce-card-text-highlight">오픈 후 바로 운영 가능한 웹서비스</span>를 구축합니다.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="introduce-card-wrap introduce-card-wrap-purple"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="introduce-card-glow introduce-card-glow-purple" aria-hidden />
                <div className="introduce-card">
                  <motion.div
                    className="introduce-card-icon-wrap introduce-card-icon-purple"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <div className="introduce-card-icon-blur" aria-hidden />
                    <div className="introduce-card-icon-inner">
                      <Layers size={32} strokeWidth={2} />
                    </div>
                  </motion.div>
                  <div className="introduce-card-heading-block">
                    <p className="introduce-card-label introduce-card-label-purple">운영 흐름</p>
                    <h3 className="introduce-card-title">관리자까지 포함된 서비스 구조</h3>
                  </div>
                  <div className="introduce-card-text-block">
                    <p className="introduce-card-text">
                      방문자는 예약·문의만 남기고,
                      관리자는 별도의 관리자 페이지에서
                      내역 확인·상태 관리까지 바로 할 수 있습니다.
                    </p>
                    <p className="introduce-card-text">
                      즉, <span className="introduce-card-text-highlight">운영을 전제로 설계된 완성형 웹서비스</span>입니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div id="works" className="works-section">
              <motion.div
                className="works-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="works-badge">PORTFOLIOS</div>
                <h2 className="works-title">
                  <span className="works-title-gradient">만든 결과물을</span>
                  <br />
                  <span className="works-title-white">직접 확인하세요</span>
                </h2>
                <p className="works-desc">
                  실제 프로젝트 사례를 통해 품질과 완성도를 확인할 수 있습니다.
                  <br />
                  비슷한 목적의 프로젝트를 찾아 참고해 보세요.
                </p>
              </motion.div>
              <div className="works-grid">
                <motion.div
                  className="works-card-wrap"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="works-card-glow" aria-hidden />
                  <a
                    href="https://british-speak.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-card-link"
                  >
                    <div className="work-card works-card">
                      <div className="work-image">
                        <img
                          src="/thumbnail/thumb_british.png"
                          alt="브랜드 리뉴얼 프로젝트"
                          fetchPriority="high"
                          decoding="async"
                        />
                      </div>
                      <div className="work-content">
                        <span className="work-category">웹 서비스</span>
                        <h3>학원 소개 / 문의 / 게시판 / 관리자 페이지</h3>
                        <p className="work-description">
                          React 기반 반응형 랜딩 페이지 제작.
                          <br />
                          인터랙티브 UI와 SEO 최적화를 적용했습니다.
                        </p>
                        <div className="work-tags">
                          <span className="tag">React</span>
                          <span className="tag">TypeScript</span>
                          <span className="tag">반응형</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
                <motion.div
                  className="works-card-wrap"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="works-card-glow" aria-hidden />
                  <div className="work-card-link">
                    <div className="work-card works-card">
                      <div className="work-image">
                        <img
                          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop"
                          alt="예약 관리 시스템"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="work-content">
                        <span className="work-category">웹 서비스</span>
                        <h3>예약 관리 시스템</h3>
                        <p className="work-description">
                          Next.js와 Supabase를 활용한 예약 관리 웹 서비스.
                          <br />
                          관리자 페이지와 사용자 페이지를 구축했습니다.
                        </p>
                        <div className="work-tags">
                          <span className="tag">Next.js</span>
                          <span className="tag">Supabase</span>
                          <span className="tag">관리자</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="works-card-wrap"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="works-card-glow" aria-hidden />
                  <div className="work-card-link">
                    <div className="work-card works-card">
                      <div className="work-image">
                        <img
                          src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=450&fit=crop"
                          alt="프로모션 캠페인"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="work-content">
                        <span className="work-category">마이크로 사이트</span>
                        <h3>프로모션 캠페인</h3>
                        <p className="work-description">
                          스크롤 애니메이션과 인터랙티브 요소가 포함된 프로모션 페이지.
                          <br />
                          모바일 최적화를 적용했습니다.
                        </p>
                        <div className="work-tags">
                          <span className="tag">React</span>
                          <span className="tag">애니메이션</span>
                          <span className="tag">모바일</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div id="process" className="process-section">
              <motion.div
                className="process-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="process-badge">PROCESS</div>
                <h2 className="process-title">
                  <span className="process-title-gradient">진행 방식</span>
                </h2>
                <p className="process-desc">
                  요청 전달부터 배포·검수까지 투명한 단계로 진행합니다.
                  <br /><br />
                  복잡해 보이지만,
                  <br />
                  실제 제작은 <span className="process-desc-highlight">빠르게</span> 진행됩니다.
                </p>
              </motion.div>
              <div className="process-rows">
              <div className="process-flow">
                <div className="process-track" aria-hidden />
                <div className="process-step">
                  <span className="process-node"><span className="process-num">1</span></span>
                  <span className="process-label">요청사항 / 참고 사이트 전달</span>
                  <p className="process-desc">원하시는 방향만 편하게 알려주세요.<br />참고 사이트가 있다면 함께 전달해주시면 좋아요.<br />정리되지 않아도 괜찮아요, 제가 기준을 잡아드립니다.</p>
                </div>
                <div className="process-step">
                  <span className="process-node"><span className="process-num">2</span></span>
                  <span className="process-label">페이지 구성안 확정</span>
                  <p className="process-desc">전달주신 내용을 바탕으로 페이지 구성과 기능 흐름을 먼저 정리해드립니다.<br />이 단계에서 방향만 맞추면 이후는 빠르게 진행됩니다.</p>
                </div>
                <div className="process-step">
                  <span className="process-node"><span className="process-num">3</span></span>
                  <span className="process-label">개발 진행</span>
                  <p className="process-desc">확정된 구성안을 기준으로 디자인과 기능 개발을 동시에 진행합니다.<br />중간중간 확인이 필요할 경우 공유드려요.</p>
                </div>
                <div className="process-step">
                  <span className="process-node"><span className="process-num">4</span></span>
                  <span className="process-label">배포 및 도메인 연결</span>
                  <p className="process-desc">완성된 웹서비스를 실제 서비스 환경에 배포합니다.<br />도메인이 있다면 연결까지 함께 진행해드립니다.<br />오픈 준비는 이 단계에서 마무리돼요.</p>
                </div>
                <div className="process-step">
                  <span className="process-node"><span className="process-num">5</span></span>
                  <span className="process-label">최종 검수 후 완료</span>
                  <p className="process-desc">최종 확인 후 바로 운영하실 수 있도록 정리해드립니다.<br />이후 간단한 수정이나 문의도 편하게 남겨주세요.</p>
                </div>
              </div>
              <div className="disclaimer-block-wrap">
                <div className="disclaimer-block-glow" aria-hidden />
                <div className="disclaimer-block">
                  <motion.div
                    className="introduce-card-icon-wrap introduce-card-icon-purple disclaimer-icon-wrap"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <div className="introduce-card-icon-blur" aria-hidden />
                    <div className="introduce-card-icon-inner">
                      <CardIcon type="shield" />
                    </div>
                  </motion.div>
                  <div className="card-body">
                    <span className="card-label">꼭 확인해주세요</span>
                    <h3>분쟁 방지 안내</h3>
                    <ul className="list">
                      <li>제작 기간은 자료 전달 완료 후 기준</li>
                      <li>기획 변경/기능 추가 시 비용·기간 증가</li>
                      <li>도메인/배포 계정은 고객 명의 권장</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div id="tech" className="tech-section">
              <motion.div
                className="tech-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="tech-badge">TECH</div>
                <h2 className="tech-title">
                  <span className="tech-title-gradient">기술 사양</span>
                  <br />
                  <span className="tech-title-white">최신 웹 기술 기반</span>
                </h2>
                <p className="tech-desc">최신 웹 기술 기반으로 빠르고 안정적인 웹사이트를 제작합니다.</p>
              </motion.div>
              <div className="tech-grid">
              <motion.div
                className="tech-card-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="tech-card-glow" aria-hidden />
                <div className="portfolio-card tech-card">
                <motion.div
                  className="introduce-card-icon-wrap introduce-card-icon-blue tech-card-icon-wrap"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="introduce-card-icon-blur" aria-hidden />
                  <div className="introduce-card-icon-inner">
                    <CardIcon type="code" />
                  </div>
                </motion.div>
                <div className="card-body">
                  <span className="card-label">기술 사양</span>
                  <h3>최신 웹 기술 기반</h3>
                  <ul className="list">
                    <li>
                      React / Next.js 기반 웹 제작
                      <span className="subtle">
                        검증된 라이브러리로 유지보수와 확장이 쉬운 구조를 만듭니다.
                      </span>
                    </li>
                    <li>
                      반응형 웹 (모바일/PC)
                      <span className="subtle">
                        화면 크기에 맞춰 레이아웃이 자동으로 최적화됩니다.
                      </span>
                    </li>
                    <li>
                      인터랙티브 UI 적용
                      <span className="subtle">
                        클릭·스크롤에 자연스럽게 반응하는 사용자 중심 인터랙션
                      </span>
                    </li>
                    <li>
                      관리자 페이지 및 서버 연동
                      <span className="subtle">
                        예약·문의 내역 확인과 상태 관리를 한 곳에서 할 수 있습니다.
                      </span>
                    </li>
                    <li>
                      안정적인 배포 환경 (Vercel)
                      <span className="subtle">
                        빠른 속도와 안정적인 서비스 운영을 위한 인프라를 사용합니다.
                      </span>
                    </li>
                    <li>
                      SEO 기본 최적화 포함
                      <span className="subtle">
                        검색 노출에 유리한 기본 구조와 메타 설정을 적용합니다.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              </motion.div>
            </div>
            </div>
          </div>
        </section>

        <div className="pricing-lead-section">
          <div className="pricing-lead-bg" aria-hidden />
          <div className="pricing-lead-orbs" aria-hidden>
            <div className="pricing-lead-orb pricing-lead-orb-tl" />
            <div className="pricing-lead-orb pricing-lead-orb-br" />
          </div>
          <div className="pricing-lead section muted">
          <div className="container">
            <p className="pricing-lead-text">
              <span className="pricing-lead-line pricing-lead-line-1"><span className="pricing-lead-emphasis">어렵게</span> 설명하시지 않아도,</span>
              <span className="pricing-lead-line pricing-lead-line-2 pricing-lead-accent">필요한 건 이미 정리돼 있습니다.</span>
            </p>
            <a href="#pricing" className="pricing-lead-arrow" aria-label="가격 섹션으로 이동">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 8l5 5 5-5M7 14l5 5 5-5" />
              </svg>
            </a>
          </div>
          </div>
        </div>

        <section id="pricing" className="pricing-section">
          <div className="pricing-section-bg" aria-hidden />
          <div className="pricing-section-orbs" aria-hidden>
            <div className="pricing-section-orb pricing-section-orb-tl" />
            <div className="pricing-section-orb pricing-section-orb-br" />
          </div>
          <div className="pricing-section-inner">
            <motion.div
              className="pricing-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="pricing-badge">PRICING</div>
              <h2 className="pricing-title">
                <span className="pricing-title-gradient">합리적인</span>
                <br />
                <span className="pricing-title-white">가격으로 시작하세요</span>
              </h2>
              <p className="pricing-desc">
                목적에 맞는 플랜을 선택해 부담 없이 시작할 수 있습니다.
                <br />
                오픈 특가로 더 낮은 비용으로 품질 있는 결과물을 경험해 보세요.
              </p>
            </motion.div>
            <div className="pricing-grid grid three">
              <div className="price-card-wrap price-card-wrap-basic">
                <div className="price-card-glow price-card-glow-basic" aria-hidden />
                <div className="price-card">
                <motion.div
                  className="introduce-card-icon-wrap introduce-card-icon-blue price-card-icon-wrap"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  aria-hidden
                >
                  <div className="introduce-card-icon-blur" aria-hidden />
                  <div className="introduce-card-icon-inner">
                    <CardIcon type="credit" />
                  </div>
                </motion.div>
                <div className="card-body">
                  <h3>베이직 패키지</h3>
                  <p className="price-tagline">원 페이지 랜딩 사이트가 필요하신 경우</p>
                  <div className="price-block">
                    <p className="price-original">정상가 40만 원</p>
                    <p className="price-main">20<span className="price-unit">만 원</span></p>
                  </div>
                  <ul className="price-features">
                    <li className="included">소개용 1페이지 랜딩(반응형 + SEO 기본)</li>
                    <li className="included">PC/태블릿/모바일 반응형</li>
                    <li className="included">기본 인터랙티브 요소(버튼/스크롤 UI)</li>
                    <li className="included">SEO 기본 구조 적용</li>
                    <li className="included">배포 + 도메인 연결 지원</li>
                    <li className="excluded">예약/문의 기능</li>
                    <li className="excluded">관리자 페이지</li>
                  </ul>
                  <ul className="meta-list">
                    <li>제작 기간: 약 3영업일</li>
                    <li>수정 3회 포함</li>
                  </ul>
                  <button className="ghost price-cta" type="button">
                    상담 신청
                  </button>
                </div>
              </div>
              </div>
              <div className="price-card-wrap price-card-wrap-featured">
                <div className="price-card-glow price-card-glow-featured" aria-hidden />
                <div className="price-card featured">
                <motion.div
                  className="introduce-card-icon-wrap introduce-card-icon-purple price-card-icon-wrap"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  aria-hidden
                >
                  <div className="introduce-card-icon-blur" aria-hidden />
                  <div className="introduce-card-icon-inner">
                    <CardIcon type="credit" />
                  </div>
                </motion.div>
                <div className="card-body">
                  <h3>서비스형 패키지</h3>
                  <p className="price-tagline">예약·문의까지 한 번에 필요하신 경우</p>
                  <div className="price-block">
                    <p className="price-original">정상가 80만 원</p>
                    <p className="price-main featured">40<span className="price-unit">만 원</span></p>
                  </div>
                  <ul className="price-features">
                    <li className="included featured">소개 랜딩 + 예약/문의 + 관리자 페이지</li>
                    <li className="included featured">예약/문의 데이터 저장(DB 연동)</li>
                    <li className="included featured">관리자 로그인/내역 조회/상태 변경</li>
                    <li className="included featured">반응형 + 터치 친화 UI</li>
                    <li className="included featured">SEO 구조 설계 + 배포 지원</li>
                  </ul>
                  <ul className="meta-list">
                    <li>제작 기간: 약 5영업일</li>
                    <li>수정 5회 포함</li>
                    <li>고도화 기능은 추가 개발(별도 협의)</li>
                  </ul>
                  <button className="primary price-cta" type="button">
                    상담 신청
                  </button>
                </div>
              </div>
              </div>
              <div className="price-card-wrap price-card-wrap-growth">
                <div className="price-card-glow price-card-glow-growth" aria-hidden />
                <div className="price-card growth">
                <motion.div
                  className="introduce-card-icon-wrap introduce-card-icon-growth price-card-icon-wrap"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  aria-hidden
                >
                  <div className="introduce-card-icon-blur" aria-hidden />
                  <div className="introduce-card-icon-inner">
                    <CardIcon type="credit" />
                  </div>
                </motion.div>
                <div className="card-body">
                  <h3>그로스 패키지</h3>
                  <p className="price-tagline">5페이지 규모 + API 연동이 필요한 경우</p>
                  <div className="price-block">
                    <p className="price-original">정상가 120만 원</p>
                    <p className="price-main growth">80<span className="price-unit">만 원</span></p>
                  </div>
                  <ul className="price-features">
                    <li className="included growth">5페이지 구성(메인·상세·예약/문의·콘텐츠·대시보드)</li>
                    <li className="included growth">서비스형 패키지 전체 포함</li>
                    <li className="included growth">외부 API 연동(CRM/슬랙/결제 등 1~2개 시스템)</li>
                    <li className="included growth">관리자·대시보드 포함</li>
                    <li className="included growth">챗봇 연동</li>
                  </ul>
                  <ul className="meta-list">
                    <li>제작 기간: 약 7~10영업일</li>
                    <li>수정 8회 포함</li>
                    <li>연동 범위·시스템은 협의</li>
                  </ul>
                  <button className="primary price-cta" type="button">
                    상담 신청
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">SOL</div>
              <span className="logo-text">SOLDev</span>
            </div>
            <p className="footer-description">
              최신 웹 기술로 빠르고 안정적인 웹사이트를 제작합니다.
              <br />
              React/Next.js 기반의 반응형 웹 개발 서비스를 제공합니다.
            </p>
          </div>
          <nav className="footer-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="footer-copyright">
            <span>© 2026 SOLDev™. All Rights Reserved.</span>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <div className="scroll-to-top-wrap" aria-hidden="true">
          <button
            className="scroll-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
          >
            <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
          </button>
        </div>
      )}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  )
}

export default App
