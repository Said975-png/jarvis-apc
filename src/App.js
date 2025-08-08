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
        <div className="container">
          <div className="content-wrapper">
            <div className="main-content">
              <div className="brand-badge">AI POWERED</div>
              <h1 className="brand-title">
                <span className="jarvis-text">JARVIS</span>
              </h1>
              <div className="title-underline"></div>
              <p className="brand-description">
                Создаем крутые диз��йны сайтов с искусственным интеллектом
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
        
        <div className="tech-stack">
          <div className="tech-item">React</div>
          <div className="tech-item">Next.js</div>
          <div className="tech-item">AI Design</div>
          <div className="tech-item">Modern UI</div>
        </div>
      </section>
    </div>
  );
}

export default App;
