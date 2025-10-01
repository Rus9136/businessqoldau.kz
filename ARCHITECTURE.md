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
│       ├── business-plans/ # Бизнес-планы пользователей
│       └── templates/      # Шаблоны бизнес-планов (admin upload)
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

### templates ✅
* `id` (UUID, PK)
* `name` (varchar) - название шаблона
* `file_name` (varchar) - оригинальное имя файла
* `file_path` (varchar) - путь к файлу в файловой системе
* `file_size` (integer) - размер файла в байтах
* `mime_type` (varchar) - MIME тип файла
* `uploaded_by_id` (UUID, FK → users.id) - кто загрузил шаблон
* `created_at`, `updated_at`

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

### Шаблоны бизнес-планов ✅
* `GET /api/templates/active` - получить текущий активный шаблон (authenticated users)
* `GET /api/templates/all` - получить все шаблоны (admin only)
* `POST /api/templates/upload` - загрузить новый шаблон (admin only)
* `DELETE /api/templates/:id` - удалить шаблон по ID (admin only)

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
- ✅ **Этап 6**: Администрирование (Admin panel + role-based access)
- ✅ **Этап 7**: Система шаблонов бизнес-планов (Template upload/download + admin/user access)

### ⚠️ Требует завершения
- Рабочий таймер обратного отсчета
- Локализация SEO метатегов
- Google Analytics 4
- Sitemap.xml и robots.txt
- Интеграция остальных страниц с backend API

---

## 🚀 Этапы разработки

### Этап 1: Настройка окружения и БД ✅
- PostgreSQL база данных настроена
- Prisma миграции применены
- Backend сервер работает на :4000

### Этап 2: Аутентификация ✅
- JWT аутентификация (access/refresh токены)
- Email верификация и восстановление пароля
- Frontend интеграция (useAuth composable)

### Этап 3: Профили пользователей ✅
- CRUD операции для профилей
- Валидация через Zod
- Frontend интеграция (useProfile composable)

### Этап 4: Заявки ✅
- CRUD операции + статусы (draft/submitted)
- Загрузка файлов (PDF/DOC/DOCX, 20MB limit)
- Frontend интеграция (useApplication composable)

### Этап 5: Контактная форма ✅
- Публичный endpoint + admin-only просмотр
- Email уведомления через Nodemailer
- Frontend интеграция (useContact composable)

### Этап 6: Администрирование ✅
- Role-based access (admin/user)
- Admin API: управление заявками, пользователями, статистика
- Admin panel: фильтрация, пагинация, модальные окна
- Учетная запись: admin@businesscamp.kz / AdminPass123

### Этап 7: Система шаблонов ✅
- Загрузка/скачивание шаблонов бизнес-планов (admin)
- Доступ к активному шаблону для пользователей
- Frontend интеграция в личный кабинет и admin panel

### Этап 8: Тестирование и безопасность 🔄 В РАБОТЕ

#### 🔍 Текущее состояние безопасности
**✅ Уже реализовано:**
- ✅ **Helmet** - базовые HTTP security headers
- ✅ **CORS** - настроен для development (localhost:3000)
- ✅ **JWT** - аутентификация с access/refresh токенами
- ✅ **Zod** - валидация входных данных на всех endpoints
- ✅ **bcrypt** - хэширование паролей (rounds: 10)
- ✅ **Middleware**: auth, adminAuth, errorHandler, applicationPeriod
- ✅ **Multer** - загрузка файлов с валидацией типов (PDF/DOC/DOCX) и размера (20MB)

**❌ Требует реализации:**
- ❌ Rate Limiting - защита от brute-force и DDoS атак
- ❌ Logging System - структурированные логи (winston/morgan)
- ❌ CORS для production - обновить после деплоя
- ❌ Request sanitization - XSS защита
- ❌ Security headers - расширенная конфигурация helmet
- ❌ Input validation на frontend - vee-validate
- ❌ Environment secrets audit - проверка .env в git
- ❌ File upload security - расширенная защита
- ❌ Database security - индексы, connection pooling
- ❌ Monitoring & healthcheck - расширенный endpoint
- ❌ Testing - unit/integration тесты

---

#### 📋 Детальный план реализации

##### **8.1. Environment Secrets Audit** ⚠️ КРИТИЧНО | ⏱️ 1 час
**Приоритет**: КРИТИЧЕСКИЙ (делаем первым!)

**Задачи:**
1. Проверить .env на наличие в git истории:
   ```bash
   git ls-files | grep .env
   git log --all --full-history -- "*/.env"
   ```
2. Если найден - удалить из git истории (git filter-branch или BFG Repo-Cleaner)
3. Заменить dev JWT secrets на production:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
4. Обновить `.env.example` без реальных credentials
5. Добавить validation для обязательных env variables при старте сервера
6. **ВАЖНО**: SMTP_PASS уже в git - требует ротации пароля после очистки истории

**Файлы:**
- Создать: `backend/src/config/validateEnv.ts`
- Изменить: `backend/src/index.ts`, `backend/.env.example`, `.gitignore`

**Риски:**
- JWT secrets в коммитах → возможность подделки токенов
- SMTP credentials в коммитах → несанкционированная отправка email
- Database credentials → доступ к БД

---

##### **8.2. Rate Limiting** 🛡️ КРИТИЧНО | ⏱️ 2-3 часа
**Приоритет**: КРИТИЧЕСКИЙ

**Задачи:**
1. Установить `express-rate-limit` + `rate-limit-redis` (опционально для production)
2. Настроить rate limiting по уровням:
   - **Общий API**: 100 req/15min per IP
   - **Auth (register/login)**: 5 req/15min per IP
   - **Password reset**: 3 req/15min per email
   - **File upload**: 10 req/hour per user
   - **Admin endpoints**: 200 req/15min per user
3. Custom error messages на русском/казахском
4. Whitelist для admin IP (опционально)

**Endpoints для защиты:**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/applications/:id/upload`
- `POST /api/templates/upload`

**Файлы:**
- Создать: `backend/src/middleware/rateLimiter.ts`
- Изменить: `backend/src/index.ts`, `backend/src/routes/auth.ts`, `backend/src/routes/application.ts`

**Конфигурация:**
```typescript
// Общий лимит
windowMs: 15 * 60 * 1000, // 15 минут
max: 100,
message: 'Слишком много запросов, попробуйте позже'

// Auth лимит
windowMs: 15 * 60 * 1000,
max: 5,
skipSuccessfulRequests: true // не считаем успешные логины
```

---

##### **8.3. Logging System** 📊 КРИТИЧНО | ⏱️ 2-3 часа
**Приоритет**: КРИТИЧЕСКИЙ

**Задачи:**
1. Установить `winston` + `morgan`
2. Настроить winston транспорты:
   - **Development**: Console (colorized) + File (error.log, combined.log)
   - **Production**: JSON format + File rotation (winston-daily-rotate-file)
3. Интегрировать morgan для HTTP request logging (dev: "dev", prod: "combined")
4. Добавить request ID для трейсинга (uuid)
5. Логировать события:
   - ✅ Auth: register, login, logout, password reset
   - ✅ File uploads: успешные + ошибки
   - ✅ Admin actions: status changes, template uploads
   - ✅ Errors: все 4xx, 5xx с stack trace
   - ✅ Security: rate limit hits, auth failures

**Файлы:**
- Создать: `backend/src/utils/logger.ts`, `backend/src/middleware/requestLogger.ts`
- Изменить: `backend/src/index.ts`, `backend/src/middleware/errorHandler.ts`
- Изменить: все контроллеры (добавить logger.info/error)

**Формат логов (production):**
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "level": "error",
  "message": "Authentication failed",
  "requestId": "uuid-here",
  "userId": "user-id-or-null",
  "ip": "192.168.1.1",
  "method": "POST",
  "path": "/api/auth/login",
  "statusCode": 401,
  "error": "Invalid credentials"
}
```

---

##### **8.4. CORS для Production** 🌐 КРИТИЧНО | ⏱️ 30 мин
**Приоритет**: КРИТИЧЕСКИЙ (перед деплоем)

**Задачи:**
1. Обновить CORS конфигурацию для production:
   ```typescript
   cors({
     origin: process.env.NODE_ENV === 'production'
       ? ['https://businessqoldau.kz', 'https://www.businessqoldau.kz']
       : 'http://localhost:3000',
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     maxAge: 86400 // 24 часа для preflight cache
   })
   ```
2. Добавить env variable `ALLOWED_ORIGINS` для гибкости
3. Тест: проверить preflight OPTIONS requests

**Файлы:**
- Изменить: `backend/src/index.ts`
- Изменить: `backend/.env.example`

---

##### **8.5. Security Headers** 🔒 ВАЖНО | ⏱️ 1 час
**Приоритет**: ВАЖНЫЙ

**Задачи:**
1. Расширить конфигурацию helmet:
   ```typescript
   helmet({
     contentSecurityPolicy: {
       directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'", "'unsafe-inline'"], // Tailwind CSS
         scriptSrc: ["'self'"],
         imgSrc: ["'self'", "data:", "https:"],
         connectSrc: ["'self'", process.env.FRONTEND_URL],
         fontSrc: ["'self'", "https:", "data:"],
         objectSrc: ["'none'"],
         upgradeInsecureRequests: []
       }
     },
     hsts: {
       maxAge: 31536000, // 1 год
       includeSubDomains: true,
       preload: true
     },
     noSniff: true,
     referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
     frameguard: { action: 'deny' }
   })
   ```
2. Установить `express-mongo-sanitize` (защита от NoSQL injection)
3. Установить `xss-clean` (XSS защита)

**Файлы:**
- Изменить: `backend/src/index.ts`

---

##### **8.6. File Upload Security** 📁 ВАЖНО | ⏱️ 1-2 часа
**Приоритет**: ВАЖНЫЙ

**Задачи:**
1. Добавить проверку MIME type + file extension match:
   ```typescript
   const mimeExtMap = {
     'application/pdf': '.pdf',
     'application/msword': '.doc',
     'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
   };
   ```
2. Добавить magic number validation (file signature)
3. Ограничить доступ к `/uploads` только для authenticated users:
   ```typescript
   app.use('/uploads', authenticate, express.static(...))
   ```
4. Добавить cleanup для orphaned files (cron job)
5. Добавить размер validation на frontend (перед загрузкой)

**Файлы:**
- Изменить: `backend/src/services/fileUploadService.ts`
- Изменить: `backend/src/index.ts`
- Создать: `backend/src/utils/fileCleanup.ts`

---

##### **8.7. Input Validation Frontend** ✅ ВАЖНО | ⏱️ 2-3 часа
**Приоритет**: ВАЖНЫЙ

**Задачи:**
1. Установить `@vee-validate/nuxt` + `yup` (или zod)
2. Добавить client-side validation:
   - **Register**: email format, password strength (8+ chars, uppercase, number)
   - **Login**: required fields
   - **Profile**: phone format (+77XXXXXXXXX), city required
   - **Application**: category required, summary 10-1000 chars
   - **Contact**: name 2-100 chars, email, message 10-1000 chars
3. Добавить XSS защита для textarea (strip HTML tags)
4. Красивые error messages на русском/казахском
5. Real-time validation (on blur)

**Файлы:**
- Изменить: `pages/login.vue`, `pages/app.vue`, `pages/contacts.vue`
- Создать: `composables/useValidation.ts` (переиспользуемые схемы)

---

##### **8.8. Error Handling Improvements** 🚨 ВАЖНО | ⏱️ 1-2 часа
**Приоритет**: ВАЖНЫЙ

**Задачи:**
1. Стандартизировать error response format:
   ```typescript
   {
     status: 'error',
     code: 'AUTH_INVALID_CREDENTIALS',
     message: 'Неверный email или пароль',
     details?: {...}, // только в development
     timestamp: '2025-01-15T10:30:00.000Z',
     requestId: 'uuid'
   }
   ```
2. Добавить error codes для всех типов ошибок:
   - `AUTH_*`: аутентификация
   - `VALIDATION_*`: валидация
   - `NOT_FOUND`: 404
   - `FORBIDDEN`: 403
   - `RATE_LIMIT_EXCEEDED`: rate limiting
3. Добавить i18n для error messages (ru/kk)
4. Не показывать stack traces в production
5. Логировать все ошибки через winston

**Файлы:**
- Изменить: `backend/src/middleware/errorHandler.ts`
- Создать: `backend/src/constants/errorCodes.ts`
- Изменить: все контроллеры (использовать error codes)

---

##### **8.9. Database Security** 🗄️ СРЕДНИЙ | ⏱️ 1 час
**Приоритет**: СРЕДНИЙ

**Задачи:**
1. Добавить индексы для performance:
   ```prisma
   @@index([email])
   @@index([user_id])
   @@index([status])
   @@index([category])
   @@index([created_at])
   ```
2. Настроить connection pooling в Prisma:
   ```typescript
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   // В коде:
   const prisma = new PrismaClient({
     log: ['error', 'warn'],
     errorFormat: 'minimal'
   })
   ```
3. Добавить database healthcheck в `/health` endpoint
4. Проверить Prisma queries на SQL injection (должны быть защищены)

**Файлы:**
- Изменить: `backend/prisma/schema.prisma`
- Изменить: `backend/src/config/database.ts`
- Изменить: `backend/src/index.ts` (healthcheck)

---

##### **8.10. Monitoring & Healthcheck** 📈 СРЕДНИЙ | ⏱️ 1 час
**Приоритет**: СРЕДНИЙ

**Задачи:**
1. Расширить `/health` endpoint:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-01-15T10:30:00.000Z",
     "uptime": 3600,
     "version": "1.0.0",
     "environment": "production",
     "services": {
       "database": "connected",
       "redis": "connected"
     },
     "resources": {
       "memory": {
         "used": "512MB",
         "total": "2GB",
         "percentage": 25
       },
       "disk": {
         "used": "20GB",
         "total": "100GB",
         "percentage": 20
       }
     }
   }
   ```
2. Добавить `/metrics` endpoint для Prometheus (опционально)
3. Настроить PM2 для production monitoring
4. Добавить email alerts при критических ошибках (через winston)

**Файлы:**
- Создать: `backend/src/routes/health.ts`
- Изменить: `backend/src/index.ts`
- Изменить: `ecosystem.config.js` (PM2 config)

---

##### **8.11. Testing** 🧪 ОПЦИОНАЛЬНО | ⏱️ 4-6 часов
**Приоритет**: НИЗКИЙ (опционально)

**Задачи:**
1. Установить `jest` + `supertest` + `@types/jest`
2. Настроить test database (отдельная от development)
3. Integration tests для endpoints:
   - `tests/auth.test.ts`: register, login, refresh
   - `tests/profile.test.ts`: CRUD operations
   - `tests/application.test.ts`: create, upload, submit
   - `tests/admin.test.ts`: authorization checks
4. Unit tests для services:
   - `tests/services/authService.test.ts`
   - `tests/services/applicationService.test.ts`
5. Настроить GitHub Actions CI/CD:
   ```yaml
   # .github/workflows/ci.yml
   name: CI
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: npm install
         - run: npm test
   ```

**Файлы:**
- Создать: `backend/tests/**/*.test.ts`
- Создать: `backend/jest.config.js`
- Создать: `.github/workflows/ci.yml`

---

##### **8.12. Documentation** 📚 ОПЦИОНАЛЬНО | ⏱️ 2 часа
**Приоритет**: НИЗКИЙ

**Задачи:**
1. Создать `SECURITY.md` с best practices
2. Создать `API_DOCUMENTATION.md` с примерами curl
3. Обновить `README.md` с security notes
4. Документировать environment variables

---

#### 📊 Приоритизация задач

**🔴 КРИТИЧНЫЕ (делаем первыми):**
1. **8.1** Environment Secrets Audit (1 час) - БЕЗОПАСНОСТЬ
2. **8.2** Rate Limiting (2-3 часа) - Защита от атак
3. **8.3** Logging System (2-3 часа) - Debugging + audit trail
4. **8.4** CORS для Production (30 мин) - Перед деплоем

**🟡 ВАЖНЫЕ (делаем вторыми):**
5. **8.5** Security Headers (1 час)
6. **8.6** File Upload Security (1-2 часа)
7. **8.7** Input Validation Frontend (2-3 часа)
8. **8.8** Error Handling Improvements (1-2 часа)

**🟢 ОПЦИОНАЛЬНЫЕ (если есть время):**
9. **8.9** Database Security (1 час)
10. **8.10** Monitoring & Healthcheck (1 час)
11. **8.11** Testing (4-6 часов)
12. **8.12** Documentation (2 часа)

---

#### ⏱️ Оценка времени

- **Критичные задачи**: 6-7 часов
- **Важные задачи**: 5-8 часов
- **Опциональные**: 8-10 часов
- **Итого**: **19-25 часов** (2-3 рабочих дня)

---

#### 🎯 Рекомендуемый порядок выполнения

**День 1 (Критичные задачи):**
1. Environment Secrets Audit
2. Rate Limiting
3. Logging System
4. CORS для Production

**День 2 (Важные задачи):**
5. Security Headers
6. File Upload Security
7. Input Validation Frontend
8. Error Handling

**День 3 (Опциональные задачи):**
9. Database Security
10. Monitoring
11. Testing (если требуется)
12. Documentation

### Этап 9: Деплой ❌
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
- **✅ Этап 7 (завершен)**: Система шаблонов бизнес-планов (~1 день)
- **🔄 Этап 8 (в работе)**: Тестирование и безопасность (~2-3 дня)
  - Критичные задачи: 6-7 часов
  - Важные задачи: 5-8 часов
  - Опциональные: 8-10 часов
- **❌ Этап 9 (не начат)**: Деплой и production (~1-2 дня)
- **Оставшееся время**: ~3-5 дней разработки

---

**📅 Обновлено**: 2025-10-01 (добавлен детальный план Этапа 8: Тестирование и безопасность)
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
