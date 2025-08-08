import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import AuthModal from './AuthModal';
import Dashboard from './Dashboard';
import Cart from './Cart';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
  };

  const openDashboard = () => {
    setDashboardOpen(true);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <span className="brand-logo">JARVIS</span>
            <span className="brand-tagline">AI Design</span>
          </div>

          <div className="navbar-actions">
            <button
              className="navbar-icon-button admin-button"
              title="Админ панель"
              onClick={() => window.location.href = '/admin'}
            >
              <svg viewBox="0 0 24 24" fill="none" className="navbar-icon">
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="navbar-icon-button cart-button" title="Корзина" onClick={openCart}>
              <svg viewBox="0 0 24 24" fill="none" className="navbar-icon">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H3m4 8v6a2 2 0 002 2h6a2 2 0 002-2v-6m-9 0h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="auth-section authenticated">
                <div className="user-menu">
                  <button className="user-button" onClick={openDashboard}>
                    <div className="user-avatar-small">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-name">{user?.name}</span>
                    <svg viewBox="0 0 24 24" fill="none" className="dropdown-icon">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-section">
                <div className="auth-buttons-wrapper">
                  <button className="navbar-button" onClick={openRegisterModal}>
                    Регистрация
                  </button>
                  <button className="navbar-button-primary" onClick={openLoginModal}>
                    Вход
                  </button>
                </div>
              </div>
            )}

            <div className="navbar-search">
              <input
                type="text"
                placeholder="Поиск..."
                className="search-input"
              />
              <button className="search-button">
                <svg viewBox="0 0 24 24" fill="none" className="search-icon">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <Dashboard
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
      />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
