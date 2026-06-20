import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      // Get existing users from "database" (localStorage)
      const users = JSON.parse(localStorage.getItem('shopvault-users') || '[]');
      
      // Check if email already exists
      if (users.find(u => u.email === email)) {
        alert("This email is already registered. Please log in.");
        return;
      }

      // Save new user
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('shopvault-users', JSON.stringify(users));

      // Log them in immediately
      localStorage.setItem('shopvault-user', JSON.stringify({ email, name }));
      navigate('/');
      window.location.reload(); 
    }
  };

  return (
    <div className="auth-page">
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
            <h2>Join ShopVault</h2>
            <p>Create an account to unlock premium shopping features.</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
