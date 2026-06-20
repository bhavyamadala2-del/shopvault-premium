import { Link } from 'react-router-dom';

const About = () => {
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
          <Link to="/about" className="nav-link-btn active-link">About</Link>
        </div>
      </nav>

      {/* About Content */}
      <div className="about-page">
        <div className="about-hero">
          <h1>About ShopVault</h1>
          <p>Your premium destination for quality products</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <div className="about-icon">🛍️</div>
            <h3>Our Mission</h3>
            <p>
              At ShopVault, we believe everyone deserves access to premium quality
              products at fair prices. We curate the best items across electronics,
              fashion, jewellery and more — bringing them together in one beautiful,
              easy-to-use platform.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">⚡</div>
            <h3>Why Choose Us</h3>
            <p>
              With 20+ carefully selected products across 4 categories, free shipping
              on all orders, and an average rating of 4.5 stars, we prioritize quality
              and customer satisfaction above everything else.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🚀</div>
            <h3>Technology</h3>
            <p>
              Built with modern web technologies — React for the frontend and Node.js
              with Express for the backend. Our platform is fast, responsive, and
              designed to give you the best shopping experience possible.
            </p>
          </div>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-num">20+</span>
            <span className="about-stat-label">Products</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">4</span>
            <span className="about-stat-label">Categories</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">4.5★</span>
            <span className="about-stat-label">Avg Rating</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">24/7</span>
            <span className="about-stat-label">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
