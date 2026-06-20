import { Router } from 'express';

const router = Router();
const FAKE_STORE_BASE = 'https://fakestoreapi.com';

// Helper to fetch from FakeStore API
async function fetchFromStore(path) {
  const response = await fetch(`${FAKE_STORE_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`FakeStore API error: ${response.status}`);
  }
  return response.json();
}

// GET /api/products — all products
router.get('/products', async (req, res) => {
  try {
    const products = await fetchFromStore('/products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id — single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await fetchFromStore(`/products/${req.params.id}`);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// GET /api/categories — all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await fetchFromStore('/products/categories');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/products/category/:name — products by category
router.get('/products/category/:name', async (req, res) => {
  try {
    const products = await fetchFromStore(`/products/category/${req.params.name}`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching category products:', error.message);
    res.status(500).json({ error: 'Failed to fetch category products' });
  }
});

export default router;
