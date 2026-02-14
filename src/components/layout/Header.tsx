import { motion } from 'framer-motion'
import { Code } from 'lucide-react'
import type { NavLink } from '../../config/site'

export type HeaderProps = {
  navLinks: NavLink[]
  ctaLabel: string
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  siteName?: string
  logoHomeHref?: string
}

export function Header({
  navLinks,
  ctaLabel,
  onNavClick,
  menuOpen,
  setMenuOpen,
  siteName = 'SOLDev',
  logoHomeHref = '#hero',
}: HeaderProps) {
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="logo logo-new"
            href={logoHomeHref}
            onClick={(e) => {
              e.preventDefault()
              onNavClick(e)
            }}
          >
            <motion.div
              className="logo-inner"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="logo-icon-wrap">
                <motion.div
                  className="logo-icon-glow"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="logo-icon-box">
                  <span className="logo-icon-sol">
                    {siteName.slice(0, 3).toUpperCase()}
                  </span>
                </div>
                <motion.div
                  className="logo-accent-dot"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="logo-text-wrap">
                <span className="logo-text-gradient">{siteName}</span>
                <motion.div
                  className="logo-code-wrap"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Code className="logo-code-icon" aria-hidden />
                </motion.div>
              </div>
            </motion.div>
          </a>
          <nav className="nav header-nav">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={onNavClick}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="cta" type="button">
              {ctaLabel}
            </button>
          </div>
          <button
            type="button"
            className={`header-menu-btn ${menuOpen ? 'header-menu-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            <span className="header-menu-btn-inner">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`side-menu ${menuOpen ? 'side-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div
          className="side-menu-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
        <aside className="side-menu-drawer">
          <nav className="side-menu-nav">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={(e) => { onNavClick(e); closeMenu() }}>
                {label}
              </a>
            ))}
          </nav>
          <div className="side-menu-actions">
            <button className="cta" type="button" onClick={closeMenu}>
              {ctaLabel}
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
