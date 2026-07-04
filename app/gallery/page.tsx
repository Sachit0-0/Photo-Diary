import { getPhotos } from '@/sanity/queries'
import { GalleryPageClient } from './gallery-page-client'

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const photos = await getPhotos()

  return <GalleryPageClient photos={photos} />
}