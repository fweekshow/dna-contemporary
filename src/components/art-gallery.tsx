"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import { mockArtworks } from "@/data/mock-data"
import type { Artwork } from "@/types"

interface ArtGalleryProps {
  onArtworkClick: (artwork: Artwork) => void
}

export default function ArtGallery({ onArtworkClick }: ArtGalleryProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Artworks</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each piece is carefully curated and comes with an exclusive NFT certificate, ensuring authenticity and
            ownership rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockArtworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => onArtworkClick(artwork)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium">
                    Includes NFT
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={artwork.artist.avatar || "/placeholder.svg"}
                    alt={artwork.artist.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">{artwork.artist.name}</span>
                </div>

                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{artwork.medium}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-purple-600">${artwork.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">USDC</span>
                  </div>
                  <Button
                    size="sm"
                    className="gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
