import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const StarRating = ({ rating }) => (
  <div className="stars" style={{ fontSize: '1rem' }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= Math.round(rating) ? '' : 'empty'}`}>★</span>
    ))}
  </div>
);

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('shopvault-cart')) || [];
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('shopvault-cart', JSON.stringify(cart));
    alert('✅ Added to cart!');
  };

  if (loading) {
    return (
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo"><span className="logo-icon">⚡</span></div>
            <div className="brand-text">
              <span className="brand-name">ShopVault</span>
              <span className="brand-tagline">Premium Store</span>
            </div>
          </Link>
        </nav>
        <div className="product-page-loading">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product || product.error) {
    return (
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo"><span className="logo-icon">⚡</span></div>
            <div className="brand-text">
              <span className="brand-name">ShopVault</span>
              <span className="brand-tagline">Premium Store</span>
            </div>
          </Link>
        </nav>
        <div className="product-page-loading">
          <div className="empty-icon">😕</div>
          <h3>Product not found</h3>
          <button className="back-btn" onClick={() => navigate('/')}>← Back to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo"><span className="logo-icon">⚡</span></div>
          <div className="brand-text">
            <span className="brand-name">ShopVault</span>
            <span className="brand-tagline">Premium Store</span>
          </div>
        </Link>
        <div className="navbar-actions">
          <Link to="/" className="nav-link-btn">Home</Link>
          <Link to="/about" className="nav-link-btn">About</Link>
        </div>
      </nav>

      {/* Product Detail */}
      <div className="product-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-detail-info">
            <span className="card-category">{product.category}</span>
            <h1 className="product-detail-title">{product.title}</h1>

            <div className="product-detail-rating">
              <StarRating rating={product.rating?.rate || 0} />
              <span className="rating-text">
                {product.rating?.rate} out of 5 &nbsp;·&nbsp; {product.rating?.count} reviews
              </span>
            </div>
            
            <div className="product-detail-price-box">
              <p className="product-detail-price">₹{product.price?.toFixed(2)}</p>
            </div>

            <hr className="modal-divider" />

            <p className="product-detail-desc">{product.description}</p>

            <div className="product-detail-actions">
              <button className="modal-add-btn" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="modal-wishlist-btn" onClick={() => {
                const wl = JSON.parse(localStorage.getItem('shopvault-wishlist')) || [];
                if (wl.includes(product.id)) {
                  localStorage.setItem('shopvault-wishlist', JSON.stringify(wl.filter(w => w !== product.id)));
                } else {
                  localStorage.setItem('shopvault-wishlist', JSON.stringify([...wl, product.id]));
                }
              }}>
                ♡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
