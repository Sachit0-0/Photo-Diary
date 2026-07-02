'use client'

import { Navigation } from '@/components/navigation'
import { GalleryGrid } from '@/components/gallery-grid'
import { Footer } from '@/components/footer'
import { photos } from '@/lib/data'
import { motion } from 'framer-motion'

export default function GalleryPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />

      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-40 pb-20 md:pt-48 md:pb-28 border-b border-foreground/5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-12 gap-8 items-end"
        >
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3 text-sm font-light tracking-widest uppercase text-foreground/40">
              <span className="text-foreground/25">02 /</span>
              <span>Archive</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-playfair leading-[0.9] text-balance">
              Complete <span className="text-accent font-light">Gallery</span>
            </h1>
          </div>

          <div className="md:col-span-4 flex md:flex-col md:items-end justify-between md:justify-end gap-2 md:text-right">
            <p className="text-base font-light text-foreground/55 leading-relaxed max-w-xs">
              The full collection, unsorted — photographs taken around the world.
            </p>
            <span className="text-xs font-light tracking-widest uppercase text-foreground/35 tabular-nums">
              {photos.length} {photos.length === 1 ? 'photograph' : 'photographs'}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Grid runs full-bleed by design — only a small gutter, no max-w container,
          so the parallax images get the whole viewport width to breathe */}
      <section aria-label="Photo gallery" className="w-full px-4 md:px-6 py-20 md:py-28">
        {photos.length > 0 ? (
          <GalleryGrid photos={photos} />
        ) : (
          <p className="text-sm font-light text-foreground/40 text-center py-20">
            No photographs yet — check back soon.
          </p>
        )}
      </section>

      <Footer />
    </main>
  )
}