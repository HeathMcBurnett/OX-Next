'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { artists, posts, subscriptions } from '@/lib/mockData'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils'

export function ArtistManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  const filteredArtists = artists.filter(artist => 
    artist.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.cause.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateArtist = () => {
    alert('Create artist functionality would be implemented here')
  }

  const handleEditArtist = (artistId: string) => {
    alert(`Edit artist ${artistId} functionality would be implemented here`)
  }

  const handleViewProfile = (artistId: string) => {
    setSelectedArtist(selectedArtist === artistId ? null : artistId)
  }

  const handleCreatePost = (artistId: string) => {
    alert(`Create post for artist ${artistId} functionality would be implemented here`)
  }

  const getArtistPosts = (artistId: string) => {
    return posts.filter(post => post.artistId === artistId)
  }

  const getArtistSubscribers = (artistId: string) => {
    return subscriptions.filter(sub => sub.artistId === artistId && sub.status === 'active').length
  }

  const getArtistRevenue = (artistId: string) => {
    return subscriptions
      .filter(sub => sub.artistId === artistId && sub.status === 'active')
      .reduce((sum, sub) => sum + sub.amount, 0)
  }

  if (selectedArtist) {
    const artist = artists.find(a => a.id === selectedArtist)
    const artistPosts = getArtistPosts(selectedArtist)
    const subscribers = getArtistSubscribers(selectedArtist)
    const revenue = getArtistRevenue(selectedArtist)

    if (!artist) return <div>Artist not found</div>

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          onClick={() => setSelectedArtist(null)}
          variant="outline"
        >
          ← Back to Artists
        </Button>

        {/* Artist Profile */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
                <AvatarFallback className="text-xl">{artist.displayName[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{artist.displayName}</h2>
                    <p className="text-gray-300">@{artist.username}</p>
                    <p className="text-sm text-gray-400 mt-1">{artist.location}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <Button onClick={() => handleEditArtist(artist.id)}>
                      Edit Profile
                    </Button>
                    <Button 
                      onClick={() => handleCreatePost(artist.id)}
                      variant="outline"
                    >
                      Create Post
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <Badge variant={artist.isVerified ? 'success' : 'secondary'}>
                    {artist.cause}
                  </Badge>
                </div>

                <p className="mt-4 text-gray-300">{artist.story}</p>

                {/* Stats */}
                                 <div className="grid grid-cols-4 gap-4 mt-6">
                   <div className="text-center">
                     <div className="text-2xl font-bold text-[#CBED6E]">{subscribers}</div>
                     <div className="text-sm text-gray-400">Subscribers</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-green-400">{artistPosts.length}</div>
                     <div className="text-sm text-gray-400">Posts</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-purple-400">{formatCurrency(revenue)}</div>
                     <div className="text-sm text-gray-400">Monthly Revenue</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-orange-400">{formatCurrency(artist.subscriptionPrice)}</div>
                     <div className="text-sm text-gray-400">Price/Month</div>
                   </div>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artist Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts ({artistPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
                         {artistPosts.length === 0 ? (
               <div className="text-center py-8">
                 <p className="text-gray-400">No posts yet</p>
                 <Button 
                   onClick={() => handleCreatePost(artist.id)}
                   className="mt-4"
                 >
                   Create First Post
                 </Button>
               </div>
            ) : (
              <div className="space-y-4">
                {artistPosts.slice(0, 5).map((post) => (
                                     <div key={post.id} className="border border-gray-600 rounded-lg p-4">
                     <div className="flex justify-between items-start">
                       <div className="flex-1">
                         <h4 className="font-semibold text-white">{post.title}</h4>
                         <p className="text-gray-300 text-sm mt-1">{post.content.substring(0, 150)}...</p>
                         <div className="flex items-center space-x-4 mt-2">
                           <span className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded">
                             {post.contentType.toUpperCase()}
                           </span>
                           <span className="text-xs text-gray-400">
                             {post.likesCount} likes • {post.commentsCount} comments
                           </span>
                           <span className="text-xs text-gray-400">
                             {formatRelativeTime(post.createdAt)}
                           </span>
                         </div>
                       </div>
                       <Button variant="outline" size="sm">
                         Edit
                       </Button>
                     </div>
                   </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Artist Management</h1>
          <p className="mt-1 text-sm text-gray-300">
            Manage artist profiles, content, and performance metrics.
          </p>
        </div>
        <Button onClick={handleCreateArtist}>
          Create Artist
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <input
            type="text"
            placeholder="Search artists by name, username, or cause..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBED6E] placeholder-gray-400"
          />
        </CardContent>
      </Card>

      {/* Artist Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-white">{artists.length}</div>
            <div className="text-sm text-gray-400">Total Artists</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-white">
              {formatNumber(subscriptions.filter(sub => sub.status === 'active').length)}
            </div>
            <div className="text-sm text-gray-400">Active Subscriptions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-white">
              {formatCurrency(subscriptions.filter(sub => sub.status === 'active').reduce((sum, sub) => sum + sub.amount, 0))}
            </div>
            <div className="text-sm text-gray-400">Total Monthly Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => {
          const artistPosts = getArtistPosts(artist.id)
          const subscribers = getArtistSubscribers(artist.id)
          const revenue = getArtistRevenue(artist.id)

          return (
            <Card key={artist.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
                    <AvatarFallback>{artist.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{artist.displayName}</h3>
                    <p className="text-sm text-gray-400">@{artist.username}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {artist.cause}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#CBED6E]">{subscribers}</div>
                    <div className="text-xs text-gray-400">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{artistPosts.length}</div>
                    <div className="text-xs text-gray-400">Posts</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleViewProfile(artist.id)}
                    variant="outline"
                    className="w-full"
                  >
                    View Profile
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEditArtist(artist.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleCreatePost(artist.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      New Post
                    </Button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Revenue</span>
                    <span className="text-sm font-semibold text-green-400">
                      {formatCurrency(revenue)}/mo
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredArtists.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400">No artists found matching your search criteria.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 