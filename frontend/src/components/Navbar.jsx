import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, onCartOpen, searchQuery, onSearchChange }) => {
  const [mobileSearch, setMobileSearch] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('shopvault-user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shopvault-user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-logo">
          <span className="logo-icon">⚡</span>
        </div>
        <div className="brand-text">
          <span className="brand-name">ShopVault</span>
          <span className="brand-tagline">Premium Store</span>
        </div>
      </Link>

      <div className={`navbar-search ${mobileSearch ? 'mobile-open' : ''}`}>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearchChange('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="navbar-actions">
        <Link to="/" className="nav-link-btn">Home</Link>
        <Link to="/about" className="nav-link-btn">About</Link>

        {user ? (
          <div className="user-menu">
            <span className="user-name">Hey, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Log In</Link>
            <Link to="/register" className="signup-btn">Sign Up</Link>
          </div>
        )}

        <button
          className="mobile-search-toggle"
          onClick={() => setMobileSearch(!mobileSearch)}
          aria-label="Toggle search"
        >
          🔍
        </button>

        <button
          className="cart-btn"
          onClick={onCartOpen}
          aria-label={`Cart with ${cartCount} items`}
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-label">Cart</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
