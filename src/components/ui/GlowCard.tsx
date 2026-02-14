import { motion } from 'framer-motion'
import { defaultTransition, defaultViewport } from '../../constants/motion'

export type GlowCardVariant =
  | 'purple'
  | 'blue'
  | 'featured'
  | 'basic'
  | 'growth'
  | 'default'

type GlowCardProps = {
  variant?: GlowCardVariant
  wrapClassName?: string
  glowClassName?: string
  cardClassName?: string
  children: React.ReactNode
  delay?: number
}

export function GlowCard({
  variant = 'default',
  wrapClassName = '',
  glowClassName = '',
  cardClassName = '',
  children,
  delay = 0,
}: GlowCardProps) {
  const wrap = `glow-card-wrap glow-card-wrap-${variant} ${wrapClassName}`.trim()
  const glow = `glow-card-glow glow-card-glow-${variant} ${glowClassName}`.trim()
  const card = `glow-card ${cardClassName}`.trim()

  return (
    <div className={wrap} tabIndex={0}>
      <div className={glow} aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ ...defaultTransition, delay }}
        style={{ height: '100%' }}
      >
        <div className={card}>{children}</div>
      </motion.div>
    </div>
  )
}
