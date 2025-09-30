# 🏆 Business Qoldau 2025

**Бизнес Camp 2025** - платформа конкурса для предпринимателей Казахстана с поддержкой русского и казахского языков.

[![Статус](https://img.shields.io/badge/статус-в%20разработке-yellow)](https://github.com/your-repo/businessqoldau)
[![Frontend](https://img.shields.io/badge/frontend-Nuxt%203-00DC82)](https://nuxt.com/)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)](https://nodejs.org/)
[![База данных](https://img.shields.io/badge/БД-PostgreSQL%20%2B%20Prisma-336791)](https://www.postgresql.org/)

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- PostgreSQL 13+
- npm или yarn

### Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/your-repo/businessqoldau.git
cd businessqoldau

# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env
# Отредактируйте .env файл

# Запуск backend
cd backend
npm install
npm run dev  # http://localhost:3001

# Запуск frontend (в новом терминале)
cd ..
npm run dev  # http://localhost:3000
```

### Проверка работы
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Health check: http://localhost:3001/health

## 📚 Документация

- **[🏗️ Архитектура](ARCHITECTURE.md)** - архитектура системы, модель данных, API
- **[💻 Разработка](DEVELOPMENT.md)** - руководство разработчика, команды, конфигурация
- **[🚀 Деплой](DEPLOYMENT.md)** - развертывание на production сервере
- **[🤖 Claude](CLAUDE.md)** - руководство для AI агента

## 🛠️ Технологический стек

### Frontend
- **Framework**: Nuxt 3 (SSR)
- **Styling**: Tailwind CSS
- **i18n**: @nuxtjs/i18n (русский/казахский)
- **Content**: @nuxt/content (Markdown)
- **Deploy**: Vercel

### Backend
- **Runtime**: Node.js + Express
- **База данных**: PostgreSQL + Prisma ORM
- **Аутентификация**: JWT + bcrypt
- **Файлы**: Multer (локальное хранилище)
- **Email**: Nodemailer
- **Валидация**: Zod

## 📄 Страницы

### Публичные
- **`/`** - Главная страница с таймером и призовым фондом
- **`/how-to-apply`** - Инструкция по подаче заявки
- **`/terms`** - Правила участия (Markdown)
- **`/contacts`** - Контактная форма
- **`/privacy`** - Политика конфиденциальности (Markdown)

### Защищенные
- **`/login`** - Вход/регистрация
- **`/app`** - Личный кабинет для подачи заявки

## 🗄️ База данных

Проект использует PostgreSQL с Prisma ORM. Схема базы данных определена в `backend/prisma/schema.prisma`.

### Основные таблицы
- **users** - Пользователи системы
- **profiles** - Профили пользователей
- **applications** - Заявки на конкурс
- **contacts** - Контактные формы

Подробнее см. [ARCHITECTURE.md](ARCHITECTURE.md#модель-данных)

## 🚀 Деплой

### Frontend (Vercel)
1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения
3. Деплой произойдет автоматически

### Backend (VPS)
1. Настройте PostgreSQL
2. Настройте переменные окружения
3. Запустите миграции: `npm run prisma:migrate`
4. Запустите сервер: `npm start`

Подробнее см. [DEPLOYMENT.md](DEPLOYMENT.md)

## 📊 Статус проекта

### ✅ Завершено
- Frontend: все страницы, i18n, аутентификация
- Backend: аутентификация, JWT, email уведомления
- База данных: схема, миграции

### ⚠️ В разработке
- API для заявок и контактов
- Загрузка файлов
- Админ-панель

### ❌ Планируется
- Тестирование
- Деплой на production
- Мониторинг

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для фичи: `git checkout -b feature/amazing-feature`
3. Зафиксируйте изменения: `git commit -m 'Add amazing feature'`
4. Отправьте в ветку: `git push origin feature/amazing-feature`
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📁 Структура проекта

```
businessqoldau/
├── app/                    # Nuxt app директория
├── assets/                 # CSS и статические ресурсы
├── components/             # Vue компоненты
├── composables/            # Composables
├── content/                # Markdown контент (terms, privacy)
├── layouts/                # Layouts
├── locales/                # i18n переводы
├── middleware/             # Route middleware
├── pages/                  # Страницы приложения
├── public/                 # Публичные статические файлы
├── backend/                # Backend API
│   ├── src/
│   │   ├── config/         # Конфигурация
│   │   ├── middleware/     # Middleware
│   │   ├── routes/         # API роуты
│   │   ├── controllers/    # Контроллеры
│   │   ├── services/       # Бизнес-логика
│   │   └── utils/          # Утилиты
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── uploads/            # Загруженные файлы
├── nuxt.config.ts          # Nuxt конфигурация
└── ecosystem.config.js     # PM2 configuration
```

## 🔗 Полезные ссылки

- **[Nuxt 3](https://nuxt.com/docs)** - документация фреймворка
- **[Tailwind CSS](https://tailwindcss.com/docs)** - документация CSS фреймворка
- **[Prisma](https://www.prisma.io/docs)** - документация ORM
- **[Vercel](https://vercel.com/docs)** - документация платформы деплоя

---

**📅 Обновлено**: 2025-09-30  
**👤 Проект**: Business Qoldau 2025  
**🌐 Домен**: businessqoldau.kz
