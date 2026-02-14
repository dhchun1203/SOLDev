import { memo } from 'react'

const stroke = {
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export type CardIconType =
  | 'tag'
  | 'folder'
  | 'layers'
  | 'code'
  | 'shield'
  | 'credit'
  | 'globe'
  | 'flow'
  | 'default'

const size = 24
const common = {
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  ...stroke,
}

export const CardIcon = memo(function CardIcon({
  type,
  size: customSize,
}: {
  type: CardIconType
  size?: number
}) {
  const s = customSize ?? size
  const props = { ...common, width: s, height: s }
  switch (type) {
    case 'tag':
      return (
        <svg {...props}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...props}>
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...props}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      )
    case 'code':
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'credit':
      return (
        <svg {...props}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    case 'flow':
      return (
        <svg {...props}>
          <rect x="2" y="4" width="8" height="6" rx="1" />
          <rect x="14" y="14" width="8" height="6" rx="1" />
          <path d="M10 7h4l4 4-4 4h-4" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
        </svg>
      )
  }
})
