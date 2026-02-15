import { motion } from 'framer-motion'
import { ChevronDown, Globe, Layers } from 'lucide-react'
import { defaultTransition, defaultViewport } from '../constants/motion'
import { Works } from './Works'
import { Process } from './Process'

export type IntroduceProps = {
  scrollToAnchor: (id: string) => void
}

export function Introduce({ scrollToAnchor }: IntroduceProps) {
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
            <span className="introduce-title-gradient">&apos;운영&apos;</span>
            <span className="introduce-title-white">까지 완성합니다</span>
          </h2>
          <p className="introduce-desc">
            예약·문의 수집 + 관리자 관리까지 포함된{' '}
            <span className="introduce-desc-highlight">&apos;운영형&apos;</span>
            구조입니다.
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
                  <h3 className="introduce-card-title">랜딩 + 문의가 자동으로 모이는 구조</h3>
                </div>
                <ul className="introduce-card-list">
                  <li>문의/예약 폼을 한 곳에 모아 저장</li>
                  <li>알림/상태 변경(대기→완료)까지 가능</li>
                  <li>모바일에서 입력/확인하기 쉽게 최적화</li>
                </ul>
                <p className="introduce-card-text introduce-card-text-close">
                  운영이 <span className="introduce-card-text-highlight">&apos;수기&apos;</span>가 아니라{' '}
                  <span className="introduce-card-text-highlight">&apos;시스템&apos;</span>이 됩니다.
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
                  <p className="introduce-card-label introduce-card-label-purple">운영 기능</p>
                  <h3 className="introduce-card-title">관리자 페이지까지 포함</h3>
                </div>
                <ul className="introduce-card-list">
                  <li>문의/예약 목록 자동 저장</li>
                  <li>상태 관리 및 메모 기록</li>
                  <li>대시보드 형 관리자 페이지 제작</li>
                </ul>
                <p className="introduce-card-text introduce-card-text-close">
                  고객 응대가 빨라져서 <span className="introduce-card-text-highlight">이탈이 줄어듭니다.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="introduce-cta-wrap"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={defaultTransition}
        >
          <a
            href="#works"
            className="introduce-cta"
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor('works')
            }}
          >
            포트폴리오로 확인하기
            <motion.span
              className="introduce-cta-chevron"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              <ChevronDown size={20} strokeWidth={2} />
            </motion.span>
          </a>
        </motion.div>

        <Works />
        <Process />
      </div>
    </section>
  )
}
