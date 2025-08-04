'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArtistTabType } from './ArtistDashboard'
import Image from 'next/image'

interface ArtistNavbarProps {
  artistData: any
  activeTab: ArtistTabType
  setActiveTab: (tab: ArtistTabType) => void
  onLogout: () => void
}

export function ArtistNavbar({ artistData, activeTab, setActiveTab, onLogout }: ArtistNavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content' },
    { id: 'profile', label: 'Profile' },
    { id: 'messages', label: 'Messages' },
    { id: 'settings', label: 'Settings' },
  ]

  const handleLogout = () => {
    onLogout()
    setProfileOpen(false)
  }

  return (
    <nav className="bg-black border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="OXGN"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <div className="text-[#CBED6E] text-sm font-medium">Artist Portal</div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id as ArtistTabType
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ArtistTabType)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#CBED6E] bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Artist Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-800 transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={artistData.avatarUrl} alt={artistData.displayName} />
                <AvatarFallback>
                  {artistData.displayName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">
                  {artistData.displayName}
                </p>
                <p className="text-xs text-gray-400">Artist</p>
              </div>
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={artistData.avatarUrl} alt={artistData.displayName} />
                      <AvatarFallback>
                        {artistData.displayName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {artistData.displayName}
                      </p>
                      <p className="text-xs text-gray-400">@{artistData.username}</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Account Settings
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                    Help & Support
                  </button>
                </div>
                
                <div className="border-t border-gray-700 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-800 hover:text-red-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id as ArtistTabType
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ArtistTabType)}
                  className={`flex-1 flex flex-col items-center px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-[#CBED6E] bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
} 