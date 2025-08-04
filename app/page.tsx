'use client'

import React, { useState } from 'react'
import { FanDashboard } from '@/components/fan/FanDashboard'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { ArtistLogin } from '@/components/artist/ArtistLogin'
import { ArtistDashboard } from '@/components/artist/ArtistDashboard'
import { Button } from '@/components/ui/button'

type AppMode = 'fan' | 'admin' | 'artist'

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [appMode, setAppMode] = useState<AppMode>('fan')
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [artistLoggedIn, setArtistLoggedIn] = useState(false)
  const [artistData, setArtistData] = useState<any>(null)

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
    setShowOnboarding(false)
  }

  const startOnboarding = () => {
    setShowOnboarding(true)
  }

  const resetDemo = () => {
    setHasCompletedOnboarding(false)
    setShowOnboarding(false)
  }

  const handleAdminLogin = (email: string) => {
    setAdminLoggedIn(true)
    setAdminEmail(email)
  }

  const handleAdminLogout = () => {
    setAdminLoggedIn(false)
    setAdminEmail('')
    setAppMode('fan')
  }

  const handleArtistLogin = (artistData: any) => {
    setArtistLoggedIn(true)
    setArtistData(artistData)
  }

  const handleArtistLogout = () => {
    setArtistLoggedIn(false)
    setArtistData(null)
    setAppMode('fan')
  }

  const switchToAdmin = () => {
    setAppMode('admin')
    setAdminLoggedIn(false)
  }

  const switchToArtist = () => {
    setAppMode('artist')
    setArtistLoggedIn(false)
  }

  const switchToFan = () => {
    setAppMode('fan')
    setAdminLoggedIn(false)
    setArtistLoggedIn(false)
  }

  // Admin flow
  if (appMode === 'admin') {
    if (!adminLoggedIn) {
      return (
        <div>
          {/* Demo Controls */}
          <div className="fixed top-4 right-4 z-50">
            <Button 
              onClick={switchToFan}
              variant="outline"
              className="text-sm"
            >
              ← Back to Fan App
            </Button>
          </div>
          <AdminLogin onLogin={handleAdminLogin} />
        </div>
      )
    }

    return <AdminDashboard adminEmail={adminEmail} onLogout={handleAdminLogout} />
  }

  // Artist flow
  if (appMode === 'artist') {
    if (!artistLoggedIn) {
      return (
        <div>
          {/* Demo Controls */}
          <div className="fixed top-4 right-4 z-50">
            <Button 
              onClick={switchToFan}
              variant="outline"
              className="text-sm"
            >
              ← Back to Fan App
            </Button>
          </div>
          <ArtistLogin onLogin={handleArtistLogin} />
        </div>
      )
    }

    return <ArtistDashboard artistData={artistData} onLogout={handleArtistLogout} />
  }

  // Fan flow
  if (showOnboarding) {
    return (
      <div>
        {/* Demo Controls */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <Button 
            onClick={switchToAdmin}
            variant="outline"
            className="text-sm w-full"
          >
            Admin Portal
          </Button>
          <Button 
            onClick={switchToArtist}
            variant="outline"
            className="text-sm w-full"
          >
            Artist Portal
          </Button>
        </div>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <div>
      {/* Demo Controls */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <div className="space-x-2">
          {!hasCompletedOnboarding && (
            <Button 
              onClick={startOnboarding}
              className="text-sm"
            >
              Try Artist Selection Flow
            </Button>
          )}
          {hasCompletedOnboarding && (
            <Button 
              onClick={resetDemo}
              variant="secondary"
              className="text-sm"
            >
              Reset Demo
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <Button 
            onClick={switchToAdmin}
            variant="outline"
            className="text-sm w-full"
          >
            Admin Portal
          </Button>
          <Button 
            onClick={switchToArtist}
            variant="outline"
            className="text-sm w-full"
          >
            Artist Portal
          </Button>
        </div>
      </div>

      {/* Main App */}
      <FanDashboard />
    </div>
  )
} 