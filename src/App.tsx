import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isDark, setIsDark] = useState(() => {
    // localStorage에서 저장된 설정 불러오기
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    // 시스템 설정 감지
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [showScrollTop, setShowScrollTop] = useState(false)

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

    // 헤더 스크롤 효과 및 ScrollToTop 버튼 표시
    const handleScroll = () => {
      const header = document.querySelector('.site-header')
      if (window.scrollY > 50) {
        header?.classList.add('scrolled')
      } else {
        header?.classList.remove('scrolled')
      }
      
      // ScrollToTop 버튼 표시 (300px 이상 스크롤 시)
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 상태 확인

    return () => {
      elementsToObserve.forEach((el) => {
        observerRef.current?.unobserve(el)
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 다크모드 적용
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDark])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#hero">
            SOLDev
          </a>
          <nav className="nav">
            <a href="#services">서비스</a>
            <a href="#portfolio">포트폴리오</a>
            <a href="#pricing">가격</a>
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
                  {isDark ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </span>
              </span>
            </button>
            <button className="cta" type="button">
              문의하기
            </button>
          </div>
        </div>
      </header>

      <main>
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
              <h2>오픈 특가 안내</h2>
              <p>포트폴리오 구축 목적의 한정 수량 혜택으로 진행합니다.</p>
            </div>
            <div className="grid two">
              <div className="info-card">
                <h3>오픈 특가 조건</h3>
                <ul className="list">
                  <li>정상가 기준의 작업 품질/구성 동일 제공</li>
                  <li>한정 수량 완료 시 특가 종료 후 정상가 전환</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>포트폴리오 활용</h3>
                <p className="subtle">
                  작업 결과물은 포트폴리오로 활용될 수 있습니다. 민감 정보와 계정
                  정보는 노출하지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section muted">
          <div className="container">
            <div className="section-header">
              <h2>진행 방식 &amp; 기술 사양</h2>
            </div>
            <div className="grid three">
              <div className="portfolio-card">
                <span>진행 방식</span>
                <h3>간단하고 명확한 프로세스</h3>
                <ol className="list ordered">
                  <li>요청사항/참고 사이트 전달</li>
                  <li>페이지 구성안 확정</li>
                  <li>개발 진행</li>
                  <li>배포 및 도메인 연결</li>
                  <li>최종 검수 후 완료</li>
                </ol>
              </div>
              <div className="portfolio-card">
                <span>기술 사양</span>
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
              <div className="portfolio-card">
                <span>꼭 확인해주세요</span>
                <h3>분쟁 방지 안내</h3>
                <ul className="list">
                  <li>제작 기간은 자료 전달 완료 후 기준</li>
                  <li>기획 변경/기능 추가 시 비용·기간 증가</li>
                  <li>도메인/배포 계정은 고객 명의 권장</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="section muted">
          <div className="container">
            <div className="section-header">
              <h2>포트폴리오</h2>
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
        </section>

        <section id="pricing" className="section">
          <div className="container">
            <div className="section-header">
              <h2>가격</h2>
            </div>
            <div className="grid two">
              <div className="price-card">
                <h3>베이직 패키지</h3>
                <p className="price-range">오픈 특가 20만 원</p>
                <p className="subtle price-original">정상가 43만 원</p>
                <ul>
                  <li>소개용 1페이지 랜딩(반응형 + SEO 기본)</li>
                  <li>PC/태블릿/모바일 반응형</li>
                  <li>기본 인터랙티브 요소(버튼/스크롤 UI)</li>
                  <li>SEO 기본 구조 적용</li>
                  <li>배포 + 도메인 연결 지원</li>
                </ul>
                <div className="divider" />
                <ul className="meta-list">
                  <li>제작 기간: 약 3영업일</li>
                  <li>수정 2회 포함</li>
                  <li>예약/문의 기능, 관리자 페이지 제외</li>
                </ul>
                <button className="ghost" type="button">
                  베이직 문의
                </button>
              </div>
              <div className="price-card featured">
                <h3>서비스형 패키지</h3>
                <p className="price-range">오픈 특가 40만 원</p>
                <p className="subtle price-original">정상가 72만 원</p>
                <ul>
                  <li>소개 랜딩 + 예약/문의 + 관리자 페이지</li>
                  <li>예약/문의 데이터 저장(DB 연동)</li>
                  <li>관리자 로그인/내역 조회/상태 변경</li>
                  <li>반응형 + 터치 친화 UI</li>
                  <li>SEO 구조 설계 + 배포 지원</li>
                </ul>
                <div className="divider" />
                <ul className="meta-list">
                  <li>제작 기간: 약 5영업일</li>
                  <li>수정 2회 포함</li>
                  <li>고도화 기능은 추가 개발(별도 협의)</li>
                </ul>
                <button className="primary" type="button">
                  서비스형 문의
                </button>
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
            <a href="#services">서비스</a>
            <a href="#portfolio">포트폴리오</a>
            <a href="#pricing">가격</a>
            <a href="#hero">소개</a>
            <a href="#contact">문의</a>
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
