'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="border-t border-foreground/5 bg-background py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xs font-light tracking-widest uppercase text-foreground/40">
              About
            </h3>
            <p className="text-sm font-light text-foreground/60 leading-relaxed">
              A collection of photographs exploring light, form, and the moments in between.
            </p>
          </div>

          {/* Navigate */}
          <div className="space-y-4">
            <h3 className="text-xs font-light tracking-widest uppercase text-foreground/40">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-xs font-light tracking-widest uppercase text-foreground/40">
              Connect
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300">
                  Mastodon
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-light tracking-widest uppercase text-foreground/40">
              Get in Touch
            </h3>
            <p className="text-sm font-light text-foreground/60 leading-relaxed">
              Interested in commissions or collaborations?
            </p>
            <a href="/contact" className="inline-block text-sm font-light text-accent hover:text-foreground transition-colors duration-300">
              Send a message →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/5 pt-8">
          <p className="text-xs font-light text-foreground/30">
            © {new Date().getFullYear()} Photography Archive. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
