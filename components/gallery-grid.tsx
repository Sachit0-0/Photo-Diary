'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from '@/lib/data'
import { Lightbox } from './lightbox'

const MotionImage = motion(Image)

interface GalleryGridProps {
  photos: Photo[]
  isHomepage?: boolean
}

const parallaxPattern = [50, -35, 75, -50, 35, -75]

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
    offset: ['start end', 'end start'],
  })

  const distance = parallaxPattern[index % parallaxPattern.length]
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  // Alternate aspect ratios for visual interest
  const aspects = [
    'aspect-[3/4]',
    'aspect-[4/3]',
    'aspect-[2/3]',
    'aspect-square',
    'aspect-[3/4]',
    'aspect-[5/4]',
  ]
  const aspect = aspects[index % aspects.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (index % 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-6 md:mb-8"
    >
      <button
        type="button"
        onClick={onClick}
        className="group block text-left w-full"
      >
        {/* Image container */}
        <div className={`relative overflow-hidden bg-foreground/4 ${aspect}`}>
          <MotionImage
            src={photo.url}
            alt={photo.title ?? ''}
            style={{ y }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-[filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] grayscale group-hover:grayscale-0 will-change-transform"
            loading="lazy"
          />

          {/* Minimal hover overlay — darkens slightly */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500 pointer-events-none" />

          {/* Number tag — top right corner */}
          <div className="absolute top-4 right-4 text-[10px] tracking-[0.15em] font-medium text-foreground/0 group-hover:text-muted-high transition-colors duration-400 uppercase">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Title below — slide up on hover */}
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
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:balance]">
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