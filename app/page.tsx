import { getPhotos } from '@/sanity/queries'
import { HomeClient } from '@/components/home-client'

export default async function Home() {
  const photos = await getPhotos()
  return <HomeClient photos={photos} />
}