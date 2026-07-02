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
    title: 'Morning Mist',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    width: 800,
    height: 1200,
    category: 'landscape',
  },
  {
    id: '2',
    title: 'Old Alley',
    location: 'Kathmandu',
    url: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
    width: 900,
    height: 700,
    category: 'architecture',
  },
  {
    id: '3',
    title: 'Forest Walk',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    width: 800,
    height: 1200,
    category: 'nature',
  },
  {
    id: '4',
    title: 'Quiet Window',
    location: 'Bhaktapur',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    width: 900,
    height: 600,
    category: 'architecture',
  },
  {
    id: '5',
    title: 'Cloud Line',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    width: 1200,
    height: 900,
    category: 'landscape',
  },
  {
    id: '7',
    title: 'River Stones',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    width: 800,
    height: 1000,
    category: 'nature',
  },
  {
    id: '8',
    title: 'Evening Peak',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    width: 1200,
    height: 800,
    category: 'landscape',
  },
  {
    id: '9',
    title: 'Concrete Shapes',
    location: 'Kathmandu',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    width: 900,
    height: 700,
    category: 'architecture',
  },
  {
    id: '10',
    title: 'Wild Grass',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    width: 800,
    height: 1100,
    category: 'nature',
  },
  {
    id: '11',
    title: 'Mountain Light',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1464823063530-08f10ed1a2dd',
    width: 1200,
    height: 900,
    category: 'landscape',
  },
  {
    id: '12',
    title: 'Crosswalk',
    location: 'Lalitpur',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    width: 900,
    height: 1200,
    category: 'architecture',
  },
  {
    id: '13',
    title: 'Fern Leaves',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    width: 800,
    height: 1200,
    category: 'nature',
  },
  {
    id: '15',
    title: 'Golden Hour',
    location: 'Nepal',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    width: 1200,
    height: 800,
    category: 'landscape',
  },
]