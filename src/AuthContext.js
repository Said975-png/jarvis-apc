import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { createFallbackAuth } from './AuthFallback';

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
  const [useSupabase, setUseSupabase] = useState(true);
  const fallbackAuth = createFallbackAuth();

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Слушаем изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Загружаем профиль пользователя из базы данных
  const loadUserProfile = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Ошибка загрузки профиля:', error);
        setLoading(false);
        return;
      }

      setUser(profile);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
      setLoading(false);
    }
  };

  // Функция регистрации
  const register = async (userData) => {
    try {
      setLoading(true);

      // Регистрируем пользователя в Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Если пользователь был создан, создаем профиль
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: userData.email,
              name: userData.name,
              plan: 'basic'
            }
          ]);

        if (profileError) {
          console.error('Ошибка создания профиля:', profileError);
          // Профиль может быть создан автоматически через триггер
        }

        // Загружаем профиль
        await loadUserProfile(authData.user.id);
      }

      setLoading(false);
      return { success: true, needsConfirmation: !authData.session };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Функция входа
  const login = async (credentials) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        await loadUserProfile(data.user.id);
      }

      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Функция выхода
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Ошибка выхода:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  // Функция обновления профиля
  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция загрузки проектов пользователя
  const loadUserProjects = async () => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция создания нового проекта
  const createProject = async (projectData) => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...projectData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция загрузки чатов пользователя
  const loadUserChats = async () => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция создания нового чата
  const createChat = async (title) => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            title,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Функция сохранения сообщения чата
  const saveChatMessage = async (chatId, sender, content) => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            chat_id: chatId,
            sender,
            content
          }
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
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
    loadUserProjects,
    createProject,
    loadUserChats,
    createChat,
    saveChatMessage,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
