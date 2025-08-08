import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Dashboard = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, databaseStatus, useSupabase } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || ''
  });

  const handleProfileUpdate = () => {
    const result = updateProfile(profileData);
    if (result.success) {
      setEditMode(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const projects = [
    {
      id: 1,
      name: 'Интернет-магазин',
      status: 'В разработке',
      progress: 65,
      type: 'E-commerce',
      startDate: '15.01.2024'
    },
    {
      id: 2,
      name: 'Корпоративный сайт',
      status: 'Завершен',
      progress: 100,
      type: 'Corporate',
      startDate: '20.12.2023'
    },
    {
      id: 3,
      name: 'Лендинг продукта',
      status: 'На паузе',
      progress: 30,
      type: 'Landing',
      startDate: '01.02.2024'
    }
  ];

  const planFeatures = {
    basic: ['Базовый дизайн', 'Адаптивная верстка', 'SEO оптимизация', 'Техподдержка 3 месяца'],
    pro: ['Все функции Basic', 'ИИ помощник', 'Расширенная аналитика', 'Техподдержка 6 месяцев'],
    max: ['Все функции Pro', 'Огромный функционал', 'Улучшенный ИИ', 'Техподдержка 12 месяцев']
  };

  if (!isOpen) return null;

  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-header">
          <div className="dashboard-user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <span className="user-plan">{user?.plan?.toUpperCase()}</span>
            </div>
          </div>
          <button className="dashboard-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="dashboard-nav">
          <button 
            className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Профиль
          </button>
          <button 
            className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Проекты
          </button>
          <button 
            className={`nav-tab ${activeTab === 'plan' ? 'active' : ''}`}
            onClick={() => setActiveTab('plan')}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Тарифный план
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="section-header">
                <h4>Личная информация</h4>
                <button 
                  className="edit-button"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Отменить' : 'Редактировать'}
                </button>
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Имя</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Телефон</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!editMode}
                      placeholder="+7 (xxx) xxx-xx-xx"
                    />
                  </div>
                  <div className="form-group">
                    <label>Компания</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      disabled={!editMode}
                      placeholder="Название компании"
                    />
                  </div>
                </div>

                {editMode && (
                  <button className="save-button" onClick={handleProfileUpdate}>
                    Сохранить изменения
                  </button>
                )}
              </div>

              <div className="account-actions">
                <button className="logout-button" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-section">
              <div className="section-header">
                <h4>Мои проекты</h4>
                <button className="add-project-button">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Новый проект
                </button>
              </div>

              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h5>{project.name}</h5>
                      <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="project-details">
                      <p><strong>Тип:</strong> {project.type}</p>
                      <p><strong>Начат:</strong> {project.startDate}</p>
                    </div>
                    <div className="project-progress">
                      <div className="progress-header">
                        <span>Прогресс</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${project.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="plan-section">
              <div className="current-plan">
                <h4>Текущий тарифный план</h4>
                <div className="plan-card current">
                  <h5>{user?.plan?.toUpperCase()} план</h5>
                  <div className="plan-features">
                    {planFeatures[user?.plan]?.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button className="upgrade-button">
                    Улучшить план
                  </button>
                </div>
              </div>

              <div className="usage-stats">
                <h4>Статистика использования</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <h6>Проекты</h6>
                    <span className="stat-value">3</span>
                    <span className="stat-limit">из 5</span>
                  </div>
                  <div className="stat-item">
                    <h6>ИИ запросы</h6>
                    <span className="stat-value">127</span>
                    <span className="stat-limit">из 500</span>
                  </div>
                  <div className="stat-item">
                    <h6>Хранилище</h6>
                    <span className="stat-value">2.1 ГБ</span>
                    <span className="stat-limit">из 10 ГБ</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
