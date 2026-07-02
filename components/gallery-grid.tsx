'use client'

import { memo, useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from '@/sanity/queries'
import { Lightbox } from './lightbox'

const MotionImage = motion.create(Image)

interface GalleryGridProps {
  photos: Photo[]
  isHomepage?: boolean
}

const parallaxPattern = [50, -35, 75, -50, 35, -75]

// Moved out of the component so it isn't recreated every render
const aspects = [
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[2/3]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[5/4]',
]

interface ParallaxImageCardProps {
  photo: Photo
  index: number
  priority: boolean
  onClick: (index: number) => void
}

const ParallaxImageCard = memo(function ParallaxImageCard({
  photo,
  index,
  priority,
  onClick,
}: ParallaxImageCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const distance = prefersReducedMotion ? 0 : parallaxPattern[index % parallaxPattern.length]
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  // Light spring smooths out jitter from fast/scroll-snapping without adding noticeable lag
  const y = useSpring(rawY, { stiffness: 300, damping: 40, mass: 0.2 })

  const aspect = aspects[index % aspects.length]

  const handleClick = useCallback(() => onClick(index), [onClick, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (index % 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-6 md:mb-8"
    >
      <button type="button" onClick={handleClick} className="group block text-left w-full">
        <div className={`relative overflow-hidden bg-foreground/4 transform-gpu ${aspect}`}>
          {/* Base layer: always grayscale. Filter is STATIC here, so it costs nothing extra. */}
          <MotionImage
            src={photo.url}
            alt={photo.title ?? ''}
            style={{ y }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            fetchPriority={priority ? 'high' : 'auto'}
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover grayscale transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] will-change-transform"
          />

          {/* Color overlay: crossfades in on hover via opacity only — compositor-accelerated, no repaint */}
          <MotionImage
            src={photo.url}
            alt=""
            aria-hidden="true"
            style={{ y }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-[1.04] will-change-[opacity,transform]"
          />

          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500 pointer-events-none" />

          <div className="absolute top-4 right-4 text-[10px] tracking-[0.15em] font-medium text-foreground/0 group-hover:text-muted-high transition-colors duration-400 uppercase">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {photo.title && (
          <div className="mt-3 overflow-hidden h-4">
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/0 group-hover:text-muted-high transition-all duration-400 translate-y-4 group-hover:translate-y-0">
              {photo.title}
            </p>
          </div>
        )}
      </button>
    </motion.div>
  )
})

export function GalleryGrid({ photos, isHomepage }: GalleryGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePhotoClick = useCallback(
    (index: number) => {
      setSelectedPhoto(photos[index])
      setSelectedIndex(index)
    },
    [photos]
  )

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      const nextIndex = (prev + 1) % photos.length
      setSelectedPhoto(photos[nextIndex])
      return nextIndex
    })
  }, [photos])

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      const prevIndex = (prev - 1 + photos.length) % photos.length
      setSelectedPhoto(photos[prevIndex])
      return prevIndex
    })
  }, [photos])

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:balance]">
        {photos.map((photo, index) => (
          <ParallaxImageCard
            key={photo.id}
            photo={photo}
            index={index}
            priority={isHomepage ? index < 4 : false}
            onClick={handlePhotoClick}
          />
        ))}
      </div>

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={selectedIndex}
          totalCount={photos.length}
        />
      )}
    </>
  )
}