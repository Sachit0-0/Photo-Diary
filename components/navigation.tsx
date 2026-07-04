'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { Camera, Menu, X, MapPin, ArrowRight } from 'lucide-react'

const links = [
  { href: '/', label: 'Index', num: '01', icon: '⊞' },
  { href: '/gallery', label: 'Gallery', num: '02', icon: '◫' },
  { href: '/contact', label: 'Contact', num: '03', icon: '⊡' },
]

// RollingText with explicit height for header
const RollingText = ({ text, className = '', height = 'auto' }: { text: string; className?: string; height?: string }) => {
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ height: height }}
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
        style={{ transform: 'translateY(100%)' }}>
        {text}
      </span>
    </span>
  )
}

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-700 ${scrolled && !menuOpen
            ? 'py-3 sm:py-4 bg-background/80 backdrop-blur-xl border-b border-foreground/[0.06] shadow-sm'
            : 'py-4 sm:py-5 md:py-6'
            }`}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 z-[60] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-med group-hover:text-foreground transition-colors duration-300 flex-shrink-0" />
            <RollingText
              text="Photo Diary"
              height="1.2em"
              className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.22em] uppercase font-semibold text-muted-high leading-[1.2]"
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 z-[60]">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="group cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105 flex items-center gap-2"
            >
              {menuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground flex-shrink-0" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-muted-high group-hover:text-foreground transition-colors duration-300 flex-shrink-0" />
              )}
              <RollingText
                text={menuOpen ? 'Close' : 'Menu'}
                height="1.2em"
                className={`text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] uppercase font-medium leading-[1.2] ${menuOpen ? 'text-foreground font-semibold' : 'text-muted-high'
                  }`}
              />
            </button>
          </div>
        </div>

        {!menuOpen && (
          <div className="h-[2px] w-full bg-transparent">
            <motion.div
              className="h-full bg-gradient-to-r from-foreground/40 via-foreground to-foreground/40"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </motion.header>

      <AnimatePresence mode="wait">
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
                          className="group flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2 sm:py-3 md:py-4 relative"
                        >
                          <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-sm tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.2em] text-muted-med font-medium tabular-nums w-[2.5em] sm:w-[2.8em] md:w-[3em] text-right flex-shrink-0">
                            {link.num}
                          </span>

                          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-med/40 font-light w-[2em] sm:w-[2.2em] md:w-[2.5em] text-center flex-shrink-0">
                            {link.icon}
                          </span>

                          <span className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105 origin-left flex-shrink-0">
                            <RollingText
                              text={link.label}
                              className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.02em] sm:tracking-[-0.025em] md:tracking-[-0.03em] uppercase ${isActive ? 'text-foreground' : 'text-muted-high'
                                }`}
                            />
                          </span>

                          <span className="hidden md:block flex-1 h-px bg-gradient-to-r from-muted-high to-transparent transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] opacity-0 group-hover:opacity-100 group-hover:scale-x-100 origin-left" />

                          <ArrowRight className="hidden md:block w-4 h-4 text-muted-med/0 group-hover:text-muted-med transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-2 flex-shrink-0" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="md:col-span-4 md:col-start-9 hidden md:flex flex-col gap-8 lg:gap-12"
                >
                  <div className="space-y-2 lg:space-y-3">
                    <span className="text-[10px] lg:text-[11px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-muted-med font-semibold flex items-center gap-2">
                      <Camera className="w-3 h-3 flex-shrink-0" />
                      Gear
                    </span>
                    <p className="text-[13px] lg:text-[15px] font-light text-muted-high leading-relaxed">
                      2.8 • 1/125 • ISO 200<br />
                      26° 07' 04"
                    </p>
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <span className="text-[10px] lg:text-[11px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-muted-med font-semibold flex items-center gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      Location
                    </span>
                    <p className="text-[13px] lg:text-[15px] font-light text-muted-high leading-relaxed">
                      Kathmandu, Nepal<br />
                      <span className="text-muted-med font-mono text-[11px] lg:text-[12px]">
                        27.7172° N, 85.3240° E
                      </span>
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
                          className="group relative overflow-hidden inline-flex items-center gap-2 leading-none w-fit"
                        >
                          <span className="text-[15px] text-muted-med group-hover:text-foreground transition-colors duration-300 flex-shrink-0">
                            {name === 'Instagram' ? '📸' : '🐦'}
                          </span>
                          <RollingText
                            text={name}
                            className="text-[13px] lg:text-[15px] font-light text-muted-high"
                          />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-foreground/10 to-transparent" />

                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] lg:text-[11px] tracking-[0.15em] uppercase text-muted-med font-semibold">Archive</p>
                      <p className="text-[13px] lg:text-[15px] font-light text-muted-high">24 Photos</p>
                    </div>
                    <div>
                      <p className="text-[10px] lg:text-[11px] tracking-[0.15em] uppercase text-muted-med font-semibold">Camera</p>
                      <p className="text-[13px] lg:text-[15px] font-light text-muted-high">1 Old</p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-foreground/10 to-transparent" />

                  <p className="text-[10px] lg:text-[11px] tracking-[0.12em] lg:tracking-[0.15em] text-muted-med font-light">
                    © {new Date().getFullYear()} Photo Diary
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 flex justify-between items-end"
            >
              <div className="flex items-center gap-4">
                <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-med font-medium flex items-center gap-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  Nepal — {new Date().getFullYear()}
                </p>
                <span className="text-muted-med/20">|</span>
                <p className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-med/60 font-light">
                  27.7172° N, 85.3240° E
                </p>
              </div>
              <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-med font-medium md:hidden flex items-center gap-2">
                <Camera className="w-3 h-3 flex-shrink-0" />
                Photo Diary
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}