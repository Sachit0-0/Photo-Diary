'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { GalleryGrid } from '@/components/gallery-grid'
import { Footer } from '@/components/footer'
import { Preloader } from '@/components/preloader'
import { photos } from '@/lib/data'

function MarqueeText() {
  const text = 'Photography — Nepal — 2024 — Random Moments — '
  const repeated = text.repeat(6)
  return (
    <div className="w-full overflow-hidden border-t border-b border-foreground/10 py-4">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="inline-flex whitespace-nowrap"
      >
        <span className="text-[11px] tracking-[0.25em] uppercase text-muted-low font-medium pr-8">
          {repeated}
        </span>
        <span className="text-[11px] tracking-[0.25em] uppercase text-muted-low font-medium pr-8">
          {repeated}
        </span>
      </motion.div>
    </div>
  )
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-5">
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-med font-medium">{num}</span>
      <div className="h-px w-10 bg-foreground/15" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-high font-semibold">{label}</span>
    </div>
  )
}

export default function Home() {
  const featuredPhotos = photos.slice(0, 6)

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Smooth text-based Preloader */}
      <Preloader />

      <Navigation />
      <Hero />

      {/* Marquee divider */}
      <MarqueeText />

      {/* Featured Work */}
      <section className="w-full py-28 md:py-40">
        <div className="max-w-screen-xl mx-auto px-8 md:px-12">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div className="space-y-5">
              <SectionLabel num="002" label="Selected Work" />
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.85] uppercase">
                My<br />
                <span className="text-muted-low">Favorites</span>
              </h2>
            </div>
            <p className="text-sm font-light text-muted-high max-w-xs leading-relaxed md:text-right">
              Some photos that turned out decent. The kind of stuff you go back and look at again.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GalleryGrid photos={featuredPhotos} isHomepage={true} />
          </motion.div>
        </div>
      </section>

      {/* About — horizontal editorial */}
      <section className="w-full py-28 md:py-40 border-t border-foreground/10">
        <div className="max-w-screen-xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
          >
            <div className="space-y-8">
              <SectionLabel num="003" label="About" />
              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.85] uppercase">
                A Small<br />
                <span className="text-muted-low">Collection</span>
              </h3>
              <div className="h-px w-full bg-foreground/10" />
              <p className="text-sm font-light text-muted-high leading-relaxed max-w-sm">
                This isn't a project or a portfolio — just photos I've taken over the years, kept exactly as random as they happened.
              </p>
              <p className="text-sm font-light text-muted-med leading-relaxed max-w-sm">
                If you find a few that make you stop scrolling for a second, that's pretty cool.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={photos[0]?.url}
                alt="Featured moment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale"
                loading="lazy"
              />
              {/* Thin border overlay */}
              <div className="absolute inset-0 border border-foreground/10 pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 004 — Inverted High-Contrast Editorial Banner Call-to-Action */}
      <section className="relative overflow-hidden border-t border-foreground/10 py-32 md:py-44">
        {/* Background image */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <Image
            src={photos[7]?.url || photos[0]?.url}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[22vw] font-black uppercase tracking-[-0.08em] text-foreground/[0.03]">
            Archive
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-12 flex flex-col lg:flex-row justify-between gap-20">

          {/* Left */}
          <div className="max-w-xl">

            <div className="flex items-center gap-5 mb-8">
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-high font-bold">
                004
              </span>

              <div className="w-10 h-px bg-foreground/15" />

              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-high font-bold">
                Archive
              </span>
            </div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.88] tracking-[-0.05em] uppercase">
              More
              <br />
              <span className="text-muted-low">Moments</span>
            </h2>

            <p className="mt-8 max-w-sm text-muted-high leading-relaxed">
              More streets, mountains, quiet mornings and places that happened
              to be worth stopping for.
            </p>

          </div>

          {/* Right */}
          <div className="flex flex-col items-start lg:items-end justify-between gap-16">

            <div className="text-left lg:text-right">
              <div className="text-6xl font-black tabular-nums">
                {photos.length}
              </div>

              <div className="mt-2 text-[10px] tracking-[0.25em] uppercase text-muted-high">
                Photographs
              </div>
            </div>

            <Link
              href="/gallery"
              className="group inline-flex items-end gap-6"
            >
              <span className="text-3xl md:text-5xl font-black tracking-[-0.03em] uppercase">
                Explore Archive
              </span>

              <span className="mb-2 text-lg transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}