'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Index' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden inline-flex flex-col leading-none"
    >
      <span className="block text-sm font-light text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:text-muted-high">
        {label}
      </span>
      <span className="absolute top-full block text-sm font-light text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>
    </Link>
  )
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-foreground/10 bg-background pt-16 pb-10 md:pt-20 md:pb-12"
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-12">

        {/* Top row — wordmark + nav */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-20">

          {/* Wordmark block */}
          <div className="space-y-4">
            <Link href="/" className="group relative overflow-hidden inline-flex flex-col leading-none">
              <span className="block text-xl font-black tracking-[-0.02em] uppercase text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                Photo Diary
              </span>
              <span className="absolute top-full block text-xl font-black tracking-[-0.02em] uppercase text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                Photo Diary
              </span>
            </Link>
            <p className="text-xs font-light text-muted-high max-w-[200px] leading-relaxed">
              A collection of photographs from Nepal and beyond.
            </p>
          </div>

          {/* Navigation links */}
          <div className="space-y-3">
            <span className="block text-[10px] tracking-[0.2em] uppercase text-muted-med font-bold mb-5">
              Navigate
            </span>
            {navLinks.map((link) => (
              <div key={link.href}>
                <FooterLink {...link} />
              </div>
            ))}
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <span className="block text-[10px] tracking-[0.2em] uppercase text-muted-med font-bold mb-5">
              Connect
            </span>
            {['Instagram', 'Twitter', 'Mastodon'].map((name) => (
              <div key={name}>
                <a
                  href="#"
                  className="group relative overflow-hidden inline-flex flex-col leading-none"
                >
                  <span className="block text-sm font-light text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {name}
                  </span>
                  <span className="absolute top-full block text-sm font-light text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {name}
                  </span>
                </a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-4 max-w-[200px]">
            <span className="block text-[10px] tracking-[0.2em] uppercase text-muted-med font-bold">
              Get in Touch
            </span>
            <p className="text-xs font-light text-muted-high leading-relaxed">
              Interested in collaborations or commissions?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 pt-2"
            >
              <span className="relative flex flex-col leading-none overflow-hidden h-[1em]">
                <span className="block text-[11px] tracking-[0.18em] uppercase font-medium text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  Say hello
                </span>
                <span className="absolute top-full block text-[11px] tracking-[0.18em] uppercase font-medium text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  Say hello
                </span>
              </span>
              <span className="w-6 h-px bg-muted-high group-hover:w-12 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[10px] font-light text-muted-med tracking-[0.1em]">
            © {new Date().getFullYear()} Photo Diary. All rights reserved.
          </p>
          <p className="text-[10px] font-light text-muted-med tracking-[0.1em] uppercase">
            Kathmandu, Nepal
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
