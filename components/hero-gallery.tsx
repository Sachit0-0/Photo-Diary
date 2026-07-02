'use client'

import styles from './styles.module.scss'

import Image from 'next/image'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { photos, Photo } from '@/lib/data'

interface Picture {
    photo: Photo
    scale: MotionValue<number>
}

export default function AnimatedGallery() {
    const container = useRef<HTMLDivElement>(null)
    const [isMounted, setIsMounted] = useState(false)
    // Store only the selected photos in state — scales are derived separately
    // so we never rebuild the six MotionValues (and their subscriptions) after mount.
    const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([])

    const { scrollYProgress } = useScroll({
        target: isMounted ? container : undefined,
        offset: ['start start', 'end end'],
    })

    // Direct 1:1 mapping to scroll — smoothness now comes from Lenis
    // interpolating the underlying scroll position itself (see
    // components/smooth-scroll.tsx), not from lagging the transform.
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])

    // Scales are fixed MotionValues created once per render tree — memoize the
    // array reference itself, not the random photo selection (which must stay
    // client-only to avoid hydration mismatches).
    const scales = useMemo(() => [scale4, scale5, scale6, scale5, scale6, scale8], [scale4, scale5, scale6, scale8])

    const selectRandomPhotos = useCallback(() => {
        const shuffled = [...photos].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 6)
    }, [])

    useEffect(() => {
        setSelectedPhotos(selectRandomPhotos())
        setIsMounted(true)
    }, [selectRandomPhotos])

    const pictures: Picture[] = useMemo(
        () => selectedPhotos.map((photo, i) => ({ photo, scale: scales[i] })),
        [selectedPhotos, scales]
    )

    if (!isMounted || pictures.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
        )
    }

    return (
        <>
            <div ref={container} className={styles.container}>
                <div className={styles.sticky}>
                    {pictures.map(({ photo, scale }, index) => (
                        <motion.div
                            key={photo.id}
                            style={{ scale, willChange: 'transform' }}
                            className={styles.el}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={photo.url}
                                    fill
                                    alt={photo.title}
                                    // Images scale up to 8x on scroll, so request a source large
                                    // enough that it stays sharp at full zoom rather than being
                                    // upscaled from a viewport-sized optimized image.
                                    sizes="(max-width: 768px) 400vw, 200vw"
                                    quality={90}
                                    priority={index < 2}
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 mt-8">
                <Link
                    href="/gallery"
                    className="group inline-flex items-center gap-2 border border-foreground/20 px-8 py-3 text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                    Enter Archive Page
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
            </div>
        </>
    )
}