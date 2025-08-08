import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, createOrder, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const validateForm = () => {
    if (!customerInfo.fullName.trim()) {
      setError('Введите ваше ФИО');
      return false;
    }
    if (!customerInfo.phone.trim()) {
      setError('Введите номер телефона');
      return false;
    }
    if (customerInfo.phone.length < 10) {
      setError('Введите корректный номер телефона');
      return false;
    }
    return true;
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const order = await createOrder(customerInfo);
      setSuccess(true);
      
      // Показываем успешное сообщение 3 секунды, затем закрываем корзину
      setTimeout(() => {
        setSuccess(false);
        setIsCheckout(false);
        setCustomerInfo({
          fullName: user?.name || '',
          phone: '',
          email: user?.email || '',
          notes: ''
        });
        onClose();
      }, 3000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsCheckout(false);
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="cart-overlay" onClick={handleClose}>
        <div className="cart-container success-state" onClick={(e) => e.stopPropagation()}>
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Заказ успешно создан!</h2>
            <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
            <p>Отслеживать статус заказа можно в личном кабинете.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay" onClick={handleClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{isCheckout ? 'Оформление заказа' : 'Корзина'}</h2>
          <button className="cart-close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {!isCheckout ? (
          /* Экран корзины */
          <div className="cart-content">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары в корзину, чтобы оформить заказ</p>
                <button className="continue-shopping" onClick={handleClose}>
                  Продолжить выбор
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <div className="item-type">{item.planType.toUpperCase()} план</div>
                        <div className="item-price">{formatPrice(item.price)} {item.price >= 1000000 ? 'сум' : '₽'}</div>
                      </div>
                      
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                          title="Удалить"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="total-row">
                    <span>Итого:</span>
                    <span className="total-amount">{formatPrice(getCartTotal())} сум</span>
                  </div>
                  
                  <div className="cart-actions">
                    <button className="clear-cart" onClick={clearCart}>
                      Очистить корзину
                    </button>
                    <button 
                      className="checkout-btn"
                      onClick={() => setIsCheckout(true)}
                    >
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Экран оформления заказа */
          <div className="checkout-content">
            <div className="order-summary">
              <h3>Ваш заказ</h3>
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)} сум</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Итого: {formatPrice(getCartTotal())} сум</strong>
              </div>
            </div>

            <div className="customer-form">
              <h3>Контактная информация</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">ФИО *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="Введите ваше полное ФИО"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Номер телефона *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+998 (90) 123-45-67"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Дополнительные пожелания</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Опишите особенности вашего проекта..."
                  rows="3"
                  disabled={loading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="checkout-actions">
                <button 
                  className="back-btn"
                  onClick={() => setIsCheckout(false)}
                  disabled={loading}
                >
                  Назад в корзину
                </button>
                <button 
                  className="create-order-btn"
                  onClick={handleCreateOrder}
                  disabled={loading}
                >
                  {loading ? 'Создание заказа...' : 'Создать заказ'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
