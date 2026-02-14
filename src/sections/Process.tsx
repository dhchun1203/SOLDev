import { motion } from 'framer-motion'
import { CardIcon } from '../components/ui/CardIcon'
import { processSteps } from '../config/process'
import { processStepVariants, processStaggerVariants } from '../constants/motion'

export function Process() {
  return (
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
          <br />
          <br />
          복잡해 보이지만,
          <br />
          실제 제작은 <span className="process-desc-highlight">빠르게</span> 진행됩니다.
        </p>
      </motion.div>
      <div className="process-decoration-inline" aria-hidden>
        <img src="/calendar-person.png" alt="" className="process-decoration-inline-img" />
      </div>
      <div className="process-rows">
        <motion.div
          className="process-flow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={processStaggerVariants}
        >
          <div className="process-track" aria-hidden />
          {processSteps.map((step) => (
            <motion.div
              key={step.num}
              className="process-step"
              variants={processStepVariants}
            >
              <span className="process-node">
                <span className="process-num">{step.num}</span>
              </span>
              <span className="process-label">{step.label}</span>
              <p className="process-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="disclaimer-block-wrap" tabIndex={0}>
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
  )
}
