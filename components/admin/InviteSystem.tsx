'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { invites } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'

export function InviteSystem() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    role: 'fan' as 'artist' | 'manager' | 'fan'
  })
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'expired'>('all')

  const filteredInvites = invites.filter(invite => 
    filterStatus === 'all' || invite.status === filterStatus
  )

  const handleCreateInvite = () => {
    if (!formData.email || !formData.role) return
    
    // In a real app, this would send an API request
    alert(`Invite sent to ${formData.email} for ${formData.role} role`)
    setFormData({ email: '', role: 'fan' })
    setShowCreateForm(false)
  }

  const handleResendInvite = (inviteId: string) => {
    alert(`Resend invite ${inviteId} functionality would be implemented here`)
  }

  const handleCancelInvite = (inviteId: string) => {
    alert(`Cancel invite ${inviteId} functionality would be implemented here`)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'accepted': return 'success'
      case 'expired': return 'destructive'
      default: return 'secondary'
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'artist': return 'default'
      case 'manager': return 'secondary'
      case 'fan': return 'outline'
      default: return 'outline'
    }
  }

  // Calculate stats
  const pendingCount = invites.filter(inv => inv.status === 'pending').length
  const acceptedCount = invites.filter(inv => inv.status === 'accepted').length
  const expiredCount = invites.filter(inv => inv.status === 'expired').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Invite System</h1>
          <p className="mt-1 text-sm text-gray-300">
            Send invitations to new artists, managers, and fans to join the platform.
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
        >
          Send Invite
        </Button>
      </div>

      {/* Create Invite Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Send New Invitation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBED6E] placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBED6E]"
                >
                  <option value="fan">Fan</option>
                  <option value="artist">Artist</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleCreateInvite}>
                  Send Invitation
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{invites.length}</div>
            <div className="text-sm text-gray-400">Total Invites</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
            <div className="text-sm text-gray-400">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{acceptedCount}</div>
            <div className="text-sm text-gray-400">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">{expiredCount}</div>
            <div className="text-sm text-gray-400">Expired</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            {['all', 'pending', 'accepted', 'expired'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status as any)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invites Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Invitations ({filteredInvites.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredInvites.map((invite) => (
                  <tr key={invite.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {invite.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleBadgeVariant(invite.role)} className="capitalize">
                        {invite.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(invite.status)} className="capitalize">
                        {invite.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatRelativeTime(invite.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatRelativeTime(invite.expiresAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {invite.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResendInvite(invite.id)}
                          >
                            Resend
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelInvite(invite.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {invite.status === 'expired' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResendInvite(invite.id)}
                        >
                          Resend
                        </Button>
                      )}
                      {invite.status === 'accepted' && (
                        <span className="text-green-400 text-sm">✓ Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvites.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400">No invitations found.</div>
              {!showCreateForm && (
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="mt-4"
                >
                  Send Your First Invite
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Template Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Email Template Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="bg-gray-700 p-6 rounded border border-gray-600 max-w-md">
              <h3 className="text-lg font-semibold text-white mb-4">
                You're invited to join OX RE!
              </h3>
              <p className="text-gray-300 mb-4">
                You've been invited to join OX RE as a [ROLE]. This platform connects artists with their fans through exclusive content and meaningful causes.
              </p>
              <Button>
                Accept Invitation
              </Button>
              <p className="text-xs text-gray-400 mt-4">
                This invitation expires in 7 days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 