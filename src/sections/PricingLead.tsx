export type PricingLeadProps = {
  scrollToAnchor: (id: string) => void
}

export function PricingLead({ scrollToAnchor }: PricingLeadProps) {
  return (
    <div className="pricing-lead-section">
      <div className="pricing-lead-bg" aria-hidden />
      <div className="pricing-lead-orbs" aria-hidden>
        <div className="pricing-lead-orb pricing-lead-orb-tl" />
        <div className="pricing-lead-orb pricing-lead-orb-br" />
      </div>
      <div className="pricing-lead section muted">
        <div className="container">
          <p className="pricing-lead-text">
            <span className="pricing-lead-line pricing-lead-line-1">
              <span className="pricing-lead-emphasis">어렵게</span> 설명하시지 않아도,
            </span>
            <span className="pricing-lead-line pricing-lead-line-2 pricing-lead-accent">
              필요한 건 이미 정리돼 있습니다.
            </span>
          </p>
          <a
            href="#pricing"
            className="pricing-lead-arrow"
            aria-label="가격 섹션으로 이동"
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor('pricing')
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 8l5 5 5-5M7 14l5 5 5-5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
