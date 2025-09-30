# 🏗️ Архитектура Business Qoldau

## 📋 Оглавление

1. [Цель проекта](#цель-проекта)
2. [Технологический стек](#технологический-стек)
3. [Архитектура системы](#архитектура-системы)
4. [Модель данных](#модель-данных)
5. [API эндпоинты](#api-эндпоинты)
6. [Статус реализации](#статус-реализации)
7. [Этапы разработки](#этапы-разработки)

---

## 🎯 Цель проекта

Быстро запустить сайт по примеру shesnext.kz: лендинг + странички с правилами, контактами и политикой, плюс один общий кабинет для подачи заявок.

**Бизнес Camp 2025** - A bilingual (Russian/Kazakh) business competition platform for entrepreneurs in Kazakhstan.

---

## 🛠️ Технологический стек

### Frontend
* ✅ **SSR Framework**: Nuxt 3
* ✅ **Styling**: Tailwind CSS
* ✅ **i18n**: @nuxtjs/i18n (русский/казахский)
* ✅ **Контент**: @nuxt/content (Markdown для «Правил» и «Политики»)
* ⚠️ **Аналитика**: Google Analytics 4 - не подключена

### Backend
* ✅ **API Server**: Node.js + Express
* ✅ **База данных**: PostgreSQL + Prisma ORM
* ✅ **Аутентификация**: JWT + bcrypt
* ✅ **Загрузка файлов**: Multer
* ✅ **Email**: Nodemailer
* ✅ **Валидация**: Zod

### Деплой
* ⚠️ **Frontend**: Vercel - не задеплоено
* ❌ **Backend**: VPS (DigitalOcean/Hetzner) или Railway/Render
* ❌ **База данных**: Managed PostgreSQL или на VPS
* ❌ **Файлы**: Локальное хранилище на VPS или S3-compatible сервис

---

## 🏛️ Архитектура системы

### Компоненты системы

```
┌─────────────────────────────────────────────────┐
│                    Nginx                        │
│          SSL Termination + Proxy                │
│              businessqoldau.kz                  │
│                 Port 80/443                     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│            Nuxt.js Application                  │
│         (Frontend + Backend API)                │
│              Port 3002                          │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              PostgreSQL Database                │
│          (Shared Infrastructure)                │
│                Port 5436                        │
└─────────────────────────────────────────────────┘
```

### Структура проекта

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

---

## 🗄️ Модель данных

### users
* `id` (UUID, PK)
* `email` (unique)
* `password_hash`
* `email_verified` (boolean)
* `created_at`, `updated_at`

### profiles
* `id` (UUID, PK)
* `user_id` (UUID, FK → users.id)
* `full_name`
* `phone`
* `city`
* `created_at`, `updated_at`

### applications
* `id` (UUID, PK)
* `user_id` (UUID, FK → users.id)
* `category` (enum: 'starter', 'active', 'it')
* `summary` (text)
* `plan_file_path` (varchar)
* `video_file_path` (varchar)
* `status` (enum: 'draft', 'submitted')
* `created_at`, `updated_at`

### contacts
* `id` (UUID, PK)
* `name` (varchar)
* `email` (varchar)
* `message` (text)
* `created_at`

---

## 🔌 API эндпоинты

### Аутентификация
* `POST /api/auth/register` - регистрация
* `POST /api/auth/login` - вход
* `POST /api/auth/refresh` - обновление токена
* `POST /api/auth/logout` - выход
* `POST /api/auth/forgot-password` - восстановление пароля
* `POST /api/auth/reset-password` - сброс пароля
* `POST /api/auth/verify-email` - подтверждение email

### Профили (TODO)
* `GET /api/profile` - получить свой профиль
* `PUT /api/profile` - обновить профиль
* `POST /api/profile` - создать профиль

### Заявки (TODO)
* `GET /api/applications` - получить свои заявки
* `GET /api/applications/:id` - получить заявку по ID
* `POST /api/applications` - создать заявку
* `PUT /api/applications/:id` - обновить заявку (только draft)
* `POST /api/applications/:id/submit` - отправить заявку

### Контакты (TODO)
* `POST /api/contacts` - отправить сообщение

---

## 📊 Статус реализации

### ✅ Выполнено (Frontend)
- Nuxt 3 проект инициализирован
- Tailwind CSS настроен с кастомными утилитами
- i18n (русский/казахский) настроен
- Все страницы созданы с основным UI
- Layout с Header/Footer
- Роутинг и middleware для защиты маршрутов
- Базовые компоненты форм
- Markdown контент для правил и политики

### ✅ Выполнено (Backend)
- ✅ **Этап 1**: Настройка окружения и БД
- ✅ **Этап 2**: Аутентификация (JWT, email, валидация)
- ⚠️ **Этап 3**: Профили пользователей (TODO)
- ⚠️ **Этап 4**: Заявки (CRUD + загрузка файлов) (TODO)
- ⚠️ **Этап 5**: Контактная форма (TODO)
- ⚠️ **Этап 6**: Администрирование (TODO)

### ⚠️ Требует завершения
- Рабочий таймер обратного отсчета
- Локализация SEO метатегов
- Google Analytics 4
- Sitemap.xml и robots.txt
- Интеграция остальных страниц с backend API

---

## 🚀 Этапы разработки

### Этап 1: Настройка окружения и БД ✅
- Структура проекта создана
- Все зависимости установлены
- PostgreSQL база данных настроена
- Prisma миграции применены
- Backend сервер работает на :3001

### Этап 2: Аутентификация ✅
- Auth service реализован
- JWT utilities (генерация/верификация)
- Email utilities (отправка верификации)
- Auth middleware
- Frontend интеграция

### Этап 3: Профили пользователей ❌
- API эндпоинты для профилей
- Интеграция с фронтендом

### Этап 4: Заявки ❌
- API эндпоинты для заявок
- Загрузка файлов (PDF, MP4)
- Логика статусов (draft/submitted)
- Интеграция с фронтендом

### Этап 5: Контактная форма ❌
- API эндпоинт для контактов
- Email уведомление администратору
- Интеграция с фронтендом

### Этап 6: Администрирование ❌
- Роль admin в таблице users
- API для админов
- Простая админ-панель

### Этап 7: Тестирование и безопасность ❌
- Rate limiting
- CORS для production
- Валидация данных
- Обработка ошибок
- Логирование
- Unit/Integration тесты
- Security аудит

### Этап 8: Деплой ❌
- PostgreSQL на production
- Backend деплой
- Nginx reverse proxy
- SSL сертификаты
- Переменные окружения
- Миграции на production
- Бэкапы БД

---

## 📈 Оценка времени

- **✅ Этап 1 (завершен)**: 1-2 дня
- **✅ Этап 2 (завершен)**: 2-3 дня
- **Backend разработка (Этап 3-6)**: 7-12 дней
- **Интеграция с фронтендом (Этап 3-5)**: 2-3 дня
- **Тестирование и деплой (Этап 7-8)**: 3-4 дня
- **Оставшееся время**: ~2-2.5 недели разработки

---

**📅 Обновлено**: 2025-09-30
**👤 Проект**: Business Qoldau 2025
**🌐 Домен**: businessqoldau.kz
