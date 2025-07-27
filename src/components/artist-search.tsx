"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"
import Image from "next/image"

interface Artwork {
  id: string
  title: string
  description: string
  image: string
  price: number
  artist: string
}

interface ArtistSearchProps {
  artworks: Artwork[]
}

export function ArtistSearch({ artworks }: ArtistSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  // Get unique artists
  const artists = useMemo(() => {
    const uniqueArtists = [...new Set(artworks.map(art => art.artist))]
    return uniqueArtists.sort()
  }, [artworks])

  // Filter artworks by selected artist
  const filteredArtworks = useMemo(() => {
    if (!selectedArtist) return artworks
    return artworks.filter(art => art.artist === selectedArtist)
  }, [artworks, selectedArtist])

  // Filter artists by search term
  const filteredArtists = useMemo(() => {
    if (!searchTerm) return artists
    return artists.filter(artist => 
      artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [artists, searchTerm])

  const handleArtistSelect = (artist: string) => {
    setSelectedArtist(artist === selectedArtist ? null : artist)
  }

  const clearSelection = () => {
    setSelectedArtist(null)
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Artist Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Artists</h3>
          {selectedArtist && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              className="text-xs"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredArtists.map((artist) => (
            <Button
              key={artist}
              variant={selectedArtist === artist ? "default" : "outline"}
              onClick={() => handleArtistSelect(artist)}
              className="justify-start h-auto p-3"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm truncate">{artist}</span>
            </Button>
          ))}
        </div>

        {filteredArtists.length === 0 && searchTerm && (
          <p className="text-center text-slate-500 py-4">
            No artists found matching &quot;{searchTerm}&quot;
          </p>
        )}
      </div>

      {/* Selected Artist's Artworks */}
      {selectedArtist && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Art by {selectedArtist}
            </h3>
            <Badge variant="secondary">
              {filteredArtworks.length} piece{filteredArtworks.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArtworks.map((artwork) => (
              <Card key={artwork.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center overflow-hidden">
                  <Image 
                    src={artwork.image} 
                    alt={artwork.title} 
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">{artwork.title}</h4>
                    <Badge variant="outline" className="text-xs">{artwork.artist}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{artwork.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">${artwork.price.toLocaleString()}</span>
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        // Base Pay integration would go here
                        console.log(`Base Pay purchase for ${artwork.title}`)
                      }}
                    >
                      Buy on Base
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Selection State */}
      {!selectedArtist && (
        <div className="text-center py-12">
          <User className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Select an Artist</h3>
          <p className="text-slate-600">Choose an artist from the list above to see their artwork</p>
        </div>
      )}
    </div>
  )
} 