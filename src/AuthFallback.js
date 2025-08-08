// Fallback версия аутентификации для работы без настроенного Supabase
// Использует localStorage как временное решение

export const createFallbackAuth = () => {
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
        created_at: new Date().toISOString(),
        plan: 'basic',
        phone: '',
        company: ''
      };

      // Сохраняем пользователя в localStorage
      existingUsers.push(newUser);
      localStorage.setItem('jarvis_users', JSON.stringify(existingUsers));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      // Получаем всех пользователей
      const existingUsers = JSON.parse(localStorage.getItem('jarvis_users') || '[]');
      const foundUser = existingUsers.find(
        u => u.email === credentials.email
      );

      if (!foundUser) {
        throw new Error('Пользователь не найден. Проверьте email или зарегистрируйтесь.');
      }

      return { success: true, user: foundUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (userId, updates) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('jarvis_users') || '[]');
      const userIndex = existingUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error('Пользователь не найден');
      }

      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
      localStorage.setItem('jarvis_users', JSON.stringify(existingUsers));

      return { success: true, data: existingUsers[userIndex] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loadUserProjects = async () => {
    try {
      // Возвращаем демо проекты
      const demoProjects = [
        {
          id: '1',
          name: 'Интернет-магазин',
          status: 'in-progress',
          progress: 65,
          type: 'ecommerce',
          start_date: '2024-01-15'
        },
        {
          id: '2',
          name: 'Корпоративный сайт',
          status: 'completed',
          progress: 100,
          type: 'corporate',
          start_date: '2023-12-20'
        },
        {
          id: '3',
          name: 'Лендинг продукта',
          status: 'on-hold',
          progress: 30,
          type: 'landing',
          start_date: '2024-02-01'
        }
      ];

      return { success: true, data: demoProjects };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loadUserChats = async () => {
    try {
      const chats = JSON.parse(localStorage.getItem('jarvis_chats') || '[]');
      return { success: true, data: chats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const createChat = async (title) => {
    try {
      const chats = JSON.parse(localStorage.getItem('jarvis_chats') || '[]');
      const newChat = {
        id: Date.now().toString(),
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      chats.unshift(newChat);
      localStorage.setItem('jarvis_chats', JSON.stringify(chats));

      return { success: true, data: newChat };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    register,
    login,
    updateProfile,
    loadUserProjects,
    loadUserChats,
    createChat
  };
};
