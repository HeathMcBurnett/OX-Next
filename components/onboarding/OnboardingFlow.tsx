'use client'

import React, { useState } from 'react'
import { ArtistDiscovery } from './ArtistDiscovery'
import { SubscriptionCheckout } from './SubscriptionCheckout'
import { WelcomeSuccess } from './WelcomeSuccess'

export type OnboardingStep = 'discovery' | 'checkout' | 'success'

export interface UserData {
  email: string
  firstName: string
  lastName: string
  interests: string[]
  selectedArtist?: {
    id: string
    displayName: string
    username: string
    avatarUrl: string
    subscriptionPrice: number
    [key: string]: any
  }
}

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('discovery')
  const [userData, setUserData] = useState<Partial<UserData>>({
    email: 'demo@example.com', // Pre-filled for demo
    firstName: 'Demo',
    lastName: 'User',
    interests: ['music'] // Default interest
  })

  const handleStepComplete = (step: OnboardingStep, data?: Partial<UserData>) => {
    if (data) {
      setUserData(prev => ({ ...prev, ...data }))
    }

    switch (step) {
      case 'discovery':
        setCurrentStep('checkout')
        break
      case 'checkout':
        setCurrentStep('success')
        break
      case 'success':
        onComplete()
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case 'checkout':
        setCurrentStep('discovery')
        break
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'discovery':
        return (
          <ArtistDiscovery
            onContinue={(data) => handleStepComplete('discovery', data)}
            onBack={() => {}} // No back button for first step
            userData={userData as UserData}
          />
        )
      case 'checkout':
        return (
          <SubscriptionCheckout
            onContinue={() => handleStepComplete('checkout')}
            onBack={handleBack}
            userData={userData as UserData}
          />
        )
      case 'success':
        return (
          <WelcomeSuccess
            onContinue={() => handleStepComplete('success')}
            userData={userData as UserData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {renderStep()}
    </div>
  )
} 