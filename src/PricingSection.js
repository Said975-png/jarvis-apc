import React from 'react';
import { useCart } from './CartContext';

const PricingSection = () => {
  const { addToCart } = useCart();

  const plans = [
    {
      planType: 'basic',
      name: 'Базовый сайт',
      price: 2500000,
      currency: 'сум',
      badge: 'BASIC',
      features: [
        'Современный дизайн',
        'Адаптивная верстка',
        'SEO оптимизация',
        'Базовый функционал',
        'Техподдержка 3 месяца'
      ]
    },
    {
      planType: 'pro',
      name: 'Профессиональный сайт',
      price: 4000000,
      currency: 'сум',
      badge: 'PRO',
      featured: true,
      features: [
        'Все функции Basic',
        'ИИ помощник для клиентов',
        'Ответы на вопросы как человек',
        'Предложение товаров',
        'Расширенная аналитика',
        'Техподдержка 6 месяцев'
      ]
    },
    {
      planType: 'max',
      name: 'Максимальный сайт',
      price: 5000000,
      currency: 'сум',
      badge: 'MAX',
      features: [
        'Все функции Pro',
        'Огромный функционал',
        'Улучшенный ИИ помощник',
        'Крутой премиум дизайн',
        'Индивидуальные решения',
        'Техподдержка 12 месяцев'
      ]
    }
  ];

  const handleAddToCart = (plan) => {
    addToCart(plan);
    
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
        animation: slideInRight 0.3s ease;
      ">
        ✅ ${plan.name} добавлен в корзину!
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU');
  };

  return (
    <section className="pricing-section">
      <div className="geometric-bg">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
        <div className="floating-element element-5"></div>
      </div>
      <div className="data-stream">
        <div className="stream-line stream-1"></div>
        <div className="stream-line stream-2"></div>
        <div className="stream-line stream-3"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-number">02</span>
          <div className="section-info">
            <div className="section-badge">НАШИ ТАРИФЫ</div>
            <h2 className="section-title">Выберите свой план</h2>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.planType} className={`pricing-card ${plan.planType}-plan ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge">ПОПУЛЯРНЫЙ</div>}
              
              <div className="plan-header">
                <div className="plan-badge">{plan.badge}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price-amount">{formatPrice(plan.price)}</span>
                  <span className="price-currency">{plan.currency}</span>
                </div>
              </div>
              
              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-dot"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className="plan-button"
                onClick={() => handleAddToCart(plan)}
              >
                Добавить в корзину
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
