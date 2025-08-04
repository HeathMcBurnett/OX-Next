'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArtistNavbar } from './ArtistNavbar'
import { ArtistOverview } from './ArtistOverview'
import { ContentManager } from './ContentManager'
import { ProfileManager } from './ProfileManager'
import { FanMessages } from './FanMessages'
import { ArtistSettings } from './ArtistSettings'

export type ArtistTabType = 'overview' | 'content' | 'profile' | 'messages' | 'settings'

interface ArtistDashboardProps {
  artistData: any
  onLogout: () => void
}

export function ArtistDashboard({ artistData, onLogout }: ArtistDashboardProps) {
  const [activeTab, setActiveTab] = useState<ArtistTabType>('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ArtistOverview artistData={artistData} />
      case 'content':
        return <ContentManager artistData={artistData} />
      case 'profile':
        return <ProfileManager artistData={artistData} />
      case 'messages':
        return <FanMessages artistData={artistData} />
      case 'settings':
        return <ArtistSettings artistData={artistData} />
      default:
        return <ArtistOverview artistData={artistData} />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <ArtistNavbar 
        artistData={artistData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  )
} 