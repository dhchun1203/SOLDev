import { motion } from 'framer-motion'
import { Globe, Layers } from 'lucide-react'
import { defaultTransition, defaultViewport } from '../constants/motion'
import { Works } from './Works'
import { Process } from './Process'
import { Tech } from './Tech'

export function Introduce() {
  return (
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
          viewport={defaultViewport}
          transition={defaultTransition}
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
          <div className="introduce-card-wrap introduce-card-wrap-blue" tabIndex={0}>
            <div className="introduce-card-glow introduce-card-glow-blue" aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={defaultTransition}
              style={{ height: '100%' }}
            >
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
                  이 상품은 &quot;웹사이트&quot;가 아니라,
                  <br />
                  <span className="introduce-card-text-highlight">오픈 후 바로 운영 가능한 웹서비스</span>를 구축합니다.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="introduce-card-wrap introduce-card-wrap-purple" tabIndex={0}>
            <div className="introduce-card-glow introduce-card-glow-purple" aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: 0.1 }}
              style={{ height: '100%' }}
            >
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
        </div>

        <Works />
        <Process />
        <Tech />
      </div>
    </section>
  )
}
