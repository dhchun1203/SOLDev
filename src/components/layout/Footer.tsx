import { motion } from 'framer-motion'
import { Code } from 'lucide-react'
import type { NavLink } from '../../config/site'

export type FooterProps = {
  navLinks: NavLink[]
  copyright: string
  footerDescription?: React.ReactNode
  siteName?: string
  logoHomeHref?: string
  onLogoClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Footer({
  navLinks,
  copyright,
  footerDescription,
  siteName = 'SOLDev',
  logoHomeHref = '#hero',
  onLogoClick,
}: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <a
            className="logo logo-new footer-logo"
            href={logoHomeHref}
            aria-label={`${siteName} 홈`}
            onClick={(e) => {
              e.preventDefault()
              onLogoClick?.(e)
            }}
          >
            <motion.div
              className="logo-inner"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="logo-icon-wrap">
                <div className="logo-icon-glow" aria-hidden />
                <div className="logo-icon-box">
                  <span className="logo-icon-sol">
                    {siteName.slice(0, 3).toUpperCase()}
                  </span>
                </div>
                <div className="logo-accent-dot" aria-hidden />
              </div>
              <div className="logo-text-wrap">
                <span className="logo-text-gradient">{siteName}</span>
                <div className="logo-code-wrap">
                  <Code className="logo-code-icon" aria-hidden size={16} />
                </div>
              </div>
            </motion.div>
          </a>
          {footerDescription != null && (
            <p className="footer-description">{footerDescription}</p>
          )}
        </div>
        <nav className="footer-nav">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="footer-copyright">
          <span>{copyright}</span>
        </div>
      </div>
    </footer>
  )
}
