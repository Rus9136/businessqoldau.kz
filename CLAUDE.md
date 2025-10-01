
# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 Project Overview

**Бизнес Camp 2025** - A bilingual (Russian/Kazakh) business competition platform for entrepreneurs in Kazakhstan. Full-stack application with Nuxt 3 frontend and Node.js + Express backend.

### Tech Stack

**Frontend:**
- Nuxt 3 (SSR)
- Tailwind CSS
- @nuxtjs/i18n (Russian/Kazakh localization)
- @nuxt/content (Markdown content for terms/privacy)
- Vercel (deployment)

**Backend:**
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT authentication
- Multer (file uploads)
- Nodemailer (email notifications)
- Zod (validation)

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run dev  # http://localhost:3001
```

**Verification:**
- `curl http://localhost:3001/health` - health check
- `curl http://localhost:3001/api` - API info

**Database:** PostgreSQL `businesscamp` is already configured and running

### Frontend
```bash
npm install
npm run dev  # http://localhost:3000
```

## 🛠️ Development Commands

### Frontend (root directory)
```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

### Backend (backend/ directory)
```bash
cd backend

# Start development server with hot-reload (localhost:3001)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Prisma commands
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio (GUI)

# Test endpoints
curl http://localhost:3001/health    # Health check
curl http://localhost:3001/api       # API info
```

## 🏗️ Application Architecture

### Authentication & Authorization

**Backend (Express + JWT):**
- JWT-based authentication with access and refresh tokens
- Password hashing with bcrypt
- `backend/src/middleware/auth.ts` - JWT verification middleware
- Authentication endpoints (✅ IMPLEMENTED in Stage 2):
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `POST /api/auth/refresh` - Refresh access token
  - `POST /api/auth/verify-email` - Email verification
  - `POST /api/auth/forgot-password` - Password reset request

**Frontend (Nuxt 3):**
- `middleware/auth.ts` protects the `/app` route (personal cabinet)
- Auth state managed via composables (✅ connected to backend API)
- Public routes: `/`, `/how-to-apply`, `/terms`, `/contacts`, `/privacy`
- Protected routes: `/app` (application submission form)

### i18n Configuration
- Configured in `i18n.config.ts` with inline messages
- Default locale: `ru` (Russian)
- Available locales: `ru`, `kk` (Kazakh)
- Access translations via `$t()` in templates or `useI18n()` in script
- Language switcher in `Header.vue` allows runtime locale switching
- ⚠️ **Current Issue**: Translation keys display as `nav.home` instead of translated text
  - Messages are defined in `i18n.config.ts` but @nuxtjs/i18n v10 requires additional configuration
  - Site functionality is NOT affected - this is a display-only issue
  - See "Known Issues" section for details

### Page Structure & Routes
- `/` - Landing page with hero, countdown timer, competition stages, prize pool
- `/how-to-apply` - Step-by-step application instructions
- `/terms` - Competition rules (rendered from `content/terms.md` via @nuxt/content)
- `/privacy` - Privacy policy (rendered from `content/privacy.md` via @nuxt/content)
- `/contacts` - Contact form (saves to `contacts` table in database)
- `/login` - Combined login/registration page (no layout wrapper)
- `/app` - Protected personal cabinet for application submission (requires auth)

### Layouts & Components
- `layouts/default.vue` - Main layout with Header, content slot, and Footer
- `components/Header.vue` - Navigation with auth state, language switcher, mobile menu
- `components/Footer.vue` - Site footer with links and contact info
- Pages without layout use `definePageMeta({ layout: false })`

### Application Submission Flow
1. User registers/logs in via `/login`
2. Redirected to `/app` (personal cabinet)
3. Fill form: full name, phone, city, category (starter/active/it), business description
4. Upload business plan (PDF/DOC/DOCX, max 20MB)
5. Save as draft (status: 'draft') or submit (status: 'submitted')
6. After submission, form becomes read-only

## 🗄️ Database Schema (PostgreSQL + Prisma)

Schema defined in `backend/prisma/schema.prisma`:

**users** table:
- `id` (UUID, PK)
- `email` (unique)
- `password_hash`
- `email_verified` (boolean)
- `created_at`, `updated_at`

**profiles** table:
- `id` (UUID, PK)
- `user_id` (UUID, FK to users.id)
- `full_name`, `phone`, `city`
- `created_at`, `updated_at`

**applications** table:
- `id` (UUID, PK)
- `user_id` (UUID, FK to users.id)
- `category` (enum: 'starter', 'active', 'it')
- `summary` (text)
- `plan_file_path`, `video_file_path` (file paths)
- `status` (enum: 'draft', 'submitted')
- `created_at`, `updated_at`

**contacts** table:
- `id` (UUID, PK)
- `name`, `email`, `message` (text)
- `created_at`

**application_settings** table:
- `id` (UUID, PK)
- `setting_key` (string, unique) - ключ настройки (например, "application_period")
- `setting_value` (JSON) - значение настройки с полями: start_date, end_date, is_active, message
- `updated_by_id` (UUID, FK to users.id) - администратор, который обновил настройку
- `created_at`, `updated_at`

### File Storage
Local filesystem storage in `backend/uploads/`:
- `business-plans/` - Business plans in PDF/DOC/DOCX format (max 20MB)
- Unique UUID filenames for security
- MIME type validation on upload

## 🎨 Styling Approach
- Tailwind CSS configured via `@nuxtjs/tailwindcss` module
- Custom utilities in `assets/css/main.css`:
  - `.btn-primary` - Primary action button
  - `.btn-secondary` - Secondary button
  - `.container-custom` - Max-width container with responsive padding
- Color scheme: Blue primary (`blue-600`), white background, gray text
- Mobile-first responsive design

## ⚙️ Environment Setup

### Frontend `.env`
```env
BASE_URL=http://localhost:3000
NUXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend `backend/.env`
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/businesscamp?schema=public

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@businesscamp.kz

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_PDF=20971520
MAX_FILE_SIZE_DOC=20971520
```

> See `backend/.env.example` for full template.

## 📁 Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # Prisma client singleton
│   │   └── jwt.ts           # JWT configuration
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication middleware
│   │   ├── adminAuth.ts         # Admin role verification
│   │   ├── applicationPeriod.ts # Application period checker
│   │   └── errorHandler.ts      # Global error handler
│   ├── routes/
│   │   ├── index.ts            # Main router
│   │   ├── auth.ts             # Auth endpoints
│   │   ├── profile.ts          # Profile endpoints
│   │   ├── application.ts      # Application endpoints
│   │   ├── contact.ts          # Contact endpoints
│   │   ├── adminRoutes.ts      # Admin endpoints
│   │   └── settingsRoutes.ts   # Settings endpoints (application period)
│   ├── controllers/         # Request handlers
│   │   └── settingsController.ts  # Application period controller
│   ├── services/            # Business logic
│   │   └── settingsService.ts     # Application period service
│   ├── utils/               # Helper functions
│   └── index.ts             # Express app entry point
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── uploads/
│   └── business-plans/      # PDF/DOC/DOCX files
└── .env                     # Environment variables
```

## 📊 Implementation Status

### ✅ Completed
**Stage 1: Environment & Database Setup** ✅ COMPLETE
- Backend project structure created
- Dependencies installed (Express, Prisma, JWT, etc.)
- Database schema defined in Prisma
- Base middleware (auth, error handler) implemented
- Configuration files (.env, tsconfig.json)
- PostgreSQL database `businesscamp` created
- Prisma migrations applied successfully
- Database tables: users, profiles, applications, contacts
- Backend server tested and working on http://localhost:3001
- Git repository initialized and pushed to GitHub
- Docker Compose configuration for PostgreSQL (optional)

**Stage 2: Authentication** ✅ COMPLETE
- Auth service реализован (register, login, refresh, logout, verify-email, reset-password)
- Auth controller с валидацией (Zod)
- JWT utilities (генерация/верификация access/refresh токенов)
- Email utilities (отправка верификации и сброса пароля)
- Auth middleware (проверка JWT токенов)
- Auth routes подключены к main router
- Все endpoints протестированы через curl
- Frontend интеграция: composable useAuth(), pages/login.vue, middleware/auth.ts
- ⚠️ Email отправка требует настройки SMTP credentials в .env

**Stage 3: User Profiles** ✅ COMPLETE
- Profile service (getProfile, createProfile, updateProfile)
- Profile controller с валидацией Zod
- Profile routes с auth middleware
- API endpoints: GET/POST/PUT /api/profile
- Frontend composable useProfile()
- Интеграция в pages/app.vue
- Автозагрузка и автосохранение профиля

**Stage 4: Applications (CRUD + File Uploads)** ✅ COMPLETE
- Application service: getApplications, getApplicationById, createApplication, updateApplication, submitApplication, deleteApplication
- File upload service с Multer (PDF/DOC/DOCX, 20MB limit)
- Application controller с валидацией Zod
- Application routes подключены к main router
- 7 API endpoints:
  - `GET /api/applications` - список заявок пользователя
  - `POST /api/applications` - создать заявку (draft)
  - `GET /api/applications/:id` - получить заявку по ID
  - `PUT /api/applications/:id` - обновить заявку (только draft)
  - `DELETE /api/applications/:id` - удалить заявку (только draft)
  - `POST /api/applications/:id/submit` - отправить заявку (draft → submitted)
  - `POST /api/applications/:id/upload` - загрузить бизнес-план
- Защита: проверка владения, запрет редактирования submitted заявок
- Валидация: требуется профиль + файл для submit
- UUID имена файлов для безопасности
- Все endpoints протестированы через curl
- Frontend composable useApplication() с полной интеграцией API
- Интеграция в pages/app.vue с автозагрузкой данных
- Загрузка файлов с progress bar и валидацией
- Поддержка draft/submitted статусов с соответствующим UI

**Stage 5: Contact Form** ✅ COMPLETE
- Contact service (createContact, getAllContacts, getContactById)
- Contact controller с валидацией Zod (name 2-100, email, message 10-1000)
- Contact routes подключены к main router
- 3 API endpoints:
  - `POST /api/contacts` - создать контактное сообщение (публичный)
  - `GET /api/contacts` - список всех контактов (admin only)
  - `GET /api/contacts/:id` - получить контакт по ID (admin only)
- Email уведомления администратору через Nodemailer
- Frontend composable useContact()
- Интеграция в pages/contacts.vue с обработкой success/error состояний
- Все endpoints протестированы через curl
- ⚠️ Требует настройки SMTP credentials в .env для email

**Stage 6: Admin Panel** ✅ COMPLETE
- Backend (✅ COMPLETE):
  - Добавлено поле `role` (enum: user/admin) в таблицу users
  - AdminAuth middleware для проверки прав администратора
  - Admin service с функциями: getAllApplications, updateApplicationStatus, getAllUsers, getApplicationStats
  - Admin controller с валидацией Zod
  - Admin routes: GET /api/admin/applications, PUT /api/admin/applications/:id/status, GET /api/admin/users, GET /api/admin/stats
  - Все endpoints протестированы
  - Учетная запись администратора: admin@businesscamp.kz / AdminPass123
- Frontend (✅ COMPLETE):
  - Middleware admin.ts для защиты маршрута /admin
  - Composable useAdmin() для работы с Admin API
  - Страница /admin с админ-панелью:
    - Показывает только отправленные заявки (status: 'submitted')
    - Фильтрация по категории (starter/active/it)
    - Таблица заявок: ID, Пользователь, Категория, Дата создания, Действия
    - Модальное окно для просмотра деталей заявки
    - Скачивание прикрепленных бизнес-планов (PDF/DOC/DOCX)
    - Иконка скачивания файлов прямо в таблице
    - Таблица пользователей с информацией о профилях
- Backend file serving (✅ COMPLETE):
  - Статические файлы из /uploads доступны через express.static
  - Файлы доступны по URL: http://localhost:3001/uploads/business-plans/{filename}

**Application Period System** ✅ COMPLETE
- Backend (✅ COMPLETE):
  - Таблица `application_settings` для хранения настроек периода (JSON)
  - SettingsService с методами: getApplicationSettings, updateApplicationSettings, isApplicationPeriodActive
  - SettingsController с валидацией дат и логикой проверки периода
  - Settings routes: GET/PUT /api/settings/application-period
  - Middleware `checkApplicationPeriodForAuth` - блокирует регистрацию вне периода, вход разрешен всегда
  - Код ошибки: `APPLICATION_PERIOD_INACTIVE`
- Frontend (✅ COMPLETE):
  - Composable useSettings() для работы с API периода
  - Admin panel: вкладка "Период подачи" для управления датами start_date/end_date
  - Login page: автоматическая проверка периода при загрузке
  - Информационный баннер при неактивном периоде
  - Блокировка кнопки "Регистрация" вне периода
  - Вход администратора разрешен всегда
- Документация: См. `APPLICATION_PERIOD_SYSTEM.md` для полной информации

### ⏳ TODO
**Stage 7:** Testing & security
**Stage 8:** Deployment

## 📝 Important Implementation Notes

### Frontend Integration
**Completed:**
- ✅ useAuth() composable connected to backend API
- ✅ useProfile() composable for profile management
- ✅ useApplication() composable for application management
- ✅ pages/app.vue fully integrated with profile + application APIs
- ✅ File upload with progress tracking for business plans (PDF/DOC/DOCX)
- ✅ useContact() composable for contact form
- ✅ pages/contacts.vue integrated with backend API

**TODO:**
- **Fix i18n translations** - configure @nuxtjs/i18n v10 correctly (see Known Issues)
- Implement countdown timer on landing page
- Add form validation feedback
- Handle edge cases and error states

### Countdown Timer (TODO)
Landing page (`pages/index.vue`) has static timer placeholder:
- Implement real countdown to competition deadline
- Use reactive `ref()` with `setInterval` to update display

### Content Management
- Markdown files in `content/` directory rendered via `<ContentDoc>` component
- @nuxt/content uses better-sqlite3 (already installed)
- Edit `content/terms.md` and `content/privacy.md` to update legal text

## ⚠️ Known Issues

### i18n Translations Not Displaying
**Status**: Translation keys (e.g., `nav.home`) display instead of translated text

**Details**:
- All translations are properly defined in `i18n.config.ts` (Russian and Kazakh)
- @nuxtjs/i18n v10.x requires specific configuration that differs from v8/v9
- Attempted solutions:
  - Created JSON files in `locales/` directory (ru.json, kk.json)
  - Configured `vueI18n: './i18n.config.ts'` in nuxt.config.ts
  - Tried lazy loading with `langDir` setting
- **Impact**: Display only - site functionality is NOT affected
- **Workaround**: Temporarily hardcode text in components instead of using `$t()`
- **TODO**: Research @nuxtjs/i18n v10 documentation for correct configuration

### Other Issues
- @nuxt/content warns about missing content config (optional, using default collection)
- TypeScript may show i18n config errors in `nuxt.config.ts` (works at runtime)

## 🚀 Deployment Notes

**Frontend (Vercel):**
1. Connect GitHub repo to Vercel
2. Add environment variables: `BASE_URL`, `NUXT_PUBLIC_API_URL`
3. Auto-deploys on push to main branch

**Backend (VPS/Railway/Render):**
1. Set up PostgreSQL database (managed or self-hosted)
2. Configure environment variables (see `backend/.env.example`)
3. Run migrations: `npm run prisma:migrate`
4. Start server: `npm start`
5. Configure reverse proxy (nginx) if using VPS
6. Set up SSL certificates (Let's Encrypt)

> See `DEPLOYMENT.md` for detailed deployment instructions.

---

## 📝 Recent Updates (2025-09-30)

### Fixed: Nuxt Welcome Page Issue
- **Problem**: Site was showing default Nuxt welcome page instead of actual content
- **Cause**: Conflicting `/app/app.vue` file interfering with main `app.vue`
- **Solution**: Removed `/app/app.vue` and empty `app/` directory
- **Result**: Site now correctly displays landing page at http://localhost:3000/

---

**📅 Updated**: 2025-10-01
**👤 Project**: Business Qoldau 2025
**🌐 Domain**: businessqoldau.kz