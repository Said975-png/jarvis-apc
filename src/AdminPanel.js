import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

const AdminPanel = () => {
  const { getAllOrders, updateOrderStatus, deleteOrder } = useCart();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = getAllOrders();
    setOrders(allOrders);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders(); // Перезагружаем заказы
    
    // Показываем уведомление
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 50000;
        font-family: 'Exo 2', sans-serif;
        font-weight: 600;
        backdrop-filter: blur(10px);
      ">
        ✅ Статус заказа обновлен!
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      deleteOrder(orderId);
      loadOrders();
      setSelectedOrder(null);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'completed': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Панель администратора</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-value">{orders.length}</span>
            <span className="stat-label">Всего заказов</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{orders.filter(o => o.status === 'pending').length}</span>
            <span className="stat-label">В ожидании</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{orders.filter(o => o.status === 'accepted').length}</span>
            <span className="stat-label">Принято</span>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="orders-section">
          <div className="orders-header">
            <h2>Заказы</h2>
            <div className="filter-controls">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-filter"
              >
                <option value="all">Все заказы</option>
                <option value="pending">В ожидании</option>
                <option value="accepted">Принято</option>
                <option value="rejected">Отклонено</option>
                <option value="completed">Выполнено</option>
              </select>
              <button onClick={loadOrders} className="refresh-btn">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Обновить
              </button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="empty-orders">
              <div className="empty-icon">📋</div>
              <h3>Заказы не найдены</h3>
              <p>Пока нет заказов{filterStatus !== 'all' ? ` со статусом "${filterStatus}"` : ''}</p>
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <div 
                  key={order.id} 
                  className={`order-card ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-header">
                    <div className="order-id">#{order.id.slice(-6)}</div>
                    <div 
                      className="order-status" 
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.statusText}
                    </div>
                  </div>
                  
                  <div className="order-customer">
                    <h4>{order.customerInfo.fullName}</h4>
                    <p>{order.customerInfo.phone}</p>
                    {order.customerInfo.email && <p>{order.customerInfo.email}</p>}
                  </div>

                  <div className="order-summary">
                    <div className="order-items-count">
                      {order.items.length} товар(ов)
                    </div>
                    <div className="order-total">
                      {formatPrice(order.total)} сум
                    </div>
                  </div>

                  <div className="order-date">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedOrder && (
          <div className="order-details">
            <div className="details-header">
              <h3>Детали заказа #{selectedOrder.id.slice(-6)}</h3>
              <button 
                className="close-details"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div className="details-content">
              <div className="customer-details">
                <h4>Информация о клиенте</h4>
                <div className="detail-item">
                  <strong>ФИО:</strong> {selectedOrder.customerInfo.fullName}
                </div>
                <div className="detail-item">
                  <strong>Телефон:</strong> {selectedOrder.customerInfo.phone}
                </div>
                {selectedOrder.customerInfo.email && (
                  <div className="detail-item">
                    <strong>Email:</strong> {selectedOrder.customerInfo.email}
                  </div>
                )}
                {selectedOrder.notes && (
                  <div className="detail-item">
                    <strong>Комментарий:</strong>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="order-items-details">
                <h4>Состав заказа</h4>
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="item-detail">
                    <div className="item-info">
                      <strong>{item.name}</strong>
                      <span className="item-type">({item.planType.toUpperCase()} план)</span>
                    </div>
                    <div className="item-quantity">
                      Количество: {item.quantity}
                    </div>
                    <div className="item-price">
                      {formatPrice(item.price * item.quantity)} сум
                    </div>
                  </div>
                ))}
                <div className="total-price">
                  <strong>Итого: {formatPrice(selectedOrder.total)} сум</strong>
                </div>
              </div>

              <div className="order-timestamps">
                <div className="detail-item">
                  <strong>Создан:</strong> {formatDate(selectedOrder.createdAt)}
                </div>
                <div className="detail-item">
                  <strong>Обновлен:</strong> {formatDate(selectedOrder.updatedAt)}
                </div>
              </div>

              <div className="order-actions">
                <h4>Действия</h4>
                <div className="action-buttons">
                  <button 
                    className="status-btn accept"
                    onClick={() => handleStatusChange(selectedOrder.id, 'accepted')}
                    disabled={selectedOrder.status === 'accepted'}
                  >
                    Принять заказ
                  </button>
                  <button 
                    className="status-btn reject"
                    onClick={() => handleStatusChange(selectedOrder.id, 'rejected')}
                    disabled={selectedOrder.status === 'rejected'}
                  >
                    Отклонить
                  </button>
                  <button 
                    className="status-btn complete"
                    onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                    disabled={selectedOrder.status === 'completed'}
                  >
                    Выполнено
                  </button>
                  <button 
                    className="status-btn pending"
                    onClick={() => handleStatusChange(selectedOrder.id, 'pending')}
                    disabled={selectedOrder.status === 'pending'}
                  >
                    В ожидание
                  </button>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                >
                  Удалить заказ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
