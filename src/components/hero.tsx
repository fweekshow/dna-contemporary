"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-blue-400 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-indigo-400 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Premium Art Marketplace
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Discover Unique Art + NFTs
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore a curated collection of premium artworks from talented artists worldwide. Each piece comes with an
            exclusive NFT certificate of authenticity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              Learn About NFTs
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
