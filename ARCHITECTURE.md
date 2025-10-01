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
* `plan_file_path` (varchar) - путь к бизнес-плану (PDF/DOC/DOCX)
* `video_file_path` (varchar, nullable) - зарезервировано для будущего
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

### Профили ✅
* `GET /api/profile` - получить свой профиль
* `PUT /api/profile` - обновить профиль
* `POST /api/profile` - создать профиль

### Заявки ✅
* `GET /api/applications` - получить свои заявки
* `GET /api/applications/:id` - получить заявку по ID
* `POST /api/applications` - создать заявку
* `PUT /api/applications/:id` - обновить заявку (только draft)
* `DELETE /api/applications/:id` - удалить заявку (только draft)
* `POST /api/applications/:id/submit` - отправить заявку
* `POST /api/applications/:id/upload` - загрузить бизнес-план

### Контакты ✅
* `POST /api/contacts` - отправить сообщение (публичный)
* `GET /api/contacts` - получить все контакты (admin only)
* `GET /api/contacts/:id` - получить контакт по ID (admin only)

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
- ✅ **Этап 3**: Профили пользователей (GET/POST/PUT /api/profile)
- ✅ **Этап 4**: Заявки (CRUD + загрузка файлов PDF/DOC/DOCX)
- ✅ **Этап 5**: Контактная форма (API + email уведомления + frontend)
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

### Этап 3: Профили пользователей ✅ COMPLETE
- ✅ Profile service (getProfile, createProfile, updateProfile)
- ✅ Profile controller с валидацией Zod
- ✅ Profile routes с auth middleware
- ✅ API эндпоинты: GET/POST/PUT /api/profile
- ✅ Frontend composable useProfile()
- ✅ Интеграция в pages/app.vue
- ✅ Автозагрузка и автосохранение профиля

### Этап 4: Заявки ✅ COMPLETE
- ✅ Application service (getApplications, getApplicationById, createApplication, updateApplication, submitApplication, deleteApplication)
- ✅ File upload service с Multer (PDF/DOC/DOCX, 20MB limit, UUID имена)
- ✅ Application controller с валидацией Zod
- ✅ Application routes подключены к main router
- ✅ 7 API эндпоинтов (GET, POST, PUT, DELETE, submit, upload)
- ✅ Логика статусов (draft/submitted)
- ✅ Защита: проверка владения, запрет редактирования submitted заявок
- ✅ Валидация: требуется профиль + файл для submit
- ✅ Все endpoints протестированы через curl
- ✅ Frontend composable useApplication() реализован
- ✅ Интеграция в pages/app.vue с автозагрузкой данных
- ✅ Загрузка файлов с progress tracking (XMLHttpRequest + FormData)
- ✅ UI для статусов draft/submitted
- ✅ Полный цикл: создание → загрузка файла → отправка заявки

### Этап 5: Контактная форма ✅ COMPLETE
- ✅ Contact service (createContact, getAllContacts, getContactById)
- ✅ Contact controller с валидацией Zod (name 2-100, email, message 10-1000)
- ✅ Contact routes подключены к main router
- ✅ 3 API эндпоинта (POST публичный, GET admin-only)
- ✅ Email уведомления администратору через Nodemailer
- ✅ Frontend composable useContact()
- ✅ Интеграция в pages/contacts.vue
- ✅ Обработка success/error состояний
- ✅ Все endpoints протестированы через curl
- ✅ SMTP credentials настроен .env для email

### Этап 6: Администрирование ✅ ЗАВЕРШЕНО
**Backend (✅ ЗАВЕРШЕНО):**
- ✅ Добавлено поле `role` (enum: user/admin) в таблицу users через миграцию
- ✅ Создан adminAuth middleware для проверки прав администратора
- ✅ Реализован adminService с функциями:
  - `getAllApplications()` - список заявок с фильтрами (status, category) и пагинацией
  - `updateApplicationStatus()` - изменение статуса заявки
  - `getAllUsers()` - список пользователей с профилями
  - `getApplicationStats()` - статистика по заявкам
- ✅ Создан adminController с валидацией Zod
- ✅ Admin routes подключены к main router:
  - `GET /api/admin/applications` - список всех заявок
  - `PUT /api/admin/applications/:id/status` - изменение статуса
  - `GET /api/admin/users` - список пользователей
  - `GET /api/admin/stats` - статистика
- ✅ Все endpoints протестированы через curl
- ✅ Создана учетная запись администратора:
  - Email: admin@businesscamp.kz
  - Password: AdminPass123
  - Role: admin
- ✅ Обновлен authService.getCurrentUser() для возврата поля `role`

**Frontend (✅ ЗАВЕРШЕНО):**
- ✅ Middleware `admin.ts` для защиты маршрута `/admin` (проверка role === 'admin')
- ✅ Composable `useAdmin()` для работы с Admin API
- ✅ Страница `/admin` с полноценной админ-панелью
- ✅ UI админ-панели:
  - 3 вкладки: Статистика, Заявки, Пользователи
  - Dashboard со статистикой (всего заявок, черновиков, отправленных, по категориям)
  - Таблица заявок с фильтрацией по статусу и категории
  - Пагинация для списка заявок
  - Модальное окно для просмотра деталей заявки
  - Возможность изменения статуса заявки (draft ↔ submitted)
  - Таблица пользователей с информацией о профилях
- ✅ Интеграция с backend API через useAdmin() composable
- ✅ Обновлен интерфейс User в useAuth.ts (добавлено поле `role`)

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
- **✅ Этап 3 (завершен)**: 1 день
- **✅ Этап 4 (завершен)**: 1 день
- **✅ Этап 5 (завершен)**: 0.5 дня
- **✅ Этап 6 (завершен)**: Backend (0.5 дня) + Frontend (0.5 дня) = 1 день
- **❌ Этап 7 (не начат)**: Тестирование и безопасность (~2-3 дня)
- **❌ Этап 8 (не начат)**: Деплой и production (~1-2 дня)
- **Оставшееся время**: ~3-5 дней разработки

---

**📅 Обновлено**: 2025-10-01
**👤 Проект**: Business Qoldau 2025
**🌐 Домен**: businessqoldau.kz

---

## 🔐 Учетные данные администратора

**Admin account для тестирования:**
- **Email**: admin@businesscamp.kz
- **Password**: AdminPass123
- **Role**: admin
- **Доступ**: GET /api/admin/* endpoints

**Примечание**: Пароль следует изменить перед production деплоем.
