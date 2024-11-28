import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginForm from '../user/LoginForm';
import SignupForm from '../user/SignupForm';
import Profile from '../user/Profile';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Home from './Home';
import Footer from './Footer';
import Checkout from './Checkout';
import CheckoutSuccess from './CheckoutSuccess';
import { CartProvider, useCart } from './CartContext';
import { useAuth, AuthProvider } from '../user/AuthProvider';
import NotfoundPage from './NotfoundPage';

function LayoutContent() {
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  const history = useNavigate();

  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  const handleLoginOrProfileClick = () => {
    if (currentUser) {
      // User is logged in, navigate to profile
      history('/profile');
    } else {
      // User is not logged in, navigate to login
      history('/login');
    }
  };
  
  return (
    <div className="layout">
      <header style={{ marginBottom: '25px', padding: '20px' }}>
        <Menu styles={ styles }>
          <Link to="/">
            Home
          </Link>
          <Link to="/explore">
            Explore
          </Link>
          <Link to="/about">
            About Us
          </Link>
          <div className="menu-item" onClick={handleLoginOrProfileClick}>
           {currentUser ? 'Profile' : 'Login / Signup'}
          </div>
          </Menu>
          <Link to="/">
            <img style={{ left: '5px', maxHeight: '160px', maxWidth: '180px', width: 'auto', height: 'auto', position: 'fixed', top: '1px' }} src="/Logo.png" alt="logo" />
          </Link>
          <Link to="/checkout">
            <img style={{ right: '60px', maxHeight: '270px', maxWidth: '50px', width: 'auto', height: 'auto', position: 'fixed', top: '10px' }} src="/Cart.png" alt="Shopping Cart Icon Vectors by Vecteezy" />
            {cartCount > 0 && <span style={{ position: 'fixed', top: '10px', right: '60px', fontSize: '12px', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '4px' }}>{cartCount}</span>}
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotfoundPage />} />
          <Route path="/srcdoc" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/explore" element={<ProductList />} />
          <Route path="/explore/:productId" element={<ProductDetails />} />
          <Route path="/:productId" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/explore/checkout" element={<Checkout />} />
          <Route path="/explore/:productId/checkout" element={<Checkout />} />
          <Route path="/explore/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/explore/:productId/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
    </div>
  );
}

export default function Layout() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <LayoutContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}