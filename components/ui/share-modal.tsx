'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    id: string
    title: string
    content: string
    artistId: string
    artistName: string
    artistUsername: string
    artistAvatar: string
    contentType: string
    mediaUrls: string[]
  }
  artist: {
    id: string
    displayName: string
    username: string
    avatarUrl: string
    bannerUrl: string
    cause: string
    subscriptionPrice: number
  }
}

export function ShareModal({ isOpen, onClose, post, artist }: ShareModalProps) {
  if (!isOpen) return null

  const handleCopyLink = () => {
    const shareText = `Check out this post from ${artist.displayName} on OXGN! Subscribe to see exclusive content.`
    navigator.clipboard.writeText(shareText)
  }

  const handleSubscribeClick = () => {
    // This would typically navigate to the subscription flow
    console.log('Navigate to subscribe to:', artist.id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-black border-gray-700">
        <CardContent className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Preview Content with Blur */}
          <div className="relative mb-6">
            {/* Blurred Background */}
            <div className="relative overflow-hidden rounded-lg">
              {post.mediaUrls.length > 0 && post.contentType === 'image' ? (
                <Image
                  src={post.mediaUrls[0]}
                  alt="Post preview"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover blur-sm"
                />
              ) : (
                <div className="w-full h-48 bg-gray-800 blur-sm flex items-center justify-center">
                  <span className="text-gray-400 text-lg font-bold">
                    {post.contentType.toUpperCase()}
                  </span>
                </div>
              )}
              
                             {/* Overlay */}
               <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                 <div className="text-center">
                   <Image 
                     src="/logo.png" 
                     alt="OXGN" 
                     width={120} 
                     height={40} 
                     className="h-10 w-auto mx-auto mb-3" 
                     priority 
                   />
                   <p className="text-white font-medium text-sm">View on OXGN</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Artist Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
              <AvatarFallback>{artist.displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">{artist.displayName}</h3>
              <p className="text-sm text-gray-400">@{artist.username}</p>
              <span className="text-xs bg-[#CBED6E] text-black px-2 py-1 rounded font-medium">
                {artist.cause}
              </span>
            </div>
          </div>

          {/* Post Title */}
          <div className="mb-6">
            <h4 className="font-medium text-white mb-2">{post.title}</h4>
            <p className="text-sm text-gray-300 line-clamp-2">{post.content}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSubscribeClick}
              className="w-full"
            >
              Subscribe to {artist.displayName} - ${artist.subscriptionPrice}/month
            </Button>
            
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="w-full"
            >
              Copy Share Link
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 