'use client'

import React, { useState } from 'react'
import { FanNavbar } from './FanNavbar'
import { ContentFeed } from './ContentFeed'
import { Sidebar } from './Sidebar'
import { DiscoverArtists } from './DiscoverArtists'
import { Subscriptions } from './Subscriptions'
import { Messages } from './Messages'

type TabType = 'feed' | 'discover' | 'subscriptions' | 'messages'

export function FanDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('feed')

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <ContentFeed />
      case 'discover':
        return <DiscoverArtists />
      case 'subscriptions':
        return <Subscriptions />
      case 'messages':
        return <Messages />
      default:
        return <ContentFeed />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <FanNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 px-4 py-6">
          {renderContent()}
        </div>
        
        {/* Sidebar */}
        <div className="w-80 px-4 py-6 hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  )
} 