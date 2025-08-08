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
                Со��ременные решения для ц��фрового мира
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
                <p>Используем самые современны�� AI-решения и передовые технологии разработки</p>
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
                  <h4>Быст��ые сроки</h4>
                </div>
                <p>Оптимизированные процессы позволяют сократить время разработки вдвое</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
