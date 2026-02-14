import { motion } from 'framer-motion'
import { worksItems } from '../config/works'
import { defaultTransition, defaultViewport } from '../constants/motion'

export function Works() {
  return (
    <div id="works" className="works-section">
      <motion.div
        className="works-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={defaultTransition}
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
        {worksItems.map((work, i) => (
          <div key={work.id} className="works-card-wrap" tabIndex={0}>
            <div className="works-card-glow" aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: i * 0.1 }}
              style={{ flex: 1, minHeight: 0 }}
            >
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card-link"
              >
                <div className="work-card works-card">
                  <div className="work-image">
                    <img
                      src={work.image}
                      alt={work.imageAlt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className="work-content">
                    <span className="work-category">{work.category}</span>
                    <h3>{work.title}</h3>
                    <p className="work-description">{work.description}</p>
                    <div className="work-tags">
                      {work.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
