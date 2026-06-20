import { useState } from 'react';

const Navbar = ({ cartCount, onCartOpen, searchQuery, onSearchChange }) => {
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">
          <span className="logo-icon">⚡</span>
        </div>
        <div className="brand-text">
          <span className="brand-name">ShopVault</span>
          <span className="brand-tagline">Premium Store</span>
        </div>
      </div>

      <div className={`navbar-search ${mobileSearch ? 'mobile-open' : ''}`}>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearchChange('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="navbar-actions">
        <button
          className="mobile-search-toggle"
          onClick={() => setMobileSearch(!mobileSearch)}
          aria-label="Toggle search"
        >
          🔍
        </button>

        <button className="nav-icon-btn" aria-label="Wishlist">
          <span>♡</span>
        </button>

        <button className="nav-icon-btn" aria-label="Profile">
          <span>👤</span>
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
