'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UserData } from './OnboardingFlow'
import { formatCurrency } from '@/lib/utils'

interface SubscriptionCheckoutProps {
  onContinue: () => void
  onBack: () => void
  userData: UserData
}

export function SubscriptionCheckout({ onContinue, onBack, userData }: SubscriptionCheckoutProps) {
  const [paymentData, setPaymentData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedArtist = userData.selectedArtist

  if (!selectedArtist) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black border-gray-700">
          <CardContent className="p-8 text-center">
            <p className="text-gray-300">No artist selected for subscription.</p>
            <Button onClick={onBack} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(paymentData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number'
    }

    if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format'
    }

    if (!paymentData.cvv || paymentData.cvv.length !== 3) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV'
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }

    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required'
    }

    if (!paymentData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!paymentData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19)
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5)
    }

    // Format CVV (numbers only)
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3)
    }

    setPaymentData(prev => ({ ...prev, [field]: formattedValue }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsProcessing(false)
    onContinue()
  }

  const monthlyTotal = selectedArtist.subscriptionPrice
  const tax = monthlyTotal * 0.08 // 8% tax simulation
  const total = monthlyTotal + tax

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black border-gray-700">
        <CardHeader>
          <div className="text-center">
            <Image 
              src="/logo.png" 
              alt="OXGN" 
              width={120} 
              height={40} 
              className="h-8 w-auto mx-auto mb-2" 
              priority 
            />
            <CardTitle className="text-xl text-white">Complete Your Subscription</CardTitle>
            <p className="text-gray-300 mt-2">Secure checkout powered by Stripe</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-[#CBED6E] rounded-full"></div>
            <div className="w-3 h-3 bg-[#CBED6E] rounded-full"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={paymentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Card Number */}
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-200 mb-1">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-200 mb-1">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-200 mb-1">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                        errors.cvv ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-200 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    id="cardholderName"
                    type="text"
                    value={paymentData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                      errors.cardholderName ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.cardholderName && <p className="text-red-400 text-sm mt-1">{errors.cardholderName}</p>}
                </div>

                {/* Billing Address */}
                <div>
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-200 mb-1">
                    Billing Address
                  </label>
                  <input
                    id="billingAddress"
                    type="text"
                    value={paymentData.billingAddress}
                    onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                    placeholder="123 Main Street"
                    className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                      errors.billingAddress ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.billingAddress && <p className="text-red-400 text-sm mt-1">{errors.billingAddress}</p>}
                </div>

                {/* City and ZIP */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-200 mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={paymentData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="San Francisco"
                      className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                        errors.city ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-200 mb-1">
                      ZIP Code
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      value={paymentData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="94105"
                      className={`w-full px-3 py-2 border rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBED6E] ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              <div className="bg-black p-4 rounded-lg space-y-4 border border-gray-700">
                {/* Artist Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedArtist.avatarUrl} alt={selectedArtist.displayName} />
                    <AvatarFallback>{selectedArtist.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">{selectedArtist.displayName}</h4>
                    <p className="text-sm text-gray-300">Monthly Subscription</p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-4 border-t border-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subscription</span>
                    <span className="text-white">{formatCurrency(monthlyTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax</span>
                    <span className="text-white">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-600">
                    <span className="text-white">Total</span>
                    <span className="text-white">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Billing Info */}
                <div className="pt-4 border-t border-gray-600">
                  <p className="text-sm text-gray-300">
                    You'll be charged {formatCurrency(total)} today, then {formatCurrency(total)} monthly.
                    Cancel anytime from your account settings.
                  </p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-black rounded-lg border border-gray-600">
                <div className="flex items-center text-sm text-[#CBED6E]">
                  <span className="mr-2 font-bold">SECURE</span>
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t border-gray-600">
            <Button
              onClick={onBack}
              disabled={isProcessing}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Processing Payment...' : `Subscribe for ${formatCurrency(total)}/month`}
            </Button>
          </div>

          {/* Test Card Info */}
          <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-600">
            <p>Test Mode: Use card number 4242 4242 4242 4242</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 