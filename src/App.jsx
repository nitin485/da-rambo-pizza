import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';
import FloatingCart from './components/cart/FloatingCart';
import CheckoutModal from './components/cart/CheckoutModal';

const ScrollToHashElement = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToHashElement />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <FloatingCart />
        <CheckoutModal />
      </Router>
    </CartProvider>
  );
}

export default App;
