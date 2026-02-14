type SectionShellProps = {
  id?: string
  className?: string
  as?: 'section' | 'div'
  withBg?: boolean
  withOrbs?: boolean
  orbClassNames?: { wrapper?: string; orb1?: string; orb2?: string }
  children: React.ReactNode
}

export function SectionShell({
  id,
  className = '',
  as: Tag = 'section',
  withBg = false,
  withOrbs = false,
  orbClassNames = {},
  children,
}: SectionShellProps) {
  const base = className.split(' ')[0] || 'section'
  const bgClass = withBg ? `${base}-bg` : null
  const orbsClass = withOrbs ? `${base}-orbs` : null
  const innerClass = `${base}-inner`

  return (
    <Tag id={id} className={className}>
      {withBg && <div className={bgClass!} aria-hidden="true" />}
      {withOrbs && (
        <div className={orbClassNames.wrapper || orbsClass!} aria-hidden="true">
          <div className={orbClassNames.orb1 || `${base}-orb`} />
          <div className={orbClassNames.orb2 || `${base}-orb`} />
        </div>
      )}
      <div className={innerClass}>{children}</div>
    </Tag>
  )
}
