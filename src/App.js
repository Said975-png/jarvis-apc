import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Привет! Я Джарвис, ваш ИИ помощник. Как дела? Чем могу по��очь?",
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
    "Отличный во��рос! Наша команда использует самые современные AI технологии для создания уникальных решений.",
    "Я здесь, чтобы помочь вам с любыми вопросами о наших услугах и технологиях.",
    "Интересно! Расскажите ��ольше о вашем проекте, и я подберу идеальное решение.",
    "Наши разработчики работают 24/7, чтобы обесп��чить максимальное качество продукта.",
    "Хотите узнать больше о наших тарифных ��ланах? Я могу помочь выбрать подходящий вариант.",
    "Наша к��манда имеет более 15 лет оп����та в разработке и дизайне. Мы создали уже более 500 успешных проектов!",
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


          <div className="navbar-actions">
            <button className="navbar-icon-button" title="Корзина">
              <svg viewBox="0 0 24 24" fill="none" className="navbar-icon">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H3m4 8v6a2 2 0 002 2h6a2 2 0 002-2v-6m-9 0h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="auth-buttons-wrapper">
              <button className="navbar-button">Регистрация</button>
              <button className="navbar-button-primary">Вход</button>
            </div>
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
                    <span className="feature-icon">🚀</span>
                    <span>Цифровые технологии</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span className="scroll-text">Прокрутите ��низ</span>
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
              <h2 className="section-title">Почему мы лу��шие?</h2>
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
                  <span>Адап��ивная верстка</span>
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
                  <span>Огро��ный функционал</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Улучшенный И�� помощник</span>
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

      <section className="jarvis-demo-section">
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
              <div className="section-badge">ДЖАРВИС В ДЕЙСТВИИ</div>
              <h2 className="section-title">Как работает ИИ помощник?</h2>
            </div>
          </div>

          <div className="demo-layout">
            <div className="demo-left">
              <div className="demo-card">
                <div className="demo-icon">
                  <svg viewBox="0 0 24 24" fill="none" className="icon">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Общение как с человеком</h3>
                <p>Джарвис понимает естественную речь и отвечает так, будто вы разговариваете с настоящим консультантом</p>
              </div>

              <div className="demo-card">
                <div className="demo-icon">
                  <svg viewBox="0 0 24 24" fill="none" className="icon">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Умный выбор товаров</h3>
                <p>Анализирует ваши потребности и предлагает идеально подходящие решения из всего ассортимента</p>
              </div>

              <div className="demo-card">
                <div className="demo-icon">
                  <svg viewBox="0 0 24 24" fill="none" className="icon">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Мгновенные ответы</h3>
                <p>Получайте помощь 24/7 без ожидания. Джарвис всегда готов ответить на ваши вопросы</p>
              </div>
            </div>

            <div className="demo-right">
              <div className="chat-demo">
                <div className="demo-chat-header">
                  <div className="demo-avatar">
                    <span>J</span>
                  </div>
                  <div className="demo-info">
                    <h4>Джарвис</h4>
                    <span className="demo-status">В сети</span>
                  </div>
                </div>

                <div className="demo-messages">
                  <div className="demo-message user">
                    <div className="demo-message-content">
                      Привет! Мне нужен сайт для моего бизнеса, но я не знаю, какой план выбрать
                    </div>
                  </div>

                  <div className="demo-message jarvis">
                    <div className="demo-message-content">
                      Привет! Я помогу вам выбрать идеальный план. Расскажите, какой у вас бизнес и какие функции важны для сайта?
                    </div>
                  </div>

                  <div className="demo-message user">
                    <div className="demo-message-content">
                      У м��ня интернет-магазин одежды, нужен каталог товаров и онлайн-оплата
                    </div>
                  </div>

                  <div className="demo-message jarvis">
                    <div className="demo-message-content">
                      Отлично! Для интернет-магазина рекомендую PRO план. Он включает каталог товаров, систему оплаты, и ИИ помощника для ваших клиентов. Хотите узнать больше?
                    </div>
                  </div>

                  <div className="demo-typing">
                    <div className="demo-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text">Джарвис печатает...</span>
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
            <div className="chat-header">
              <div className="jarvis-avatar">
                <div className="avatar-glow"></div>
                <span className="avatar-text">J</span>
              </div>
              <div className="chat-info">
                <h3>Джарвис</h3>
                <span className="status">В сети</span>
              </div>
              <button
                className="close-chat"
                onClick={() => setIsChatOpen(false)}
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
        )}
      </div>

    </div>
  );
}

export default App;
