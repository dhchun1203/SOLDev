import type { Variants } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeUpStrong = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const heroStaggerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  hidden: {},
}

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const defaultTransition = { duration: 0.6 }
export const defaultViewport = { once: true }

export const processStepVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const processStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
}
