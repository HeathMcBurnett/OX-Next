'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UserData } from './OnboardingFlow'
import { artists } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

interface ArtistDiscoveryProps {
  onContinue: (data: Partial<UserData>) => void
  onBack: () => void
  userData: UserData
}

export function ArtistDiscovery({ onContinue, userData }: ArtistDiscoveryProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [subscribedArtists, setSubscribedArtists] = useState<Set<string>>(new Set())

  const handleSubscribeToArtist = async (artist: any) => {
    setIsLoading(artist.id)
    
    // Simulate Stripe checkout and subscription process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mark as subscribed
    setSubscribedArtists(prev => new Set(Array.from(prev).concat(artist.id)))
    setIsLoading(null)
    
    // Show success message and proceed to completion
    setTimeout(() => {
      onContinue({ selectedArtist: artist })
    }, 1000)
  }

  const getButtonText = (artist: any) => {
    if (isLoading === artist.id) {
      return 'Processing Payment...'
    }
    if (subscribedArtists.has(artist.id)) {
      return 'Subscribed! Redirecting...'
    }
    return `Subscribe for ${formatCurrency(artist.subscriptionPrice)}/month`
  }

  const getButtonVariant = (artist: any) => {
    if (subscribedArtists.has(artist.id)) {
      return 'secondary' as const // This will show a different style for subscribed state
    }
    return undefined // Default lime green
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-black border-gray-700">
        <CardHeader>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="OXGN"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
            <CardTitle className="text-xl text-white">Discover Amazing Artists</CardTitle>
            <p className="text-gray-300 mt-2">
              Choose an artist to support and get exclusive access to their content
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Artist Grid */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Choose your first artist to support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  className={`relative p-4 border-2 rounded-lg transition-all ${
                    subscribedArtists.has(artist.id)
                      ? 'border-green-400 bg-green-900/20'
                      : isLoading === artist.id
                      ? 'border-[#CBED6E] bg-[#CBED6E]/10'
                      : 'border-gray-700 bg-black hover:border-gray-600'
                  }`}
                >
                  {/* Artist Banner */}
                  <div className="relative h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={artist.bannerUrl}
                      alt={`${artist.displayName} banner`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  </div>

                  {/* Artist Info */}
                  <div className="flex items-start space-x-3 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-white">
                      <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
                      <AvatarFallback>{artist.displayName[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{artist.displayName}</h4>
                        {subscribedArtists.has(artist.id) && (
                          <span className="text-black text-xs bg-green-400 px-2 py-1 rounded font-medium">✓ SUBSCRIBED</span>
                        )}
                        {artist.isVerified && !subscribedArtists.has(artist.id) && (
                          <span className="text-black text-xs bg-[#CBED6E] px-2 py-1 rounded font-medium">{artist.cause}</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-400">@{artist.username}</p>
                      
                      <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                        {artist.story}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400">
                          {artist.subscriberCount.toLocaleString()} subscribers
                        </span>
                        <span className="font-semibold text-green-400">
                          {formatCurrency(artist.subscriptionPrice)}/month
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <Button
                    onClick={() => handleSubscribeToArtist(artist)}
                    disabled={isLoading === artist.id || subscribedArtists.has(artist.id)}
                    variant={getButtonVariant(artist)}
                    className="w-full"
                  >
                    {getButtonText(artist)}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-black p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium text-white mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Exclusive content not available anywhere else</li>
              <li>• Direct messages from the artist</li>
              <li>• Early access to new releases</li>
              <li>• Behind-the-scenes content and updates</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 