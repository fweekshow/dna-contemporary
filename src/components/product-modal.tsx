"use client"

import { useState } from "react"
import { X, Heart, Share2, Truck, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Artwork } from "@/types"

interface ProductModalProps {
  artwork: Artwork
  onClose: () => void
}

export default function ProductModal({ artwork, onClose }: ProductModalProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Artwork Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div
              className={`relative overflow-hidden rounded-lg cursor-zoom-in ${isZoomed ? "cursor-zoom-out" : ""}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                className={`w-full transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium">
                  Includes NFT
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              {artwork.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`Additional view ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Artist Info */}
            <div className="flex items-center gap-4">
              <img
                src={artwork.artist.avatar || "/placeholder.svg"}
                alt={artwork.artist.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{artwork.artist.name}</h3>
                <p className="text-sm text-muted-foreground">{artwork.artist.bio}</p>
              </div>
            </div>

            <Separator />

            {/* Artwork Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
              <p className="text-muted-foreground mb-4">{artwork.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Medium:</span>
                  <p className="font-medium">{artwork.medium}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dimensions:</span>
                  <p className="font-medium">{artwork.dimensions}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <p className="font-medium">{artwork.year}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Edition:</span>
                  <p className="font-medium">{artwork.edition}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* NFT Details */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">NFT Certificate Included</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  This artwork comes with an exclusive NFT that will be minted upon purchase, providing proof of
                  authenticity and ownership rights.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>• Blockchain: Ethereum</span>
                  <span>• Standard: ERC-721</span>
                  <span>• Royalties: 10%</span>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">Artwork Price:</span>
                <span className="text-2xl font-bold text-purple-600">${artwork.price} USDC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping:</span>
                <span>$25.00 USDC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">NFT Minting:</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-purple-600">${(Number.parseFloat(artwork.price) + 25).toFixed(2)} USDC</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6">
                Buy with Base Pay
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Heart className="h-4 w-4" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Shipping Information</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Free shipping on orders over $500</p>
                  <p>• Insured and tracked delivery</p>
                  <p>• 5-7 business days worldwide</p>
                  <p>• Professional art packaging</p>
                </div>
              </CardContent>
            </Card>

            {/* Authenticity */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Authenticity Guarantee</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All artworks are verified by our expert team and come with a certificate of authenticity. Your NFT
                  provides permanent proof of ownership and provenance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
