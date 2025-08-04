'use client'

import React from 'react'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()

  const handleOnboardingComplete = () => {
    // Redirect to main app after onboarding completion
    router.push('/')
  }

  return <OnboardingFlow onComplete={handleOnboardingComplete} />
} 