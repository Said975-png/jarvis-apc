-- Создание таблицы профилей пользователей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  plan TEXT DEFAULT 'basic' CHECK (plan IN ('basic', 'pro', 'max')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание таблицы проектов
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  type TEXT DEFAULT 'website' CHECK (type IN ('website', 'ecommerce', 'landing', 'corporate', 'blog')),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание таблицы чатов
CREATE TABLE IF NOT EXISTS chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание таблицы сообщений чата
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'jarvis')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON chat_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Политики безопасности для profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Политики безопасности для projects
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

-- Политики безопасности для chats
CREATE POLICY "Users can view own chats" ON chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own chats" ON chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chats" ON chats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chats" ON chats FOR DELETE USING (auth.uid() = user_id);

-- Политики безопасности для chat_messages
CREATE POLICY "Users can view own chat messages" ON chat_messages 
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM chats WHERE chats.id = chat_messages.chat_id
    )
  );

CREATE POLICY "Users can create own chat messages" ON chat_messages 
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM chats WHERE chats.id = chat_messages.chat_id
    )
  );

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Функция для создания профиля после регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', 'Пользователь'));
  RETURN new;
END;
$$ language plpgsql security definer;

-- Триггер для автоматического создания профиля
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Создание образцов данных для демонстрации (опционально)
-- INSERT INTO profiles (id, email, name, plan) VALUES 
--   ('00000000-0000-0000-0000-000000000000', 'demo@jarvis.ai', 'Демо пользователь', 'pro');
