'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { posts } from '@/lib/mockData'
import { formatRelativeTime } from '@/lib/utils'

interface ContentManagerProps {
  artistData: any
}

export function ContentManager({ artistData }: ContentManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    contentType: 'text' as 'text' | 'image' | 'video' | 'audio'
  })

  const artistPosts = posts.filter(p => p.artistId === artistData.id)

  const handleCreatePost = () => {
    // In a real app, this would call an API
    alert(`Creating ${newPost.contentType} post: "${newPost.title}"`)
    setShowCreateForm(false)
    setNewPost({ title: '', content: '', contentType: 'text' })
  }

  const contentTypes = [
    { id: 'text', label: 'Text Post' },
    { id: 'image', label: 'Image Post' },
    { id: 'video', label: 'Video Post' },
    { id: 'audio', label: 'Audio Post' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Manager</h1>
          <p className="text-gray-300">Create and manage your posts for subscribers</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          Create New Post
        </Button>
      </div>

      {/* Create Post Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Content Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    onClick={() => setNewPost(prev => ({ ...prev, contentType: type.id as any }))}
                    variant={newPost.contentType === type.id ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent"
                placeholder="Enter post title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Content
              </label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBED6E] focus:border-transparent resize-none"
                rows={4}
                placeholder="Write your post content..."
              />
            </div>

            {newPost.contentType !== 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Upload {newPost.contentType === 'image' ? 'Image' : newPost.contentType === 'video' ? 'Video' : 'Audio'}
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                                     <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                     <span className="text-2xl text-gray-300 font-bold">
                       {newPost.contentType === 'image' ? '◉' :
                        newPost.contentType === 'video' ? '▶' :
                        newPost.contentType === 'audio' ? '♪' : 'P'}
                     </span>
                   </div>
                  <p className="text-gray-400 mb-4">Drag and drop your file here, or click to browse</p>
                  <Button variant="outline" className="text-sm">
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Button onClick={handleCreatePost} disabled={!newPost.title.trim()}>
                Publish Post
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Your Posts ({artistPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {artistPosts.length > 0 ? (
            <div className="space-y-4">
              {artistPosts.map((post) => (
                <div key={post.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded font-bold">
                          {post.contentType === 'text' ? 'T' : 
                           post.contentType === 'image' ? '◉' :
                           post.contentType === 'video' ? '▶' :
                           post.contentType === 'audio' ? '♪' : 'P'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatRelativeTime(post.createdAt)}
                        </span>
                      </div>
                      <h4 className="font-medium text-white mb-2">{post.title}</h4>
                      <p className="text-gray-300 text-sm line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                        <span>{post.likesCount} likes</span>
                        <span>{post.commentsCount} comments</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" className="text-xs">
                        Edit
                      </Button>
                      <Button variant="outline" className="text-xs text-red-400">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-gray-300 font-bold">+</span>
              </div>
              <h3 className="text-lg font-medium text-white">No posts yet</h3>
              <p className="text-gray-400 mt-2">Create your first post to start engaging with fans</p>
              <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
                Create Your First Post
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 