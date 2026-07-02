'use client'

import { Navigation } from '@/components/navigation'
import { GalleryGrid } from '@/components/gallery-grid'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import type { Photo } from '@/sanity/queries'

interface GalleryPageClientProps {
    photos: Photo[]
}

export function GalleryPageClient({ photos }: GalleryPageClientProps) {
    return (
        <main className="bg-background text-foreground min-h-screen">
            <Navigation />

            <section className="max-w-screen-xl mx-auto px-8 md:px-12 pt-40 pb-16 md:pt-48 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-foreground/6"
                >
                    <div className="space-y-5">
                        <div className="flex items-center gap-5">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-med font-medium">002</span>
                            <div className="h-px w-10 bg-foreground/15" />
                            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-high font-semibold">Archive</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.85] uppercase">
                            Complete<br />
                            <span className="text-muted-low">Gallery</span>
                        </h1>
                    </div>

                    <div className="space-y-3 md:text-right">
                        <p className="text-sm font-light text-muted-high leading-relaxed max-w-xs md:ml-auto">
                            The full collection — photographs taken around Nepal and beyond.
                        </p>
                        <span className="block text-[10px] tracking-[0.2em] uppercase text-muted-med font-medium tabular-nums">
                            {photos.length} {photos.length === 1 ? 'photograph' : 'photographs'}
                        </span>
                    </div>
                </motion.div>
            </section>

            <section aria-label="Photo gallery" className="w-full px-6 md:px-10 py-8 md:py-16">
                {photos.length > 0 ? (
                    <GalleryGrid photos={photos} />
                ) : (
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-med text-center py-20 font-medium">
                        No photographs yet — check back soon.
                    </p>
                )}
            </section>

            <Footer />
        </main>
    )
}