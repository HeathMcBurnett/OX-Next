'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { messages } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'

interface FanMessagesProps {
  artistData: any
}

export function FanMessages({ artistData }: FanMessagesProps) {
  const [showComposeForm, setShowComposeForm] = useState(false)
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
    sendToAll: true
  })

  // Filter messages to this artist
  const artistMessages = messages.filter(m => m.fromId === artistData.id)

  const handleSendMessage = () => {
    alert(`Sending message to ${newMessage.sendToAll ? 'all subscribers' : 'selected fans'}: "${newMessage.subject}"`)
    setShowComposeForm(false)
    setNewMessage({ subject: '', content: '', sendToAll: true })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Fan Messages</h1>
          <p className="text-gray-300">Communicate directly with your subscribers</p>
        </div>
        <Button onClick={() => setShowComposeForm(true)}>
          Compose Message
        </Button>
      </div>

      {/* Compose Message Form */}
      {showComposeForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Compose New Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Send To
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={newMessage.sendToAll}
                    onChange={() => setNewMessage(prev => ({ ...prev, sendToAll: true }))}
                    className="text-[#CBED6E] focus:ring-[#CBED6E]"
                  />
                  <span className="text-gray-300">All Subscribers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={!newMessage.sendToAll}
                    onChange={() => setNewMessage(prev => ({ ...prev, sendToAll: false }))}
                    className="text-[#CBED6E] focus:ring-[#CBED6E]"
                  />
                  <span className="text-gray-300">Selected Fans</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                placeholder="Enter message subject..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Message
              </label>
              <textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent resize-none"
                rows={4}
                placeholder="Write your message to fans..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <Button onClick={handleSendMessage} disabled={!newMessage.subject.trim() || !newMessage.content.trim()}>
                Send Message
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowComposeForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-sm text-gray-400">Messages Sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-[#CBED6E]">89%</div>
            <div className="text-sm text-gray-400">Open Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-400">23</div>
            <div className="text-sm text-gray-400">Replies Received</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {artistMessages.length > 0 ? (
            <div className="space-y-4">
              {artistMessages.map((message) => (
                <div key={message.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#CBED6E] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">M</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Broadcast Message</h4>
                        <p className="text-xs text-gray-400">{formatRelativeTime(message.createdAt)}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded border border-green-700">
                      Delivered
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{message.content}</p>
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                    <span>Sent to: All Subscribers</span>
                    <span>•</span>
                    <span>Opens: 156</span>
                    <span>•</span>
                    <span>Replies: 8</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-300 font-bold">MSG</span>
              </div>
              <h3 className="text-lg font-medium text-white">No messages sent yet</h3>
              <p className="text-gray-400 mt-2">Start connecting with your fans by sending your first message</p>
              <Button className="mt-4" onClick={() => setShowComposeForm(true)}>
                Send Your First Message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 