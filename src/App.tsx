import './App.css'

function App() {
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
          <button className="cta" type="button">
            문의하기
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="section hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">프리랜서 디자이너 · 프론트엔드</p>
              <h1>브랜드의 이야기를 만드는 포트폴리오</h1>
              <p className="lead">
                미니멀한 UI와 빠른 개발로 제품의 핵심 가치를 전달합니다.
                빠르게 확인할 수 있는 프로토타입과 운영 친화적인 구조를 제공합니다.
              </p>
              <div className="hero-actions">
                <button className="primary" type="button">
                  프로젝트 상담
                </button>
                <button className="ghost" type="button">
                  작업 방식 보기
                </button>
              </div>
              <div className="hero-meta">
                <div>
                  <strong>5+</strong>
                  <span>프로젝트 완료</span>
                </div>
                <div>
                  <strong>3주</strong>
                  <span>평균 제작 기간</span>
                </div>
                <div>
                  <strong>1:1</strong>
                  <span>직접 커뮤니케이션</span>
                </div>
              </div>
            </div>
            <div className="hero-card">
              <div className="card-content">
                <span className="tag">최근 작업</span>
                <h3>브랜드 리뉴얼 랜딩 페이지</h3>
                <p>UI/UX 디자인 · React 개발 · 반응형 최적화</p>
                <button className="text-link" type="button">
                  상세 보기
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-header">
              <h2>서비스 소개</h2>
              <p>빠르게 결과를 확인하고, 운영까지 이어지는 경험을 만듭니다.</p>
            </div>
            <div className="grid three">
              <div className="info-card">
                <h3>UI/UX 디자인</h3>
                <p>브랜드 톤에 맞춘 비주얼과 사용 흐름을 설계합니다.</p>
              </div>
              <div className="info-card">
                <h3>프론트엔드 개발</h3>
                <p>React 기반 SPA로 유지보수 가능한 구조를 제공합니다.</p>
              </div>
              <div className="info-card">
                <h3>콘텐츠 운영</h3>
                <p>어드민 없이도 업데이트 가능한 콘텐츠 구조를 제안합니다.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section muted">
          <div className="container">
            <div className="section-header">
              <h2>포트폴리오</h2>
              <p>브랜드별 맞춤 전략으로 제작한 프로젝트입니다.</p>
            </div>
            <div className="grid three">
              <div className="portfolio-card">
                <span>브랜드 캠페인</span>
                <h3>리브랜딩 마이크로 사이트</h3>
                <p>스토리텔링 기반 인터랙션, 2주 제작</p>
              </div>
              <div className="portfolio-card">
                <span>스타트업</span>
                <h3>SaaS 온보딩 랜딩</h3>
                <p>전환율 18% 개선, React + Motion</p>
              </div>
              <div className="portfolio-card">
                <span>커머스</span>
                <h3>프로모션 페이지</h3>
                <p>모바일 최적화, 콘텐츠 템플릿 제공</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="container">
            <div className="section-header">
              <h2>가격</h2>
              <p>필요한 범위에 맞춰 유연하게 진행합니다.</p>
            </div>
            <div className="grid three">
              <div className="price-card">
                <h3>Starter</h3>
                <p className="price">₩900,000</p>
                <ul>
                  <li>1페이지 구성</li>
                  <li>기본 디자인 가이드</li>
                  <li>2주 제작</li>
                </ul>
                <button className="ghost" type="button">
                  선택하기
                </button>
              </div>
              <div className="price-card featured">
                <h3>Growth</h3>
                <p className="price">₩1,800,000</p>
                <ul>
                  <li>3~5 섹션 구성</li>
                  <li>브랜드 톤 &amp; UX 설계</li>
                  <li>3주 제작</li>
                </ul>
                <button className="primary" type="button">
                  가장 인기
                </button>
              </div>
              <div className="price-card">
                <h3>Scale</h3>
                <p className="price">₩3,200,000</p>
                <ul>
                  <li>맞춤형 구성</li>
                  <li>인터랙션 추가</li>
                  <li>4주 제작</li>
                </ul>
                <button className="ghost" type="button">
                  상담하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© 2026 Portfolio Studio</span>
          <span>contact@portfolio.studio</span>
        </div>
      </footer>
    </div>
  )
}

export default App
