import { motion } from 'framer-motion'

export type ButtonVariant = 'primary' | 'ghost'

type ButtonProps = {
  variant?: ButtonVariant
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseClass = variant === 'primary' ? 'primary' : 'ghost'
  return (
    <motion.button
      type={type}
      className={`${baseClass} ${className}`.trim()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
