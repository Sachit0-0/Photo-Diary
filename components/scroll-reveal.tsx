'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface ScrollRevealProps {
  text: string
  className?: string
  delay?: number
}

export function ScrollReveal({ text, className = '', delay = 0 }: ScrollRevealProps) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em] py-[0.05em]">
          <motion.span
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.015,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
