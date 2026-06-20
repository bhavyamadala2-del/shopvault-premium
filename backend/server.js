import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🚀 ShopVault API is running',
    endpoints: {
      products: '/api/products',
      singleProduct: '/api/products/:id',
      categories: '/api/categories',
      productsByCategory: '/api/products/category/:name',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n⚡ ShopVault Backend running on http://localhost:${PORT}\n`);
});
