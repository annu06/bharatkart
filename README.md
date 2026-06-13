# 🛒 BharatKart - Hyperlocal Grocery Delivery Platform

India's most advanced hyperlocal grocery delivery platform. Order from nearby kirana stores with real-time tracking and delivery in 10-60 minutes.

## Architecture

```
bharatkart/
├── apps/
│   ├── web/          # Next.js 14 Frontend (Vercel)
│   └── api/          # NestJS Backend (Railway)
├── packages/         # Shared packages
├── docker-compose.yml
└── package.json      # Workspace root
```

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - Global state management
- **React Query** - Server state & caching
- **Socket.IO Client** - Real-time tracking
- **Framer Motion** - Animations
- **NextAuth.js** - Authentication (Google + OTP)

### Backend
- **NestJS** - Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching & sessions
- **Socket.IO** - WebSocket real-time communication
- **Razorpay** - Payment gateway
- **Google Maps API** - Geocoding, routing, distance

### Infrastructure
- **Vercel** - Frontend hosting (CDN, Edge)
- **Railway** - Backend hosting (auto-scaling)
- **Docker** - Local development
- **AWS** - Enterprise scale (optional)

## Features

### Customer App
- 📱 Mobile-first responsive design (PWA)
- 🔐 Google Auth + OTP login
- 📍 GPS-based store discovery
- 🔍 Multilingual search (English, Hindi, Telugu, Tamil)
- 🛒 Real-time cart with price breakdown
- 💳 Razorpay payments (UPI, Cards, Wallets, COD)
- 📦 Swiggy-style live order tracking
- ⭐ Ratings & reviews

### Merchant Dashboard
- 📊 Real-time order management
- 📦 Inventory management with low-stock alerts
- 📈 Revenue analytics
- 🏷️ Offers & promotions engine
- 📋 Bulk CSV product upload

### Delivery Partner App
- 🗺️ Turn-by-turn navigation
- 📍 Multi-order route optimization
- 💰 Earnings dashboard
- 📅 Shift scheduling
- 🔔 Real-time order notifications

### Admin Panel
- 👥 User management
- 🏪 Store approvals
- 📊 Revenue tracking & analytics
- 🎫 Dispute handling
- 📈 Real-time platform metrics

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Google Cloud account (for Maps API)
- Razorpay account

### 1. Clone & Install
```bash
git clone <repository-url>
cd bharatkart
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Start Infrastructure
```bash
docker-compose up -d
```

### 4. Start Development
```bash
# Terminal 1: Backend
npm run dev:api

# Terminal 2: Frontend
npm run dev:web
```

### 5. Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api/v1
- Swagger Docs: http://localhost:4000/api/docs

## Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel deploy --prod
```

### Backend (Railway)
```bash
cd apps/api
railway up
```

### Environment Variables
Set these in Vercel/Railway dashboards:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `RAZORPAY_KEY_ID` - Razorpay key
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key

## API Endpoints

### Auth
- `POST /api/v1/auth/send-otp` - Send OTP
- `POST /api/v1/auth/verify-otp` - Verify OTP & login
- `POST /api/v1/auth/google` - Google OAuth

### Stores
- `GET /api/v1/stores/nearby?lat=&lng=` - Nearby stores
- `GET /api/v1/stores/:id` - Store details
- `GET /api/v1/stores/search?q=` - Search stores

### Products
- `GET /api/v1/products/store/:storeId` - Store products
- `GET /api/v1/products/search?q=` - Search products

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/my` - My orders
- `PUT /api/v1/orders/:id/status` - Update status

### Payments
- `POST /api/v1/payments/create-order` - Initiate payment
- `POST /api/v1/payments/verify` - Verify payment

### Real-Time (WebSocket)
- `join:order` - Join order tracking room
- `rider:location` - Receive rider location updates
- `order:status` - Receive order status updates
- `order:eta` - Receive ETA updates

## Scaling Strategy

- **Database**: PostgreSQL with read replicas, connection pooling (PgBouncer)
- **Caching**: Redis cluster for sessions, cart, hot data
- **Search**: Elasticsearch for product discovery
- **Real-time**: Socket.IO with Redis adapter for horizontal scaling
- **CDN**: Vercel Edge for static assets and SSR
- **Queues**: Bull/BullMQ for async job processing
- **Monitoring**: DataDog/New Relic for observability

## License

Private - All rights reserved.
