import { motion } from 'framer-motion'
import { CardIcon } from '../components/ui/CardIcon'
import { techItems } from '../config/tech'

export function Tech() {
  return (
    <div id="tech" className="tech-section">
      <div className="tech-header">
        <div className="tech-badge">TECH</div>
        <h2 className="tech-title">
          <span className="tech-title-gradient">기술 사양</span>
          <br />
          <span className="tech-title-white">최신 웹 기술 기반</span>
        </h2>
        <p className="tech-desc">
          최신 웹 기술 기반으로 빠르고 안정적인 웹사이트를 제작합니다.
        </p>
      </div>
      <div className="tech-block-wrap" tabIndex={0}>
        <div className="tech-block-glow" aria-hidden />
        <div className="tech-block">
          <motion.div
            className="introduce-card-icon-wrap introduce-card-icon-blue tech-icon-wrap"
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            <div className="introduce-card-icon-blur" aria-hidden />
            <div className="introduce-card-icon-inner">
              <CardIcon type="code" />
            </div>
          </motion.div>
          <div className="tech-block-body">
            <span className="tech-block-label">기술 사양</span>
            <h3 className="tech-block-title">최신 웹 기술 기반</h3>
            <ul className="tech-list">
              {techItems.map((item, i) => (
                <li key={i}>
                  <strong className="tech-list-heading">{item.heading}</strong>
                  <span className="tech-list-desc">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
