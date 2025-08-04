'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { posts, artists } from '@/lib/mockData'
import { formatRelativeTime, formatCurrency } from '@/lib/utils'
import { ShareModal } from '@/components/ui/share-modal'
import Image from 'next/image'

interface ArtistProfileProps {
  artistId: string
  onBack: () => void
}

export function ArtistProfile({ artistId, onBack }: ArtistProfileProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [newComments, setNewComments] = useState<Record<string, string>>({})
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [sharingPost, setSharingPost] = useState<any>(null)
  
  const artist = artists.find(a => a.id === artistId)
  const artistPosts = posts.filter(p => p.artistId === artistId)

  if (!artist) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">Artist not found</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    )
  }

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleCommentChange = (postId: string, value: string) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }))
  }

  const handleCommentSubmit = (postId: string) => {
    const commentText = newComments[postId]?.trim()
    if (!commentText) return

    // Here you would typically send the comment to your backend
    console.log('New comment for post', postId, ':', commentText)
    
    // Clear the comment input
    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }))

    // You could also update a local comments state here if you want to show the comment immediately
  }

  const handleShare = (post: any) => {
    setSharingPost(post)
    setShareModalOpen(true)
  }

  const handleCloseShareModal = () => {
    setShareModalOpen(false)
    setSharingPost(null)
  }

  const renderMediaContent = (post: any) => {
    if (post.contentType === 'image' && post.mediaUrls.length > 0) {
      return (
        <div className="mt-3 rounded-lg overflow-hidden">
          <Image
            src={post.mediaUrls[0]}
            alt="Post content"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      )
    }

    if (post.contentType === 'video' && post.mediaUrls.length > 0) {
      return (
        <div className="mt-3 bg-gray-800 rounded-lg p-8 text-center border border-gray-600">
          <div className="text-4xl font-bold text-gray-300 mb-2">▶</div>
          <p className="mt-2 text-sm text-gray-400">Video Content</p>
          <p className="text-xs text-gray-500">{post.mediaUrls[0]}</p>
        </div>
      )
    }

    if (post.contentType === 'audio' && post.mediaUrls.length > 0) {
      return (
        <div className="mt-3 bg-gray-800 rounded-lg p-6 text-center border border-gray-600">
          <div className="text-3xl font-bold text-gray-300 mb-2">♪</div>
          <p className="mt-2 text-sm text-gray-400">Audio Content</p>
          <p className="text-xs text-gray-500">{post.mediaUrls[0]}</p>
          <div className="mt-3 flex items-center justify-center space-x-4">
            <button className="text-[#CBED6E] hover:text-green-400">▶ Play</button>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        onClick={onBack}
        variant="outline"
      >
        ← Back to Feed
      </Button>

      {/* Artist Profile Header */}
      <Card className="overflow-hidden">
        {/* Banner Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
          <Image
            src={artist.bannerUrl}
            alt={`${artist.displayName} banner`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        <CardContent className="relative pb-6">
          {/* Artist Avatar */}
          <div className="absolute -top-16 left-6">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
              <AvatarFallback className="text-2xl">{artist.displayName[0]}</AvatarFallback>
            </Avatar>
          </div>

          <div className="pt-20">
            {/* Artist Info */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{artist.displayName}</h1>
                  {artist.isVerified && (
                    <span className="text-black text-sm bg-[#CBED6E] px-3 py-1 rounded-full font-medium">{artist.cause}</span>
                  )}
                </div>
                <p className="text-gray-400 text-lg mb-3">@{artist.username}</p>
                
                {/* Stats */}
                <div className="flex items-center space-x-6 mb-4">
                  <div>
                    <span className="font-bold text-white">{artist.subscriberCount.toLocaleString()}</span>
                    <span className="text-gray-400 ml-1">subscribers</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{artistPosts.length}</span>
                    <span className="text-gray-400 ml-1">posts</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-[#CBED6E] border border-[#CBED6E]">
                  Subscribed
                </span>
              </div>
            </div>

            {/* Story */}
            <div className="mt-6">
              <h3 className="font-semibold text-white mb-2">About</h3>
              <p className="text-gray-300 leading-relaxed">{artist.story}</p>
            </div>

            {/* Location and Cause */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
              <div className="flex items-center space-x-6">
                <span className="text-sm text-gray-400">
                  <span className="font-medium">Location:</span> {artist.location}
                </span>
                <span className="text-sm text-gray-400">
                  <span className="font-medium">Supporting:</span> {artist.cause}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Posts from {artist.displayName}
        </h2>
        
        {artistPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-300 font-bold">POST</span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">No posts yet</h3>
            <p className="mt-2 text-gray-400">This artist hasn't shared any content yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {artistPosts.map((post) => (
              <Card key={post.id} className="w-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.artistAvatar} alt={post.artistName} />
                        <AvatarFallback>{post.artistName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white">{post.artistName}</h3>
                          <span className="text-black text-sm bg-[#CBED6E] px-2 py-1 rounded font-medium">VERIFIED</span>
                        </div>
                        <p className="text-sm text-gray-400">@{post.artistUsername}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-white">{post.title}</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
                    
                    {renderMediaContent(post)}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            likedPosts.has(post.id) || post.isLiked
                              ? 'text-red-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <span className="text-sm font-medium">{likedPosts.has(post.id) || post.isLiked ? '♥' : '♡'}</span>
                          <span className="text-sm font-medium">{post.likesCount}</span>
                        </button>

                        <button 
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-[#CBED6E] transition-colors"
                        >
                          <span className="text-sm font-medium">Comments</span>
                          <span className="text-sm font-medium">{post.commentsCount}</span>
                        </button>

                        <button 
                          onClick={() => handleShare(post)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-[#CBED6E] transition-colors"
                        >
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-gray-700 text-gray-200">
                          {post.contentType === 'text' ? 'T' : 
                           post.contentType === 'image' ? '◉' :
                           post.contentType === 'video' ? '▶' :
                           post.contentType === 'audio' ? '♪' : 'P'}
                        </span>
                      </div>
                    </div>

                    {/* Comment Form */}
                    {expandedComments.has(post.id) && (
                      <div className="mt-4 pt-4 border-t border-gray-600">
                        <div className="space-y-3">
                          <h5 className="font-medium text-white">Add a comment</h5>
                          <div className="flex space-x-3">
                            <div className="flex-1">
                              <textarea
                                value={newComments[post.id] || ''}
                                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                placeholder="Write your comment..."
                                className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent resize-none"
                                rows={3}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              onClick={() => toggleComments(post.id)}
                              variant="outline"
                              className="text-sm"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={!newComments[post.id]?.trim()}
                              className="text-sm"
                            >
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {sharingPost && artist && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={handleCloseShareModal}
          post={sharingPost}
          artist={artist}
        />
      )}
    </div>
  )
} 