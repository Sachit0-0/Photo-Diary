'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Photo } from '@/lib/data'

interface ImageCardProps {
  photo: Photo
  onClick: () => void
  isHomepage?: boolean
}

export function ImageCard({ photo, onClick, isHomepage }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer overflow-hidden text-left w-full"
    >
      <div className="relative overflow-hidden bg-card aspect-square">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden w-full h-full"
        >
          <img
            src={photo.url}
            alt={photo.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHomepage && isHovered 
                ? 'saturate-100' 
                : isHomepage 
                ? 'saturate-0' 
                : ''
            }`}
          />
        </motion.div>

        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        />
        
        {/* Text overlay - animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col justify-end p-6"
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-xl md:text-2xl font-bold text-white leading-tight"
          >
            {photo.title}
          </motion.h3>
        </motion.div>
      </div>
    </motion.button>
  )
}
