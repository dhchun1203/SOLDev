import { motion } from 'framer-motion'
import { Layers, Folder, CheckCircle2 } from 'lucide-react'
import { defaultTransition, defaultViewport } from '../constants/motion'

export function OfferDetails() {
  return (
    <section id="services" className="offer-details">
      <div className="offer-details-bg" aria-hidden="true" />
      <div className="offer-details-inner">
        <motion.div
          className="offer-details-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={defaultTransition}
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
          <div className="offer-details-card-wrap offer-details-card-wrap-purple" tabIndex={0}>
            <div className="offer-details-card-glow offer-details-card-glow-purple" aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={defaultTransition}
              style={{ height: '100%' }}
            >
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
          </div>

          <div className="offer-details-card-wrap offer-details-card-wrap-blue" tabIndex={0}>
            <div className="offer-details-card-glow offer-details-card-glow-blue" aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: 0.1 }}
              style={{ height: '100%' }}
            >
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
                  <p className="offer-details-card-text-sub">
                    민감 정보와 계정 정보는 노출하지 않습니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
