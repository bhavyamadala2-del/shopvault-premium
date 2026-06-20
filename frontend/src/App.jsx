import { useState, useEffect, useMemo } from 'react';
import './index.css';
import './App.css';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopvault-cart')) || [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopvault-wishlist')) || [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // ── Fetch products + categories ──────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        const [productsData, categoriesData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Persist cart & wishlist ──────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('shopvault-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopvault-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ── Prevent body scroll when cart/modal open ────────────────────
  useEffect(() => {
    document.body.style.overflow =
      cartOpen || modalProduct ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, modalProduct]);

  // ── Filtered products (search + category) ───────────────────────
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      const matchCategory =
        activeCategory === 'all' || p.category === activeCategory;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [products, searchQuery, activeCategory]);

  // ── Cart handlers ────────────────────────────────────────────────
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id, qty) => {
    if (qty < 1) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // ── Wishlist handler ─────────────────────────────────────────────
  const handleToggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="app">
      {/* ── Navbar ── */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-badge">
          <span></span>
          New Arrivals Every Week
        </div>
        <h1>Discover Premium<br />Products You'll Love</h1>
        <p>
          Shop thousands of curated items across electronics, fashion, jewellery
          and more — all in one place.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">20+</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className="stat-number">4</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-number">4.5★</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="stat">
            <div className="stat-number">Free</div>
            <div className="stat-label">Shipping</div>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="main-content">
        {/* Sidebar */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setSearchQuery('');
          }}
          products={products}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          loading={loading}
          onAddToCart={handleAddToCart}
          onOpenModal={setModalProduct}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      </div>

      {/* ── Cart Sidebar ── */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveFromCart}
        />
      )}

      {/* ── Product Modal ── */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}
    </div>
  );
};

export default App;
