'use client'

import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AdminTabType } from './AdminDashboard'
import { adminUsers } from '@/lib/mockData'
import Image from 'next/image'

interface AdminNavbarProps {
  adminEmail: string
  activeTab: AdminTabType
  onTabChange: (tab: AdminTabType) => void
  onLogout: () => void
}

export function AdminNavbar({ adminEmail, activeTab, onTabChange, onLogout }: AdminNavbarProps) {
  const adminUser = adminUsers.find(user => user.email === adminEmail)

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'STATS' },
    { id: 'users', label: 'Users', icon: 'USERS' },
    { id: 'artists', label: 'Artists', icon: 'ART' },
    { id: 'invites', label: 'Invites', icon: 'MAIL' },
  ]

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="OXGN"
                width={100}
                height={32}
                className="h-6 w-auto"
                priority
              />
            </div>
            <span className="text-lg font-bold text-[#CBED6E]">Admin</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as AdminTabType)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#CBED6E] text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-2 text-xs bg-gray-700 px-2 py-1 rounded">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Profile and Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={adminUser?.avatarUrl} alt={adminUser?.firstName} />
                <AvatarFallback>{adminUser?.firstName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{adminUser?.firstName} {adminUser?.lastName}</p>
                <p className="text-xs text-gray-300">Administrator</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="text-gray-300 hover:text-white border-gray-600 hover:border-[#CBED6E]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as AdminTabType)}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-[#CBED6E] text-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="mr-2 text-xs bg-gray-700 px-2 py-1 rounded">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
} 