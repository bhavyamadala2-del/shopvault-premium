# 🛍️ ShopVault — Ecommerce Website

Full-stack ecommerce application with separate frontend and backend.

## Project Structure

```
ecommerce/
├── backend/           → Express API server (port 5000)
│   ├── server.js
│   ├── routes/
│   │   └── products.js
│   └── package.json
├── frontend/          → React + Vite app (port 5173)
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## How to Run

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on → http://localhost:5000

### 2. Start Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on → http://localhost:5173

## Features
- 🔍 Live search by title, description & category
- 📂 Category filter sidebar
- 🛒 Cart with quantity controls (localStorage)
- ❤️ Wishlist (localStorage)
- 🪟 Product detail modal
- 💀 Skeleton loading placeholders
- 📱 Fully responsive
- 🎨 Premium dark glassmorphism UI

## Tech Stack
- **Frontend:** React, Vite, Vanilla CSS
- **Backend:** Node.js, Express, CORS
- **API:** FakeStore API (proxied through backend)