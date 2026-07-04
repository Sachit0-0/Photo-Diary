import { getPhotos } from '@/sanity/queries'
import { GalleryPageClient } from './gallery-page-client'


export default async function GalleryPage() {
  const photos = await getPhotos()
  console.log(photos.length);
console.log(photos);
  return <GalleryPageClient photos={photos} />
}