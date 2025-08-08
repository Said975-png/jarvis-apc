import React from 'react';
import './App.css';

function App() {
  return (
    <div className="jarvis-app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <span className="brand-logo">JARVIS</span>
            <span className="brand-tagline">AI Design</span>
          </div>

          <div className="navbar-menu">
            <a href="#services" className="navbar-link">Услуги</a>
            <a href="#portfolio" className="navbar-link">Портфолио</a>
            <a href="#about" className="navbar-link">О нас</a>
            <a href="#contact" className="navbar-link">Контакты</a>
          </div>

          <div className="navbar-actions">
            <button className="navbar-button">Заказать проект</button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="background-overlay"></div>
        <div className="planet-arc"></div>
        <div className="geometric-bg">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
          <div className="floating-element element-5"></div>
          <div className="floating-element element-6"></div>
        </div>
        <div className="grid-overlay"></div>
        <div className="particle-system">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
        </div>
        <div className="neural-network">
          <div className="neural-line line-1"></div>
          <div className="neural-line line-2"></div>
          <div className="neural-line line-3"></div>
          <div className="neural-node node-1"></div>
          <div className="neural-node node-2"></div>
          <div className="neural-node node-3"></div>
          <div className="neural-node node-4"></div>
        </div>
        <div className="container">
          <div className="content-wrapper">
            <div className="main-content">
              <div className="brand-badge">AI POWERED</div>
              <h1 className="brand-title">
                <span className="jarvis-text">JARVIS</span>
              </h1>
              <div className="title-underline"></div>
              <p className="brand-description">
                Создаем крутые дизайны сайтов с искусственным интеллектом
              </p>
              <p className="brand-subtitle">
                Современные решения для цифрового мира
              </p>
              <div className="cta-section">
                <button className="primary-button">Начать проект</button>
                <div className="stats">
                  <div className="stat-item">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Проектов</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Поддержка</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span className="scroll-text">Прокрутите вниз</span>
        </div>
      </section>

      <section className="advantages-section">
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
            <span className="section-number">01</span>
            <div className="section-info">
              <div className="section-badge">НАШИ ПРЕИМУЩЕСТВА</div>
              <h2 className="section-title">Почему мы лучшие?</h2>
            </div>
          </div>

          <div className="advantages-layout">
            <div className="advantages-left">
              <div className="big-advantage">
                <div className="advantage-number">15+</div>
                <div className="advantage-text">
                  <h3>Лет опыта</h3>
                  <p>в разработке и дизайне</p>
                </div>
              </div>

              <div className="big-advantage">
                <div className="advantage-number">500+</div>
                <div className="advantage-text">
                  <h3>Проектов</h3>
                  <p>успешно реализовано</p>
                </div>
              </div>
            </div>

            <div className="advantages-right">
              <div className="advantage-item">
                <div className="advantage-header">
                  <div className="advantage-dot"></div>
                  <h4>Инновационные технологии</h4>
                </div>
                <p>Используем самые современные AI-решения и передовые технологии разработки</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-header">
                  <div className="advantage-dot"></div>
                  <h4>Персональный подход</h4>
                </div>
                <p>Каждый проект уникален - создаем индивидуальные решения под ваши задачи</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-header">
                  <div className="advantage-dot"></div>
                  <h4>Гарантия качества</h4>
                </div>
                <p>Предоставляем гарантию на все работы и бесплатную техподдержку</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-header">
                  <div className="advantage-dot"></div>
                  <h4>Быстрые сроки</h4>
                </div>
                <p>Оптимизированные процессы позволяют сократить время разработки вдвое</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="pricing-card basic-plan">
              <div className="plan-header">
                <div className="plan-badge">BASIC</div>
                <h3 className="plan-name">Базовый сайт</h3>
                <div className="plan-price">
                  <span className="price-amount">2.500.000</span>
                  <span className="price-currency">сум</span>
                </div>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Современный дизайн</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Адаптивная верстка</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>SEO оптимизация</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Базовый функционал</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Техподдержка 3 месяца</span>
                </div>
              </div>
              <button className="plan-button">Выбрать план</button>
            </div>

            <div className="pricing-card pro-plan featured">
              <div className="featured-badge">ПОПУЛЯРНЫЙ</div>
              <div className="plan-header">
                <div className="plan-badge">PRO</div>
                <h3 className="plan-name">Профессиональный сайт</h3>
                <div className="plan-price">
                  <span className="price-amount">4.000.000</span>
                  <span className="price-currency">сум</span>
                </div>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Все функции Basic</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>ИИ помощник для клиентов</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Ответы на вопросы как человек</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Предложение тов��ров</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Расширенная аналитика</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Техподдержка 6 месяцев</span>
                </div>
              </div>
              <button className="plan-button">Выбрать план</button>
            </div>

            <div className="pricing-card max-plan">
              <div className="plan-header">
                <div className="plan-badge">MAX</div>
                <h3 className="plan-name">Максимальный сайт</h3>
                <div className="plan-price">
                  <span className="price-amount">5.000.000</span>
                  <span className="price-currency">сум</span>
                </div>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Все функции Pro</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Огромный функционал</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Улучшенный ИИ помощник</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Крутой премиум дизайн</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Индивидуальные решения</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Техподдержка 12 месяцев</span>
                </div>
              </div>
              <button className="plan-button">Выбрать план</button>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-showcase-section">
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
        <div className="neural-network">
          <div className="neural-line line-1"></div>
          <div className="neural-line line-2"></div>
          <div className="neural-line line-3"></div>
          <div className="neural-node node-1"></div>
          <div className="neural-node node-2"></div>
          <div className="neural-node node-3"></div>
        </div>

        <div className="container">
          <div className="section-header">
            <span className="section-number">03</span>
            <div className="section-info">
              <div className="section-badge">ИИ ВОЗМОЖНОСТИ</div>
              <h2 className="section-title">Как работает Джарвис</h2>
            </div>
          </div>

          <div className="ai-cards-container">
            <div className="ai-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-icon">
                    <svg className="icon-brain" viewBox="0 0 24 24" fill="none">
                      <path d="M9.5 2a6.5 6.5 0 0 1 5 2.4A6.5 6.5 0 0 1 19 11c0 .7-.1 1.4-.4 2a1 1 0 0 1-.2.3c-.2.2-.5.4-.9.4h-.5c-.3 0-.6.2-.8.4-.2.3-.2.7 0 1 .2.2.5.4.8.4h.5c.4 0 .7.2.9.4.1.1.2.2.2.3.3.6.4 1.3.4 2a6.5 6.5 0 0 1-4.5 6.2A6.5 6.5 0 0 1 9.5 22 6.5 6.5 0 0 1 5 15.8 6.5 6.5 0 0 1 5 8.2 6.5 6.5 0 0 1 9.5 2z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="8" r="1" fill="currentColor"/>
                      <circle cx="12" cy="8" r="1" fill="currentColor"/>
                      <circle cx="16" cy="8" r="1" fill="currentColor"/>
                      <path d="M8 12c0 1.1.9 2 2 2s2-.9 2-2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <h3 className="card-title">Умный анализ</h3>
                  <div className="card-number">01</div>
                </div>
                <div className="card-back">
                  <h3 className="card-title-back">Умный анализ</h3>
                  <p className="card-description">
                    Джарвис анализирует поведение пользователей на сайте в реальном времени, 
                    понимает их потребности и предлагает персонализированные решения
                  </p>
                  <div className="card-features">
                    <span className="feature-tag">Машинное обучение</span>
                    <span className="feature-tag">Анализ данных</span>
                    <span className="feature-tag">Прогнозирование</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-icon">
                    <svg className="icon-chat" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="card-title">Живое общение</h3>
                  <div className="card-number">02</div>
                </div>
                <div className="card-back">
                  <h3 className="card-title-back">Живое общение</h3>
                  <p className="card-description">
                    ИИ помощник общается с клиентами как настоящий человек, понимает контекст, 
                    эмоции и дает персональные рекомендации по товарам и услугам
                  </p>
                  <div className="card-features">
                    <span className="feature-tag">НЛП технологии</span>
                    <span className="feature-tag">Эмоциональный интеллект</span>
                    <span className="feature-tag">24/7 поддержка</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-icon">
                    <svg className="icon-target" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="2" fill="currentColor"/>
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="card-title">Точные рекомендации</h3>
                  <div className="card-number">03</div>
                </div>
                <div className="card-back">
                  <h3 className="card-title-back">Точные рекомендации</h3>
                  <p className="card-description">
                    Анализируя предпочтения и историю покупок, Джарвис предлагает именно те товары, 
                    которые нужны клиенту, увеличивая конверсию на 300%
                  </p>
                  <div className="card-features">
                    <span className="feature-tag">Персонализация</span>
                    <span className="feature-tag">Увеличение продаж</span>
                    <span className="feature-tag">Конверсия +300%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-icon">
                    <div className="icon-shield"></div>
                  </div>
                  <h3 className="card-title">Безопасность</h3>
                  <div className="card-number">04</div>
                </div>
                <div className="card-back">
                  <h3 className="card-title-back">Безопасность и надежность</h3>
                  <p className="card-description">
                    Все данные обрабатываются с максимальной защитой, соблюдаются международные 
                    стандарты безопасности, а система работает стабильно 99.9% времени
                  </p>
                  <div className="card-features">
                    <span className="feature-tag">Шифрование данных</span>
                    <span className="feature-tag">99.9% Uptime</span>
                    <span className="feature-tag">GDPR соответствие</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
