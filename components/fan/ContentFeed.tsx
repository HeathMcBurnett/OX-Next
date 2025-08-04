'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getSubscribedPosts, getSubscribedArtists, artists } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'
import { ArtistProfile } from './ArtistProfile'
import { ShareModal } from '@/components/ui/share-modal'
import Image from 'next/image'

export function ContentFeed() {
  const [allPosts] = useState(getSubscribedPosts())
  const [subscribedArtists] = useState(getSubscribedArtists())
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)
  const [viewingProfile, setViewingProfile] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [newComments, setNewComments] = useState<Record<string, string>>({})
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [sharingPost, setSharingPost] = useState<any>(null)

  // If viewing an artist profile, show that instead
  if (viewingProfile) {
    return (
      <ArtistProfile 
        artistId={viewingProfile} 
        onBack={() => setViewingProfile(null)} 
      />
    )
  }

  // Filter posts based on selected artist
  const filteredPosts = selectedArtist 
    ? allPosts.filter(post => post.artistId === selectedArtist)
    : allPosts

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

  const handleArtistClick = (artistId: string) => {
    setViewingProfile(artistId)
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
        <div className="mt-3 bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-4xl font-bold text-gray-300 mb-2">▶</div>
          <p className="mt-2 text-sm text-gray-400">Video Content</p>
          <p className="text-xs text-gray-500">{post.mediaUrls[0]}</p>
        </div>
      )
    }

    if (post.contentType === 'audio' && post.mediaUrls.length > 0) {
      return (
        <div className="mt-3 bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-gray-300 mb-2">♪</div>
          <p className="mt-2 text-sm text-gray-400">Audio Content</p>
          <p className="text-xs text-gray-500">{post.mediaUrls[0]}</p>
          <div className="mt-3 flex items-center justify-center space-x-4">
            <button className="text-[#CBED6E] hover:text-[#B5E25A]">▶ Play</button>
          </div>
        </div>
      )
    }

    return null
  }

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl text-gray-300 font-bold">⟋</span>
        </div>
        <h3 className="mt-4 text-lg font-medium text-white">No posts yet</h3>
        <p className="mt-2 text-gray-400">Subscribe to artists to see their exclusive content here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Your Feed</h2>
      
      {/* Artist Filter */}
      <div className="bg-black rounded-lg border border-gray-600 p-4">
        <h3 className="text-sm font-medium text-white mb-3">Filter by Artist</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {/* All Posts Option */}
          <button
            onClick={() => setSelectedArtist(null)}
            className={`flex-shrink-0 flex flex-col items-center space-y-2 p-2 rounded-lg transition-colors ${
              selectedArtist === null 
                ? 'bg-gray-700 border-2 border-[#CBED6E]' 
                : 'hover:bg-gray-700'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedArtist === null 
                ? 'bg-[#CBED6E] text-black' 
                : 'bg-gray-600 text-gray-300'
            }`}>
              <span className="text-sm font-bold">ALL</span>
            </div>
            <span className="text-xs font-medium text-center text-gray-300">All Posts</span>
          </button>

          {/* Artist Options */}
          {subscribedArtists.map((artist) => (
            <div key={artist.id} className="flex-shrink-0 flex flex-col items-center space-y-2">
              <div className="relative group">
                <button
                  onClick={() => setSelectedArtist(artist.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedArtist === artist.id 
                      ? 'bg-gray-700 border-2 border-[#CBED6E]' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <Avatar className={`w-12 h-12 ${
                    selectedArtist === artist.id ? 'ring-2 ring-[#CBED6E] ring-offset-2 ring-offset-gray-800' : ''
                  }`}>
                    <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
                    <AvatarFallback>{artist.displayName[0]}</AvatarFallback>
                  </Avatar>
                </button>
                {/* Profile link overlay */}
                <button
                  onClick={() => handleArtistClick(artist.id)}
                  className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 bg-black bg-opacity-40 flex items-center justify-center transition-opacity"
                  title={`View ${artist.displayName}'s profile`}
                >
                  <span className="text-white text-xs font-medium">Profile</span>
                </button>
              </div>
              <button 
                onClick={() => handleArtistClick(artist.id)}
                className="text-xs font-medium text-center max-w-[60px] truncate text-gray-300 hover:text-[#CBED6E] transition-colors"
              >
                {artist.displayName}
              </button>
            </div>
          ))}
        </div>
        
        {selectedArtist && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <p className="text-sm text-gray-400">
              Showing posts from {subscribedArtists.find(a => a.id === selectedArtist)?.displayName}
              <button 
                onClick={() => setSelectedArtist(null)}
                className="ml-2 text-[#CBED6E] hover:text-[#B5E25A] font-medium"
              >
                Show all posts
              </button>
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleArtistClick(post.artistId)}>
                    <Avatar className="w-10 h-10 hover:ring-2 hover:ring-[#CBED6E] hover:ring-offset-2 hover:ring-offset-gray-800 transition-all">
                      <AvatarImage src={post.artistAvatar} alt={post.artistName} />
                      <AvatarFallback>{post.artistName[0]}</AvatarFallback>
                    </Avatar>
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleArtistClick(post.artistId)}
                        className="font-semibold text-white hover:text-[#CBED6E] transition-colors"
                      >
                        {post.artistName}
                      </button>
                      <span className="text-[#CBED6E] text-sm">VERIFIED</span>
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

      {/* Load More Button */}
      <div className="text-center pt-6">
        <Button>
          Load More Posts
        </Button>
      </div>

      {/* Share Modal */}
      {sharingPost && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={handleCloseShareModal}
          post={sharingPost}
          artist={artists.find(a => a.id === sharingPost.artistId)!}
        />
      )}
    </div>
  )
} 