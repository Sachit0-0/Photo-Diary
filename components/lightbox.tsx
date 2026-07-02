'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import type { Photo } from '@/lib/data'

interface LightboxProps {
  photo: Photo
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  currentIndex: number
  totalCount: number
}

export function Lightbox({
  photo,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-6 md:p-8 z-10 mix-blend-difference text-white">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
              {String(currentIndex + 1).padStart(3, '0')} — {String(totalCount).padStart(3, '0')}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/50 mt-1">
              {photo.location}
            </span>
          </div>

          <button
            onClick={onClose}
            className="group flex flex-col items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-white transition-colors duration-300"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium group-hover:scale-110 transition-transform duration-300">
              Close
            </span>
          </button>
        </div>

        {/* Previous / Next invisible hit areas */}
        <button
          className="absolute left-0 top-0 bottom-0 w-1/3 z-[5] cursor-[w-resize]"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous image"
        />
        <button
          className="absolute right-0 top-0 bottom-0 w-1/3 z-[5] cursor-[e-resize]"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next image"
        />

        {/* Main Image */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full h-full max-w-[85vw] max-h-[85vh] flex flex-col items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-contain pointer-events-none"
              priority
              sizes="85vw"
            />
          </div>
        </motion.div>

        {/* Bottom Title */}
        <div className="absolute bottom-6 md:bottom-12 left-0 w-full flex justify-center z-10 mix-blend-difference text-white pointer-events-none">
          <motion.div
            key={`title-${photo.id}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-center">
              {photo.title}
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
