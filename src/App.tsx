import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '#hero', label: '소개' },
  { href: '#services', label: '오픈 특가' },
  { href: '#portfolio', label: '제공 내용' },
  { href: '#works', label: '포트폴리오' },
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

function DarkModeIcon({ isDark }: { isDark: boolean }) {
  const size = 14
  const iconStroke = { strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return isDark ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconStroke}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconStroke}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const scrollTopRef = useRef(false)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return true
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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
  const toggleDarkMode = useCallback(() => setIsDark((d) => !d), [])
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
      '.section-header, .info-card, .portfolio-card, .price-card, .work-card'
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

  // 테마: 기본 다크, 라이트 시 .light 추가 (참고 디자인이 다크 기준)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDark])

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
          <a className="logo" href="#hero" onClick={closeMenu}>
            <span className="logo-icon" aria-hidden="true">?</span>
            SOLDev
          </a>
          <nav className="nav header-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="dark-toggle"
              type="button"
              onClick={toggleDarkMode}
              aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              <span className="toggle-track">
                <span className="toggle-thumb">
                  <DarkModeIcon isDark={isDark} />
                </span>
              </span>
            </button>
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
            <button
              className="dark-toggle"
              type="button"
              onClick={toggleDarkMode}
              aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              <span className="toggle-track">
                <span className="toggle-thumb">
                  <DarkModeIcon isDark={isDark} />
                </span>
              </span>
            </button>
            <button className="cta" type="button" onClick={closeMenu}>
              문의하기
            </button>
          </div>
        </aside>
      </div>

      <main>
        <section
          ref={heroRef}
          className="hero-cosmic"
          aria-label="메인 비주얼"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          style={
            {
              '--mouse-x': mousePos.x,
              '--mouse-y': mousePos.y,
            } as React.CSSProperties
          }
        >
          <div className="hero-cosmic-bg" aria-hidden="true" />
          <div className="hero-cosmic-inner">
            <div className="hero-cosmic-badge">
              <span className="hero-cosmic-badge-dot" />
              SOLDev · 웹서비스 제작
            </div>
            <h1 className="hero-cosmic-title">실제로 쓰이는 웹서비스</h1>
            <p className="hero-cosmic-subtitle">
              예쁘기만 한 웹사이트가 아니라,
              <br />
              오픈하자마자 바로 운영할 수 있는
              <br />
              <span className="hero-cosmic-highlight">&lsquo;실제로 쓰이는 웹서비스&rsquo;</span>를 만듭니다.
            </p>
            <div className="hero-cosmic-actions">
              <a href="#portfolio" className="hero-cosmic-btn hero-cosmic-btn-primary">
                포트폴리오 보기
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#pricing" className="hero-cosmic-btn hero-cosmic-btn-secondary">
                가격 확인하기
              </a>
            </div>
          </div>
        </section>

        <section id="hero" className="section hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">SOLDev · 오픈 특가 진행 중</p>
              <h1>
                <span className="highlight">오픈 특가</span>로 시작하는 포트폴리오 구축
              </h1>
              <p className="lead">
                서비스 런칭 초기 단계로 한정 수량 오픈 특가로 진행합니다.
                정상가 기준의 작업 품질과 구성은 동일하게 제공되며, 수량 소진 시
                정상가로 전환됩니다.
              </p>
              <div className="hero-actions">
                <button className="primary" type="button">
                  오픈 특가 문의
                </button>
                <button className="ghost" type="button">
                  작업 범위 보기
                </button>
              </div>
              <div className="hero-meta">
                <div>
                  <strong>베이직</strong>
                  <span>오픈 특가 진행</span>
                </div>
                <div>
                  <strong>서비스형</strong>
                  <span>오픈 특가 진행</span>
                </div>
                <div>
                  <strong>동일 품질</strong>
                  <span>정상가 기준 제공</span>
                </div>
              </div>
            </div>
            <div className="hero-card">
              <div className="card-content">
                <span className="tag">오픈 특가 안내</span>
                <h3>포트폴리오 활용 가능</h3>
                <p>
                  작업 결과물은 포트폴리오로 활용될 수 있습니다.
                  민감 정보/계정 정보는 노출하지 않습니다.
                </p>
                <button className="text-link" type="button">
                  상세 안내 보기
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-header-badge">Offer</span>
              <h2>
                <span className="section-header-title-accent">오픈 특가로</span>
                <span className="section-header-title-line">부담 없이 시작하세요</span>
              </h2>
              <p>포트폴리오 구축 목적의 한정 수량 혜택으로 진행합니다. 정상가와 동일한 품질을 특가로 경험해 보세요.</p>
            </div>
            <div className="grid two">
              <div className="info-card">
                <span className="card-icon" aria-hidden><CardIcon type="tag" /></span>
                <div className="card-body">
                  <h3>오픈 특가 조건</h3>
                  <ul className="list">
                    <li>정상가 기준의 작업 품질/구성 동일 제공</li>
                    <li>한정 수량 완료 시 특가 종료 후 정상가 전환</li>
                  </ul>
                </div>
              </div>
              <div className="info-card">
                <span className="card-icon" aria-hidden><CardIcon type="folder" /></span>
                <div className="card-body">
                  <h3>포트폴리오 활용</h3>
                  <p className="subtle">
                    작업 결과물은 포트폴리오로 활용될 수 있습니다. 민감 정보와 계정
                    정보는 노출하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section muted">
          <div className="container">
            <div className="section-header">
              <span className="section-header-badge">Portfolio</span>
              <h2>
                <span className="section-header-title-accent">이런 결과물을</span>
                <span className="section-header-title-line">제공합니다</span>
              </h2>
              <p>기획부터 개발까지, 실제로 쓰이는 웹 서비스를 한 번에 완성해 드립니다. 웹사이트가 아닌 운영 가능한 서비스를 만나 보세요.</p>
            </div>
            <div className="grid two">
              <div className="portfolio-card">
                <span className="card-icon" aria-hidden><CardIcon type="globe" /></span>
                <div className="card-body">
                  <span className="card-label">제공 형태</span>
                  <h3>웹사이트가 아닌 웹서비스</h3>
                  <p className="subtle">
                    이 상품은 &quot;웹사이트&quot;가 아니라{' '}
                    <strong>오픈 후 바로 운영 가능한 웹서비스</strong>를 구축합니다.
                  </p>
                </div>
              </div>
              <div className="portfolio-card">
                <span className="card-icon" aria-hidden><CardIcon type="flow" /></span>
                <div className="card-body">
                  <span className="card-label">운영 흐름</span>
                  <h3>방문자 → 관리자</h3>
                  <p className="subtle">
                    방문자는 예약/문의를 남기고 → 관리자는 관리자 페이지에서
                    내역을 확인하고 상태를 관리합니다.
                  </p>
                </div>
              </div>
            </div>
            <div id="works">
              <div className="section-header">
                <span className="section-header-badge">Works</span>
                <h2>
                  <span className="section-header-title-accent">만든 결과물을</span>
                  <span className="section-header-title-line">직접 확인하세요</span>
                </h2>
                <p>실제 프로젝트 사례를 통해 품질과 완성도를 확인할 수 있습니다. 비슷한 목적의 프로젝트를 찾아 참고해 보세요.</p>
              </div>
              <div className="grid three">
              <div className="work-card">
                <div className="work-image">
                  <img
                    src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=450&fit=crop"
                    alt="브랜드 리뉴얼 프로젝트"
                  />
                </div>
                <div className="work-content">
                  <span className="work-category">랜딩 페이지</span>
                  <h3>브랜드 리뉴얼 프로젝트</h3>
                  <p className="work-description">
                    React 기반 반응형 랜딩 페이지 제작. 인터랙티브 UI와 SEO 최적화를 적용했습니다.
                  </p>
                  <div className="work-tags">
                    <span className="tag">React</span>
                    <span className="tag">TypeScript</span>
                    <span className="tag">반응형</span>
                  </div>
                </div>
              </div>
              <div className="work-card">
                <div className="work-image">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop"
                    alt="예약 관리 시스템"
                  />
                </div>
                <div className="work-content">
                  <span className="work-category">웹 서비스</span>
                  <h3>예약 관리 시스템</h3>
                  <p className="work-description">
                    Next.js와 Supabase를 활용한 예약 관리 웹 서비스. 관리자 페이지와 사용자 페이지를 구축했습니다.
                  </p>
                  <div className="work-tags">
                    <span className="tag">Next.js</span>
                    <span className="tag">Supabase</span>
                    <span className="tag">관리자</span>
                  </div>
                </div>
              </div>
              <div className="work-card">
                <div className="work-image">
                  <img
                    src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=450&fit=crop"
                    alt="프로모션 캠페인"
                  />
                </div>
                <div className="work-content">
                  <span className="work-category">마이크로 사이트</span>
                  <h3>프로모션 캠페인</h3>
                  <p className="work-description">
                    스크롤 애니메이션과 인터랙티브 요소가 포함된 프로모션 페이지. 모바일 최적화를 적용했습니다.
                  </p>
                  <div className="work-tags">
                    <span className="tag">React</span>
                    <span className="tag">애니메이션</span>
                    <span className="tag">모바일</span>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="section-header">
              <span className="section-header-badge">Process</span>
              <h2>
                <span className="section-header-title-accent">진행 방식 &amp;</span>
                <span className="section-header-title-line">기술 사양</span>
              </h2>
              <p>요청 전달부터 배포·검수까지 투명한 단계로 진행합니다. 최신 웹 기술로 안정적이고 빠른 결과를 드립니다.</p>
            </div>
            <div className="grid three">
              <div className="portfolio-card">
                <span className="card-icon" aria-hidden><CardIcon type="layers" /></span>
                <div className="card-body">
                  <span className="card-label">진행 방식</span>
                  <h3>간단하고 명확한 프로세스</h3>
                  <ol className="list ordered">
                    <li>요청사항/참고 사이트 전달</li>
                    <li>페이지 구성안 확정</li>
                    <li>개발 진행</li>
                    <li>배포 및 도메인 연결</li>
                    <li>최종 검수 후 완료</li>
                  </ol>
                </div>
              </div>
              <div className="portfolio-card">
                <span className="card-icon" aria-hidden><CardIcon type="code" /></span>
                <div className="card-body">
                  <span className="card-label">기술 사양</span>
                  <h3>최신 웹 기술 기반</h3>
                  <p className="subtle">
                    최신 웹 기술 기반으로 빠르고 안정적인 웹사이트를 제작합니다.
                  </p>
                  <ul className="list">
                    <li>React / Next.js 기반 웹 제작</li>
                    <li>반응형 웹 (모바일/PC)</li>
                    <li>관리자 페이지 및 서버 연동</li>
                    <li>안정적인 배포 환경 (Vercel)</li>
                    <li>SEO 기본 최적화 포함</li>
                    <li>
                      인터랙티브 UI 적용
                      <span className="subtle">
                        클릭·스크롤에 자연스럽게 반응하는 사용자 중심 인터랙션
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="portfolio-card">
                <span className="card-icon" aria-hidden><CardIcon type="shield" /></span>
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
        </section>

        <section id="pricing" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-header-badge">Pricing</span>
              <h2>
                <span className="section-header-title-accent">합리적인</span>
                <span className="section-header-title-line">가격으로 시작하세요</span>
              </h2>
              <p>목적에 맞는 플랜을 선택해 부담 없이 시작할 수 있습니다. 오픈 특가로 더 낮은 비용으로 품질 있는 결과물을 경험해 보세요.</p>
            </div>
            <div className="grid two">
              <div className="price-card">
                <span className="card-icon price-icon-basic" aria-hidden><CardIcon type="credit" /></span>
                <div className="card-body">
                  <h3>베이직 패키지</h3>
                  <p className="price-tagline">심플한 시작</p>
                  <div className="price-block">
                    <p className="price-original">정상가 43만 원</p>
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
                    <li>수정 2회 포함</li>
                  </ul>
                  <button className="ghost price-cta" type="button">
                    상담 신청
                  </button>
                </div>
              </div>
              <div className="price-card featured">
                <span className="card-icon price-icon-featured" aria-hidden><CardIcon type="credit" /></span>
                <div className="card-body">
                  <h3>서비스형 패키지</h3>
                  <p className="price-tagline">가장 많이 선택하는</p>
                  <div className="price-block">
                    <p className="price-original">정상가 72만 원</p>
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
                    <li>수정 2회 포함</li>
                    <li>고도화 기능은 추가 개발(별도 협의)</li>
                  </ul>
                  <button className="primary price-cta" type="button">
                    상담 신청
                  </button>
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
      )}
    </div>
  )
}

export default App
