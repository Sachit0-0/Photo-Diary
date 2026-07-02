'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'

const links = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/gallery', label: 'Gallery', index: '02' },
  { href: '/contact', label: 'Contact', index: '03' },
]

function NavLink({
  href,
  label,
  index,
  onClick,
}: {
  href: string
  label: string
  index: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={isActive ? 'page' : undefined}
      className="relative px-4 py-2 text-xs font-semibold tracking-widest uppercase"
    >
      {(hovered || isActive) && (
        <motion.span
          layoutId="nav-pill"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="absolute inset-0 rounded-full bg-foreground/10"
        />
      )}
      <span
        className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${
          isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        <span className="text-[9px] text-foreground/35">{index}</span>
        {label}
      </span>
    </Link>
  )
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md"
    >
      <div
        className={`max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-end transition-[padding] duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="hidden md:flex items-center gap-1 mr-6">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden relative w-6 h-5 flex flex-col justify-between"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-px w-full bg-foreground origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-full bg-foreground"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-px w-full bg-foreground origin-center"
            />
          </button>
        </div>
      </div>

      {/* Scroll progress line */}
      <div className="h-px w-full bg-foreground/5">
        <motion.div
          className="h-full bg-foreground/40"
          style={{ width: `${progress * 100}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-foreground/10"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <NavLink {...link} onClick={() => setMenuOpen(false)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}