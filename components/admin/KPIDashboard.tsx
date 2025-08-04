'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { allUsers, artists, posts, subscriptions, invites } from '@/lib/mockData'
import { formatCurrency, formatNumber } from '@/lib/utils'

export function KPIDashboard() {
  // Calculate KPIs
  const totalUsers = allUsers.length
  const totalArtists = artists.length
  const totalFans = allUsers.filter(user => user.role === 'fan').length
  const totalManagers = allUsers.filter(user => user.role === 'manager').length
  const totalPosts = posts.length
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length
  const totalRevenue = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.amount, 0)
  const pendingInvites = invites.filter(invite => invite.status === 'pending').length

  const kpiCards = [
    {
      title: 'Total Users',
      value: formatNumber(totalUsers),
      description: 'All registered users',
      icon: 'USR',
      color: 'blue'
    },
    {
      title: 'Artists',
      value: formatNumber(totalArtists),
      description: 'Active content creators',
      icon: 'ART',
      color: 'purple'
    },
    {
      title: 'Fans',
      value: formatNumber(totalFans),
      description: 'Subscribed supporters',
      icon: 'FAN',
      color: 'pink'
    },
    {
      title: 'Posts',
      value: formatNumber(totalPosts),
      description: 'Content pieces published',
      icon: 'POST',
      color: 'green'
    },
    {
      title: 'Active Subscriptions',
      value: formatNumber(activeSubscriptions),
      description: 'Current paid subscriptions',
      icon: 'SUB',
      color: 'yellow'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(totalRevenue),
      description: 'Total recurring revenue',
      icon: 'REV',
      color: 'emerald'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-gray-800 text-[#CBED6E] border-l-[#CBED6E]',
      purple: 'bg-gray-800 text-purple-400 border-l-purple-400',
      pink: 'bg-gray-800 text-pink-400 border-l-pink-400',
      green: 'bg-gray-800 text-green-400 border-l-green-400',
      yellow: 'bg-gray-800 text-yellow-400 border-l-yellow-400',
      emerald: 'bg-gray-800 text-emerald-400 border-l-emerald-400'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-800 text-gray-300 border-l-gray-500'
  }

  // Recent activity
  const recentArtists = artists.slice(0, 5)
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-300">
          Welcome to the OX RE administration panel. Here's your system overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className={`border-l-4 ${getColorClasses(kpi.color)}`}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{kpi.icon}</span>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate">
                      {kpi.title}
                    </dt>
                    <dd className="text-2xl font-bold">
                      {kpi.value}
                    </dd>
                    <dd className="text-sm text-gray-400">
                      {kpi.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Artists */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2 text-xs bg-blue-100 px-2 py-1 rounded">NEW</span>
              Recent Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentArtists.map((artist) => (
                <div key={artist.id} className="flex items-center space-x-3">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {artist.displayName}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      @{artist.username} • {artist.subscriberCount} subscribers
                    </p>
                  </div>
                  <div className="text-sm text-gray-300">
                    {formatCurrency(artist.subscriptionPrice)}/mo
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2 text-xs bg-green-100 px-2 py-1 rounded">POSTS</span>
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start space-x-3">
                  <img
                    src={post.artistAvatar}
                    alt={post.artistName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {post.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      by {post.artistName} • {post.likesCount} likes
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-200 mt-1">
                      {post.contentType.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2 text-xs bg-yellow-100 px-2 py-1 rounded">SYS</span>
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{pendingInvites}</div>
              <div className="text-sm text-gray-400">Pending Invites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#CBED6E]">{totalManagers}</div>
              <div className="text-sm text-gray-400">Managers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round((activeSubscriptions / totalFans) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Conversion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 