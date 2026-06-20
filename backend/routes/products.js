import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = Router();

// Load local product data
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '..', 'data', 'products.json');
let products = JSON.parse(readFileSync(dataPath, 'utf-8'));

// GET /api/products — all products
router.get('/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id — single product
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// GET /api/categories — all categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// GET /api/products/category/:name — products by category
router.get('/products/category/:name', (req, res) => {
  const filtered = products.filter(
    p => p.category.toLowerCase() === req.params.name.toLowerCase()
  );
  res.json(filtered);
});

// POST /api/products — add a new product
router.post('/products', (req, res) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...req.body,
    rating: req.body.rating || { rate: 0, count: 0 },
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id — update a product
router.put('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id — delete a product
router.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

export default router;
