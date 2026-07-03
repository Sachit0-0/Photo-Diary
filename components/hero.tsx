'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Photo } from '@/sanity/queries'
import { KineticText } from './ui/kinetic-text'

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
      className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 inline-block ml-2 md:ml-6 -translate-y-3 md:-translate-y-6 text-foreground/80"
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

function CornerBracket({ className }: { className?: string }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1, delay: 1.6 }}
    >
      <path d="M0 6V1a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  )
}

function CompositionGrid() {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full text-foreground pointer-events-none"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.05 }}
      transition={{ duration: 1.6, delay: 0.4 }}
    >
      <line x1="33.333%" y1="0" x2="33.333%" y2="100%" stroke="currentColor" strokeWidth="1.25" />
      <line x1="66.666%" y1="0" x2="66.666%" y2="100%" stroke="currentColor" strokeWidth="1.25" />
      <line x1="0" y1="33.333%" x2="100%" y2="33.333%" stroke="currentColor" strokeWidth="1.1" />
      <line x1="0" y1="66.666%" x2="100%" y2="66.666%" stroke="currentColor" strokeWidth="1.1" />
    </motion.svg>
  )
}

function FilmSprockets() {
  const count = 14
  return (
    <motion.svg
      width="20"
      height="100%"
      className="hidden md:block absolute left-3 top-0 bottom-0 z-10 pointer-events-none text-foreground"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <line x1="20" y1="8%" x2="20" y2="92%" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.4" />
      {Array.from({ length: count }).map((_, i) => {
        const y = 8 + (i * (84 / (count - 1)))
        return (
          <rect
            key={i}
            x="2"
            y={`${y}%`}
            width="9"
            height="13"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />
        )
      })}
    </motion.svg>
  )
}

function CompassRose({ className }: { className?: string }) {
  return (
    <motion.svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
      initial={{ opacity: 0, rotate: -20 }}
      animate={{ opacity: 0.55, rotate: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeWidth="1" />
      <path d="M13 3L15 12L13 13L11 12L13 3Z" fill="currentColor" />
      <path d="M13 23L11 14L13 13L15 14L13 23Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="13" cy="13" r="1" fill="currentColor" />
    </motion.svg>
  )
}

interface HeroProps {
  photos: Photo[]
}

export function Hero({ photos }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const previewPhotos = photos.slice(0, 4)
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
  const [scrollHovered, setScrollHovered] = useState(false)
  const [heroSettled, setHeroSettled] = useState(false)

  return (
    <div className="relative w-full min-h-[100svh] flex flex-col justify-end pb-24 sm:pb-16 md:pb-24 px-5 sm:px-8 md:px-12 overflow-hidden">

      {/* Dynamic Background Image Crossfade (Visible only when hovering) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <AnimatePresence mode="popLayout">
          {activePhoto && (
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1.35, scale: 1 }}
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

      <CompositionGrid />
      <FilmSprockets />

      <CornerBracket className="absolute top-6 left-6 text-foreground/50 hidden sm:block" />
      <CornerBracket className="absolute top-6 right-6 text-foreground/50 hidden sm:block -scale-x-100" />
      <CornerBracket className="absolute bottom-6 left-6 text-foreground/50 hidden sm:block -scale-y-100" />
      <CornerBracket className="absolute bottom-6 right-6 text-foreground/50 hidden sm:block -scale-100" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute mt-20 top-6 sm:top-20 md:top-28 left-5 sm:left-8 md:left-12 flex flex-col gap-1.5 sm:gap-2 z-10 max-w-[62vw] sm:max-w-none"
      >
        <div className="flex items-center gap-2 sm:gap-3 text-[9px] md:text-xs font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-muted-high">
          <span className="text-muted-med">01 /</span>
          <span>Just Clicks from Nepal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-muted-med tabular-nums">
            27.7172° N, 85.3240° E
          </span>
          <CompassRose className="text-foreground hidden xs:block" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute  mt-18 sm:top-20 md:top-28 right-5 sm:right-8 md:right-12 flex items-center gap-1.5 sm:gap-2 z-10"
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-foreground/70 shrink-0"
          animate={shouldReduceMotion ? {} : { opacity: [1, 0.25, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        />
        <span className="text-[22px] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-muted-high font-bold whitespace-nowrap">
          <span className="hidden sm:inline ">Photography </span>Archive
        </span>
      </motion.div>

      {/* Floating thumbnail info details */}
      <div className="absolute right-36 top-1/2 -translate-y-1/2 text-right hidden xl:block z-10 pointer-events-none">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setActivePhoto(null)}
        className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-end gap-3 z-10"
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
              className={`relative w-16 h-20 overflow-hidden transition-all duration-500 cursor-pointer border ${isActive ? 'border-foreground' : 'border-transparent'}`}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="64px"
                className="object-cover"
                loading="lazy"
              />
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1 right-1 w-2 h-2 border-t border-r border-background/90"
                />
              )}
            </motion.div>
          )
        })}

        <div className="flex flex-col items-center gap-4 mt-8">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 border border-foreground/20 px-8 py-3 text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Enter Archive Page
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <span className="text-[8px] tracking-[0.2em] uppercase text-muted-med font-medium text-center mt-1">
          {photos.length} Photos
        </span>
      </motion.div>

      {/* Main headline — massive */}
      <h1
        className="text-[16vw] xs:text-[15vw] sm:text-[16vw] md:text-[13vw] lg:text-[11vw] font-black tracking-[-0.02em] sm:tracking-[-0.03em] leading-[0.85] text-foreground uppercase select-none break-words [contain:layout_paint]"
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
            <span className="">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => setHeroSettled(true)}
                className="block will-change-transform transform-gpu isolate"
              >
                <KineticText
                  as="span"
                  text="Random"
                  className={`font-[inherit] ${heroSettled ? '' : 'pointer-events-none'}`}
                />
              </motion.span>
            </span>

            <span className="block overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block will-change-transform transform-gpu isolate"
              >
                <KineticText
                  as="span"
                  text="Moments"
                  className={`text-muted-low font-[inherit] ${heroSettled ? '' : 'pointer-events-none'}`}
                />
                <CameraIcon />
              </motion.span>
            </span>
          </>
        )}
      </h1>

      {/* Bottom row — description, stats, CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mt-10 md:mt-16 pt-6 md:pt-8 border-t-[1.5px] border-foreground/15"
      >
        <div className="max-w-xs space-y-2">
          <p className="text-sm md:text-base font-light text-muted-high leading-relaxed">
            A small, unsorted collection of photos taken over the years{' '}
            <span className="group relative inline-block cursor-help text-foreground/80 hover:text-foreground transition-colors duration-300">
              —
              <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[180px] rounded-sm border border-foreground/10 bg-background px-3 py-1.5 text-[11px] font-light text-muted-high opacity-0 scale-95 origin-bottom transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 shadow-sm shadow-black/10">
                yes, a real em dash.
              </span>
            </span>{' '}
            kept exactly as random as they happened.
          </p>
          <span className="block text-[9px] tracking-[0.15em] uppercase text-muted-med tabular-nums">
            f/2.8 · 1/125 · ISO 200
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-muted-med">
          <div className="text-center">
            <span className="block text-lg sm:text-xl md:text-2xl font-black tabular-nums text-foreground">{photos.length}</span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium text-muted-high">Photos</span>
          </div>
          <div className="w-0.5 h-6 sm:h-8 bg-foreground/15" />

          <div className="hidden sm:block w-[3px] h-8 bg-foreground/15" />
          <div className="hidden sm:block text-center">
            <span className="block text-xl md:text-2xl font-black tabular-nums text-foreground">1</span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-muted-high">Old Camera</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — centered at the bottom */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.4, delay: 1.4, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        onHoverStart={() => setScrollHovered(true)}
        onHoverEnd={() => setScrollHovered(false)}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 cursor-default"
      >
        <div className="w-0.5 h-14 bg-gradient-to-b from-foreground/35 to-transparent" />
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-muted-med font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          className="text-muted-med"
          animate={
            shouldReduceMotion || scrollHovered
              ? { y: 0, opacity: 0.6 }
              : { y: [0, 3, 0], opacity: [0.35, 0.8, 0.35] }
          }
          transition={{ duration: 2, repeat: shouldReduceMotion || scrollHovered ? 0 : Infinity, ease: 'easeInOut', delay: 1.8 }}
        >
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </div>
  )
}