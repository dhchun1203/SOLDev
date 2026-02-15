import { motion } from 'framer-motion'
import { Code2, Zap, Sparkles, ArrowRight } from 'lucide-react'
import {
  heroStaggerVariants,
  heroItemVariants,
  heroTitleVariants,
} from '../constants/motion'

export type HeroCosmicProps = {
  scrollToAnchor: (id: string) => void
}

export function HeroCosmic({ scrollToAnchor }: HeroCosmicProps) {
  return (
    <motion.section
      className="hero-cosmic"
      aria-label="메인 비주얼"
    >
      <div className="hero-cosmic-bg" aria-hidden="true" />
      <div className="hero-cosmic-mesh" aria-hidden="true">
        <div className="hero-cosmic-mesh-1" />
        <div className="hero-cosmic-mesh-2" />
        <div className="hero-cosmic-mesh-3" />
      </div>
      <div className="hero-cosmic-orbs" aria-hidden="true">
        <motion.div
          className="hero-cosmic-orb hero-cosmic-orb-1"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-cosmic-orb hero-cosmic-orb-2"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-cosmic-orb hero-cosmic-orb-3"
          animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="hero-cosmic-floats">
        <motion.div
          className="hero-cosmic-float hero-cosmic-float-tl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <div className="hero-cosmic-float-card hero-cosmic-float-card-code">
            <Code2 size={32} strokeWidth={2} />
          </div>
        </motion.div>
        <motion.div
          className="hero-cosmic-float hero-cosmic-float-tr"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <div className="hero-cosmic-float-card hero-cosmic-float-card-zap">
            <Zap size={40} strokeWidth={2} />
          </div>
        </motion.div>
        <motion.div
          className="hero-cosmic-float hero-cosmic-float-ml"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <div className="hero-cosmic-float-card hero-cosmic-float-card-spark">
            <Sparkles size={28} strokeWidth={2} />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-cosmic-inner"
        initial="hidden"
        animate="visible"
        variants={heroStaggerVariants}
      >
        <motion.div
          className="hero-cosmic-badge"
          variants={heroItemVariants}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Sparkles className="hero-cosmic-badge-icon" size={16} strokeWidth={2} />
          <span>SOLDev · 웹서비스 제작</span>
        </motion.div>
        <motion.div
          className="hero-cosmic-title-wrap"
          variants={heroTitleVariants}
          transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
        >
          <h1 className="hero-cosmic-title">
            <span className="hero-cosmic-title-white">오픈 즉시 </span>
            <span className="hero-cosmic-title-gradient-wrap">
              <span className="hero-cosmic-title-gradient">쓰이는</span>
              <motion.div
                className="hero-cosmic-title-glow"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
            </span>
            <br />
            <span className="hero-cosmic-title-white">웹서비스</span>
          </h1>
          <motion.div
            className="hero-cosmic-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            <p>
              만들고 끝나는 사이트 말고,
              <br />
              <span className="hero-cosmic-highlight-wrap">
                <span className="hero-cosmic-highlight">바로 매출로 연결되는 웹서비스</span>
                <span className="hero-cosmic-highlight-underline" aria-hidden />
              </span>
              가 필요하신가요?
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-cosmic-actions"
          variants={heroItemVariants}
          transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
        >
          <motion.a
            href="#works"
            className="hero-cosmic-btn hero-cosmic-btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hero-cosmic-btn-inner">
              포트폴리오 보기
              <ArrowRight className="hero-cosmic-btn-arrow" size={20} strokeWidth={2} />
            </span>
          </motion.a>
          <motion.a
            href="#pricing"
            className="hero-cosmic-btn hero-cosmic-btn-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            가격 확인하기
          </motion.a>
        </motion.div>
        <motion.div
          className="hero-cosmic-metrics"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ delay: 0.55 }}
        >
          <span className="hero-cosmic-metric">
            <span className="hero-cosmic-metric-dot hero-cosmic-metric-dot-green" /> 평균 제작 기간 3-5일
          </span>
          <span className="hero-cosmic-metric">
            <span className="hero-cosmic-metric-dot hero-cosmic-metric-dot-blue" /> 고객 맞춤 제작
          </span>
          <span className="hero-cosmic-metric">
            <span className="hero-cosmic-metric-dot hero-cosmic-metric-dot-purple" /> 최신 기술 스택
          </span>
        </motion.div>
        <a
          href="#hero"
          className="hero-cosmic-scroll-hint"
          aria-label="아래 섹션으로 스크롤"
          onClick={(e) => {
            e.preventDefault()
            scrollToAnchor('hero')
          }}
        >
          <span className="hero-cosmic-scroll-hint-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </span>
        </a>
      </motion.div>
    </motion.section>
  )
}
