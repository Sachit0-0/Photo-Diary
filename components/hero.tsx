'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Photo } from '@/sanity/queries'
import { KineticText } from './ui/kinetic-text'
import Button from './ui/fbutton'

function CameraIcon() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden="true"
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
      <defs>
        <filter id="flash-bloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
        </filter>
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <rect x="30" y="70" width="140" height="95" rx="10" />
        <rect x="75" y="45" width="35" height="25" rx="4" />
        <rect x="120" y="82" width="22" height="14" rx="3" />
        <circle cx="100" cy="120" r="32" />
        <circle cx="100" cy="120" r="18" />
      </g>
      {/* soft bloom behind the flash */}
      <motion.circle
        cx="100"
        cy="120"
        r="28"
        fill="currentColor"
        filter="url(#flash-bloom)"
        animate={shouldReduceMotion ? { opacity: 0 } : { opacity: [0, 0, 0.7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 2, times: [0, 0.86, 0.9, 1], ease: 'easeOut' }}
      />
      {/* lens glass catch-light — flickers like a shutter firing */}
      <motion.circle
        cx="100"
        cy="120"
        r="16"
        fill="currentColor"
        animate={shouldReduceMotion ? { opacity: 0 } : { opacity: [0, 0, 1, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 2, times: [0, 0.86, 0.9, 1], ease: 'easeOut' }}
      />
      <circle cx="120" cy="89" r="2.5" fill="currentColor" />
      {/* self-timer tally lamp */}
      <motion.circle
        cx="44"
        cy="82"
        r="3.5"
        fill="#f97316"
        animate={shouldReduceMotion ? { opacity: 0.9 } : { opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      />
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
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
    >
      <path d="M0 6V1a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.5" className="text-foreground/70 dark:text-foreground/50" />
    </motion.svg>
  )
}

function CompositionGrid() {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full text-foreground pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.4 }}
    >
      <line x1="33.333%" y1="0" x2="33.333%" y2="100%" stroke="currentColor" strokeWidth="1.25" className="text-foreground/10 dark:text-foreground/[0.05]" />
      <line x1="66.666%" y1="0" x2="66.666%" y2="100%" stroke="currentColor" strokeWidth="1.25" className="text-foreground/10 dark:text-foreground/[0.05]" />
      <line x1="0" y1="33.333%" x2="100%" y2="33.333%" stroke="currentColor" strokeWidth="1.1" className="text-foreground/[0.08] dark:text-foreground/[0.04]" />
      <line x1="0" y1="66.666%" x2="100%" y2="66.666%" stroke="currentColor" strokeWidth="1.1" className="text-foreground/[0.08] dark:text-foreground/[0.04]" />
    </motion.svg>
  )
}

function FilmSprockets({ side = 'left' }: { side?: 'left' | 'right' }) {
  const count = 14
  const sideClass = side === 'left' ? 'left-3' : 'right-3'
  return (
    <motion.svg
      width="20"
      height="100%"
      aria-hidden="true"
      className={`hidden md:block absolute ${sideClass} top-0 bottom-0 z-10 pointer-events-none text-foreground`}
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <line x1="20" y1="8%" x2="20" y2="92%" stroke="currentColor" strokeWidth="1.4" className="text-foreground/25 dark:text-foreground/[0.14]" />
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
            strokeWidth="1.2"
            className="text-foreground/40 dark:text-foreground/[0.28]"
          />
        )
      })}
    </motion.svg>
  )
}

function MomentsGrainFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="moments-text-grain" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          {/* generate noise, and re-seed it on a loop so the static actually moves */}
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch" seed="2" result="noise">
            <animate attributeName="seed" values="1;7;3;12;5;9;1" dur="0.5s" repeatCount="indefinite" calcMode="discrete" />
          </feTurbulence>
          {/* push contrast hard so speckles read as clearly lighter/darker than the base noise gray */}
          <feComponentTransfer in="noise" result="contrastNoise">
            <feFuncR type="linear" slope="4" intercept="-1.5" />
            <feFuncG type="linear" slope="4" intercept="-1.5" />
            <feFuncB type="linear" slope="4" intercept="-1.5" />
          </feComponentTransfer>
          {/* mid-gray speckles with noise-driven alpha — modulates lightness either direction, so it reads on light or dark text */}
          <feColorMatrix
            in="contrastNoise"
            type="matrix"
            values="0 0 0 0 0.5
                    0 0 0 0 0.5
                    0 0 0 0 0.5
                    0.9 0.9 0.9 0 -0.25"
            result="grayNoise"
          />
          {/* keep the noise only where the text glyphs have alpha */}
          <feComposite in="grayNoise" in2="SourceGraphic" operator="in" result="grainInGlyphs" />
          {/* blend that grain onto the actual rendered text color/theme, grain on top so it visibly modulates it either direction */}
          <feBlend in="grainInGlyphs" in2="SourceGraphic" mode="hard-light" />
        </filter>
      </defs>
    </svg>
  )
}

function DateStamp({ date }: { date: Date }) {
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.3 }}
      className="font-mono text-[10px] sm:text-[11px] lg:text-xs tracking-[0.1em] text-orange-800 dark:text-orange-400 [text-shadow:0_0_6px_rgba(249,115,22,0.45)] tabular-nums select-none"
    >
      {`'${yy} ${mm} ${dd}`}
    </motion.span>
  )
}

function AperturePulse({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  const blades = 6
  return (
    <motion.svg
      viewBox="0 0 34 34"
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, rotate: -8 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx="17" cy="17" r="15.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.25" fill="none" />
      <motion.g
        style={{ transformOrigin: '17px 17px' }}
        animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
        transition={shouldReduceMotion ? {} : { duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: blades }).map((_, i) => {
          const angle = (360 / blades) * i
          return (
            <path
              key={i}
              d="M17 17L17 5A12 12 0 0 1 27 11Z"
              fill="currentColor"
              opacity="0.5"
              transform={`rotate(${angle} 17 17)`}
            />
          )
        })}
      </motion.g>
      <circle cx="17" cy="17" r="5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.9" />
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
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, rotate: -20 }}
      animate={{ opacity: 0.75, rotate: 0 }}
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
    <div className="relative w-full min-h-[100svh] flex flex-col justify-end pb-24 sm:pb-16 md:pb-24 px-5 sm:px-8 md:px-12 pt-16 sm:pt-0 overflow-hidden">
      <MomentsGrainFilter />

      {/* Dynamic Background Image Crossfade (Visible only when hovering/focusing a thumbnail) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <AnimatePresence mode="popLayout">
          {activePhoto && (
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 2 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full dark:mix-blend-plus-lighter"
            >
              <Image
                src={activePhoto.url}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/30 dark:bg-background/70" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CompositionGrid />
      <FilmSprockets side="left" />
      <FilmSprockets side="right" />

      <CornerBracket className="absolute top-6 left-6 hidden sm:block" />
      <CornerBracket className="absolute top-6 right-6 hidden sm:block -scale-x-100" />
      <CornerBracket className="absolute bottom-6 left-6 hidden sm:block -scale-y-100" />
      <CornerBracket className="absolute bottom-6 right-6 hidden sm:block -scale-100" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-20 sm:top-20 md:top-28 left-5 sm:left-8 md:left-12 flex flex-col gap-1.5 sm:gap-2 z-10 max-w-[62vw] sm:max-w-none"
      >
        <div className="flex items-center gap-2 sm:gap-3 text-[9px] md:text-xs lg:text-sm font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-foreground/75">
          <span className="text-foreground/55">01 /</span>
          <span>Just Clicks from Nepal</span>
        </div>
        <div className="relative flex items-center gap-2 px-2.5 py-1">
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/70 dark:border-foreground/55" aria-hidden="true" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/70 dark:border-foreground/55" aria-hidden="true" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/70 dark:border-foreground/55" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/70 dark:border-foreground/55" aria-hidden="true" />
          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-foreground/70 tabular-nums">
            27.7172° N, 85.3240° E
          </span>
          <CompassRose className="text-foreground hidden xs:block" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-20 sm:top-20 md:top-28 right-5 sm:right-8 md:right-12 flex items-center gap-1.5 sm:gap-2 z-10"
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-orange-600 dark:bg-orange-400 shrink-0"
          aria-hidden="true"
          animate={shouldReduceMotion ? {} : { opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        />
        <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.25em] uppercase text-foreground/75 font-bold whitespace-nowrap">
          <span className="hidden sm:inline">Photography </span>Archive
        </span>
      </motion.div>

      {/* Floating thumbnail info details */}
      <div className="absolute right-36 top-1/2 -translate-y-1/2 text-right hidden xl:block z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {activePhoto && (
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.9, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="space-y-1"
            >
              <span className="block text-[10px] lg:text-xs tracking-[0.2em] uppercase font-bold text-foreground">
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
        <div className="relative pr-3">
          {/* perforated edge running down the outside of the filmstrip */}
          <div className="absolute top-0 bottom-0 right-0 w-3 flex flex-col justify-between py-1" aria-hidden="true">
            {previewPhotos.map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full border border-foreground/40 dark:border-foreground/25" />
            ))}
          </div>

          <ul className="flex flex-col items-end gap-3 list-none">
            {previewPhotos.map((photo, index) => {
              const isActive = activePhoto?.id === photo.id
              const frameCode = `${24 + index}A`
              return (
                <li key={photo.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 left-0.5 z-10 font-mono text-[7px] lg:text-[8px] tracking-[0.1em] text-background bg-foreground/90 px-1 py-px rounded-[2px]"
                  >
                    {frameCode}
                  </span>
                  <motion.button
                    type="button"
                    aria-label={`Preview photo: ${photo.title}`}
                    aria-pressed={isActive}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    whileFocus={{ opacity: 1, scale: 1.05 }}
                    onMouseEnter={() => setActivePhoto(photo)}
                    onFocus={() => setActivePhoto(photo)}
                    onBlur={() => setActivePhoto(null)}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative rounded-[4px] block w-16 h-20 overflow-hidden transition-all duration-500 cursor-pointer border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'border-foreground' : 'border-foreground/35 dark:border-foreground/25'}`}
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
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-1 right-1 w-2 h-2 border-t border-r border-background/90"
                      />
                    )}
                  </motion.button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2 mt-2" aria-hidden="true">
          <span className="w-1 h-1 rounded-full bg-orange-600 dark:bg-orange-400" />
          <span className="font-mono text-[10px] lg:text-xs tracking-[0.15em] text-foreground/70 tabular-nums">
            FRAME {String((previewPhotos.findIndex((p) => p.id === activePhoto?.id) ?? -1) + 1 || 1).padStart(2, '0')}
            /{String(previewPhotos.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <Button/>
        </div>
        <span className="text-[8px] lg:text-[10px] tracking-[0.2em] uppercase text-foreground/70 font-medium text-center mt-1">
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
            <span className="block text-foreground/55 dark:text-foreground/45">
              <span style={{ filter: 'url(#moments-text-grain)' }}>Moments</span>
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
                <span style={{ filter: 'url(#moments-text-grain)' }}>
                  <KineticText
                    as="span"
                    text="Moments"
                    className={`text-foreground/55 dark:text-foreground/45 font-[inherit] ${heroSettled ? '' : 'pointer-events-none'}`}
                  />
                </span>
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
        className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mt-10 md:mt-16 pt-6 md:pt-8 border-t-[1.5px] border-foreground/25 dark:border-foreground/15"
      >
        <div className="max-w-xs space-y-2">
          <p className="text-sm md:text-base font-light text-foreground/80 leading-relaxed">
            A small, unsorted collection of photos taken over the years{' '}
            <span className="group relative inline-block cursor-help text-foreground/90 hover:text-foreground focus-within:text-foreground transition-colors duration-300">
              <button
                type="button"
                className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm"
                aria-describedby="em-dash-note"
              >
                —
              </button>
              <span
                id="em-dash-note"
                role="tooltip"
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[180px] rounded-sm border border-foreground/15 dark:border-foreground/10 bg-background px-3 py-1.5 text-[11px] font-light text-foreground/75 opacity-0 scale-95 origin-bottom transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 shadow-sm shadow-black/10"
              >
                yes, a real em dash.
              </span>
            </span>{' '}
            kept exactly as random as they happened.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="block text-[9px] sm:text-[10px] lg:text-xs tracking-[0.15em] uppercase text-foreground/70 tabular-nums">
              f/2.8 · 1/125 · ISO 200
            </span>
            <span className="hidden xs:block w-px h-3 bg-foreground/35 dark:bg-foreground/25" aria-hidden="true" />
            <DateStamp date={new Date()} />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-foreground/70">
          <div className="text-center">
            <span className="block text-lg sm:text-xl md:text-2xl font-black tabular-nums text-foreground">{photos.length}</span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium text-foreground/70">Photos</span>
          </div>
          <div className="w-0.5 h-6 sm:h-8 bg-foreground/25 dark:bg-foreground/15" />

          <div className="hidden sm:block w-[3px] h-8 bg-foreground/25 dark:bg-foreground/15" />
          <div className="hidden sm:block text-center">
            <span className="flex items-center justify-center gap-1.5 text-xl md:text-2xl font-black tabular-nums text-foreground">
              <AperturePulse className="w-4 h-4 md:w-5 md:h-5 text-foreground/80 shrink-0" />
              1
            </span>
            <span className="text-[9px] lg:text-[10px] tracking-[0.2em] uppercase font-medium text-foreground/70">Old Camera</span>
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
        aria-hidden="true"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 cursor-default"
      >
        <svg width="10" height="56" viewBox="0 0 10 56" aria-hidden="true" className="text-foreground/70 dark:text-foreground/55 shrink-0">
          <defs>
            <linearGradient id="scroll-track-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="5" y1="2" x2="5" y2="52" stroke="url(#scroll-track-fade)" strokeWidth="1" />
          {[8, 18, 28, 38].map((y) => (
            <line key={y} x1="2.5" y1={y} x2="7.5" y2={y} stroke="currentColor" strokeOpacity="0.7" strokeWidth="1" />
          ))}
        </svg>
        <span
          className="text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-foreground/70 font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          className="text-foreground/70"
          animate={
            shouldReduceMotion || scrollHovered
              ? { y: 0, opacity: 0.7 }
              : { y: [0, 3, 0], opacity: [0.45, 0.9, 0.45] }
          }
          transition={{ duration: 2, repeat: shouldReduceMotion || scrollHovered ? 0 : Infinity, ease: 'easeInOut', delay: 1.8 }}
        >
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </div>
  )
}