'use client'

import styles from './styles.module.scss'

import Image from 'next/image'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { useRef, useMemo } from 'react'
import Link from 'next/link'
import type { Photo } from '@/sanity/queries'
import FancyButton from './ui/fbutton'

interface Picture {
    photo: Photo
    scale: MotionValue<number>
    sizesAttr: string
    quality: number
}

interface AnimatedGalleryProps {
    photos: Photo[]
}

// Scale factor per gallery position — must match the useTransform calls below
const SCALE_FACTORS = [4, 5, 6, 5, 6, 8]

export default function AnimatedGallery({ photos }: AnimatedGalleryProps) {
    const container = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])

    const scales = useMemo(
        () => [scale4, scale5, scale6, scale5, scale6, scale8],
        [scale4, scale5, scale6, scale8]
    )

    const selectedPhotos = useMemo(() => photos.slice(0, 6), [photos])

    const pictures: Picture[] = useMemo(
        () =>
            selectedPhotos.map((photo, i) => {
                const factor = SCALE_FACTORS[i] ?? 4
                return {
                    photo,
                    scale: scales[i],
                    sizesAttr: `(max-width: 768px) ${Math.min(factor * 50, 200)}vw, ${Math.min(factor * 25, 100)}vw`,
                    quality: i === 0 ? 90 : 75,
                }
            }),
        [selectedPhotos, scales]
    )

    if (pictures.length === 0) {
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
                    {pictures.map(({ photo, scale, sizesAttr, quality }, index) => (
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
    sizes={sizesAttr}
    quality={quality}
    priority={index === 0}
    className="object-cover"
/>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 mt-8">
            <FancyButton/>
            </div>
        </>
    )
}