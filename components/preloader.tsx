'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = [
  'Nepal',
  'Landscape',
  'Architecture',
  'Nature',
  'Photo Diary'
]

export function Preloader() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('has-loaded')
    if (hasLoaded === 'true') {
      setVisible(false)
      return
    }

    const totalDuration = 250 // Snap loader to complete in 250ms for instant load
    const intervalTime = 10
    const increment = 100 / (totalDuration / intervalTime)

    // Fast word cycle (every 50ms)
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev))
    }, 50)

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(wordInterval)
          setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem('has-loaded', 'true')
          }, 80)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, intervalTime)

    return () => {
      clearInterval(wordInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ 
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0a0a] text-white p-8 md:p-12 select-none"
        >
          {/* Top header */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase font-bold text-white/40">
            <span>Photo Diary</span>
            <span>Nepal Archive</span>
          </div>

          {/* Middle: Word cycle */}
          <div className="flex justify-center items-center h-full">
            <div className="overflow-hidden h-[1.2em] flex items-center justify-center">
              <motion.span
                key={index}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="block text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase"
              >
                {words[index]}
              </motion.span>
            </div>
          </div>

          {/* Bottom progress indicator */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/30">
                Loading Collection
              </span>
              <div className="h-[2px] w-32 bg-white/10 overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>
            </div>

            {/* Percentage counter */}
            <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter tabular-nums leading-none">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
