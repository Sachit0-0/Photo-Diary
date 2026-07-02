'use client'

import { useRef } from 'react'
import { useState } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import type { Photo } from '@/lib/data'
import { Lightbox } from './lightbox'

interface GalleryGridProps {
  photos: Photo[]
  isHomepage?: boolean
}

const aspectPattern = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square']
// each item's parallax travel distance in px — varying per column creates the drift
const parallaxPattern = [60, -40, 90, -60, 40, -90]

function ParallaxImageCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // tracks from entering to leaving viewport
  })

  const distance = parallaxPattern[index % parallaxPattern.length]
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-8 md:mb-10"
    >
      <button type="button" onClick={onClick} className="group block text-left w-full">
        <div className={`relative overflow-hidden bg-card ${aspectPattern[index % aspectPattern.length]}`}>
          <motion.img
            src={photo.url}
            alt={photo.title ?? ''}
            style={{ y }}
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        {photo.title && (
          <p className="mt-4 text-sm font-light tracking-wide text-foreground/60 group-hover:text-foreground transition-colors duration-300">
            {photo.title}
          </p>
        )}
      </button>
    </motion.div>
  )
}

export function GalleryGrid({ photos, isHomepage }: GalleryGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setSelectedIndex(index)
  }

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % photos.length
    setSelectedPhoto(photos[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const handlePrev = () => {
    const prevIndex = (selectedIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[prevIndex])
    setSelectedIndex(prevIndex)
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-10 [column-fill:balance]">
        {photos.map((photo, index) => (
          <ParallaxImageCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => handlePhotoClick(photo, index)}
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