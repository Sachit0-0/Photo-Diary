'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'

const links = [
  { href: '/', label: 'Index', num: '01' },
  { href: '/gallery', label: 'Gallery', num: '02' },
  { href: '/contact', label: 'Contact', num: '03' },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-700 ${scrolled && !menuOpen
            ? 'py-3 sm:py-4 bg-background/60 backdrop-blur-xl border-b border-foreground/[0.06]'
            : 'py-4 sm:py-5 md:py-6'
            }`}
        >
          {/* Wordmark - Responsive font sizes */}
          <Link
            href="/"
            className="group relative overflow-hidden inline-flex flex-col leading-none z-[60] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105"
          >
            <span className="block text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.22em] uppercase font-semibold text-muted-high transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:text-foreground">
              Photo Diary
            </span>
            <span className="absolute top-full block text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.22em] uppercase font-semibold text-foreground transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              Photo Diary
            </span>
          </Link>

          {/* Right side — ThemeToggle + Menu Button */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 z-[60]">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="group cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105"
            >
              <span className="relative block overflow-hidden leading-none flex flex-col">
                <span className={`block text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${menuOpen ? 'text-foreground font-semibold' : 'text-muted-high group-hover:text-foreground'
                  }`}>
                  {menuOpen ? 'Close' : 'Menu'}
                </span>
                <span className="absolute top-full left-0 right-0 block text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] uppercase font-semibold text-foreground transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  {menuOpen ? 'Close' : 'Menu'}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        {!menuOpen && (
          <div className="h-px w-full bg-transparent">
            <motion.div
              className="h-full bg-muted-high"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </motion.header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background"
          >
            <div className="h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 lg:gap-8 items-center">

                {/* Main links - Responsive font sizes */}
                <div className="md:col-span-7 flex flex-col gap-1 sm:gap-2 md:gap-3">
                  {links.map((link, i) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.15 + i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-baseline gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2 sm:py-3 md:py-4"
                        >
                          <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-sm tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.2em] text-muted-med font-medium tabular-nums self-center">
                            {link.num}
                          </span>

                          <span className="relative overflow-hidden inline-flex flex-col leading-none">
                            <span className={`block text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.02em] sm:tracking-[-0.025em] md:tracking-[-0.03em] uppercase transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:scale-105 origin-left ${isActive ? 'text-foreground' : 'text-muted-high'
                              }`}>
                              {link.label}
                            </span>
                            <span className="absolute top-full block text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.02em] sm:tracking-[-0.025em] md:tracking-[-0.03em] uppercase text-foreground transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:scale-105 origin-left">
                              {link.label}
                            </span>
                          </span>

                          <span className="hidden md:block w-0 group-hover:w-12 lg:group-hover:w-16 h-px bg-muted-high transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] self-center" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Right column — ambient details */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="md:col-span-4 md:col-start-9 hidden md:flex flex-col gap-8 lg:gap-12"
                >
                  <div className="space-y-2 lg:space-y-3">
                    <span className="text-[10px] lg:text-[11px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-muted-med font-semibold">
                      Location
                    </span>
                    <p className="text-[13px] lg:text-[15px] font-light text-muted-high leading-relaxed">
                      Kathmandu, Nepal<br />
                      27.7172° N, 85.3240° E
                    </p>
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <span className="text-[10px] lg:text-[11px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-muted-med font-semibold">
                      Connect
                    </span>
                    <div className="flex flex-col gap-1.5 lg:gap-2">
                      {['Instagram', 'Twitter'].map((name) => (
                        <a
                          key={name}
                          href="#"
                          className="group relative overflow-hidden inline-flex flex-col leading-none w-fit"
                        >
                          <span className="block text-[13px] lg:text-[15px] font-light text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                            {name}
                          </span>
                          <span className="absolute top-full block text-[13px] lg:text-[15px] font-light text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                            {name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-foreground/10" />

                  <p className="text-[10px] lg:text-[11px] tracking-[0.12em] lg:tracking-[0.15em] text-muted-med font-light">
                    © {new Date().getFullYear()} Photo Diary
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Bottom bar in menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 flex justify-between items-end"
            >
              <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-med font-medium">
                Nepal — {new Date().getFullYear()}
              </p>
              <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-med font-medium md:hidden">
                Photo Diary
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}