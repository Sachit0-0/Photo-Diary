'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { photos, type Photo } from "@/lib/data";

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

function CameraIcon() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 inline-block ml-3 md:ml-6 -translate-y-4 md:-translate-y-6 text-foreground/80"
      initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1, rotate: -3 }
          : { opacity: 1, scale: 1, rotate: [-3, 0, -3] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.6, delay: 0.9 }
          : {
            opacity: { duration: 0.6, delay: 0.9 },
            scale: { duration: 0.6, delay: 0.9 },
            rotate: { duration: 8, delay: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }
      }
    >
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <rect x="30" y="70" width="140" height="95" rx="10" />
        <rect x="75" y="45" width="35" height="25" rx="4" />
        <rect x="120" y="82" width="22" height="14" rx="3" />
        <circle cx="100" cy="120" r="32" />
        <circle cx="100" cy="120" r="18" />
      </g>
      <circle cx="120" cy="89" r="2.5" fill="currentColor" />
    </motion.svg>
  )
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const previewPhotos = photos.slice(0, 4)
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
  const categoriesCount = new Set(photos.map(p => p.category)).size

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-12 overflow-hidden">

      {/* Dynamic Background Image Crossfade (Visible only when hovering) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <AnimatePresence mode="popLayout">
          {activePhoto && (
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full mix-blend-luminosity dark:mix-blend-plus-lighter"
            >
              <Image
                src={activePhoto.url}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top-left: label + coordinate stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-28 left-8 md:left-12 flex flex-col gap-2 z-10"
      >
        <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-muted-high">
          <span className="text-muted-med">01 /</span>
          <span>Just Clicks from Nepal</span>
        </div>
        <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-muted-med tabular-nums">
          27.7172° N, 85.3240° E
        </span>
      </motion.div>

      {/* Top-right: archive label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-28 right-8 md:right-12 text-right z-10"
      >
        <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-high font-bold">
          Photography Archive
        </span>
      </motion.div>

      {/* Floating thumbnail info details */}
      <div className="absolute right-36 top-1/2 -translate-y-1/2 text-right hidden lg:block z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {activePhoto && (
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="space-y-1"
            >
              <span className="block text-[10px] tracking-[0.2em] uppercase font-bold text-foreground">
                {activePhoto.title}
              </span>
              <span className="block text-[9px] tracking-[0.15em] uppercase text-muted-high font-medium">
                {activePhoto.location}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating thumbnail strip — right side, vertically centered */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setActivePhoto(null)}
        className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-3 z-10"
      >
        {previewPhotos.map((photo) => {
          const isActive = activePhoto?.id === photo.id
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onMouseEnter={() => setActivePhoto(photo)}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative w-16 h-20 overflow-hidden transition-all duration-500 cursor-pointer border ${isActive ? 'border-foreground' : 'border-transparent grayscale'}`}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="64px"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          )
        })}
        <span className="text-[8px] tracking-[0.2em] uppercase text-muted-med font-medium text-center mt-1">
          {photos.length} Photos
        </span>
      </motion.div>

      {/* Main headline — massive */}
      <div className="relative z-10 w-full max-w-[90vw] lg:max-w-[70vw]">
        <h1
          className="text-[18vw] sm:text-[16vw] md:text-[13vw] lg:text-[11vw] font-black tracking-[-0.03em] leading-[0.85] text-foreground uppercase select-none"
          aria-label="Random Moments"
        >
          {shouldReduceMotion ? (
            <>
              <span className="block">Random</span>
              <span className="block text-muted-low">
                Moments
                <CameraIcon />
              </span>
            </>
          ) : (
            <>
              <span className="block overflow-hidden">
                <SplitText text="Random" delay={0.3} />
              </span>
              <span className="block overflow-hidden">
                <SplitText text="Moments" delay={0.45} className="text-muted-low" />
                <CameraIcon />
              </span>
            </>
          )}
        </h1>
      </div>

      {/* Bottom row — description, stats, CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 md:mt-16 pt-8 border-t border-foreground/15"
      >
        {/* Left: description */}
        <p className="text-sm md:text-base font-light text-muted-high max-w-xs leading-relaxed">
          A small, unsorted collection of photos taken over the years{' '}
          <span className="group relative inline-block cursor-help text-foreground/80 hover:text-foreground transition-colors duration-300">
            —
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[180px] rounded-sm border border-foreground/10 bg-background px-3 py-1.5 text-[11px] font-light text-muted-high opacity-0 scale-95 origin-bottom transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 shadow-sm shadow-black/10">
              yes, a real em dash.
            </span>
          </span>{' '}
          kept exactly as random as they happened.
        </p>

        {/* Center: stats */}
        <div className="hidden md:flex items-center gap-8 text-muted-med">
          <div className="text-center">
            <span className="block text-2xl font-black tabular-nums text-foreground">{photos.length}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-muted-high">Photos</span>
          </div>
          <div className="w-px h-8 bg-foreground/15" />

          <div className="w-px h-8 bg-foreground/15" />
          <div className="text-center">
            <span className="block text-2xl font-black tabular-nums text-foreground">1</span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-muted-high">Old Camera</span>
          </div>
        </div>

        {/* Right: CTA */}
        <Link href="/gallery" className="group inline-flex items-center gap-6 overflow-hidden">
          <span className="relative flex flex-col leading-none overflow-hidden">
            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              See All
            </span>
            <span className="absolute top-full text-[11px] tracking-[0.2em] uppercase font-semibold text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              See All
            </span>
          </span>
          <span className="w-12 h-px bg-muted-high group-hover:w-20 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.4, delay: 1.4, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-3"
      >
        <div className="w-px h-14 bg-gradient-to-b from-foreground/30 to-transparent" />
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-muted-med font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
      </motion.div>
    </div>
  )
}