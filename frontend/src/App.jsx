import './index.css';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('shopvault-user');
  if (!user) {
    return <Navigate to="/register" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
