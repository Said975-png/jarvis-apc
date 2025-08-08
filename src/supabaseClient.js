import { createClient } from '@supabase/supabase-js'

// Эти переменные будут заменены на реальные при настройке проекта Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Функция для инициализации таблиц (запускается один раз при настройке)
export const initializeDatabase = async () => {
  try {
    // Создаем таблицу пользователей если она не существует
    const { error: profilesError } = await supabase.rpc('create_profiles_table_if_not_exists')
    if (profilesError && !profilesError.message.includes('already exists')) {
      console.error('Ошибка создания таблицы profiles:', profilesError)
    }

    // Создаем таблицу проектов если она не существует
    const { error: projectsError } = await supabase.rpc('create_projects_table_if_not_exists')
    if (projectsError && !projectsError.message.includes('already exists')) {
      console.error('Ошибка создания таблицы projects:', projectsError)
    }

    // Создаем таблицу чатов если она не существует
    const { error: chatsError } = await supabase.rpc('create_chats_table_if_not_exists')
    if (chatsError && !chatsError.message.includes('already exists')) {
      console.error('Ошибка создания таблицы chats:', chatsError)
    }

    console.log('База данных успешно инициализирована')
  } catch (error) {
    console.error('Ошибка инициализации базы данных:', error)
  }
}

// Проверка подключения к Supabase
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
    if (error) {
      console.error('Оши��ка подключения к Supabase:', error)
      return false
    }
    console.log('Подключение к Supabase работает')
    return true
  } catch (error) {
    console.error('Ошибка проверки подключения:', error)
    return false
  }
}
