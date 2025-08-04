'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { adminCredentials } from '@/lib/mockData'
import Image from 'next/image'

interface AdminLoginProps {
  onLogin: (adminEmail: string) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials
    const validCredentials = adminCredentials.find(
      cred => cred.email === email && cred.password === password
    )

    if (validCredentials) {
      onLogin(email)
    } else {
      setError('Invalid email or password')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="OXGN"
              width={150}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign in to your administrator account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Administrator Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#CBED6E] focus:border-[#CBED6E]"
                  placeholder="admin@oxre.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#CBED6E] focus:border-[#CBED6E]"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-900 border border-red-700 rounded-md p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#CBED6E] hover:bg-[#B5E25A] text-black font-semibold"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 bg-gray-800 border border-gray-600 rounded-md p-4">
              <h4 className="text-sm font-medium text-[#CBED6E] mb-2">Demo Credentials:</h4>
              <p className="text-sm text-gray-300">
                <strong>Email:</strong> admin@oxre.com<br />
                <strong>Password:</strong> admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 