import { motion } from 'framer-motion'
import { fadeUp, defaultTransition, defaultViewport } from '../../constants/motion'

export type SectionHeaderProps = {
  badge: string
  titleLine1: React.ReactNode
  titleLine2?: React.ReactNode
  description?: React.ReactNode
  className?: string
  badgeClassName?: string
  titleClassName?: string
  descClassName?: string
}

export function SectionHeader({
  badge,
  titleLine1,
  titleLine2,
  description,
  className = '',
  badgeClassName = '',
  titleClassName = '',
  descClassName = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`section-header ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeUp}
      transition={defaultTransition}
    >
      <div className={`section-header-badge ${badgeClassName}`.trim()}>
        {badge}
      </div>
      <h2 className={`section-header-title ${titleClassName}`.trim()}>
        <span className="section-header-title-accent">{titleLine1}</span>
        {titleLine2 != null && (
          <>
            <br />
            <span className="section-header-title-line">{titleLine2}</span>
          </>
        )}
      </h2>
      {description != null && (
        <p className={`section-header-desc ${descClassName}`.trim()}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
