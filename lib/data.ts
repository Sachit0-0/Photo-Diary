export interface Photo {
  id: string
  title: string
  location: string
  url: string
  width: number
  height: number
  category: 'landscape' | 'portrait' | 'architecture' | 'nature'
}

export const photos: Photo[] = [
  {
    id: '1',
    title: 'Morning in the Himalayas',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
    width: 800,
    height: 1000,
    category: 'landscape',
  },
  {
    id: '2',
    title: 'Kathmandu Streets',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
    category: 'architecture',
  },
  {
    id: '3',
    title: 'Rice Fields',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37daa?w=600&h=800&fit=crop',
    width: 600,
    height: 800,
    category: 'nature',
  },
  {
    id: '4',
    title: 'Temple Reflection',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1000&h=700&fit=crop',
    width: 1000,
    height: 700,
    category: 'landscape',
  },
  {
    id: '5',
    title: 'Mountain Ridge',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=800&fit=crop',
    width: 900,
    height: 800,
    category: 'landscape',
  },
  {
    id: '6',
    title: 'City Evening',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&h=1000&fit=crop',
    width: 700,
    height: 1000,
    category: 'architecture',
  },
  {
    id: '7',
    title: 'Valley Green',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
    category: 'nature',
  },
  {
    id: '8',
    title: 'Waterfall Mist',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=900&fit=crop',
    width: 700,
    height: 900,
    category: 'landscape',
  },
  {
    id: '9',
    title: 'Town Silhouette',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1000&h=600&fit=crop',
    width: 1000,
    height: 600,
    category: 'architecture',
  },
  {
    id: '10',
    title: 'Wildlife Moment',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37daa?w=800&h=700&fit=crop',
    width: 800,
    height: 700,
    category: 'nature',
  },
  {
    id: '11',
    title: 'Peak View',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=800&fit=crop',
    width: 1000,
    height: 800,
    category: 'landscape',
  },
  {
    id: '12',
    title: 'Urban Pattern',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=900&fit=crop',
    width: 600,
    height: 900,
    category: 'architecture',
  },
]
