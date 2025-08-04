# ArtistFan - Fan Experience Frontend

A modern Next.js application showcasing the fan experience for an artist-fan subscription platform. This demo includes both the main fan dashboard and a comprehensive user onboarding flow.

## 🌟 Features

### Fan Dashboard
- **Content Feed**: View exclusive posts from subscribed artists (images, videos, audio, text)
- **Artist Discovery**: Browse and subscribe to new artists with Stripe integration simulation
- **Subscription Management**: View, cancel, and manage monthly subscriptions
- **Direct Messaging**: Receive personal messages from artists and their teams
- **Responsive Design**: Optimized for desktop and mobile devices

### User Onboarding Flow
- **Artist Discovery**: Choose first artist to subscribe to
- **Stripe Checkout**: Complete payment flow simulation  
- **Success Confirmation**: Welcome experience with next steps

### Interactive Features
- Like and comment on posts
- Real-time messaging with artists
- Subscription management with Stripe integration simulation
- Notification system for new content and messages
- Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd artist-fan-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Demo Flows

#### Main Fan Dashboard
- Visit the home page to see the full fan experience
- Navigate between Feed, Discover, Subscriptions, and Messages tabs
- Interact with posts, manage subscriptions, and view messages

#### Artist Selection Flow
- Click "Try Artist Selection Flow" button on the home page
- Or visit `/onboarding` directly
- Complete the streamlined journey from artist selection to subscription

## 📱 UI Components

The application uses a custom component library built with:
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: Radix UI primitives for accessibility
- **Icons**: Text-based symbols and labels for consistency and accessibility

### File Structure

```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   └── dialog.tsx
├── fan/                   # Fan experience components
│   ├── FanDashboard.tsx
│   ├── FanNavbar.tsx
│   ├── ContentFeed.tsx
│   ├── Sidebar.tsx
│   ├── DiscoverArtists.tsx
│   ├── Subscriptions.tsx
│   └── Messages.tsx
└── onboarding/            # User onboarding flow
    ├── OnboardingFlow.tsx
    ├── ArtistDiscovery.tsx
    ├── SubscriptionCheckout.tsx
    └── WelcomeSuccess.tsx
```

## 🎨 Design System

- **Primary Color**: Blue (#2563EB)
- **Success Color**: Green (#10B981)
- **Warning Color**: Yellow (#F59E0B)
- **Error Color**: Red (#EF4444)
- **Typography**: System fonts with clear hierarchy
- **Spacing**: Consistent 4px grid system
- **Border Radius**: 8px for cards, 4px for inputs

## 🏗️ Technical Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React useState hooks for local state
- **Data**: Mock data file simulating API responses
- **Components**: Modular, reusable component architecture

## 👥 User Personas

### Primary User: Music Fan
- Age: 18-35
- Wants exclusive content from favorite artists
- Values direct connection with creators
- Willing to pay for premium experiences

### Use Cases
1. **Content Discovery**: Browse and discover new artists
2. **Subscription Management**: Subscribe to multiple artists
3. **Content Consumption**: View exclusive posts and media
4. **Artist Interaction**: Receive messages and updates

## 🔮 Future Enhancements

- Real-time notifications
- Mobile app (React Native)
- Advanced search and filtering
- Social features (friend connections)
- Live streaming integration
- Creator collaboration tools

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Mock Data

The application uses a comprehensive mock data file (`lib/mockData.ts`) that simulates:
- User profiles and authentication
- Artist profiles and content
- Subscription data
- Message threads
- Post interactions (likes, comments)

### Component Guidelines

- All components use TypeScript interfaces
- Follow the established naming conventions
- Use Tailwind CSS for styling
- Implement proper accessibility features
- Include proper error handling and loading states

---

This frontend application demonstrates a complete fan experience with professional UI/UX design, comprehensive onboarding, and realistic subscription management workflows. 