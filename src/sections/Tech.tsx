import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { RoughNotation } from 'react-rough-notation'
import { defaultTransition, defaultViewport } from '../constants/motion'

const techPoints = [
  'Next.js · TypeScript · Tailwind 기반',
  '모바일·PC 완전 반응형',
  '관리자 페이지 및 서버 연동 포함',
  'Vercel 기반 안정적 배포 환경',
]

export function Tech() {
  return (
    <section className="tech-section-wrapper" aria-labelledby="tech-heading">
      <div className="introduce-bg" aria-hidden="true" />
      <div className="introduce-orbs" aria-hidden="true">
        <div className="introduce-orb introduce-orb-tl" />
        <div className="introduce-orb introduce-orb-br" />
      </div>
      <div id="tech" className="tech-section">
        <div className="tech-header">
          <div className="tech-badge">TECH</div>
          <h2 id="tech-heading" className="tech-title">
            <span className="tech-title-gradient">&apos;안정성&apos;</span>
            <span className="tech-title-white"> </span>
            <span className="tech-title-gradient">&apos;확장성&apos;</span>
            <span className="tech-title-white">을</span>
            <br />
            <span className="tech-title-white">고려한 기술 구조</span>
          </h2>
        </div>
        <div className="tech-points-grid">
          {techPoints.map((text, i) => (
            <motion.div
              key={text}
              className="tech-grid-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: i * 0.06 }}
            >
              <Check size={18} strokeWidth={2.5} className="tech-grid-item-check" aria-hidden />
              <span>{text}</span>
            </motion.div>
          ))}
        </div>
        <p className="tech-block-close">
          &ldquo;
          <RoughNotation type="underline" color="#e53935" strokeWidth={2} show>
            빠르고 안정적으로
          </RoughNotation>
          {' '}
          운영할 수 있도록 설계합니다.&rdquo;
        </p>
      </div>
    </section>
  )
}
