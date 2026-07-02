'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { GalleryGrid } from '@/components/gallery-grid'
import { Footer } from '@/components/footer'
import { photos } from '@/lib/data'

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-foreground/50">
      <span className="text-foreground/30">{index} /</span>
      <span>{label}</span>
    </div>
  )
}

export default function Home() {
  const featuredPhotos = photos.slice(0, 6)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Hero />

      {/* Featured Work Section */}
      <section className="w-full py-32 md:py-40 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4">
              <SectionEyebrow index="02" label="Recent Shots" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light font-playfair leading-tight">
                My Favorites
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl font-light text-foreground/60 max-w-3xl leading-relaxed"
            >
              Some photos that turned out decent. The kind of stuff you want to go back and look at again.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20"
          >
            <GalleryGrid photos={featuredPhotos} isHomepage={true} />
          </motion.div>
        </div>
      </section>

      {/* About Section - Editorial style */}
      <section className="w-full py-32 md:py-40 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          >
            <div className="space-y-6">
              <SectionEyebrow index="03" label="About" />
              <h3 className="text-4xl md:text-5xl font-light font-playfair leading-tight">
                A Small Collection
              </h3>
              <p className="text-lg font-light text-foreground/60 leading-relaxed">
                This isn't a project or a portfolio—just a collection of photos I've taken over the years.
              </p>
              <p className="text-base font-light text-foreground/50 leading-relaxed">
                If you find a few that make you stop scrolling for a second, that's pretty cool.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative aspect-square bg-card overflow-hidden"
            >
              <img
                src={photos[0]?.url}
                alt="Featured moment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-foreground/10 pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section — type-led, no boxed button */}
      <section className="w-full py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <SectionEyebrow index="04" label="Gallery" />

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-playfair leading-[0.95] max-w-4xl text-balance">
              More Shots
            </h2>

            <p className="text-lg md:text-xl font-light text-foreground/55 max-w-xl leading-relaxed">
              Check out the rest of what I've got. All the photos, no filters, just Nepal and a camera.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Link
                href="/gallery"
                className="group inline-flex items-baseline gap-4 border-b border-foreground/20 pb-3 hover:border-foreground/60 transition-colors duration-300"
              >
                <span className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                  See All
                </span>
                <span className="text-accent text-2xl transition-transform duration-300 ease-out group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}