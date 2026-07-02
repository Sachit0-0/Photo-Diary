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
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-accent transition-colors text-2xl z-60"
        >
          ✕
        </motion.button>

        <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full"
          >
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors text-3xl z-60"
          >
            ←
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors text-3xl z-60"
          >
            →
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
          >
            <h2 className="text-2xl font-semibold font-playfair mb-2">{photo.title}</h2>
            <p className="text-sm text-white/70 mb-4">{photo.location}</p>
            <p className="text-xs text-white/50">
              {currentIndex + 1} / {totalCount}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
