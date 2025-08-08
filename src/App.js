import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Привет! Я Джарвис, ваш ИИ помощник. Как дела? Чем могу помочь?",
      sender: "jarvis",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const jarvisResponses = [
    "Отличный вопрос! Наша команда использует самые современные AI технологии для создания уникальных решений.",
    "Я здесь, чтобы помочь вам с любыми вопросами о наших услугах и технологиях.",
    "Интересно! Расскажите больше о вашем проекте, и я подберу идеальное решение.",
    "Наши разработчики работают 24/7, чтобы обеспечить максимальное качество продукта.",
    "Хотите узнать больше о наших тарифных планах? Я могу помочь выбрать подходящий вариант.",
    "Наша команда имеет более 15 лет опыта в разработке и дизайне. Мы создали уже более 500 успешных проектов!",
    "Безопасность данных - наш приоритет. Мы используем шифрование и соблюдаем все международные стандарты."
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Симуляция ответа Джарвиса
    setTimeout(() => {
      const jarvisResponse = {
        id: messages.length + 2,
        text: jarvisResponses[Math.floor(Math.random() * jarvisResponses.length)],
        sender: "jarvis",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, jarvisResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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
                  <span>Предложение товаров</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Расширенная аналитика</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Техподдержка 6 месяц��в</span>
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

    </div>
  );
}

export default App;
