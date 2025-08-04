'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { posts, subscriptions } from '@/lib/mockData'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils'

interface ArtistOverviewProps {
  artistData: any
}

export function ArtistOverview({ artistData }: ArtistOverviewProps) {
  // Calculate analytics for this artist
  const artistPosts = posts.filter(p => p.artistId === artistData.id)
  const artistSubscriptions = subscriptions.filter(s => s.artistId === artistData.id)
  const totalLikes = artistPosts.reduce((sum, post) => sum + post.likesCount, 0)
  const totalComments = artistPosts.reduce((sum, post) => sum + post.commentsCount, 0)
  const monthlyRevenue = artistSubscriptions.length * artistData.subscriptionPrice
  const recentPosts = artistPosts.slice(0, 3)

  const metrics = [
    {
      title: 'Total Subscribers',
      value: formatNumber(artistData.subscriberCount),
      change: '+12%',
      positive: true
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(monthlyRevenue),
      change: '+8%',
      positive: true
    },
    {
      title: 'Total Posts',
      value: artistPosts.length.toString(),
      change: '+3',
      positive: true
    },
    {
      title: 'Engagement',
      value: formatNumber(totalLikes + totalComments),
      change: '+15%',
      positive: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-6 border border-gray-700">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={artistData.avatarUrl} alt={artistData.displayName} />
            <AvatarFallback className="text-lg">{artistData.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {artistData.displayName}
            </h1>
            <p className="text-gray-300">
              Manage your content, connect with fans, and grow your audience
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  metric.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Recent Posts</CardTitle>
              <Button variant="outline" className="text-sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-300">
                        {post.contentType === 'text' ? 'T' : 
                         post.contentType === 'image' ? '◉' :
                         post.contentType === 'video' ? '▶' :
                         post.contentType === 'audio' ? '♪' : 'P'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white line-clamp-1">{post.title}</h4>
                      <p className="text-sm text-gray-300 line-clamp-2 mt-1">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>{post.likesCount} likes</span>
                        <span>{post.commentsCount} comments</span>
                        <span>{formatRelativeTime(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-gray-300 font-bold">+</span>
                </div>
                <h3 className="text-lg font-medium text-white">No posts yet</h3>
                <p className="text-gray-400 mt-2">Create your first post to start engaging with fans</p>
                <Button className="mt-4">
                  Create Post
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fan Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Fan Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">S</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">New subscriber</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm text-green-400">+{formatCurrency(artistData.subscriptionPrice)}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">L</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Post liked</p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">C</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">New comment</p>
                    <p className="text-xs text-gray-400">6 hours ago</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">S</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">New subscriber</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <span className="text-sm text-green-400">+{formatCurrency(artistData.subscriptionPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  )
} 