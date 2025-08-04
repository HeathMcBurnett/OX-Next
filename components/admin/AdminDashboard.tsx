'use client'

import React, { useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { KPIDashboard } from './KPIDashboard'
import { UserManagement } from './UserManagement'
import { ArtistManagement } from './ArtistManagement'
import { InviteSystem } from './InviteSystem'

export type AdminTabType = 'overview' | 'users' | 'artists' | 'invites'

interface AdminDashboardProps {
  adminEmail: string
  onLogout: () => void
}

export function AdminDashboard({ adminEmail, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <KPIDashboard />
      case 'users':
        return <UserManagement />
      case 'artists':
        return <ArtistManagement />
      case 'invites':
        return <InviteSystem />
      default:
        return <KPIDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <AdminNavbar
        adminEmail={adminEmail}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </main>
    </div>
  )
} 