"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockArtists } from "@/data/mock-data"

interface TrendingArtistsProps {
  searchQuery: string
}

export default function TrendingArtists({ searchQuery }: TrendingArtistsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const filteredArtists = mockArtists.filter((artist) => artist.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" })

      setTimeout(() => {
        if (scrollRef.current) {
          setCanScrollLeft(scrollRef.current.scrollLeft > 0)
          setCanScrollRight(
            scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
          )
        }
      }, 300)
    }
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Artists</h2>
            <p className="text-muted-foreground">Discover the most popular creators this week</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} disabled={!canScrollLeft}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} disabled={!canScrollRight}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="flex-shrink-0 w-72 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={artist.avatar || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">{artist.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {artist.followers.toLocaleString()} followers
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 dark:from-purple-900 dark:to-blue-900 dark:text-purple-300"
                  >
                    Trending
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {artist.recentWorks.slice(0, 3).map((work, index) => (
                    <img
                      key={index}
                      src={work || "/placeholder.svg"}
                      alt={`Recent work ${index + 1}`}
                      className="w-full h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
