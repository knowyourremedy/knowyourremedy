'use client'
import { usePathname } from 'next/navigation'

type NavLink = {
  icon: string
  label: string
  href: string
}

const links: NavLink[] = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '✨', label: 'Clean Picks', href: '/clean-picks' },
    { icon: '🌱', label: 'Oil Library', href: '/oils' },
  ]

export default function QuickNav() {
  const pathname = usePathname()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTop: '1px solid #e8e0d0',
        zIndex: 200,
        overflowX: 'auto',
        scrollbarWidth: 'none' as const,
      }}
    >
     <div
        style={{
          display: 'flex',
          gap: '0.25rem',
          padding: '0.5rem 1.5rem',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          minWidth: 'min-content',
        }}
      >
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (pathname.startsWith(link.href + '/') && link.href !== '/')
          return (
            <a key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: active ? '700' : '500',
                fontFamily: 'var(--font-inter), sans-serif',
                backgroundColor: active ? '#2d4a3e' : 'transparent',
                color: active ? '#fff' : '#4a6741',
                border: active ? '1px solid #2d4a3e' : '1px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {link.icon}
              </span>
              {link.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}