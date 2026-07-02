import { client } from './client'
import { urlFor } from './image'

export interface Photo {
  id: string
  title: string
  url: string
}

interface SanityPhotoDoc {
  _id: string
  title?: string
  photo: any
}

export async function getPhotos(): Promise<Photo[]> {
  const docs: SanityPhotoDoc[] = await client.fetch(`
    *[_type == "photo"]{
      _id,
      title,
      photo
    }
  `)

  return docs.map((doc) => ({
    id: doc._id,
    title: doc.title ?? '',
    url: urlFor(doc.photo).width(1200).auto('format').url(),
  }))
}