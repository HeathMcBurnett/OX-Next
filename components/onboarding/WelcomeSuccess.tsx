'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UserData } from './OnboardingFlow'
import { formatCurrency } from '@/lib/utils'

interface WelcomeSuccessProps {
  onContinue: () => void
  userData: UserData
}

export function WelcomeSuccess({ onContinue, userData }: WelcomeSuccessProps) {
  const selectedArtist = userData.selectedArtist

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black border-gray-700">
        <CardHeader>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#CBED6E] rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-black text-2xl font-bold">✓</span>
            </div>
            <div className="flex items-center justify-center mb-2">
              <Image 
                src="/logo.png" 
                alt="OXGN" 
                width={120} 
                height={40} 
                className="h-8 w-auto" 
                priority 
              />
            </div>
            <CardTitle className="text-2xl text-[#CBED6E]">Welcome to OXGN!</CardTitle>
            <p className="text-gray-300 mt-2">Your subscription is now active</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Hi {userData.firstName}, you're all set!
            </h2>
            <p className="text-gray-300">
              Thank you for choosing an artist to support! You now have access to exclusive content 
              and can support their creative work directly through your subscription.
            </p>
          </div>

          {/* Subscription Details */}
          {selectedArtist && (
            <div className="bg-black p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Your First Subscription</h3>
              
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedArtist.avatarUrl} alt={selectedArtist.displayName} />
                  <AvatarFallback className="text-lg">{selectedArtist.displayName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-white">{selectedArtist.displayName}</h4>
                    <span className="text-black text-xs bg-[#CBED6E] px-2 py-1 rounded font-medium">VERIFIED</span>
                  </div>
                  <p className="text-sm text-gray-400">@{selectedArtist.username}</p>
                  <p className="text-sm text-green-400 font-medium">
                    {formatCurrency(selectedArtist.subscriptionPrice)}/month
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-[#CBED6E]">
                    <span className="text-[#CBED6E] font-bold text-xs">ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-black rounded-md border border-gray-600">
                <p className="text-sm text-gray-300">
                  <strong>Next billing date:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">What's next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-600 rounded-lg bg-black">
                <h4 className="font-medium text-white mb-2">Explore Your Feed</h4>
                <p className="text-sm text-gray-300">
                  Check out exclusive content from your subscribed artists in your personalized feed
                </p>
              </div>

              <div className="p-4 border border-gray-600 rounded-lg bg-black">
                <h4 className="font-medium text-white mb-2">Discover More Artists</h4>
                <p className="text-sm text-gray-300">
                  Find and subscribe to more amazing creators that match your interests
                </p>
              </div>

              <div className="p-4 border border-gray-600 rounded-lg bg-black">
                <h4 className="font-medium text-white mb-2">Connect with Artists</h4>
                <p className="text-sm text-gray-300">
                  Receive personal messages and interact directly with your favorite creators
                </p>
              </div>

              <div className="p-4 border border-gray-600 rounded-lg bg-black">
                <h4 className="font-medium text-white mb-2">Manage Subscriptions</h4>
                <p className="text-sm text-gray-300">
                  View billing, update payment methods, or modify your subscriptions anytime
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Summary */}
          <div className="bg-black p-4 rounded-lg border border-gray-600">
            <h4 className="font-medium text-white mb-3">Your Subscription</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Artist:</span>
                <p className="font-medium text-white">{selectedArtist ? selectedArtist.displayName : 'None selected'}</p>
              </div>
              <div>
                <span className="text-gray-400">Monthly Cost:</span>
                <p className="font-medium text-green-400">
                  {selectedArtist ? formatCurrency(selectedArtist.subscriptionPrice) : '$0.00'}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <p className="font-medium text-green-400">{selectedArtist ? 'Active' : 'None'}</p>
              </div>
              <div>
                <span className="text-gray-400">Next Billing:</span>
                <p className="font-medium text-white">
                  {selectedArtist ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-black p-4 rounded-lg border border-gray-600">
            <h4 className="font-medium text-white mb-2">Need Help?</h4>
            <p className="text-sm text-gray-300 mb-3">
              We're here to help! Check out our resources or get in touch with our support team.
            </p>
            <div className="flex space-x-4 text-sm">
              <button className="text-[#CBED6E] hover:text-green-400 font-medium">
                Help Center
              </button>
              <button className="text-[#CBED6E] hover:text-green-400 font-medium">
                Contact Support
              </button>
              <button className="text-[#CBED6E] hover:text-green-400 font-medium">
                FAQ
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              onClick={onContinue}
              className="px-8 py-3 text-lg"
            >
              Enter OXGN
            </Button>
            <p className="text-sm text-gray-400 mt-2">
              Start exploring exclusive content from your favorite artists
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 