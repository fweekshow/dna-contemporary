"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Store, Bell, Users } from "lucide-react"
import Image from "next/image"
import { 
  useMiniKit, 
  usePrimaryButton, 
  useNotification 
} from '@coinbase/onchainkit/minikit'
import { Wallet } from '@coinbase/onchainkit/wallet'
import { SwipeGallery } from '@/components/swipe-gallery'
import { ArtistSearch } from '@/components/artist-search'


export default function DNAContemporary() {
  const [activeTab, setActiveTab] = useState("browse")
  const [isMobile, setIsMobile] = useState(false)
  const [likedArtworks, setLikedArtworks] = useState<Array<{
    id: string
    title: string
    description: string
    image: string
    price: number
    artist: string
  }>>([])
  const [uploadedArtworks, setUploadedArtworks] = useState<Array<{
    id: string
    title: string
    description: string
    image: string
    price: number
    artist: string
  }>>([])

  // Debug: Log when uploadedArtworks changes (only count, not full data)
  console.log('Current uploadedArtworks count:', uploadedArtworks.length)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [notificationSent, setNotificationSent] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // MiniKit hooks
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const sendNotification = useNotification()

  // Set frame ready when component mounts
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load uploaded artworks from localStorage on component mount
  useEffect(() => {
    const savedArtworks = localStorage.getItem('dna-contemporary-artworks')
    if (savedArtworks) {
      try {
        const parsed = JSON.parse(savedArtworks)
        // Add placeholder images for loaded artworks since we don't store image data
        const artworksWithPlaceholders = parsed.map((art: { id: string; title: string; description: string; price: number; artist: string }) => ({
          ...art,
          image: '/placeholder.svg' // Use placeholder since we can't store image data
        }))
        setUploadedArtworks(artworksWithPlaceholders)
        console.log('Loaded artworks from localStorage:', artworksWithPlaceholders)
      } catch (error) {
        console.error('Error loading artworks from localStorage:', error)
      }
    }
  }, [])

  // Save uploaded artworks to localStorage whenever they change
  useEffect(() => {
    if (uploadedArtworks.length > 0) {
      try {
        // Remove image data from localStorage to avoid quota issues
        const artworksForStorage = uploadedArtworks.map(art => ({
          id: art.id,
          title: art.title,
          description: art.description,
          price: art.price,
          artist: art.artist
          // Don't store image data in localStorage
        }))
        localStorage.setItem('dna-contemporary-artworks', JSON.stringify(artworksForStorage))
        console.log('Saved artworks metadata to localStorage:', artworksForStorage)
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [uploadedArtworks])

  // Primary button for browsing
  usePrimaryButton(
    { text: 'BROWSE ART' },
    () => {
      setActiveTab("browse")
    }
  )

  // Handle send notification
  const handleSendNotification = async () => {
    try {
      await sendNotification({
        title: 'New Art Available! 🎨',
        body: 'Check out the latest pieces in DNA Contemporary'
      })
      setNotificationSent(true)
      setTimeout(() => setNotificationSent(false), 3000)
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }

  // Handle swipe actions
  const handleLike = (artwork: { id: string; title: string; description: string; image: string; price: number; artist: string }) => {
    setLikedArtworks(prev => [...prev, artwork])
    console.log('Liked:', artwork.title)
  }

  const handlePass = (artwork: { id: string; title: string; description: string; image: string; price: number; artist: string }) => {
    console.log('Passed:', artwork.title)
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log('File selected:', file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        console.log('Image loaded, creating artwork entry')
        setSelectedImage(imageUrl)
        // Store the uploaded image temporarily
        setUploadedArtworks(prev => [...prev, {
          id: Date.now().toString(),
          title: "New Artwork",
          description: "Uploaded artwork",
          image: imageUrl,
          price: 1000,
          artist: "Artist"
        }])
        console.log('Artwork added to state')
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleUploadSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const artist = formData.get('artist') as string

    console.log('Form data:', { title, description, price, artist })
    console.log('Current uploadedArtworks before update:', uploadedArtworks)

    // Update the latest uploaded artwork with form data
    if (uploadedArtworks.length > 0) {
      const latestArtwork = uploadedArtworks[uploadedArtworks.length - 1]
      console.log('Updating artwork:', latestArtwork.id)
      setUploadedArtworks(prev => {
        const updated = prev.map(art => 
          art.id === latestArtwork.id 
            ? { ...art, title, description, price, artist }
            : art
        )
        console.log('Updated artworks:', updated)
        return updated
      })
    } else {
      console.log('No uploaded artworks found - creating new one')
      // If no artwork exists, create a new one with the form data
      const newArtwork = {
        id: Date.now().toString(),
        title,
        description,
        image: selectedImage || '/placeholder.svg',
        price,
        artist
      }
      setUploadedArtworks(prev => {
        const updated = [...prev, newArtwork]
        console.log('Created new artwork:', updated)
        return updated
      })
    }

    // Switch back to browse tab to see the uploaded artwork
    setActiveTab("browse")
    setUploadSuccess(true)
    setSelectedImage(null)
    console.log('Switched to browse tab')
    
    // Reset success message after 3 seconds
    setTimeout(() => setUploadSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-slate-900">DNA Contemporary</h1>
            <Badge variant="secondary" className="text-xs">Art Marketplace</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Wallet Component */}
            <Wallet />
            
            {context?.client.added && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSendNotification}
                disabled={notificationSent}
                className="text-xs"
              >
                <Bell className="w-3 h-3 mr-1" />
                {notificationSent ? 'Sent!' : 'Notify'}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Browse Art</span>
            </TabsTrigger>
            <TabsTrigger value="artists" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Artists</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Art</span>
            </TabsTrigger>
          </TabsList>

          {/* Browse Art Tab */}
          <TabsContent value="browse" className="space-y-6">
            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 text-sm">✓ Artwork uploaded successfully! Your piece is now available for purchase.</p>
              </div>
            )}
            
            {/* Mobile Swipe Interface */}
            {isMobile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900">Swipe Art</h2>
                  <Badge variant="secondary" className="text-xs">
                    {likedArtworks.length} liked
                  </Badge>
                </div>
                
                <SwipeGallery 
                  artworks={[
                    {
                      id: "featured-1",
                      title: "Life After Death",
                      description: 'A striking contemporary piece featuring a neon green skull with crossed spoon and syringe, exploring themes of addiction, mortality, and the fragility of life.',
                      image: "/LifeAfterDeath.png",
                      price: 2850,
                      artist: "Contemporary Artist"
                    },
                    ...uploadedArtworks,
                    // Add sample artworks for swiping
                    ...Array.from({ length: 7 }, (_, i) => ({
                      id: `sample-${i + 1}`,
                      title: `Artwork #${i + 2}`,
                      description: "Contemporary artwork with unique style and expression",
                      image: "/placeholder.svg",
                      price: 1250,
                      artist: "Artist"
                    }))
                  ]}
                  onLike={handleLike}
                  onPass={handlePass}
                />
              </div>
            ) : (
              // Desktop Grid Layout
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900">Discover Art</h2>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search art..." className="w-64" />
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Featured Artwork */}
              <Card className="group hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-900 to-green-900 rounded-t-lg flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/LifeAfterDeath.png" 
                    alt="Life After Death - Neon Green Skull Artwork" 
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">Life After Death</h3>
                    <Badge variant="outline" className="text-xs">Contemporary</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">A striking contemporary piece featuring a neon green skull with crossed spoon and syringe, exploring themes of addiction, mortality, and the fragility of life.</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">$2,850.00</span>
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        // Base Pay integration would go here
                        console.log('Base Pay purchase for Life After Death')
                      }}
                    >
                      Buy on Base
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Uploaded Artworks */}
              {uploadedArtworks.map((artwork) => (
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
                      <h3 className="font-semibold text-slate-900">{artwork.title}</h3>
                      <Badge variant="outline" className="text-xs">{artwork.artist}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{artwork.description}</p>
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

              {/* Sample Art Cards */}
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <Card key={item} className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                    <span className="text-slate-500">Art Preview</span>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">Artwork #{item + 1}</h3>
                      <Badge variant="outline" className="text-xs">Artist</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Contemporary artwork with unique style and expression</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">$1,250</span>
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // Base Pay integration would go here
                          console.log(`Base Pay purchase for Artwork #${item + 1}`)
                        }}
                      >
                        Buy on Base
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
              </>
            )}
          </TabsContent>

          {/* Artists Tab */}
          <TabsContent value="artists" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Search by Artist</h2>
              
              <ArtistSearch 
                artworks={[
                  {
                    id: "featured-1",
                    title: "Life After Death",
                    description: 'A striking contemporary piece featuring a neon green skull with crossed spoon and syringe, exploring themes of addiction, mortality, and the fragility of life.',
                    image: "/LifeAfterDeath.png",
                    price: 2850,
                    artist: "Contemporary Artist"
                  },
                  ...uploadedArtworks,
                  // Add sample artworks
                  ...Array.from({ length: 7 }, (_, i) => ({
                    id: `sample-${i + 1}`,
                    title: `Artwork #${i + 2}`,
                    description: "Contemporary artwork with unique style and expression",
                    image: "/placeholder.svg",
                    price: 1250,
                    artist: "Artist"
                  }))
                ]}
              />
            </div>
          </TabsContent>

          {/* Upload Art Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Upload Your Art</h2>
              
              <form onSubmit={handleUploadSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Artwork Details</CardTitle>
                    <CardDescription>Share your artwork with the DNA Contemporary community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Artwork Title</Label>
                      <Input id="title" name="title" placeholder="Enter artwork title" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist Name</Label>
                      <Input id="artist" name="artist" placeholder="Your name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" placeholder="Describe your artwork..." rows={3} required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD)</Label>
                      <Input id="price" name="price" type="number" placeholder="0.00" min="0" step="0.01" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Upload Image</Label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          required
                        />
                        <label htmlFor="image" className="cursor-pointer">
                          {selectedImage ? (
                            <div className="space-y-2">
                              <img 
                                src={selectedImage} 
                                alt="Preview" 
                                className="w-32 h-32 mx-auto object-cover rounded-lg"
                              />
                              <p className="text-sm text-green-600">✓ Image uploaded successfully!</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                              <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">Upload Artwork</Button>
                  </CardContent>
                </Card>
              </form>
            </div>
          </TabsContent>


        </Tabs>
      </main>


    </div>
  )
}
