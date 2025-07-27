"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Search } from "lucide-react"
import Image from "next/image"

interface Artwork {
  id: string
  title: string
  description: string
  image: string
  price: number
  artist: string
}

interface SwipeGalleryProps {
  artworks: Artwork[]
  onLike: (artwork: Artwork) => void
  onPass: (artwork: Artwork) => void
}

export function SwipeGallery({ artworks, onLike, onPass }: SwipeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentArtwork = artworks[currentIndex]

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setCurrentX(e.touches[0].clientX - startX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const threshold = 100
    if (currentX > threshold) {
      // Swipe right - like
      onLike(currentArtwork)
      nextCard()
    } else if (currentX < -threshold) {
      // Swipe left - pass
      onPass(currentArtwork)
      nextCard()
    }
    
    setCurrentX(0)
  }

  const nextCard = () => {
    if (currentIndex < artworks.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleLike = () => {
    onLike(currentArtwork)
    nextCard()
  }

  const handlePass = () => {
    onPass(currentArtwork)
    nextCard()
  }

  if (!currentArtwork) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No more art to swipe!</h3>
          <p className="text-slate-600">Check back later for new pieces</p>
        </div>
      </div>
    )
  }

  const transform = isDragging ? `translateX(${currentX}px) rotate(${currentX * 0.1}deg)` : ''

  return (
    <div className="relative h-96 max-w-sm mx-auto">
      <div
        ref={cardRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ transform }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Card className="h-full overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-purple-900 to-green-900 relative">
            <Image 
              src={currentArtwork.image} 
              alt={currentArtwork.title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold mb-1">{currentArtwork.title}</h3>
              <p className="text-sm opacity-90 mb-2">{currentArtwork.artist}</p>
              <p className="text-sm opacity-75 mb-3">{currentArtwork.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${currentArtwork.price.toLocaleString()}</span>
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  Contemporary
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePass}
          className="w-12 h-12 rounded-full bg-white shadow-lg border-red-200 hover:bg-red-50"
        >
          <X className="w-6 h-6 text-red-500" />
        </Button>
        
        <Button
          size="lg"
          onClick={handleLike}
          className="w-12 h-12 rounded-full bg-white shadow-lg border-green-200 hover:bg-green-50"
        >
          <Heart className="w-6 h-6 text-green-500 fill-current" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          {artworks.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 