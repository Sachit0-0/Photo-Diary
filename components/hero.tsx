'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const headlineWords = ['Random', 'Moments']

function CameraIcon() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 inline-block ml-3 md:ml-5 -translate-y-2"
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1, rotate: -4 }
          : { opacity: 1, scale: 1, rotate: [-4, 3, -4], y: [0, -6, 0] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.6, delay: 0.4 }
          : {
              opacity: { duration: 0.6, delay: 0.4 },
              scale: { duration: 0.6, delay: 0.4 },
              rotate: { duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' },
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
      <motion.circle
        cx="120"
        cy="89"
        r="2.5"
        fill="currentColor"
        animate={shouldReduceMotion ? {} : { opacity: [1, 0.15, 1] }}
        transition={{ duration: 2.4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 md:px-12">
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-14 md:space-y-24">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-foreground/50"
        >
          <span className="text-foreground/30">01 /</span>
          <span>Just Clicks from Nepal</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-balance text-foreground"
          >
            {headlineWords[0]}
            <br />
            <span className="text-foreground/20">
              {headlineWords[1]}
              <CameraIcon />
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-2"
        >
          <p className="md:col-span-4 text-lg md:text-2xl font-semibold text-foreground/90 leading-snug">
            A small, unsorted collection.
          </p>
          <p className="md:col-span-5 md:col-start-7 text-base md:text-lg font-light text-foreground/55 leading-relaxed">
            This isn't a project or a portfolio — just photos I've taken over
            the years, kept exactly as random as they happened.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 border-b-2 border-foreground pb-2 text-sm md:text-base font-bold tracking-widest uppercase transition-colors duration-300 hover:text-foreground/70"
          >
            See All
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-foreground/40 text-[10px] font-bold tracking-[0.25em]">
          SCROLL
        </span>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
          className="w-px h-10 bg-foreground/30"
        />
      </motion.div>
    </div>
  )
}