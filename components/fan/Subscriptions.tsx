'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { subscriptions, artists } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'
import { ArtistProfile } from './ArtistProfile'

export function Subscriptions() {
  const [userSubscriptions, setUserSubscriptions] = useState(subscriptions)
  const [viewingProfile, setViewingProfile] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState<any>(null)

  const handleCancelSubscription = (subscriptionId: string) => {
    // In a real app, this would call the API to cancel the subscription
    const confirmed = confirm('Are you sure you want to cancel this subscription? You will lose access to exclusive content at the end of your current billing period.')
    
    if (confirmed) {
      setUserSubscriptions(prev => 
        prev.map(sub => 
          sub.id === subscriptionId 
            ? { ...sub, cancelAtPeriodEnd: true }
            : sub
        )
      )
    }
  }

  const handleReactivateSubscription = (subscriptionId: string) => {
    // In a real app, this would call the API to reactivate the subscription
    setUserSubscriptions(prev => 
      prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, cancelAtPeriodEnd: false }
          : sub
      )
    )
  }

  const handleViewArtist = (artistId: string) => {
    const artist = artists.find(a => a.id === artistId)
    if (artist) {
      setSelectedArtist(artist)
      setViewingProfile(true)
    }
  }

  const handleBackToSubscriptions = () => {
    setViewingProfile(false)
    setSelectedArtist(null)
  }

  const getStatusBadge = (subscription: any) => {
    if (subscription.status === 'active' && !subscription.cancelAtPeriodEnd) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-400 border border-green-700">Active</span>
    } else if (subscription.status === 'active' && subscription.cancelAtPeriodEnd) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-400 border border-yellow-700">Cancelling</span>
    } else if (subscription.status === 'past_due') {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-400 border border-red-700">Past Due</span>
    } else {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-600">Inactive</span>
    }
  }

  const totalMonthlySpend = userSubscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => total + sub.amount, 0)

  if (viewingProfile && selectedArtist) {
    return <ArtistProfile artistId={selectedArtist.id} onBack={handleBackToSubscriptions} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Your Subscriptions</h2>
        <p className="mt-2 text-gray-300">Manage your artist subscriptions and billing</p>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">
            Subscription Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#CBED6E]">{userSubscriptions.filter(s => s.status === 'active').length}</p>
              <p className="text-sm text-gray-400">Active Subscriptions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#CBED6E]">{formatCurrency(totalMonthlySpend)}</p>
              <p className="text-sm text-gray-400">Supported Causes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#CBED6E]">{formatCurrency(totalMonthlySpend)}</p>
              <p className="text-sm text-gray-400">Impact</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions List */}
      <div className="space-y-6">
        {userSubscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <CardContent className="p-8 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={subscription.artistAvatar} alt={subscription.artistName} />
                    <AvatarFallback>{subscription.artistName[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-white text-lg">{subscription.artistName}</h3>
                      {getStatusBadge(subscription)}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                      <span>{formatCurrency(subscription.amount)}/month</span>
                      <span>•</span>
                      <span>Started {new Date(subscription.startedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
                    </div>

                    {subscription.cancelAtPeriodEnd && (
                      <div className="mt-2 p-2 bg-yellow-900 rounded-md border border-yellow-700">
                        <p className="text-sm text-yellow-200">
                          WARNING: This subscription will end on {new Date(subscription.nextBillingDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                    <Button 
                      onClick={() => handleCancelSubscription(subscription.id)}
                      variant="outline"
                      className="text-red-400 border-red-700 hover:bg-red-900"
                    >
                      Cancel
                    </Button>
                  )}
                  
                  {subscription.cancelAtPeriodEnd && (
                    <Button 
                      onClick={() => handleReactivateSubscription(subscription.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Reactivate
                    </Button>
                  )}

                  <Button 
                    variant="outline"
                    onClick={() => handleViewArtist(subscription.artistId)}
                  >
                    View Artist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {userSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-300 font-bold">SUB</span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">No subscriptions yet</h3>
          <p className="mt-2 text-gray-400">Discover amazing artists and support their creative work</p>
          <Button className="mt-4">
            Discover Artists
          </Button>
        </div>
      )}

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-600">
              <div>
                <p className="font-medium text-white">Payment Method</p>
                <p className="text-sm text-gray-400">•••• •••• •••• 4242</p>
              </div>
              <Button variant="outline">
                Update
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-600">
              <div>
                <p className="font-medium text-white">Billing Address</p>
                <p className="text-sm text-gray-400">123 Main St, San Francisco, CA 94105</p>
              </div>
              <Button variant="outline">
                Update
              </Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-white">Billing History</p>
                <p className="text-sm text-gray-400">View past invoices and payments</p>
              </div>
              <Button variant="outline">
                View History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 