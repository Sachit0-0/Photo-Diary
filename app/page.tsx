import { getPhotos } from '@/sanity/queries'
import { HomeClient } from '@/components/home-client'
export const dynamic = "force-dynamic";

export default async function Home() {
  const photos = await getPhotos()
  return <HomeClient photos={photos} />
}