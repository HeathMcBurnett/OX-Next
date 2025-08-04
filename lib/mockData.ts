export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: 'admin' | 'artist' | 'manager' | 'fan';
  createdAt: string;
}

export interface Artist {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bannerUrl: string;
  avatarUrl: string;
  story: string;
  location: string;
  cause: string;
  subscriptionPrice: number;
  subscriberCount: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistUsername: string;
  title: string;
  content: string;
  contentType: 'text' | 'image' | 'video' | 'audio';
  mediaUrls: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  fanId: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  status: 'active' | 'cancelled' | 'past_due';
  amount: number;
  startedAt: string;
  nextBillingDate: string;
  cancelAtPeriodEnd: boolean;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  fromName: string;
  fromAvatar: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface ArtistCredentials {
  email: string;
  password: string;
  artistId: string;
}

export interface Invite {
  id: string;
  email: string;
  role: 'artist' | 'manager' | 'fan';
  status: 'pending' | 'accepted' | 'expired';
  invitedBy: string;
  createdAt: string;
  expiresAt: string;
}

// Current logged-in fan user
export const currentUser: User = {
  id: 'fan-1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'fan',
  createdAt: '2024-01-15T10:00:00Z'
};

// Admin users
export const adminUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@oxre.com',
    firstName: 'Sarah',
    lastName: 'Administrator',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616c9ce2f87?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Admin login credentials (in real app, passwords would be hashed)
export const adminCredentials: AdminCredentials[] = [
  {
    email: 'admin@oxre.com',
    password: 'admin123'
  }
];

// Artist login credentials (in real app, passwords would be hashed)
export const artistCredentials: ArtistCredentials[] = [
  {
    email: 'luna@example.com',
    password: 'artist123',
    artistId: 'luna-echo'
  },
  {
    email: 'neon@example.com',
    password: 'artist123',
    artistId: 'neon-waves'
  },
  {
    email: 'soul@example.com',
    password: 'artist123',
    artistId: 'soul-fire'
  },
  {
    email: 'rose@example.com',
    password: 'artist123',
    artistId: 'wild-rose'
  }
];

// All users (fans, artists, managers, admins)
export const allUsers: User[] = [
  currentUser,
  ...adminUsers,
  // Add more users as needed
  {
    id: 'user-artist-1',
    email: 'luna@example.com',
    firstName: 'Luna',
    lastName: 'Echo',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616c9ce2f87?w=150&h=150&fit=crop&crop=face',
    role: 'artist',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'user-artist-2',
    email: 'neon@example.com',
    firstName: 'Neon',
    lastName: 'Vibes',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'artist',
    createdAt: '2024-01-12T00:00:00Z'
  },
  {
    id: 'user-artist-3',
    email: 'soul@example.com',
    firstName: 'Soul',
    lastName: 'Fire',
    avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face',
    role: 'artist',
    createdAt: '2024-01-11T00:00:00Z'
  },
  {
    id: 'user-artist-4',
    email: 'rose@example.com',
    firstName: 'Wild',
    lastName: 'Rose',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'artist',
    createdAt: '2024-01-13T00:00:00Z'
  },
  {
    id: 'fan-2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'fan',
    createdAt: '2024-01-16T00:00:00Z'
  },
  {
    id: 'fan-3',
    email: 'mike@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'fan',
    createdAt: '2024-01-17T00:00:00Z'
  }
];

// Invites
export const invites: Invite[] = [
  {
    id: 'invite-1',
    email: 'newartist@example.com',
    role: 'artist',
    status: 'pending',
    invitedBy: 'admin-1',
    createdAt: '2024-01-20T10:00:00Z',
    expiresAt: '2024-01-27T10:00:00Z'
  },
  {
    id: 'invite-2',
    email: 'manager@example.com',
    role: 'manager',
    status: 'accepted',
    invitedBy: 'admin-1',
    createdAt: '2024-01-18T14:00:00Z',
    expiresAt: '2024-01-25T14:00:00Z'
  }
];

// Mock artists
export const artists: Artist[] = [
  {
    id: 'luna-echo',
    userId: 'user-artist-1',
    displayName: 'Luna Echo',
    username: 'lunaecho',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616c9ce2f87?w=400&h=400&fit=crop&crop=face',
    bannerUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=200&fit=crop',
    isVerified: true,
    story: 'Indie singer-songwriter crafting ethereal melodies that connect souls across the universe. My music explores themes of love, loss, and cosmic wonder.',
    location: 'Portland, OR',
    cause: 'Mental Health Awareness',
    subscriberCount: 2847,
    subscriptionPrice: 8.99,
    createdAt: '2023-08-12T14:30:00Z'
  },
  {
    id: 'neon-waves',
    userId: 'user-artist-2',
    displayName: 'Neon Waves',
    username: 'neonwaves',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bannerUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=200&fit=crop',
    isVerified: true,
    story: 'Electronic music producer creating synthwave and cyberpunk soundscapes. Each track tells a story of neon-lit futures and digital dreams.',
    location: 'Los Angeles, CA',
    cause: 'Digital Arts Education',
    subscriberCount: 1923,
    subscriptionPrice: 8.99,
    createdAt: '2023-09-22T11:15:00Z'
  },
  {
    id: 'soul-fire',
    userId: 'user-artist-3',
    displayName: 'Soul Fire',
    username: 'soulfire',
    avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face',
    bannerUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=200&fit=crop',
    isVerified: true,
    story: 'R&B and neo-soul artist spreading positive vibes through powerful vocals and meaningful lyrics. Music that heals and inspires.',
    location: 'Atlanta, GA',
    cause: 'Youth Music Programs',
    subscriberCount: 4521,
    subscriptionPrice: 8.99,
    createdAt: '2023-07-08T16:45:00Z'
  },
  {
    id: 'wild-rose',
    userId: 'user-artist-4',
    displayName: 'Wild Rose',
    username: 'wildrose',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bannerUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=200&fit=crop',
    isVerified: false,
    story: 'Folk and country artist sharing stories from the heart. My songs are painted with experiences of small-town life and big dreams.',
    location: 'Nashville, TN',
    cause: 'Rural Community Support',
    subscriberCount: 1654,
    subscriptionPrice: 8.99,
    createdAt: '2023-10-14T09:20:00Z'
  }
];

// Mock posts from subscribed artists
export const posts: Post[] = [
  {
    id: 'post-1',
    artistId: 'luna-echo',
    artistName: 'Luna Echo',
    artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face',
    artistUsername: 'lunaecho',
    title: 'New Song: "Stardust Dreams"',
    content: 'Just finished recording my latest track "Stardust Dreams" in my home studio. This song is about finding hope in the darkest moments and remembering that we\'re all made of the same cosmic material. ✨🎵',
    contentType: 'audio',
    mediaUrls: ['https://example.com/audio/stardust-dreams.mp3'],
    likesCount: 89,
    commentsCount: 23,
    isLiked: true,
    createdAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'post-2',
    artistId: 'neon-waves',
    artistName: 'Neon Waves',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    artistUsername: 'neonwaves',
    title: 'Behind the Scenes: Studio Setup',
    content: 'Take a look at my new modular synth setup! Just added a Moog Mother-32 to the collection. The possibilities are endless! 🎛️',
    contentType: 'image',
    mediaUrls: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'],
    likesCount: 156,
    commentsCount: 42,
    isLiked: false,
    createdAt: '2024-01-19T12:45:00Z'
  },
  {
    id: 'post-3',
    artistId: 'luna-echo',
    artistName: 'Luna Echo',
    artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face',
    artistUsername: 'lunaecho',
    title: 'Live Performance Announcement',
    content: 'Exciting news! I\'ll be performing live at the Moonlight Cafe next Friday at 8 PM. It\'s going to be an intimate acoustic set with some new unreleased songs. Hope to see some of you there! 🌙',
    contentType: 'text',
    mediaUrls: [],
    likesCount: 234,
    commentsCount: 67,
    isLiked: true,
    createdAt: '2024-01-18T20:15:00Z'
  },
  {
    id: 'post-4',
    artistId: 'soul-fire',
    artistName: 'Soul Fire',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    artistUsername: 'soulfire',
    title: 'Music Video: "Rise Up"',
    content: 'The official music video for "Rise Up" is finally here! This song means everything to me - it\'s about overcoming adversity and lifting each other up. Directed by the amazing @creativevisions team.',
    contentType: 'video',
    mediaUrls: ['https://example.com/video/rise-up.mp4'],
    likesCount: 342,
    commentsCount: 89,
    isLiked: true,
    createdAt: '2024-01-17T14:20:00Z'
  },
  {
    id: 'post-5',
    artistId: 'neon-waves',
    artistName: 'Neon Waves',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    artistUsername: 'neonwaves',
    title: 'Remix Contest Winner',
    content: 'Congratulations to @beatmaker_official for winning our remix contest! Your version of "Digital Horizon" was absolutely incredible. Check out the winning remix below! 🏆',
    contentType: 'audio',
    mediaUrls: ['https://example.com/audio/digital-horizon-remix.mp3'],
    likesCount: 198,
    commentsCount: 51,
    isLiked: false,
    createdAt: '2024-01-16T10:30:00Z'
  },
  {
    id: 'post-6',
    artistId: 'soul-fire',
    artistName: 'Soul Fire',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    artistUsername: 'soulfire',
    title: 'Community Spotlight',
    content: 'Want to give a shoutout to all the young musicians in our community program! Your passion and talent continue to inspire me every day. Keep creating, keep dreaming! 💫',
    contentType: 'image',
    mediaUrls: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'],
    likesCount: 445,
    commentsCount: 134,
    isLiked: true,
    createdAt: '2024-01-15T16:45:00Z'
  }
];

// Mock comments
export const comments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    userId: 'fan-2',
    userName: 'Sarah M.',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'This song gives me chills every time! Your voice is absolutely magical ✨',
    createdAt: '2024-01-20T16:45:00Z'
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    userId: 'fan-3',
    userName: 'Alex R.',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Can\'t stop listening to this! When will it be available on Spotify?',
    createdAt: '2024-01-20T17:20:00Z'
  },
  {
    id: 'comment-3',
    postId: 'post-3',
    userId: 'fan-4',
    userName: 'Maria L.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face',
    content: 'I\'ll definitely be there! Your acoustic performances are the best 🎸',
    createdAt: '2024-01-18T21:10:00Z'
  }
];

// Mock subscriptions for current user
export const subscriptions: Subscription[] = [
  {
    id: 'sub-1',
    fanId: 'fan-1',
    artistId: 'luna-echo',
    artistName: 'Luna Echo',
    artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    amount: 8.99,
    startedAt: '2024-01-01T00:00:00Z',
    nextBillingDate: '2024-02-01T00:00:00Z',
    cancelAtPeriodEnd: false
  },
  {
    id: 'sub-2',
    fanId: 'fan-1',
    artistId: 'neon-waves',
    artistName: 'Neon Waves',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    amount: 8.99,
    startedAt: '2023-12-15T00:00:00Z',
    nextBillingDate: '2024-01-15T00:00:00Z',
    cancelAtPeriodEnd: false
  },
  {
    id: 'sub-3',
    fanId: 'fan-1',
    artistId: 'soul-fire',
    artistName: 'Soul Fire',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    amount: 8.99,
    startedAt: '2023-11-20T00:00:00Z',
    nextBillingDate: '2024-01-20T00:00:00Z',
    cancelAtPeriodEnd: false
  }
];

// Mock messages from artists
export const messages: Message[] = [
  {
    id: 'msg-1',
    fromId: 'luna-echo',
    toId: 'fan-1',
    fromName: 'Luna Echo',
    fromAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face',
    content: 'Thank you so much for your continued support! Your comments always brighten my day 💫',
    createdAt: '2024-01-19T10:30:00Z',
    isRead: true
  },
  {
    id: 'msg-2',
    fromId: 'soul-fire',
    toId: 'fan-1',
    fromName: 'Soul Fire',
    fromAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    content: 'Hey! I saw you\'ve been a subscriber for a while now. I\'m working on something special for my long-time fans - stay tuned! 🔥',
    createdAt: '2024-01-18T14:15:00Z',
    isRead: false
  },
  {
    id: 'msg-3',
    fromId: 'neon-waves',
    toId: 'fan-1',
    fromName: 'Neon Waves',
    fromAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'New track dropping this Friday! You\'ll get early access as a subscriber 🎵',
    createdAt: '2024-01-17T16:45:00Z',
    isRead: true
  }
];

// Helper functions
export const getSubscribedArtists = () => {
  const subscribedArtistIds = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => sub.artistId);
  
  return artists.filter(artist => subscribedArtistIds.includes(artist.id));
};

export const getSubscribedPosts = () => {
  const subscribedArtistIds = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => sub.artistId);
  
  return posts
    .filter(post => subscribedArtistIds.includes(post.artistId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getUnsubscribedArtists = () => {
  const subscribedArtistIds = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => sub.artistId);
  
  return artists.filter(artist => !subscribedArtistIds.includes(artist.id));
};

export const getCommentsForPost = (postId: string) => {
  return comments
    .filter(comment => comment.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const getUnreadMessages = () => {
  return messages.filter(msg => !msg.isRead);
}; 