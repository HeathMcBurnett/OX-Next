
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { currentUser, getUnreadMessages } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'
import Image from 'next/image'

interface FanNavbarProps {
  activeTab: 'feed' | 'discover' | 'subscriptions' | 'messages'
  setActiveTab: (tab: 'feed' | 'discover' | 'subscriptions' | 'messages') => void
}

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'artist_post',
    title: 'New post from Luna Echo',
    message: 'Check out my latest acoustic session!',
    createdAt: '2024-01-19T14:30:00Z',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    type: 'system',
    title: 'Payment successful',
    message: 'Your subscription to Soul Fire has been renewed for $8.99',
    createdAt: '2024-01-18T09:15:00Z',
    isRead: false,
    avatar: null
  },
  {
    id: '3',
    type: 'artist_message',
    title: 'Direct message from Neon Waves',
    message: 'Thanks for your continued support! Working on something special...',
    createdAt: '2024-01-17T16:45:00Z',
    isRead: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to OXGN!',
    message: 'Discover amazing artists and support their creative work',
    createdAt: '2024-01-15T12:00:00Z',
    isRead: true,
    avatar: null
  }
]

export function FanNavbar({ activeTab, setActiveTab }: FanNavbarProps) {
  const unreadMessages = getUnreadMessages()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const unreadNotifications = notifications.filter(n => !n.isRead)
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }
  
  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ))
  }
  
  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    alert('Logout functionality would be implemented here')
    setProfileOpen(false)
  }
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'artist_post': return 'P'
      case 'artist_message': return 'M'
      case 'system': return 'S'
      default: return 'B'
    }
  }

  const navItems = [
    { id: 'feed', label: 'Feed' },
    { id: 'discover', label: 'Discover' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { 
      id: 'messages', 
      label: 'Messages',
      hasNotification: unreadMessages.length > 0
    },
  ]

  return (
    <nav className="bg-black border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="OXGN"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id as 'feed' | 'discover' | 'subscriptions' | 'messages'
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as 'feed' | 'discover' | 'subscriptions' | 'messages')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-[#CBED6E] bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                  {item.hasNotification && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[1.2rem] h-5 flex items-center justify-center">
                      {unreadMessages.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                <span className="text-sm font-medium">Notifications</span>
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Notifications</h3>
                      {unreadNotifications.length > 0 && (
                        <Button
                          onClick={handleMarkAllAsRead}
                          variant="outline"
                          className="text-xs h-6 px-2"
                        >
                          Mark all read
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className="text-gray-400">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleMarkAsRead(notification.id)}
                          className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-900 ${
                            !notification.isRead ? 'bg-gray-900/50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {notification.avatar ? (
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={notification.avatar} alt="" />
                                <AvatarFallback>?</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-300">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">{notification.title}</p>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-[#CBED6E] rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-300 mt-1 line-clamp-2">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-700">
                      <Button variant="outline" className="w-full text-sm">
                        View all notifications
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.firstName} />
                  <AvatarFallback>
                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="text-xs text-gray-400">Fan</p>
                </div>
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.firstName} />
                        <AvatarFallback>
                          {currentUser.firstName[0]}{currentUser.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Profile Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Account Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Billing
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
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id as 'feed' | 'discover' | 'subscriptions' | 'messages'
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as 'feed' | 'discover' | 'subscriptions' | 'messages')}
                  className={`flex-1 flex flex-col items-center px-2 py-2 rounded-md text-xs font-medium transition-colors relative ${
                    isActive
                      ? 'text-[#CBED6E] bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                  {item.hasNotification && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 py-0 min-w-[1rem] h-4 flex items-center justify-center">
                      {unreadMessages.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
} 