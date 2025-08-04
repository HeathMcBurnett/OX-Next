# Technical Requirements Document: Artist-Fan Subscription Platform

## 1. System Overview

### 1.1 Technical Architecture
- **Architecture Pattern**: Microservices with API Gateway
- **Communication**: RESTful APIs with potential GraphQL for complex queries
- **Data Storage**: PostgreSQL primary, Redis caching
- **File Storage**: Cloud-based object storage (AWS S3/Cloudinary)
- **Authentication**: JWT-based with refresh tokens
- **Deployment**: Containerized with Docker/Kubernetes

## 2. API Technical Specifications

### 2.1 Authentication API

#### POST /api/auth/login
```json
Request:
{
  "email": "string",
  "password": "string"
}

Response (200):
{
  "accessToken": "string",
  "refreshToken": "string",
  "user": {
    "id": "uuid",
    "email": "string",
    "role": "admin|artist|manager|fan",
    "profile": {}
  },
  "expiresIn": 3600
}

Error Responses:
401: { "error": "Invalid credentials" }
429: { "error": "Too many login attempts" }
```

#### POST /api/auth/refresh
```json
Request:
{
  "refreshToken": "string"
}

Response (200):
{
  "accessToken": "string",
  "expiresIn": 3600
}
```

### 2.2 User Management API

#### GET /api/users/profile
```json
Headers: { "Authorization": "Bearer <token>" }

Response (200):
{
  "id": "uuid",
  "email": "string",
  "role": "string",
  "firstName": "string",
  "lastName": "string",
  "avatarUrl": "string",
  "isActive": "boolean",
  "createdAt": "timestamp",
  "profile": {
    // Role-specific profile data
  }
}
```

#### PUT /api/users/profile
```json
Request:
{
  "firstName": "string",
  "lastName": "string",
  "avatarUrl": "string"
}

Response (200):
{
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

### 2.3 Artist Management API

#### GET /api/artists
```json
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- search: string
- status: "active|inactive|all"

Response (200):
{
  "artists": [
    {
      "id": "uuid",
      "username": "string",
      "displayName": "string",
      "bannerUrl": "string",
      "avatarUrl": "string",
      "story": "string",
      "location": "string",
      "cause": "string",
      "subscriptionPrice": "decimal",
      "subscriberCount": "number",
      "isVerified": "boolean",
      "createdAt": "timestamp"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

#### POST /api/artists (Admin only)
```json
Request:
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "displayName": "string",
  "subscriptionPrice": "decimal"
}

Response (201):
{
  "message": "Artist created successfully",
  "artist": { /* artist object */ },
  "invitationSent": "boolean"
}
```

### 2.4 Content Management API

#### POST /api/posts
```json
Request:
{
  "title": "string",
  "content": "string",
  "contentType": "text|image|video|audio",
  "mediaFiles": ["file1", "file2"], // File uploads
  "isPublished": "boolean",
  "scheduledAt": "timestamp|null"
}

Response (201):
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "contentType": "string",
  "mediaUrls": ["url1", "url2"],
  "isPublished": "boolean",
  "scheduledAt": "timestamp|null",
  "createdAt": "timestamp"
}
```

#### GET /api/posts
```json
Query Parameters:
- artistId: uuid (required for fans)
- page: number
- limit: number
- contentType: "text|image|video|audio|all"

Response (200):
{
  "posts": [
    {
      "id": "uuid",
      "artistId": "uuid",
      "artistName": "string",
      "artistAvatar": "string",
      "title": "string",
      "content": "string",
      "contentType": "string",
      "mediaUrls": ["url1", "url2"],
      "likesCount": "number",
      "commentsCount": "number",
      "isLiked": "boolean",
      "createdAt": "timestamp"
    }
  ],
  "pagination": { /* pagination object */ }
}
```

### 2.5 Subscription API

#### POST /api/subscriptions/create
```json
Request:
{
  "artistId": "uuid",
  "priceId": "string" // Stripe price ID
}

Response (200):
{
  "sessionId": "string", // Stripe checkout session ID
  "url": "string" // Redirect URL to Stripe checkout
}
```

#### GET /api/subscriptions/my-subscriptions
```json
Response (200):
{
  "subscriptions": [
    {
      "id": "uuid",
      "artistId": "uuid",
      "artistName": "string",
      "artistAvatar": "string",
      "status": "active|cancelled|past_due",
      "amount": "decimal",
      "startedAt": "timestamp",
      "nextBillingDate": "timestamp",
      "cancelAtPeriodEnd": "boolean"
    }
  ]
}
```

#### POST /api/webhooks/stripe
```json
Request: Stripe webhook payload

Response (200):
{
  "received": true
}

Webhook Events to Handle:
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

## 3. Database Schema Specifications

### 3.1 Primary Tables

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE user_role AS ENUM ('admin', 'artist', 'manager', 'fan');
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### artist_profiles
```sql
CREATE TABLE artist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  banner_url TEXT,
  avatar_url TEXT,
  story TEXT,
  location VARCHAR(100),
  cause VARCHAR(200),
  subscription_price DECIMAL(10,2),
  stripe_account_id VARCHAR(255),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_artist_profiles_username ON artist_profiles(username);
CREATE INDEX idx_artist_profiles_user_id ON artist_profiles(user_id);
```

#### posts
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artist_profiles(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(200),
  content TEXT,
  content_type content_type_enum NOT NULL,
  media_urls JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  scheduled_at TIMESTAMP,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE content_type_enum AS ENUM ('text', 'image', 'video', 'audio');
CREATE INDEX idx_posts_artist_id ON posts(artist_id);
CREATE INDEX idx_posts_published ON posts(is_published, published_at);
CREATE INDEX idx_posts_scheduled ON posts(scheduled_at) WHERE scheduled_at IS NOT NULL;
```

#### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fan_id UUID REFERENCES users(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artist_profiles(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  status subscription_status DEFAULT 'active',
  amount DECIMAL(10,2),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ends_at TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due', 'incomplete');
CREATE INDEX idx_subscriptions_fan_id ON subscriptions(fan_id);
CREATE INDEX idx_subscriptions_artist_id ON subscriptions(artist_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE UNIQUE INDEX idx_subscriptions_fan_artist ON subscriptions(fan_id, artist_id) 
  WHERE status = 'active';
```

### 3.2 Relationship Tables

#### team_members
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artist_profiles(id) ON DELETE CASCADE,
  manager_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'manager',
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_team_members_artist_manager ON team_members(artist_id, manager_id);
```

#### post_likes
```sql
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_post_likes_post_user ON post_likes(post_id, user_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
```

#### post_comments
```sql
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX idx_post_comments_user_id ON post_comments(user_id);
```

## 4. File Upload Specifications

### 4.1 Media Upload Requirements
```javascript
// Image uploads
const imageConfig = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxSize: '10MB',
  resolutions: {
    thumbnail: '200x200',
    medium: '800x600',
    large: '1920x1080'
  },
  quality: 85
};

// Video uploads
const videoConfig = {
  allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  maxSize: '500MB',
  maxDuration: '600s', // 10 minutes
  resolutions: ['720p', '1080p'],
  compression: 'h264'
};

// Audio uploads
const audioConfig = {
  allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  maxSize: '100MB',
  maxDuration: '1800s', // 30 minutes
  bitRate: '192kbps'
};
```

### 4.2 File Upload Flow
```javascript
// 1. Client requests upload URL
POST /api/uploads/presigned-url
{
  "fileName": "string",
  "fileType": "string",
  "fileSize": "number"
}

// 2. Server responds with presigned URL
{
  "uploadUrl": "string",
  "fileKey": "string",
  "expiresIn": 3600
}

// 3. Client uploads directly to cloud storage
PUT uploadUrl
Body: file binary

// 4. Client confirms upload completion
POST /api/uploads/confirm
{
  "fileKey": "string",
  "metadata": {
    "originalName": "string",
    "size": "number",
    "duration": "number" // for video/audio
  }
}
```

## 5. Security Specifications

### 5.1 Authentication & Authorization
```javascript
// JWT Token Structure
{
  "sub": "user_id",
  "role": "user_role",
  "email": "user_email",
  "iat": "issued_at",
  "exp": "expires_at",
  "permissions": ["permission1", "permission2"]
}

// Role-based permissions matrix
const permissions = {
  admin: ['*'], // All permissions
  artist: [
    'posts:create',
    'posts:edit:own',
    'posts:delete:own',
    'profile:edit:own',
    'team:manage',
    'analytics:view:own'
  ],
  manager: [
    'posts:create:assigned',
    'posts:edit:assigned',
    'posts:delete:assigned',
    'profile:edit:assigned',
    'analytics:view:assigned'
  ],
  fan: [
    'posts:view:subscribed',
    'posts:like',
    'posts:comment',
    'profile:edit:own',
    'subscriptions:manage:own'
  ]
};
```

### 5.2 Rate Limiting
```javascript
const rateLimits = {
  auth: {
    login: '5 requests per 15 minutes per IP',
    register: '3 requests per hour per IP',
    passwordReset: '3 requests per hour per email'
  },
  api: {
    general: '1000 requests per hour per user',
    uploads: '50 uploads per hour per user',
    posts: '100 posts per day per artist'
  },
  webhooks: {
    stripe: '1000 requests per hour per endpoint'
  }
};
```

### 5.3 Input Validation
```javascript
// Post creation validation
const postValidation = {
  title: {
    required: false,
    maxLength: 200,
    sanitize: true
  },
  content: {
    required: true,
    maxLength: 5000,
    sanitize: true,
    allowedTags: ['p', 'br', 'strong', 'em', 'a']
  },
  contentType: {
    required: true,
    enum: ['text', 'image', 'video', 'audio']
  },
  scheduledAt: {
    required: false,
    type: 'datetime',
    futureOnly: true
  }
};
```

## 6. Integration Requirements

### 6.1 Stripe Integration
```javascript
// Required Stripe Products
const stripeSetup = {
  products: [
    {
      name: 'Artist Subscription',
      type: 'recurring',
      billing_scheme: 'per_unit'
    }
  ],
  
  webhookEvents: [
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_succeeded',
    'invoice.payment_failed',
    'customer.subscription.trial_will_end'
  ],
  
  configuration: {
    currency: 'usd',
    paymentMethods: ['card'],
    allowPromotionCodes: true,
    collectBillingAddress: true
  }
};
```

### 6.2 Email Service Integration
```javascript
// Email templates required
const emailTemplates = {
  welcome: {
    subject: 'Welcome to [Platform Name]',
    variants: ['artist', 'manager', 'fan', 'admin']
  },
  
  invitation: {
    subject: 'You\'re invited to join [Platform Name]',
    variants: ['artist', 'manager']
  },
  
  subscriptionConfirmation: {
    subject: 'Subscription confirmed for {artistName}',
    recipients: ['fan']
  },
  
  newContent: {
    subject: 'New content from {artistName}',
    recipients: ['fan'],
    digest: true // Can be sent as daily digest
  },
  
  paymentFailed: {
    subject: 'Payment failed for your subscription',
    recipients: ['fan'],
    urgency: 'high'
  }
};
```

### 6.3 Push Notification Requirements
```javascript
const notificationTypes = {
  newPost: {
    title: '{artistName} posted new content',
    body: '{postTitle}',
    actions: ['View', 'Like'],
    recipients: 'subscribers'
  },
  
  newComment: {
    title: 'New comment on your post',
    body: '{commenterName}: {commentPreview}',
    recipients: 'post_author'
  },
  
  subscriptionExpiring: {
    title: 'Your subscription expires soon',
    body: 'Renew to keep access to {artistName}',
    schedule: '3 days before expiration',
    recipients: 'subscribers'
  },
  
  paymentIssue: {
    title: 'Payment failed',
    body: 'Update your payment method',
    urgency: 'high',
    recipients: 'affected_subscribers'
  }
};
```

## 7. Performance Requirements

### 7.1 Response Time Targets
- **Authentication**: < 500ms
- **Content Feed**: < 1s
- **Image Upload**: < 30s
- **Video Upload**: < 5 minutes
- **Database Queries**: < 100ms (95th percentile)
- **API Gateway**: < 50ms overhead

### 7.2 Caching Strategy
```javascript
const cachingRules = {
  userSessions: {
    store: 'redis',
    ttl: '24 hours'
  },
  
  artistProfiles: {
    store: 'redis',
    ttl: '1 hour',
    invalidation: 'on_update'
  },
  
  postFeeds: {
    store: 'redis',
    ttl: '15 minutes',
    invalidation: 'on_new_post'
  },
  
  staticAssets: {
    store: 'cdn',
    ttl: '1 year',
    versioning: true
  }
};
```

### 7.3 Database Performance
```sql
-- Required indexes for performance
CREATE INDEX CONCURRENTLY idx_posts_artist_published 
ON posts(artist_id, is_published, published_at DESC);

CREATE INDEX CONCURRENTLY idx_subscriptions_active 
ON subscriptions(artist_id, status) WHERE status = 'active';

CREATE INDEX CONCURRENTLY idx_posts_feed 
ON posts(artist_id, published_at DESC) WHERE is_published = true;

-- Partitioning strategy for large tables
CREATE TABLE posts_y2024 PARTITION OF posts 
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

## 8. Monitoring & Observability

### 8.1 Application Metrics
```javascript
const metricsToTrack = {
  business: [
    'user_registrations_total',
    'subscriptions_created_total',
    'subscriptions_cancelled_total',
    'posts_created_total',
    'revenue_total'
  ],
  
  technical: [
    'api_request_duration_seconds',
    'api_request_total',
    'database_query_duration_seconds',
    'file_upload_duration_seconds',
    'error_rate_percent'
  ],
  
  infrastructure: [
    'cpu_usage_percent',
    'memory_usage_percent',
    'disk_usage_percent',
    'network_io_bytes'
  ]
};
```

### 8.2 Health Check Endpoints
```javascript
// GET /health
{
  "status": "healthy|degraded|unhealthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "stripe": "healthy",
    "storage": "healthy"
  },
  "version": "1.0.0"
}
```

## 9. Deployment Specifications

### 9.1 Environment Configuration
```yaml
# Production environment variables
DATABASE_URL: encrypted
REDIS_URL: encrypted
JWT_SECRET: encrypted
STRIPE_SECRET_KEY: encrypted
STRIPE_WEBHOOK_SECRET: encrypted
AWS_ACCESS_KEY_ID: encrypted
AWS_SECRET_ACCESS_KEY: encrypted
CLOUDINARY_API_SECRET: encrypted

# Feature flags
ENABLE_VIDEO_UPLOADS: true
ENABLE_COMMENTS: true
ENABLE_MESSAGING: false
ENABLE_ANALYTICS: true
```

### 8.2 Container Specifications
```dockerfile
# Production Dockerfile requirements
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1
USER node
CMD ["npm", "start"]
```

This technical requirements document provides the detailed specifications needed for development teams to implement the artist-fan subscription platform with clear API contracts, database schemas, and integration requirements. 