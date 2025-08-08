import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import PricingSection from './PricingSection';
import AdminPanel from './AdminPanel';

function AppContent() {
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
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Проверяем, находимся ли мы на странице админ панели
  const isAdminPage = window.location.pathname === '/admin';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isChatOpen]);

  const jarvisResponses = [
    "Отличный вопрос! Наша команда использует самые современные AI те��нологии для создания уникальных решений.",
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

  const handleNewChat = () => {
    // Сохранить текущий чат в историю, если есть сообщения
    if (messages.length > 1) {
      const currentChat = {
        id: Date.now(),
        messages: [...messages],
        timestamp: new Date(),
        title: `Чат ${new Date().toLocaleDateString('ru-RU')}`
      };
      setChatHistory(prev => [currentChat, ...prev]);
    }

    // Очистить текущий чат
    setMessages([
      {
        id: 1,
        text: "Привет! Я Джарвис, ваш ИИ помощник. Как дела? Чем могу помочь?",
        sender: "jarvis",
        timestamp: new Date()
      }
    ]);
    setInputMessage("");
  };

  const handleChatHistory = () => {
    // Показать историю чатов (пока простой alert, можно расширить)
    if (chatHistory.length === 0) {
      alert('История чатов пуста');
    } else {
      const historyText = chatHistory.map(chat =>
        `${chat.title} - ${chat.timestamp.toLocaleString('ru-RU')}`
      ).join('\n');
      alert('История чатов:\n' + historyText);
    }
  };


  return (
    <div className="jarvis-app">
      <Navbar />

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

        {/* Side Texts */}
        <div className="side-texts">
          <div className="side-text left-center">JARVIS WEBSITE</div>
          <div className="side-text right-center">AI POWERED</div>
        </div>

        <div className="container">
          <div className="content-wrapper">
            <div className="main-content">
              <div className="brand-badge">AI POWERED</div>
              <h1 className="brand-title">
                <span className="jarvis-text">JARVIS</span>
              </h1>
              <div className="title-underline"></div>
              <div className="brand-description-wrapper">
                <h2 className="brand-description">
                  Создаем <span className="highlight-text">крутые дизайны</span> сайтов<br />
                  с искусственным интеллектом
                </h2>
                <div className="brand-features">
                  <div className="feature-point">
                    <span className="feature-icon">✨</span>
                    <span>Современные решения</span>
                  </div>
                  <div className="feature-point">
                    <span className="feature-icon">����</span>
                    <span>Цифровые технологии</span>
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
                <p>Каждый проект уникален - создаем индивидуальные решения под ваши зада��и</p>
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
                  <span>Вс�� функции Basic</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>ИИ помощник для ��лиентов</span>
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
                  <span>Инди��идуальные решения</span>
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

      <PricingSection />

      <section className="how-it-works-section">
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
            <span className="section-number">03</span>
            <div className="section-info">
              <div className="section-badge">КАК РАБОТАЕТ ДЖАРВИС</div>
              <h2 className="section-title">Умный помощник для ваших клиентов</h2>
            </div>
          </div>

          <div className="how-it-works-content">
            <div className="intro-section">
              <div className="intro-text">
                <h3>Превратите каждого посетителя в клиента</h3>
                <p>Джарвис анализирует поведение пользователей и предлагает персонализиров��нные решения в режиме реального времени</p>
              </div>
              <div className="stats-bar">
                <div className="stat">
                  <span className="stat-value">+40%</span>
                  <span className="stat-label">Конверсия</span>
                </div>
                <div className="stat">
                  <span className="stat-value">3x</span>
                  <span className="stat-label">Время на сайте</span>
                </div>
                <div className="stat">
                  <span className="stat-value">-60%</span>
                  <span className="stat-label">Отказов</span>
                </div>
              </div>
            </div>

            <div className="capabilities-section">
              <h3>Возможности системы</h3>
              <div className="capabilities-grid">
                <div className="capability-item">
                  <div className="capability-header">
                    <div className="capability-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h4>Умная рекомендация</h4>
                  </div>
                  <p>Анализирует исто��ию покупок, поведение на сайте и предпочтения для точных рекомендаций товаров</p>
                </div>

                <div className="capability-item">
                  <div className="capability-header">
                    <div className="capability-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M21 15.46L19.59 16.88L18.17 15.46L19.59 14.05L21 15.46ZM20.71 7.04C20.31 6.65 19.68 6.65 19.29 7.04L18.17 8.16L20.84 10.83L21.96 9.71C22.35 9.32 22.35 8.69 21.96 8.3L20.71 7.04ZM17.46 8.87L10 16.33V19H12.67L20.13 11.54L17.46 8.87Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h4>Персонализация</h4>
                  </div>
                  <p>Адаптирует интерфейс и контент под каждого пользователя, создавая уникальный опыт покупок</p>
                </div>

                <div className="capability-item">
                  <div className="capability-header">
                    <div className="capability-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.8 3.4 14.6 3.4 14.4 3.5L9 7V9L15 11.5C15.2 11.6 15.4 11.6 15.6 11.5L21 9Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h4>Поддержка 24/7</h4>
                  </div>
                  <p>Мгновенные ответы на вопро��ы клиентов в любое время, без выходных и праздников</p>
                </div>

                <div className="capability-item">
                  <div className="capability-header">
                    <div className="capability-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h4>Аналитика продаж</h4>
                  </div>
                  <p>Детальная отчетность по эффективности, популярным товарам и поведению покупателей</p>
                </div>
              </div>
            </div>

            <div className="process-section">
              <div className="process-header">
                <h3>Простая интеграция</h3>
                <p>Запуск за 24 часа без изменения существующего сайта</p>
              </div>

              <div className="process-timeline">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-step">01</div>
                    <h4>Анализ сайта</h4>
                    <p>Изучаем структуру каталога и особенности бизнеса</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-step">02</div>
                    <h4>Настройка ИИ</h4>
                    <p>О��учаем систему на ваших данных и товарах</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-step">03</div>
                    <h4>Интеграция</h4>
                    <p>Встраиваем Джарвис в ваш сайт одной строкой кода</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-step">04</div>
                    <h4>Запуск</h4>
                    <p>Система готова к работе и начинает помогать клиентам</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="chat-widget">
        {/* Chat Button */}
        <div className="chat-button-container">
          <span className="chat-label">👋 Джарвис - ИИ помощник</span>
          <button
            className={`chat-button ${isChatOpen ? 'open' : ''}`}
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            {isChatOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="chat-icon">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="chat-icon">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
        </div>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="chat-window">
            {/* Left Sidebar */}
            <div className="chat-sidebar">
              <div className="sidebar-header">
                <div className="jarvis-logo">
                  <span className="logo-text">JARVIS</span>
                  <span className="logo-subtitle">AI Assistant</span>
                </div>
              </div>

              <div className="sidebar-actions">
                <button
                  className="sidebar-button new-chat-button"
                  onClick={handleNewChat}
                  title="Новый чат"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="sidebar-icon">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Новый чат
                </button>
              </div>

              <div className="sidebar-history">
                <div className="history-header">
                  <h4>История чатов</h4>
                </div>
                <div className="history-list">
                  {chatHistory.length === 0 ? (
                    <div className="no-history">Пока нет истории чатов</div>
                  ) : (
                    chatHistory.map(chat => (
                      <div key={chat.id} className="history-item">
                        <svg viewBox="0 0 24 24" fill="none" className="history-icon">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <div className="history-content">
                          <div className="history-title">{chat.title}</div>
                          <div className="history-time">{chat.timestamp.toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="chat-content">
              <div className="chat-header">
                <div className="chat-info">
                  <div className="jarvis-avatar">
                    <div className="avatar-glow"></div>
                    <span className="avatar-text">J</span>
                  </div>
                  <div className="chat-title">
                    <h3>Джарвис</h3>
                    <div className="status">
                      <span>Онлайн</span>
                    </div>
                  </div>
                </div>
                <button
                  className="close-chat"
                  onClick={() => setIsChatOpen(false)}
                  title="Закрыть чат"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="chat-messages">
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      {message.text}
                    </div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="message jarvis">
                    <div className="message-content typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Напишите сообщение..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ""}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
