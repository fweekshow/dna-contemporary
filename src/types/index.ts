export interface Artist {
  id: string
  name: string
  avatar: string
  bio: string
  specialty: string
  followers: number
  recentWorks: string[]
}

export interface Artwork {
  id: string
  title: string
  description: string
  image: string
  additionalImages?: string[]
  price: string
  medium: string
  dimensions: string
  year: string
  edition: string
  artist: Artist
}
