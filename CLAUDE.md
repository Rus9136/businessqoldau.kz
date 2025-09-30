# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Бизнес Camp 2025 - A bilingual (Russian/Kazakh) business competition platform for entrepreneurs in Kazakhstan. Full-stack application with Nuxt 3 frontend and Node.js + Express backend.

**Tech Stack:**

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

## Development Commands

**Frontend (root directory):**
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

**Backend (backend/ directory):**
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
```

## Architecture

### Authentication & Authorization

**Backend (Express + JWT):**
- JWT-based authentication with access and refresh tokens
- Password hashing with bcrypt
- `backend/src/middleware/auth.ts` - JWT verification middleware
- Authentication endpoints (to be implemented in Stage 2):
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `POST /api/auth/refresh` - Refresh access token
  - `POST /api/auth/verify-email` - Email verification
  - `POST /api/auth/forgot-password` - Password reset request

**Frontend (Nuxt 3):**
- `middleware/auth.ts` protects the `/app` route (personal cabinet)
- Auth state managed via composables (to be connected to backend API)
- Public routes: `/`, `/how-to-apply`, `/terms`, `/contacts`, `/privacy`
- Protected routes: `/app` (application submission form)

### i18n Configuration
- Configured in `i18n.config.ts` with inline messages (not separate JSON files)
- Default locale: `ru` (Russian)
- Available locales: `ru`, `kk` (Kazakh)
- Access translations via `$t()` in templates or `useI18n()` in script
- Language switcher in `Header.vue` allows runtime locale switching

### Page Structure & Routes
- `/` - Landing page with hero, countdown timer, competition stages, prize pool
- `/how-to-apply` - Step-by-step application instructions
- `/terms` - Competition rules (rendered from `content/terms.md` via @nuxt/content)
- `/privacy` - Privacy policy (rendered from `content/privacy.md` via @nuxt/content)
- `/contacts` - Contact form (saves to `contacts` table in Supabase)
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
4. Upload business plan (PDF, max 20MB) and video (MP4, max 300MB)
5. Save as draft (status: 'draft') or submit (status: 'submitted')
6. After submission, form becomes read-only

### Database Schema (PostgreSQL + Prisma)

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

### File Storage
Local filesystem storage in `backend/uploads/`:
- `business-plans/` - PDF business plans (max 20MB)
- `videos/` - MP4 video presentations (max 300MB)

### Styling Approach
- Tailwind CSS configured via `@nuxtjs/tailwindcss` module
- Custom utilities in `assets/css/main.css`:
  - `.btn-primary` - Primary action button
  - `.btn-secondary` - Secondary button
  - `.container-custom` - Max-width container with responsive padding
- Color scheme: Blue primary (`blue-600`), white background, gray text
- Mobile-first responsive design

## Environment Setup

**Frontend `.env`:**
```
BASE_URL=http://localhost:3000
NUXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Backend `backend/.env`:**
```
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
MAX_FILE_SIZE_VIDEO=314572800
```

See `backend/.env.example` for full template.

## Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # Prisma client singleton
│   │   └── jwt.ts           # JWT configuration
│   ├── middleware/
│   │   ├── auth.ts          # JWT authentication middleware
│   │   └── errorHandler.ts # Global error handler
│   ├── routes/
│   │   └── index.ts         # Main router (stages 2-6)
│   ├── controllers/         # Request handlers (stages 2-6)
│   ├── services/            # Business logic (stages 2-6)
│   ├── utils/               # Helper functions (stages 2-6)
│   └── index.ts             # Express app entry point
├── prisma/
│   └── schema.prisma        # Database schema
├── uploads/
│   ├── business-plans/      # PDF files
│   └── videos/              # MP4 files
└── .env                     # Environment variables
```

## Implementation Status

### ✅ Completed
**Stage 1: Environment & Database Setup**
- Backend project structure created
- Dependencies installed (Express, Prisma, JWT, etc.)
- Database schema defined in Prisma
- Base middleware (auth, error handler) implemented
- Configuration files (.env, tsconfig.json)

### 🔨 In Progress
**Database Setup:**
- Need to create PostgreSQL database
- Need to run Prisma migrations

### ⏳ TODO
**Stage 2:** Authentication (register, login, JWT, email verification)
**Stage 3:** User profiles
**Stage 4:** Applications (CRUD + file uploads)
**Stage 5:** Contact form
**Stage 6:** Admin panel
**Stage 7:** Testing & security
**Stage 8:** Deployment

## Important Implementation Notes

### Frontend Integration (TODO)
Frontend (`pages/app.vue`, `pages/contacts.vue`) has placeholder logic:
- Need to create composables for API calls
- Connect forms to backend endpoints
- Implement file upload with progress tracking
- Handle authentication state and tokens

### Countdown Timer (TODO)
Landing page (`pages/index.vue`) has static timer placeholder:
- Implement real countdown to competition deadline
- Use reactive `ref()` with `setInterval` to update display

### Content Management
- Markdown files in `content/` directory rendered via `<ContentDoc>` component
- @nuxt/content uses better-sqlite3 (already installed)
- Edit `content/terms.md` and `content/privacy.md` to update legal text

## Known Issues

- @nuxt/content warns about missing content config (optional, using default collection)
- TypeScript may show i18n config errors in `nuxt.config.ts` (runtime works correctly)
- Backend requires PostgreSQL database to be created before running migrations

## Deployment Notes

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

See `backend/README.md` for detailed deployment instructions.