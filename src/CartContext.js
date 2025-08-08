import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user, useSupabase } = useAuth();

  // Загружаем корзину из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('jarvis_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        localStorage.removeItem('jarvis_cart');
      }
    }

    const savedOrders = localStorage.getItem('jarvis_orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        localStorage.removeItem('jarvis_orders');
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('jarvis_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Сохраняем заказы в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('jarvis_orders', JSON.stringify(orders));
  }, [orders]);

  // Добавить товар в корзину
  const addToCart = (plan) => {
    const existingItem = cartItems.find(item => item.planType === plan.planType);
    
    if (existingItem) {
      // Если план уже в корзине, обновляем количество
      setCartItems(prev => prev.map(item => 
        item.planType === plan.planType 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Добавляем новый план в корзину
      const cartItem = {
        id: Date.now().toString(),
        planType: plan.planType,
        name: plan.name,
        price: plan.price,
        features: plan.features,
        quantity: 1,
        addedAt: new Date().toISOString()
      };
      setCartItems(prev => [...prev, cartItem]);
    }
  };

  // Удалить товар из корзины
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Обновить количество товара
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  // Очистить корзину
  const clearCart = () => {
    setCartItems([]);
  };

  // Получить общую сумму корзины
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Получить количество товаров в корзине
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Создать заказ
  const createOrder = async (customerInfo) => {
    if (cartItems.length === 0) {
      throw new Error('Корзина пуста');
    }

    if (!customerInfo.fullName || !customerInfo.phone) {
      throw new Error('Заполните все обязательные поля');
    }

    const newOrder = {
      id: Date.now().toString(),
      userId: user?.id || null,
      customerInfo: {
        fullName: customerInfo.fullName.trim(),
        phone: customerInfo.phone.trim(),
        email: user?.email || customerInfo.email || '',
        name: user?.name || customerInfo.fullName.trim()
      },
      items: [...cartItems],
      total: getCartTotal(),
      status: 'pending', // pending, accepted, rejected, completed
      statusText: 'В ожидании',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: customerInfo.notes || ''
    };

    // Сохраняем заказ
    setOrders(prev => [newOrder, ...prev]);

    // Очищаем корзину после создания заказа
    clearCart();

    return newOrder;
  };

  // Получить заказы пользователя
  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  // Получить все заказы (для админки)
  const getAllOrders = () => {
    return orders;
  };

  // Обновить статус заказа (для админки)
  const updateOrderStatus = (orderId, newStatus) => {
    const statusMap = {
      'pending': 'В ожидании',
      'accepted': 'Принято',
      'rejected': 'Отклонено',
      'completed': 'Выполнено'
    };

    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            statusText: statusMap[newStatus] || newStatus,
            updatedAt: new Date().toISOString()
          }
        : order
    ));
  };

  // Удалить заказ (для админки)
  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const value = {
    cartItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
