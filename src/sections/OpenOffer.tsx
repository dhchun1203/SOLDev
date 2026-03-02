import { motion } from 'framer-motion'
import { Gift, TrendingDown } from 'lucide-react'
import { defaultTransition, defaultViewport } from '../constants/motion'

export type OpenOfferProps = {
  scrollToAnchor: (id: string) => void
}

export function OpenOffer({ scrollToAnchor }: OpenOfferProps) {
  return (
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
            viewport={defaultViewport}
            transition={defaultTransition}
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
                onClick={() => scrollToAnchor('pricing')}
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
            viewport={defaultViewport}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <div className="open-offer-card-wrap" tabIndex={0}>
              <div className="open-offer-card-glow" aria-hidden />
              <div className="open-offer-card">
                <div className="open-offer-card-image">
                  <img
                    src="https://images.unsplash.com/photo-1661169398420-e8d229fb39f4?w=1080&q=80"
                    alt="포트폴리오 워크스페이스"
                    fetchPriority="high"
                  />
                  <div className="open-offer-card-image-overlay" aria-hidden>
                    <img src="/computer-person.png" alt="" className="open-offer-card-overlay-img" />
                  </div>
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
  )
}
