'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { messages } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'

export function Messages() {
  const [userMessages, setUserMessages] = useState(messages)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const markAsRead = (messageId: string) => {
    setUserMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isRead: true }
          : msg
      )
    )
  }

  const deleteMessage = (messageId: string) => {
    const confirmed = confirm('Are you sure you want to delete this message?')
    if (confirmed) {
      setUserMessages(prev => prev.filter(msg => msg.id !== messageId))
    }
  }

  const handleStartReply = (messageId: string) => {
    setReplyingTo(messageId)
    setReplyText('')
    
    // Auto-select the message and mark as read if not already
    setSelectedMessage(messageId)
    const message = userMessages.find(msg => msg.id === messageId)
    if (message && !message.isRead) {
      markAsRead(messageId)
    }
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setReplyText('')
  }

  const handleReplyChange = (value: string) => {
    setReplyText(value)
  }

  const handleSubmitReply = (messageId: string) => {
    if (replyText.trim()) {
      // In a real app, this would send the reply via API
      console.log('Reply sent to message:', messageId, 'Content:', replyText.trim())
      alert(`Reply sent: "${replyText.trim()}"`)
      handleCancelReply()
    }
  }

  const unreadCount = userMessages.filter(msg => !msg.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Messages</h2>
          <p className="mt-2 text-gray-300">Direct messages from your subscribed artists</p>
        </div>
        
        {unreadCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#CBED6E] text-black">
              {unreadCount} unread
            </span>
          </div>
        )}
      </div>

      {/* Messages List */}
      <div className="space-y-6">
        {userMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`cursor-pointer transition-all ${
              !message.isRead 
                ? 'border-[#CBED6E] bg-gray-900/50' 
                : 'hover:shadow-md hover:border-gray-600'
            } ${
              selectedMessage === message.id 
                ? 'ring-2 ring-[#CBED6E]' 
                : ''
            }`}
            onClick={() => {
              setSelectedMessage(selectedMessage === message.id ? null : message.id)
              if (!message.isRead) {
                markAsRead(message.id)
              }
            }}
          >
            <CardContent className="p-8 mt-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={message.fromAvatar} alt={message.fromName} />
                  <AvatarFallback>{message.fromName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-white text-lg">{message.fromName}</h3>
                      <span className="text-black text-xs bg-[#CBED6E] px-2 py-1 rounded font-medium">VERIFIED</span>
                      {!message.isRead && (
                        <span className="w-2 h-2 bg-[#CBED6E] rounded-full"></span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{formatRelativeTime(message.createdAt)}</span>
                  </div>
                  
                  <p className="text-gray-300 whitespace-pre-wrap">{message.content}</p>
                  
                  {selectedMessage === message.id && (
                    <div className="mt-4 pt-4 border-t border-gray-600 flex items-center space-x-2">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStartReply(message.id)
                        }}
                        className="text-sm"
                      >
                        Reply
                      </Button>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(message.id)
                        }}
                        variant="outline"
                        className="text-sm"
                        disabled={message.isRead}
                      >
                        {message.isRead ? 'Read' : 'Mark as Read'}
                      </Button>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteMessage(message.id)
                        }}
                        variant="outline"
                        className="text-red-400 border-red-700 hover:bg-red-900 text-sm"
                      >
                        Delete
                      </Button>
                    </div>
                  )}

                  {replyingTo === message.id && (
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-200">
                          Reply to {message.fromName}
                        </label>
                        <textarea
                          value={replyText}
                          onChange={(e) => handleReplyChange(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent resize-none"
                          rows={3}
                          autoFocus
                        />
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => handleSubmitReply(message.id)}
                            disabled={!replyText.trim()}
                            className="text-sm"
                          >
                            Send Reply
                          </Button>
                          <Button
                            onClick={handleCancelReply}
                            variant="outline"
                            className="text-sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {userMessages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-300 font-bold">MSG</span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">No messages yet</h3>
          <p className="mt-2 text-gray-400">Artists you subscribe to can send you exclusive messages and updates</p>
          <Button className="mt-4">
            Discover Artists
          </Button>
        </div>
      )}

      {/* Message Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">
            Message Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-600">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Get notified when artists send you messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBED6E]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CBED6E]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-600">
              <div>
                <p className="font-medium text-white">Push Notifications</p>
                <p className="text-sm text-gray-400">Get instant notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBED6E]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CBED6E]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-white">Message Archive</p>
                <p className="text-sm text-gray-400">Automatically archive messages older than 30 days</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBED6E]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CBED6E]"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 