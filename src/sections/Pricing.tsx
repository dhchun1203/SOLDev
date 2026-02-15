import { motion } from 'framer-motion'
import { CardIcon } from '../components/ui/CardIcon'
import { pricingPackages } from '../config/pricing'
import { defaultTransition, defaultViewport } from '../constants/motion'

export function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-section-bg" aria-hidden />
      <div className="pricing-section-orbs" aria-hidden>
        <div className="pricing-section-orb pricing-section-orb-tl" />
        <div className="pricing-section-orb pricing-section-orb-br" />
      </div>
      <div className="pricing-section-inner">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={defaultTransition}
        >
          <div className="pricing-badge">PRICING</div>
          <h2 className="pricing-title">
            <span className="pricing-title-gradient">합리적인</span>
            <br />
            <span className="pricing-title-white">가격으로 시작하세요</span>
          </h2>
          <p className="pricing-desc">
            목적에 맞는 플랜을 선택해 부담 없이 시작할 수 있습니다.
            <br />
            오픈 특가로 더 낮은 비용으로 품질 있는 결과물을 경험해 보세요.
          </p>
        </motion.div>
        <div className="pricing-grid grid three">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`price-card-wrap price-card-wrap-${pkg.variant ?? 'basic'}`}
              tabIndex={0}
            >
              <div
                className={`price-card-glow price-card-glow-${pkg.variant ?? 'basic'}`}
                aria-hidden
              />
              <div className={`price-card ${pkg.variant ?? ''}`.trim()}>
                <motion.div
                  className={`introduce-card-icon-wrap introduce-card-icon-${pkg.variant === 'growth' ? 'growth' : pkg.variant === 'featured' ? 'purple' : pkg.variant === 'basic' ? 'green' : 'blue'} price-card-icon-wrap`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  aria-hidden
                >
                  <div className="introduce-card-icon-blur" aria-hidden />
                  <div className="introduce-card-icon-inner">
                    <CardIcon type="credit" />
                  </div>
                </motion.div>
                <div className="card-body">
                  <h3>{pkg.name}</h3>
                  <p className="price-tagline">{pkg.tagline}</p>
                  <div className="price-block">
                    {pkg.originalPrice && (
                      <p className="price-original">{pkg.originalPrice}</p>
                    )}
                    <p className={`price-main ${pkg.variant ?? ''}`.trim()}>
                      {pkg.price}
                      <span className="price-unit">{pkg.priceUnit ?? '만 원'}</span>
                    </p>
                  </div>
                  <ul className="price-features">
                    {pkg.features.map((f, i) => (
                      <li
                        key={i}
                        className={f.included ? `included ${f.variant ?? ''}`.trim() : 'excluded'}
                      >
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <ul className="meta-list">
                    {pkg.meta.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                  <button
                    className={`${pkg.ctaVariant} price-cta`}
                    type="button"
                  >
                    {pkg.ctaLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
