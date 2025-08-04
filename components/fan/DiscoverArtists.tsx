'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getUnsubscribedArtists } from '@/lib/mockData'
import { formatCurrency, formatNumber } from '@/lib/utils'
import Image from 'next/image'

export function DiscoverArtists() {
  const [availableArtists, setAvailableArtists] = useState(getUnsubscribedArtists())
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [subscribedArtists, setSubscribedArtists] = useState<Set<string>>(new Set())

  const handleSubscribe = async (artistId: string) => {
    setIsLoading(artistId)
    
    // Simulate Stripe checkout and subscription process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mark as subscribed
    setSubscribedArtists(prev => new Set(Array.from(prev).concat(artistId)))
    setIsLoading(null)
    
    // Remove from available artists after successful subscription
    setTimeout(() => {
      setAvailableArtists(prev => prev.filter(artist => artist.id !== artistId))
    }, 1500)
  }

  const getButtonText = (artist: any) => {
    if (isLoading === artist.id) {
      return 'Processing Payment...'
    }
    if (subscribedArtists.has(artist.id)) {
      return 'Subscribed! Removing...'
    }
    return `Subscribe ${formatCurrency(artist.subscriptionPrice)}/mo`
  }

  const getButtonVariant = (artist: any) => {
    if (subscribedArtists.has(artist.id)) {
      return 'secondary' as const
    }
    return undefined // Default lime green
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Discover Artists</h2>
        <p className="mt-2 text-gray-300">Find amazing creators and support their work through exclusive subscriptions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableArtists.map((artist) => (
          <Card 
            key={artist.id} 
            className={`overflow-hidden transition-all ${
              subscribedArtists.has(artist.id)
                ? 'border-green-400 bg-green-900/20'
                : isLoading === artist.id
                ? 'border-[#CBED6E] bg-[#CBED6E]/10'
                : ''
            }`}
          >
            {/* Banner Image */}
            <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500">
              <Image
                src={artist.bannerUrl}
                alt={`${artist.displayName} banner`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            <CardHeader className="relative pb-4">
              {/* Artist Avatar */}
              <div className="absolute -top-8 left-6">
                <Avatar className="w-16 h-16 border-4 border-white">
                  <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
                  <AvatarFallback className="text-lg">{artist.displayName[0]}</AvatarFallback>
                </Avatar>
              </div>

              <div className="pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-white">{artist.displayName}</span>
                      {subscribedArtists.has(artist.id) && (
                        <span className="text-black text-xs bg-green-400 px-2 py-1 rounded font-medium">✓ SUBSCRIBED</span>
                      )}
                      {artist.isVerified && !subscribedArtists.has(artist.id) && (
                        <span className="text-black text-xs bg-[#CBED6E] px-2 py-1 rounded font-medium">{artist.cause}</span>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-400">@{artist.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#CBED6E]">
                      {formatCurrency(artist.subscriptionPrice)}/month
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Artist Info */}
              <div className="space-y-2">
                <p className="text-sm text-gray-300 line-clamp-3">{artist.story}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Location: {artist.location}</span>
                  <span>Cause: {artist.cause}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between py-2 border-t border-gray-600">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#CBED6E]">{formatNumber(artist.subscriberCount)}</p>
                  <p className="text-xs text-gray-400">Subscribers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#CBED6E]">★</p>
                  <p className="text-xs text-gray-400">Verified</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#CBED6E]">♪</p>
                  <p className="text-xs text-gray-400">Music</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleSubscribe(artist.id)}
                  disabled={isLoading === artist.id || subscribedArtists.has(artist.id)}
                  variant={getButtonVariant(artist)}
                  className="flex-1"
                >
                  {getButtonText(artist)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {availableArtists.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-300 font-bold">ALL</span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">All caught up!</h3>
          <p className="mt-2 text-gray-400">You're subscribed to all available artists. Check back later for new creators!</p>
        </div>
      )}
    </div>
  )
} 