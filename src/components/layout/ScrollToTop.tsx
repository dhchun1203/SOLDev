type ScrollToTopProps = {
  visible: boolean
  onClick: () => void
  ariaLabel?: string
}

export function ScrollToTop({
  visible,
  onClick,
  ariaLabel = '맨 위로 이동',
}: ScrollToTopProps) {
  if (!visible) return null
  return (
    <div className="scroll-to-top-wrap" aria-hidden="true">
      <button
        className="scroll-to-top"
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  )
}
