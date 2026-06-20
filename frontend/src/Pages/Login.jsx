import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    if (email && password) {
      // Fetch users from "database" (localStorage)
      const users = JSON.parse(localStorage.getItem('shopvault-users') || '[]');
      
      // Find matching user
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // Success
        localStorage.setItem('shopvault-user', JSON.stringify({ email: foundUser.email, name: foundUser.name }));
        navigate('/');
        window.location.reload(); 
      } else {
        // Failed
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      {/* Navbar Minimal for Auth */}
      <nav className="navbar auth-nav">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo"><span className="logo-icon">⚡</span></div>
          <div className="brand-text">
            <span className="brand-name">ShopVault</span>
            <span className="brand-tagline">Premium Store</span>
          </div>
        </Link>
      </nav>

      <div className="auth-container">
        <div className="auth-card fade-in-up">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Enter your details to access your premium account.</p>
          </div>

          {error && <div className="auth-error" style={{ color: '#cc4c39', backgroundColor: 'rgba(204, 76, 57, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(204, 76, 57, 0.3)' }}>{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="hello@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
