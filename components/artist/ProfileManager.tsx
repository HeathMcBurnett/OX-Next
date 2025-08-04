'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface ProfileManagerProps {
  artistData: any
}

export function ProfileManager({ artistData }: ProfileManagerProps) {
  const [profileData, setProfileData] = useState({
    displayName: artistData.displayName,
    username: artistData.username,
    story: artistData.story,
    location: artistData.location,
    cause: artistData.cause,
    subscriptionPrice: artistData.subscriptionPrice
  })

  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleSave = () => {
    if (bannerFile) {
      alert(`Banner file selected: ${bannerFile.name}`)
    }
    if (avatarFile) {
      alert(`Avatar file selected: ${avatarFile.name}`)
    }
    alert('Profile updated successfully!')
  }

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Manager</h1>
        <p className="text-gray-300">Update your public profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Profile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Banner Preview */}
            <div className="relative h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg overflow-hidden mb-4">
              <img 
                src={bannerPreview || artistData.bannerUrl} 
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            
            {/* Avatar and Info */}
            <div className="text-center relative -mt-8">
              <Avatar className="w-16 h-16 mx-auto mb-4 border-4 border-black">
                <AvatarImage src={avatarPreview || artistData.avatarUrl} alt={profileData.displayName} />
                <AvatarFallback className="text-xl">{profileData.displayName[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-white">{profileData.displayName}</h3>
              <p className="text-gray-400">@{profileData.username}</p>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg text-left">
                <p className="text-sm text-gray-300">{profileData.story}</p>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-4 flex justify-around text-xs text-gray-400">
                <div className="text-center">
                  <div className="text-white font-bold">{artistData.subscriberCount.toLocaleString()}</div>
                  <div>Subscribers</div>
                </div>
                <div className="text-center">
                  <div className="text-[#CBED6E] font-bold">${profileData.subscriptionPrice}</div>
                  <div>Per Month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Uploads */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Profile Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Banner Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Banner Image
                </label>
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg overflow-hidden mb-2">
                    <img 
                      src={bannerPreview || artistData.bannerUrl} 
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    {bannerFile && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        New Image Selected
                      </div>
                    )}
                  </div>
                  <div 
                    onClick={() => document.getElementById('banner-upload')?.click()}
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#CBED6E] transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-xl text-gray-300 font-bold">◉</span>
                    </div>
                    <p className="text-gray-400 mb-2">
                      {bannerFile ? `Selected: ${bannerFile.name}` : 'Upload new banner image'}
                    </p>
                    <p className="text-xs text-gray-500">Recommended: 800x200px, JPG or PNG</p>
                    <Button variant="outline" className="mt-3 text-sm">
                      {bannerFile ? 'Change File' : 'Choose File'}
                    </Button>
                  </div>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Profile Avatar
                </label>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarPreview || artistData.avatarUrl} alt={profileData.displayName} />
                      <AvatarFallback className="text-xl">{profileData.displayName[0]}</AvatarFallback>
                    </Avatar>
                    {avatarFile && (
                      <div className="absolute -top-1 -right-1 bg-green-600 text-white text-xs px-1 py-0.5 rounded-full">
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div 
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                      className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-[#CBED6E] transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-sm text-gray-300 font-bold">◉</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {avatarFile ? `Selected: ${avatarFile.name}` : 'Upload new avatar'}
                      </p>
                      <p className="text-xs text-gray-500">Recommended: 400x400px, JPG or PNG</p>
                      <Button variant="outline" className="mt-2 text-xs">
                        {avatarFile ? 'Change File' : 'Choose File'}
                      </Button>
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Bio/Story
                </label>
                <textarea
                  value={profileData.story}
                  onChange={(e) => setProfileData(prev => ({ ...prev, story: e.target.value }))}
                  className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Cause
                  </label>
                  <input
                    type="text"
                    value={profileData.cause}
                    onChange={(e) => setProfileData(prev => ({ ...prev, cause: e.target.value }))}
                    className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">Subscription Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Monthly Subscription Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={profileData.subscriptionPrice}
                  onChange={(e) => setProfileData(prev => ({ ...prev, subscriptionPrice: parseFloat(e.target.value) }))}
                  className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-3">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 