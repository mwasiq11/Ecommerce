<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

# 🛒 MarketPlace Pro — Production-Grade E-Commerce Platform

A **full-stack e-commerce marketplace** built with the modern MERN stack. Users can browse products, search & filter with advanced criteria, manage a shopping cart, place orders, sell their own products, and manage their profile — all backed by a secure JWT-authenticated REST API with role-based access control.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Seeding](#database-seeding)
  - [Running Locally](#running-locally)
- [🔌 API Reference](#-api-reference)
- [🖥️ Frontend Pages](#️-frontend-pages)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [🛒 Shopping Cart](#-shopping-cart)
- [📦 Order Management](#-order-management)
- [🧑‍💼 Admin Panel](#-admin-panel)
- [☁️ Deployment](#️-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🛍️ Storefront & Product Browsing
- **Home page** with featured products, category navigation, and promotional banners
- **Advanced product search** — full-text search across title, description, brand, and category
- **Multi-criteria filtering** — by category, brand, condition, and price range
- **Flexible sorting** — by price (asc/desc), rating, or newest first
- **Product detail page** with image, seller info, stock availability, and related products

### 🛒 Cart & Checkout
- **Persistent shopping cart** stored in `localStorage` (no login required to add items)
- **Quantity management** with real-time price calculation
- **Full checkout flow** with shipping address and payment method selection
- **Order creation** with automatic total calculation

### 👤 User Accounts
- **Registration & Login** with secure password hashing (bcrypt, 10 rounds)
- **JWT authentication** with 7-day token expiry
- **Profile management** — update name, email, phone, address, and avatar
- **Profile picture upload** — base64 image storage directly in MongoDB
- **Persistent sessions** via `localStorage` token management

### 📦 Seller Features
- **Sell products** — any authenticated user can list products for sale
- **My Products dashboard** — manage your own listings (edit/delete)
- **Image upload** — base64 product image storage
- **Product fields** — title, price, original price, description, category, brand, condition, stock, shipping type

### 📬 Order Tracking
- **My Orders page** — view order history with status tracking
- **Order status lifecycle** — `pending` → `confirmed` → `shipped` → `delivered` → `cancelled`
- **Detailed order view** — shipping address, items, quantities, and totals

### 🧑‍💼 Admin Panel
- **User management** — view all users, delete users (admin-only)
- **Order management** — view all orders, update order status, delete orders
- **Product management** — oversee all products in the marketplace
- **Role-based access** — `admin` and `user` roles with middleware-enforced permissions

### 📄 Static Pages
- Favorites, Contact, About, User Agreement, Partnership, Privacy Policy
- Help center, Messages, Gift Boxes, Projects

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  React 19 + TypeScript + Vite + Tailwind CSS 4              │
│  ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐  │
│  │  Pages   │  │Components │  │ Services  │  │ Context  │  │
│  │ (Views)  │  │ (Layout)  │  │(API Layer)│  │  (Auth)  │  │
│  └────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬────┘  │
│       └───────────────┴──────────────┴──────────────┘       │
│                          │  HTTP (fetch)                     │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                        Backend                               │
│  Express 5 + Node.js (ES Modules)                            │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Routes  │→ │ Middleware │→ │Controllers│→ │  Models   │  │
│  │          │  │ (JWT Auth) │  │ (Logic)   │  │(Mongoose) │  │
│  └──────────┘  └────────────┘  └──────────┘  └─────┬─────┘  │
│                                                     │        │
└─────────────────────────────────────────────────────┼────────┘
                                                      │
                                                      ▼
                                              ┌──────────────┐
                                              │   MongoDB     │
                                              │  (Atlas /     │
                                              │   Local)      │
                                              └──────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI library with functional components & hooks |
| **TypeScript** | 5.8 | Type-safe development |
| **Vite** | 6 | Lightning-fast dev server & build tool |
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **React Router** | 7 | Client-side routing (HashRouter) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Express** | 5 | Web framework for REST API |
| **Mongoose** | 9 | MongoDB ODM with schema validation |
| **JSON Web Tokens** | 9 | Stateless authentication |
| **bcryptjs** | 3 | Password hashing (10-round salt) |
| **cors** | 2.8 | Cross-Origin Resource Sharing |
| **dotenv** | 17 | Environment variable management |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL document database |
| **MongoDB Atlas** | Cloud-hosted database (production) |

### DevOps & Tooling
| Tool | Purpose |
|---|---|
| **Nodemon** | Auto-restart dev server on file changes |
| **Vercel** | Serverless deployment for both frontend & backend |
| **ES Modules** | Modern `import/export` syntax throughout |

---

## 📂 Project Structure

```
Ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection (with caching)
│   │   │   └── env.js             # Environment variable loader
│   │   ├── controllers/
│   │   │   ├── user.controller.js     # Register, login, CRUD users
│   │   │   ├── product.controller.js  # CRUD products, search, seller products
│   │   │   └── order.controller.js    # CRUD orders, status management
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT verification & admin-only guard
│   │   ├── models/
│   │   │   ├── user.model.js      # User schema (name, email, avatar, role)
│   │   │   ├── product.model.js   # Product schema (with text index)
│   │   │   └── order.model.js     # Order schema (items, shipping, status)
│   │   ├── routes/
│   │   │   ├── user.routes.js     # /api/users/*
│   │   │   ├── product.routes.js  # /api/products/*
│   │   │   └── order.routes.js    # /api/orders/*
│   │   ├── app.js                 # Express app setup & server entry
│   │   └── seed.js                # Database seeder (demo data + users)
│   ├── vercel.json                # Vercel serverless configuration
│   ├── package.json
│   └── .env                       # Environment variables (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx     # Navigation bar with cart badge
│   │   │   │   └── Footer.tsx     # Site footer with links
│   │   │   └── ui/                # Reusable UI components
│   │   ├── context/
│   │   │   └── AuthContext.tsx     # Global auth state (user, token, login/logout)
│   │   ├── controllers/
│   │   │   └── useCartController.ts   # Cart logic hook
│   │   ├── services/
│   │   │   ├── apiService.ts      # Centralized API client (products, orders, users)
│   │   │   └── cartService.ts     # localStorage cart management
│   │   ├── views/pages/
│   │   │   ├── HomePage.tsx       # Landing page with featured products
│   │   │   ├── ListingPage.tsx    # Product catalog with search & filters
│   │   │   ├── ProductDetailPage.tsx  # Single product view
│   │   │   ├── CartPage.tsx       # Shopping cart & checkout
│   │   │   ├── LoginPage.tsx      # User login form
│   │   │   ├── RegisterPage.tsx   # User registration form
│   │   │   ├── ProfilePage.tsx    # User profile with avatar upload
│   │   │   ├── OrdersPage.tsx     # Order history & tracking
│   │   │   ├── SellProductPage.tsx    # Create new product listing
│   │   │   ├── MyProductsPage.tsx     # Manage seller's own products
│   │   │   ├── AdminPage.tsx      # Admin dashboard (users, orders, products)
│   │   │   ├── MessagesPage.tsx   # Messaging interface
│   │   │   ├── HelpPage.tsx       # Help & FAQ center
│   │   │   ├── GiftBoxesPage.tsx  # Gift boxes catalog
│   │   │   ├── ProjectsPage.tsx   # Projects showcase
│   │   │   └── PlaceholderPages.tsx   # Static info pages
│   │   ├── utils/
│   │   │   └── url.ts             # API base URL resolver
│   │   ├── types.ts               # Shared TypeScript interfaces
│   │   ├── constants.ts           # App-wide constants & categories
│   │   ├── App.tsx                # Root component with routing
│   │   ├── index.tsx              # React DOM entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML entry point
│   ├── vite.config.ts             # Vite configuration
│   ├── tsconfig.json              # TypeScript configuration
│   ├── vercel.json                # Vercel SPA configuration
│   ├── .env.example               # Environment variable template
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Ecommerce.git
cd Ecommerce

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

#### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | — (required) |
| `JWT_SECRET` | Secret key for JWT signing | `fallback_secret_key` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |

#### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend/` directory (see `.env.example`):

```env
VITE_API_URL=http://localhost:5000
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | *(auto-detects localhost)* |

### Database Seeding

Populate the database with demo products and users:

```bash
cd backend
npm run seed
```

This creates:
- **10 sample products** across categories (tech, clothing, home, tools)
- **Demo user**: `demo@marketplace.com` / `demo123`
- **Admin user**: `admin@marketplace.com` / `admin123`

### Running Locally

Open **two terminals**:

```bash
# Terminal 1 — Start the backend
cd backend
npm run dev
# ✅ Server running at http://localhost:5000

# Terminal 2 — Start the frontend
cd frontend
npm run dev
# ✅ App running at http://localhost:3000
```

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | API health status |

### 👤 Users — `/api/users`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/users/register` | ❌ | — | Register a new user |
| `POST` | `/users/login` | ❌ | — | Login & receive JWT token |
| `GET` | `/users/me` | ✅ | Any | Get current user's profile |
| `GET` | `/users/` | ✅ | Admin | List all users |
| `GET` | `/users/:id` | ✅ | Any | Get user by ID |
| `PUT` | `/users/:id` | ✅ | Any | Update user profile |
| `DELETE` | `/users/:id` | ✅ | Admin | Delete a user |

### 📦 Products — `/api/products`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/products` | ❌ | List/search products with filters |
| `GET` | `/products/my` | ✅ | Get current user's products |
| `GET` | `/products/:id` | ❌ | Get product by ID |
| `POST` | `/products` | ✅ | Create a new product |
| `PUT` | `/products/:id` | ✅ | Update a product |
| `DELETE` | `/products/:id` | ✅ | Delete a product |

**Query Parameters for `GET /products`:**

| Param | Type | Description |
|---|---|---|
| `q` | `string` | Search query (searches title, description, brand, category) |
| `category` | `string` | Filter by category |
| `brand` | `string` | Filter by brand |
| `condition` | `string` | Filter by condition (`Brand new`, `Refurbished`, `Old items`) |
| `minPrice` | `number` | Minimum price |
| `maxPrice` | `number` | Maximum price |
| `sort` | `string` | Sort: `price_asc`, `price_desc`, `rating`, `newest` |

### 🧾 Orders — `/api/orders`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/orders/my` | ✅ | Any | Get current user's orders |
| `GET` | `/orders` | ✅ | Admin | List all orders |
| `GET` | `/orders/:id` | ✅ | Any | Get order by ID |
| `POST` | `/orders` | ✅ | Any | Place a new order |
| `PATCH` | `/orders/:id/status` | ✅ | Admin | Update order status |
| `DELETE` | `/orders/:id` | ✅ | Admin | Delete an order |

---

## 🖥️ Frontend Pages

| Route | Page | Auth Required | Description |
|---|---|---|---|
| `/` | Home | ❌ | Landing page with featured products & categories |
| `/listing` | Listing | ❌ | Full product catalog with search, filters & sorting |
| `/product/:id` | Product Detail | ❌ | Detailed product view with seller info |
| `/cart` | Cart | ❌ | Shopping cart with quantity management & checkout |
| `/login` | Login | ❌ | User authentication |
| `/register` | Register | ❌ | New account creation |
| `/profile` | Profile | ✅ | View & edit profile, upload avatar |
| `/orders` | My Orders | ✅ | Order history with status tracking |
| `/sell` | Sell Product | ✅ | Create a new product listing |
| `/my-products` | My Products | ✅ | Manage your own product listings |
| `/admin` | Admin Panel | ✅ 🔒 | Manage users, orders & products (admin only) |
| `/messages` | Messages | ✅ | Messaging interface |
| `/help` | Help | ❌ | Help center & FAQ |
| `/gift-boxes` | Gift Boxes | ❌ | Gift boxes catalog |
| `/projects` | Projects | ❌ | Projects showcase |
| `/favorites` | Favorites | ❌ | Saved favorites |
| `/contact` | Contact | ❌ | Contact information |
| `/about` | About | ❌ | About the platform |
| `/privacy-policy` | Privacy Policy | ❌ | Privacy policy |
| `/user-agreement` | User Agreement | ❌ | Terms of service |
| `/partnership` | Partnership | ❌ | Partnership info |

---

## 🔐 Authentication & Authorization

### Flow

```
Register/Login → Server validates credentials → Returns JWT + User object
     │
     ▼
Token stored in localStorage → Sent as Bearer token in Authorization header
     │
     ▼
Backend middleware verifies JWT → Attaches user to request → Route handler executes
```

### Middleware

- **`auth`** — Verifies the JWT token from the `Authorization: Bearer <token>` header. Rejects with `401` if missing or invalid.
- **`adminOnly`** — Checks `req.user.role === 'admin'`. Rejects with `403` if not admin.

### Token Payload

```json
{
  "id": "user_mongo_id",
  "email": "user@example.com",
  "role": "user | admin",
  "exp": "7 days from issuance"
}
```

---

## 🛒 Shopping Cart

The cart is managed entirely on the client side using `localStorage`:

- **No authentication required** to add items to cart
- Cart persists across browser sessions
- Cart key: `marketplace_cart`
- Cart is cleared on user logout
- Real-time cart count displayed in the header badge
- Full cart management: add, remove, update quantity

---

## 📦 Order Management

### Order Lifecycle

```
pending → confirmed → shipped → delivered
   │
   └──→ cancelled
```

### Order Structure

Each order contains:
- **User reference** — linked to the authenticated user
- **Items array** — product references with quantity and price snapshot
- **Total amount** — calculated from item prices × quantities
- **Shipping address** — full address fields (name, address, city, postal code, country, phone)
- **Payment method** — defaults to "Cash on Delivery"
- **Status** — tracked through the lifecycle
- **Timestamps** — creation and update times

---

## 🧑‍💼 Admin Panel

The admin dashboard (`/admin`) provides three management tabs:

| Tab | Capabilities |
|---|---|
| **Users** | View all registered users, see roles, delete users |
| **Orders** | View all orders across users, update order status, delete orders |
| **Products** | View all products, manage listings |

> **Access:** Only users with `role: "admin"` can access the admin panel. Routes are protected by both frontend route guards and backend `adminOnly` middleware.

---

## ☁️ Deployment

The project is configured for **Vercel** deployment with both frontend and backend as separate Vercel projects.

### Backend Deployment

The backend includes a `vercel.json` that wraps the Express app as a serverless function:

```bash
cd backend
vercel --prod
```

**Required Vercel Environment Variables:**
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — JWT signing secret
- `FRONTEND_URL` — Deployed frontend URL (for CORS)

### Frontend Deployment

```bash
cd frontend
vercel --prod
```

**Required Vercel Environment Variables:**
- `VITE_API_URL` — Deployed backend URL

### Key Deployment Details
- Backend auto-detects Vercel environment (`process.env.VERCEL`) and skips `app.listen()`
- MongoDB connection is cached for serverless reuse
- Images are stored as base64 data URLs in MongoDB (no file system dependency)
- Frontend uses `HashRouter` for SPA compatibility on static hosting
- Request body limit set to `10mb` for base64 image uploads

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**. See the `LICENSE` file for details.

---


