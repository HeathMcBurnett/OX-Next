'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { artistCredentials, artists } from '@/lib/mockData'
import Image from 'next/image'

interface ArtistLoginProps {
  onLogin: (artistData: any) => void
}

export function ArtistLogin({ onLogin }: ArtistLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials
    const credentials = artistCredentials.find(
      cred => cred.email === email && cred.password === password
    )

    if (credentials) {
      // Find the artist data
      const artistData = artists.find(artist => artist.id === credentials.artistId)
      if (artistData) {
        onLogin(artistData)
      } else {
        setError('Artist profile not found')
      }
    } else {
      setError('Invalid email or password')
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (artistId: string) => {
    const credentials = artistCredentials.find(cred => cred.artistId === artistId)
    if (credentials) {
      setEmail(credentials.email)
      setPassword(credentials.password)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-gray-700">
        <CardHeader>
          <div className="text-center mb-4">
            <Image
              src="/logo.png"
              alt="OXGN"
              width={120}
              height={40}
              className="h-10 w-auto mx-auto mb-4"
              priority
            />
            <CardTitle className="text-2xl font-bold text-white">Artist Portal</CardTitle>
            <p className="text-gray-300 mt-2">Sign in to manage your content and profile</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900 border border-red-700 rounded-md">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400 mb-4 text-center">Demo accounts (click to auto-fill):</p>
            <div className="space-y-2">
              <Button
                onClick={() => handleDemoLogin('luna-echo')}
                variant="outline"
                className="w-full justify-start text-left"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616c9ce2f87?w=40&h=40&fit=crop&crop=face"
                    alt="Luna Echo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Luna Echo</p>
                    <p className="text-xs text-gray-400">luna@example.com</p>
                  </div>
                </div>
              </Button>
              
              <Button
                onClick={() => handleDemoLogin('neon-waves')}
                variant="outline"
                className="w-full justify-start text-left"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                    alt="Neon Waves"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Neon Waves</p>
                    <p className="text-xs text-gray-400">neon@example.com</p>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => handleDemoLogin('soul-fire')}
                variant="outline"
                className="w-full justify-start text-left"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=40&h=40&fit=crop&crop=face"
                    alt="Soul Fire"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Soul Fire</p>
                    <p className="text-xs text-gray-400">soul@example.com</p>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 