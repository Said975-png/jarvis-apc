import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem('jarvis_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Ошибка при загру��ке пользователя:', error);
        localStorage.removeItem('jarvis_user');
      }
    }
    setLoading(false);
  }, []);

  // Функция регистрации
  const register = async (userData) => {
    try {
      // Проверяем, есть ли уже пользователь с таким email
      const existingUsers = JSON.parse(localStorage.getItem('jarvis_users') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('Пользователь с таким email уже существует');
      }

      // Создаем нового пользователя
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        password: userData.password, // В реальном приложении пароль должен быть захеширован
        createdAt: new Date().toISOString(),
        plan: 'basic',
        avatar: null
      };

      // Сохраняем пользователя в "базе данных"
      existingUsers.push(newUser);
      localStorage.setItem('jarvis_users', JSON.stringify(existingUsers));

      // Авторизуем пользователя
      const userForAuth = { ...newUser };
      delete userForAuth.password; // Удаляем пароль из состояния
      
      setUser(userForAuth);
      localStorage.setItem('jarvis_user', JSON.stringify(userForAuth));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция входа
  const login = async (credentials) => {
    try {
      // Получаем всех пользователей
      const existingUsers = JSON.parse(localStorage.getItem('jarvis_users') || '[]');
      const foundUser = existingUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error('Неверный email или пароль');
      }

      // Авторизуем пользователя
      const userForAuth = { ...foundUser };
      delete userForAuth.password; // Удаляем пароль из состояния
      
      setUser(userForAuth);
      localStorage.setItem('jarvis_user', JSON.stringify(userForAuth));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('jarvis_user');
  };

  // Функция обновления профиля
  const updateProfile = (updates) => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('jarvis_user', JSON.stringify(updatedUser));

      // Обновляем в "базе данных"
      const existingUsers = JSON.parse(localStorage.getItem('jarvis_users') || '[]');
      const userIndex = existingUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
        localStorage.setItem('jarvis_users', JSON.stringify(existingUsers));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
