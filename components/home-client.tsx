'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'
import AnimatedGallery from '@/components/hero-gallery'
import type { Photo } from '@/sanity/queries'

function MarqueeText() {
  const currentYear = new Date().getFullYear()
  const text = `Photo Diary ~ Nepal ~ ${currentYear} ~ Notes ~ From ~ The ~ Road       `
  const [isPaused, setIsPaused] = useState(false)

  const repeatedText = Array(8).fill(text).join(' — ')

  return (
    <div
      className="w-full overflow-hidden border-t border-b border-foreground/10 py-5 md:py-6 relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={isPaused ? {} : { x: ['0%', '-50%'] }}
        transition={isPaused ? {} : {
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
        className="inline-flex whitespace-nowrap  gap-6 md:gap-8"
      >
        <span className="text-[26px] md:text-xs tracking-[0.3em] uppercase  font-light text-muted-high leading-relaxed">
          {repeatedText}
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

interface HomeClientProps {
  photos: Photo[]
}

export function HomeClient({ photos }: HomeClientProps) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Hero photos={photos} />

      <MarqueeText />

      {/* Featured Work */}
      <section className="w-full py-28 md:py-40">
        <div className="max-w-screen-xl mx-auto px-8 md:px-12">
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
          />
        </div>
        <AnimatedGallery photos={photos} />
      </section>

      {/* About — horizontal editorial */}
      <section className="w-full border-t border-foreground/10 py-28 md:py-40">
        <div className="mx-auto max-w-screen-xl px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-24 md:grid-cols-2 md:gap-40 lg:gap-56 xl:gap-64"
          >
            {/* Left Content */}
            <div className="space-y-8">
              <SectionLabel num="003" label="About" />

              <h3 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
                A Small
                <br />
                <span className="text-muted-low">Collection</span>
              </h3>

              <div className="h-px w-full bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent" />

              <p className="max-w-sm text-sm font-light leading-relaxed text-muted-high">
                This isn't a project or a portfolio{" "}
                <span className="group relative inline-block cursor-help text-foreground/80 transition-colors hover:text-foreground">
                  —
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[180px] -translate-x-1/2 scale-95 rounded border border-foreground/10 bg-background px-3 py-1.5 text-[11px] font-light text-muted-high opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                    yes, a real em dash.
                  </span>
                </span>{" "}
                just photos I've taken over the years, kept exactly as random as they
                happened.
              </p>

              <p className="max-w-sm text-sm font-light leading-relaxed text-muted-med">
                If you find a few that make you stop scrolling for a second, that's
                pretty cool.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end">
              <div
                className="
            group
            relative
            w-full
            max-w-[520px]
            rotate-[-2deg]
            rounded-sm
            border
            border-stone-200
            bg-white
            p-4
            pb-16
            ring-1
            ring-black/5
            shadow-[0_2px_8px_rgba(0,0,0,0.08),0_24px_60px_rgba(0,0,0,0.18)]
            transition-all
            duration-500
            ease-out
            hover:-translate-y-2
            hover:rotate-[0.4deg]
            hover:scale-[1.01]
            hover:shadow-[0_35px_80px_rgba(0,0,0,0.22)]
            dark:bg-[#d8d1c3]
            dark:border-[#c8bead]
            dark:ring-white/5
            dark:shadow-[0_2px_12px_rgba(0,0,0,0.45),0_30px_80px_rgba(0,0,0,0.65)]
          "
              >
                {/* Decorative tape */}
                <div className="absolute -top-2 left-8 h-5 w-16 rotate-[-10deg] rounded-sm bg-stone-300/70 backdrop-blur-[1px] dark:bg-stone-500/30" />
                <div className="absolute -top-2 right-8 h-5 w-16 rotate-[10deg] rounded-sm bg-stone-300/70 backdrop-blur-[1px] dark:bg-stone-500/30" />

                {/* Image */}
                <div className="relative overflow-hidden rounded-[2px] ring-1 ring-black/10">
                  <Image
                    src="/cat.jpg"
                    alt="Photography"
                    width={520}
                    height={420}
                    className="
                h-[420px]
                w-full
                object-cover
                transition-all
                duration-700
                ease-out
                group-hover:scale-[1.03]
                saturate-[0.9]
                contrast-105
                brightness-[0.97]
                sepia-[0.12]
              "
                  />

                  {/* Soft vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-white/5" />

                  {/* Film grain */}
                  <div
                    className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.035]
                mix-blend-multiply
                dark:opacity-[0.05]
                bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)]
                bg-[length:8px_8px]
              "
                  />
                </div>

                {/* Caption */}
                <div className="mt-5 flex items-center justify-between px-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500 dark:text-stone-700">
                    JUL 2026
                  </span>

                  <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500 dark:text-stone-700">
                    Wander Archive
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 004 — Inverted High-Contrast Editorial Banner Call-to-Action */}
      <section className="relative overflow-hidden border-t border-foreground/10 py-32 md:py-44">
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

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[22vw] font-black uppercase tracking-[-0.08em] text-foreground/[0.03]">
            Archive
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-12 flex flex-col lg:flex-row justify-between gap-20">
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

          <div className="flex flex-col items-start lg:items-end justify-between gap-16">
            <div className="text-left lg:text-right">
              <div className="text-6xl font-black tabular-nums">
                {photos.length}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.25em] uppercase text-muted-high">
                Photographs
              </div>
            </div>

            <Link href="/gallery" className="group flex items-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground transition-all duration-500 group-hover:rotate-45">
                <span className="text-xl">→</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-high">
                  View
                </p>
                <p className="text-lg font-semibold">
                  Explore Archive
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}