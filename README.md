# Бизнес Camp 2025

Сайт конкурса для предпринимателей Казахстана.

## Стек технологий

- **Frontend/SSR**: Nuxt 3
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Content**: @nuxt/content
- **i18n**: @nuxtjs/i18n (русский/казахский)
- **Deploy**: Vercel

## Настройка проекта

### 1. Установка зависимостей

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. Настройка переменных окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните необходимые переменные:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
BASE_URL=http://localhost:3000
```

### 3. Настройка Supabase

Создайте проект в [Supabase](https://supabase.com) и выполните следующие SQL команды:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('starter', 'active', 'it')),
  summary TEXT NOT NULL,
  plan_file_path TEXT,
  video_file_path TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for applications
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own draft applications" ON applications
  FOR UPDATE USING (auth.uid() = user_id AND status = 'draft');

-- Policies for contacts
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);
```

### 4. Настройка Storage в Supabase

Создайте два bucket в Supabase Storage:
- `business-plans` (для бизнес-планов)
- `videos` (для видео-презентаций)

Настройте политики доступа для каждого bucket.

## Запуск проекта

### Development Server

Запустите dev-сервер на `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production Build

Соберите приложение для production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Структура проекта

```
├── app/              # Nuxt app директория
├── assets/           # CSS и статические ресурсы
├── components/       # Vue компоненты
├── composables/      # Composables
├── content/          # Markdown контент (terms, privacy)
├── layouts/          # Layouts
├── locales/          # i18n переводы
├── middleware/       # Route middleware
├── pages/            # Страницы приложения
├── public/           # Публичные статические файлы
└── nuxt.config.ts    # Nuxt конфигурация
```

## Страницы

- `/` - Главная страница
- `/how-to-apply` - Инструкция по подаче заявки
- `/terms` - Правила участия
- `/contacts` - Контакты
- `/privacy` - Политика конфиденциальности
- `/login` - Вход/регистрация
- `/app` - Личный кабинет (protected)

## Деплой

Проект настроен для деплоя на [Vercel](https://vercel.com).

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках Vercel
3. Деплой произойдет автоматически

## TODO

- [ ] Реализовать загрузку файлов в Supabase Storage
- [ ] Реализовать отправку email уведомлений
- [ ] Добавить таймер обратного отсчета
- [ ] Настроить Google Analytics
- [ ] Добавить sitemap.xml и robots.txt
- [ ] Оптимизировать изображения
- [ ] Добавить тесты

## Документация

- [Nuxt 3](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase](https://supabase.com/docs)
- [Vercel](https://vercel.com/docs)
