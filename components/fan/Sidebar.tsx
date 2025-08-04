'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getSubscribedArtists, messages } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'

export function Sidebar() {
  const subscribedArtists = getSubscribedArtists()
  const recentMessages = messages.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Subscribed Artists */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Your Artists
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscribedArtists.map((artist) => (
            <div key={artist.id} className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={artist.avatarUrl} alt={artist.displayName} />
                <AvatarFallback>{artist.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {artist.displayName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  @{artist.username}
                </p>
              </div>
              <div className="flex items-center">
                {artist.isVerified && <span className="text-[#CBED6E] text-xs">VERIFIED</span>}
              </div>
            </div>
          ))}
          
          {subscribedArtists.length === 0 && (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-gray-300 text-xs font-bold">ART</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">No subscriptions yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentMessages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.fromAvatar} alt={message.fromName} />
                  <AvatarFallback>{message.fromName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {message.fromName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatRelativeTime(message.createdAt)}
                  </p>
                </div>
                {!message.isRead && (
                  <div className="w-2 h-2 bg-[#CBED6E] rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                {message.content}
              </p>
            </div>
          ))}
          
          {recentMessages.length === 0 && (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-gray-300 text-xs font-bold">MSG</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">No messages yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Active Subscriptions</span>
            <span className="font-semibold text-[#CBED6E]">{subscribedArtists.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Total Messages</span>
            <span className="font-semibold text-green-400">{messages.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Unread Messages</span>
            <span className="font-semibold text-red-400">
              {messages.filter(m => !m.isRead).length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 