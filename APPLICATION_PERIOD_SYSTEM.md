
# 🕐 Система временного ограничения подачи заявок

## 📋 Оглавление

1. [Обзор системы](#обзор-системы)
2. [Техническое решение](#техническое-решение)
3. [Модель данных](#модель-данных)
4. [Backend реализация](#backend-реализация)
5. [Frontend реализация](#frontend-реализация)
6. [API эндпоинты](#api-эндпоинты)
7. [План реализации](#план-реализации)
8. [Тестирование](#тестирование)
9. [Безопасность](#безопасность)

---

## 🎯 Обзор системы

### Цель
Реализовать механизм временного ограничения подачи заявок с возможностью управления периодом через админ панель.

### Функциональность
- ✅ Установка даты начала и окончания периода подачи заявок
- ✅ Блокировка регистрации и входа вне периода
- ✅ Информативные сообщения пользователям
- ✅ Управление через админ панель
- ✅ Автоматическая проверка на всех защищенных эндпоинтах

### Архитектурное решение
**Вариант 1: Глобальные настройки** - создание таблицы `application_settings` с JSON-настройками периода.

---

## 🛠️ Техническое решение

### Принцип работы
1. **Администратор** устанавливает период через админ панель
2. **Middleware** проверяет активность периода на каждом запросе
3. **Frontend** показывает соответствующие сообщения пользователям
4. **API** блокирует регистрацию/вход вне периода

### Компоненты системы
```
┌─────────────────────────────────────────────────┐
│              Admin Panel                        │
│         (Управление периодом)                   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│            Application Settings                  │
│              (PostgreSQL)                       │
│        {start_date, end_date}                   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│         Application Period Middleware            │
│           (Проверка периода)                    │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│           Auth Routes                           │
│    (register, login, protected routes)          │
└─────────────────────────────────────────────────┘
```

---

## 🗄️ Модель данных

### application_settings
```sql
CREATE TABLE application_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Prisma Schema
```prisma
model ApplicationSettings {
  id           String   @id @default(uuid())
  settingKey   String   @unique
  settingValue Json
  updatedById  String
  updatedBy    User     @relation(fields: [updatedById], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("application_settings")
}
```

### Структура JSON настроек
```json
{
  "start_date": "2025-01-01T00:00:00.000Z",
  "end_date": "2025-02-01T23:59:59.999Z",
  "is_active": true,
  "message": "Период подачи заявок: 1 января - 1 февраля 2025"
}
```

---

## 🔧 Backend реализация

### 1. Settings Service
```typescript
// backend/src/services/settingsService.ts
import { prisma } from '../config/database';

export interface ApplicationPeriodSettings {
  start_date: string;
  end_date: string;
  is_active: boolean;
  message: string;
}

export class SettingsService {
  // Получить настройки периода подачи заявок
  async getApplicationSettings(): Promise<ApplicationPeriodSettings | null> {
    const setting = await prisma.applicationSettings.findUnique({
      where: { settingKey: 'application_period' }
    });
    
    return setting ? setting.settingValue as ApplicationPeriodSettings : null;
  }

  // Обновить настройки периода
  async updateApplicationSettings(
    startDate: string,
    endDate: string,
    adminId: string
  ): Promise<ApplicationPeriodSettings> {
    const settings: ApplicationPeriodSettings = {
      start_date: startDate,
      end_date: endDate,
      is_active: true,
      message: `Период подачи заявок: ${new Date(startDate).toLocaleDateString('ru-RU')} - ${new Date(endDate).toLocaleDateString('ru-RU')}`
    };

    await prisma.applicationSettings.upsert({
      where: { settingKey: 'application_period' },
      update: {
        settingValue: settings,
        updatedById: adminId,
        updatedAt: new Date()
      },
      create: {
        settingKey: 'application_period',
        settingValue: settings,
        updatedById: adminId
      }
    });

    return settings;
  }

  // Проверить активность периода
  async isApplicationPeriodActive(): Promise<{
    isActive: boolean;
    message?: string;
    settings?: ApplicationPeriodSettings;
  }> {
    const settings = await this.getApplicationSettings();
    
    if (!settings || !settings.is_active) {
      return {
        isActive: false,
        message: 'Период подачи заявок не установлен'
      };
    }

    const now = new Date();
    const startDate = new Date(settings.start_date);
    const endDate = new Date(settings.end_date);

    if (now < startDate) {
      return {
        isActive: false,
        message: `Период подачи заявок начнется ${startDate.toLocaleDateString('ru-RU')}`,
        settings
      };
    }

    if (now > endDate) {
      return {
        isActive: false,
        message: `Период подачи заявок завершился ${endDate.toLocaleDateString('ru-RU')}`,
        settings
      };
    }

    return {
      isActive: true,
      settings
    };
  }
}
```

### 2. Settings Controller
```typescript
// backend/src/controllers/settingsController.ts
import { Request, Response } from 'express';
import { SettingsService } from '../services/settingsService';
import { z } from 'zod';

const settingsService = new SettingsService();

const updateSettingsSchema = z.object({
  start_date: z.string().datetime(),
  end_date: z.string().datetime()
});

export class SettingsController {
  // GET /api/settings/application-period
  async getApplicationSettings(req: Request, res: Response) {
    try {
      const settings = await settingsService.getApplicationSettings();
      const periodStatus = await settingsService.isApplicationPeriodActive();
      
      res.json({
        success: true,
        data: {
          settings,
          periodStatus
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ошибка получения настроек'
      });
    }
  }

  // PUT /api/settings/application-period
  async updateApplicationSettings(req: Request, res: Response) {
    try {
      const { start_date, end_date } = updateSettingsSchema.parse(req.body);
      const adminId = req.user?.id;

      if (!adminId) {
        return res.status(401).json({
          success: false,
          message: 'Не авторизован'
        });
      }

      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: 'Дата начала должна быть раньше даты окончания'
        });
      }

      const settings = await settingsService.updateApplicationSettings(
        start_date,
        end_date,
        adminId
      );

      res.json({
        success: true,
        data: settings,
        message: 'Настройки периода обновлены'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Неверные данные',
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Ошибка обновления настроек'
      });
    }
  }
}
```

### 3. Application Period Middleware
```typescript
// backend/src/middleware/applicationPeriod.ts
import { Request, Response, NextFunction } from 'express';
import { SettingsService } from '../services/settingsService';

const settingsService = new SettingsService();

export const checkApplicationPeriod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const periodStatus = await settingsService.isApplicationPeriodActive();
    
    if (!periodStatus.isActive) {
      return res.status(403).json({
        success: false,
        message: periodStatus.message || 'Период подачи заявок неактивен',
        periodStatus
      });
    }

    req.periodSettings = periodStatus.settings;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка проверки периода'
    });
  }
};

// Middleware только для регистрации/входа
export const checkApplicationPeriodForAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const periodStatus = await settingsService.isApplicationPeriodActive();
    
    if (!periodStatus.isActive) {
      return res.status(403).json({
        success: false,
        message: periodStatus.message || 'Регистрация и вход временно недоступны',
        periodStatus,
        code: 'APPLICATION_PERIOD_INACTIVE'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка проверки периода'
    });
  }
};
```

### 4. Settings Routes
```typescript
// backend/src/routes/settings.ts
import { Router } from 'express';
import { SettingsController } from '../controllers/settingsController';
import { auth } from '../middleware/auth';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
const settingsController = new SettingsController();

// GET /api/settings/application-period
router.get('/application-period', settingsController.getApplicationSettings);

// PUT /api/settings/application-period (admin only)
router.put('/application-period', auth, adminAuth, settingsController.updateApplicationSettings);

export default router;
```

### 5. Обновление Auth Routes
```typescript
// backend/src/routes/auth.ts - добавить middleware
import { checkApplicationPeriodForAuth } from '../middleware/applicationPeriod';

// Применить к регистрации и входу
router.post('/register', checkApplicationPeriodForAuth, authController.register);
router.post('/login', checkApplicationPeriodForAuth, authController.login);
```

---

## 🎨 Frontend реализация

### 1. Settings Composable
```typescript
// composables/useSettings.ts
export const useSettings = () => {
  const { $fetch } = useNuxtApp();

  interface ApplicationPeriodSettings {
    start_date: string;
    end_date: string;
    is_active: boolean;
    message: string;
  }

  interface PeriodStatus {
    isActive: boolean;
    message?: string;
    settings?: ApplicationPeriodSettings;
  }

  // Получить настройки периода
  const getApplicationSettings = async () => {
    try {
      const response = await $fetch('/api/settings/application-period');
      return response.data;
    } catch (error) {
      console.error('Ошибка получения настроек:', error);
      throw error;
    }
  };

  // Обновить настройки периода (admin only)
  const updateApplicationSettings = async (startDate: string, endDate: string) => {
    try {
      const response = await $fetch('/api/settings/application-period', {
        method: 'PUT',
        body: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка обновления настроек:', error);
      throw error;
    }
  };

  // Проверить активность периода
  const checkApplicationPeriod = async (): Promise<PeriodStatus> => {
    try {
      const data = await getApplicationSettings();
      return data.periodStatus;
    } catch (error) {
      console.error('Ошибка проверки периода:', error);
      return {
        isActive: false,
        message: 'Ошибка проверки периода'
      };
    }
  };

  return {
    getApplicationSettings,
    updateApplicationSettings,
    checkApplicationPeriod
  };
};
```

### 2. Обновление Admin Panel
```vue
<!-- pages/admin.vue - добавить новую вкладку -->
<template>
  <div class="admin-panel">
    <!-- Существующие вкладки -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Вкладка Настройки -->
    <div v-if="activeTab === 'settings'" class="tab-content">
      <div class="settings-panel">
        <h2>Настройки периода подачи заявок</h2>
        
        <div class="current-status">
          <div class="status-card" :class="statusClass">
            <h3>Текущий статус</h3>
            <p>{{ currentStatus.message }}</p>
            <div v-if="currentStatus.settings" class="period-info">
              <p><strong>Начало:</strong> {{ formatDate(currentStatus.settings.start_date) }}</p>
              <p><strong>Окончание:</strong> {{ formatDate(currentStatus.settings.end_date) }}</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="updateSettings" class="settings-form">
          <div class="form-group">
            <label for="start-date">Дата начала</label>
            <input
              id="start-date"
              v-model="form.startDate"
              type="datetime-local"
              required
            />
          </div>

          <div class="form-group">
            <label for="end-date">Дата окончания</label>
            <input
              id="end-date"
              v-model="form.endDate"
              type="datetime-local"
              required
            />
          </div>

          <button type="submit" :disabled="isLoading" class="btn-primary">
            {{ isLoading ? 'Сохранение...' : 'Сохранить настройки' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ... existing code ...

const { updateApplicationSettings, getApplicationSettings } = useSettings();

const form = reactive({
  startDate: '',
  endDate: ''
});

const currentStatus = ref({
  isActive: false,
  message: '',
  settings: null
});

const isLoading = ref(false);

// Загрузить текущие настройки
const loadSettings = async () => {
  try {
    const data = await getApplicationSettings();
    currentStatus.value = data.periodStatus;
    
    if (data.settings) {
      form.startDate = data.settings.start_date.slice(0, 16);
      form.endDate = data.settings.end_date.slice(0, 16);
    }
  } catch (error) {
    console.error('Ошибка загрузки настроек:', error);
  }
};

// Обновить настройки
const updateSettings = async () => {
  isLoading.value = true;
  try {
    const startDate = new Date(form.startDate).toISOString();
    const endDate = new Date(form.endDate).toISOString();
    
    await updateApplicationSettings(startDate, endDate);
    await loadSettings();
    
    // Показать уведомление об успехе
    alert('Настройки успешно обновлены');
  } catch (error) {
    console.error('Ошибка обновления настроек:', error);
    alert('Ошибка обновления настроек');
  } finally {
    isLoading.value = false;
  }
};

// Вычисляемые свойства
const statusClass = computed(() => ({
  'status-active': currentStatus.value.isActive,
  'status-inactive': !currentStatus.value.isActive
}));

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Инициализация
onMounted(() => {
  loadSettings();
});

// Добавить 'settings' в tabs
const tabs = [
  { id: 'stats', name: 'Статистика' },
  { id: 'applications', name: 'Заявки' },
  { id: 'users', name: 'Пользователи' },
  { id: 'templates', name: 'Шаблоны' },
  { id: 'settings', name: 'Настройки' }
];
</script>

<style scoped>
.settings-panel {
  max-width: 800px;
  margin: 0 auto;
}

.current-status {
  margin-bottom: 2rem;
}

.status-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid;
}

.status-active {
  border-color: #10b981;
  background-color: #f0fdf4;
  color: #065f46;
}

.status-inactive {
  border-color: #ef4444;
  background-color: #fef2f2;
  color: #991b1b;
}

.settings-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

.period-info {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.period-info p {
  margin: 0.25rem 0;
}
</style>
```

### 3. Обновление Login Page
```vue
<!-- pages/login.vue - добавить проверку периода -->
<script setup lang="ts">
// ... existing code ...

const { checkApplicationPeriod } = useSettings();

const periodStatus = ref({
  isActive: true,
  message: ''
});

// Проверить период при загрузке
onMounted(async () => {
  try {
    const status = await checkApplicationPeriod();
    periodStatus.value = status;
  } catch (error) {
    console.error('Ошибка проверки периода:', error);
  }
});
</script>

<template>
  <div class="login-page">
    <!-- Блок с информацией о периоде -->
    <div v-if="!periodStatus.isActive" class="period-notice">
      <div class="notice-content">
        <h2>Период подачи заявок неактивен</h2>
        <p>{{ periodStatus.message }}</p>
        <div class="notice-actions">
          <NuxtLink to="/" class="btn-secondary">
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Форма логина (только если период активен) -->
    <div v-else class="login-form">
      <!-- Существующая форма логина -->
    </div>
  </div>
</template>

<style scoped>
.period-notice {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.notice-content {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.notice-content h2 {
  color: #ef4444;
  margin-bottom: 1rem;
}

.notice-content p {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}
</style>
```

---

## 🔌 API эндпоинты

### Settings Endpoints

#### GET /api/settings/application-period
**Описание**: Получить текущие настройки периода подачи заявок

**Ответ**:
```json
{
  "success": true,
  "data": {
    "settings": {
      "start_date": "2025-01-01T00:00:00.000Z",
      "end_date": "2025-02-01T23:59:59.999Z",
      "is_active": true,
      "message": "Период подачи заявок: 1 января - 1 февраля 2025"
    },
    "periodStatus": {
      "isActive": true,
      "settings": { ... }
    }
  }
}
```

#### PUT /api/settings/application-period
**Описание**: Обновить настройки периода (admin only)

**Заголовки**: `Authorization: Bearer <token>`

**Тело запроса**:
```json
{
  "start_date": "2025-01-01T00:00:00.000Z",
  "end_date": "2025-02-01T23:59:59.999Z"
}
```

**Ответ**:
```json
{
  "success": true,
  "data": {
    "start_date": "2025-01-01T00:00:00.000Z",
    "end_date": "2025-02-01T23:59:59.999Z",
    "is_active": true,
    "message": "Период подачи заявок: 1 января - 1 февраля 2025"
  },
  "message": "Настройки периода обновлены"
}
```

### Обновленные Auth Endpoints

#### POST /api/auth/register
**Изменения**: Добавлена проверка периода подачи заявок

**Ошибка при неактивном периоде**:
```json
{
  "success": false,
  "message": "Регистрация временно недоступна",
  "periodStatus": {
    "isActive": false,
    "message": "Период подачи заявок завершился 1 февраля 2025",
    "settings": { ... }
  },
  "code": "APPLICATION_PERIOD_INACTIVE"
}
```

#### POST /api/auth/login
**Изменения**: Добавлена проверка периода подачи заявок

**Ошибка при неактивном периоде**: Аналогично register

---

## 📋 План реализации

### Этап 1: Backend Foundation (День 1)

#### 1.1 Создание миграции
```bash
cd backend
npx prisma migrate dev --name add_application_settings_table
```

#### 1.2 Обновление Prisma Schema
- Добавить модель `ApplicationSettings`
- Добавить связь с `User`

#### 1.3 Реализация Services
- ✅ Создать `SettingsService`
- ✅ Реализовать методы управления настройками
- ✅ Добавить проверку периода

#### 1.4 Создание Controllers
- ✅ Создать `SettingsController`
- ✅ Реализовать CRUD операции
- ✅ Добавить валидацию

#### 1.5 Настройка Routes
- ✅ Создать `/api/settings/*` routes
- ✅ Подключить middleware авторизации

### Этап 2: Backend Integration (День 2)

#### 2.1 Создание Middleware
- ✅ Создать `applicationPeriod.ts` middleware
- ✅ Реализовать проверку периода
- ✅ Добавить типизацию

#### 2.2 Интеграция с Auth
- ✅ Обновить auth routes
- ✅ Добавить проверку периода в register/login
- ✅ Обновить middleware для защищенных routes

#### 2.3 Тестирование Backend
```bash
# Тестирование настроек
curl -X GET http://localhost:3001/api/settings/application-period

# Обновление настроек (admin)
curl -X PUT http://localhost:3001/api/settings/application-period \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"start_date":"2025-01-01T00:00:00.000Z","end_date":"2025-02-01T23:59:59.999Z"}'

# Тестирование блокировки регистрации
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Этап 3: Frontend Admin Panel (День 3)

#### 3.1 Создание Composable
- ✅ Создать `useSettings.ts`
- ✅ Реализовать методы API
- ✅ Добавить типизацию

#### 3.2 Обновление Admin Panel
- ✅ Добавить вкладку "Настройки"
- ✅ Создать форму управления периодом
- ✅ Добавить отображение статуса
- ✅ Реализовать валидацию

#### 3.3 Стилизация
- ✅ Создать компоненты статуса
- ✅ Добавить responsive дизайн
- ✅ Реализовать loading состояния

### Этап 4: Frontend User Experience (День 4)

#### 4.1 Обновление Login Page
- ✅ Добавить проверку периода
- ✅ Показать информационные сообщения
- ✅ Скрыть форму при неактивном периоде

#### 4.2 Обновление Middleware
- ✅ Добавить проверку в `auth.ts`
- ✅ Реализовать редиректы
- ✅ Добавить информационные страницы

#### 4.3 Тестирование Frontend
- ✅ Тестирование админ панели
- ✅ Тестирование блокировки пользователей
- ✅ Проверка всех сценариев

---

## 🧪 Тестирование

### Backend Tests

#### Unit Tests
```typescript
// backend/src/tests/settingsService.test.ts
describe('SettingsService', () => {
  test('should get application settings', async () => {
    // Test implementation
  });

  test('should update application settings', async () => {
    // Test implementation
  });

  test('should check application period correctly', async () => {
    // Test implementation
  });
});
```

#### Integration Tests
```typescript
// backend/src/tests/settings.integration.test.ts
describe('Settings API', () => {
  test('GET /api/settings/application-period', async () => {
    // Test implementation
  });

  test('PUT /api/settings/application-period (admin)', async () => {
    // Test implementation
  });
});
```

### Frontend Tests

#### Component Tests
```typescript
// tests/admin-settings.test.ts
describe('Admin Settings', () => {
  test('should display current period status', () => {
    // Test implementation
  });

  test('should update period settings', () => {
    // Test implementation
  });
});
```

### Manual Testing Scenarios

#### Сценарий 1: Установка периода
1. Войти как администратор
2. Перейти в "Настройки"
3. Установить даты начала и окончания
4. Сохранить настройки
5. Проверить обновление статуса

#### Сценарий 2: Блокировка регистрации
1. Установить период в будущем
2. Попытаться зарегистрироваться
3. Проверить блокировку с сообщением
4. Вернуть период в активное состояние
5. Проверить восстановление регистрации

#### Сценарий 3: Истечение периода
1. Установить период в прошлом
2. Попытаться войти в систему
3. Проверить блокировку с сообщением
4. Обновить период
5. Проверить восстановление доступа

---

## 🔒 Безопасность

### Валидация данных
- ✅ Проверка формата дат
- ✅ Валидация что start_date < end_date
- ✅ Проверка прав администратора
- ✅ Санитизация входных данных

### Защита API
- ✅ JWT аутентификация для настроек
- ✅ Admin-only доступ к изменению
- ✅ Rate limiting для настроек
- ✅ Логирование изменений

### Обработка ошибок
- ✅ Graceful degradation при ошибках БД
- ✅ Информативные сообщения об ошибках
- ✅ Fallback на разрешение доступа при ошибках

### Audit Log
```typescript
// Добавить в SettingsService
async logSettingsChange(adminId: string, oldSettings: any, newSettings: any) {
  // Логирование изменений настроек
  console.log(`Settings changed by admin ${adminId}`, {
    old: oldSettings,
    new: newSettings,
    timestamp: new Date()
  });
}
```

---

## 📊 Мониторинг

### Логи
- Изменения настроек периода
- Попытки доступа вне периода
- Ошибки проверки периода

### Метрики
- Количество блокированных попыток входа
- Частота изменений настроек
- Время отклика проверки периода

### Алерты
- Ошибки в проверке периода
- Неожиданные изменения настроек
- Высокая частота блокировок

---

## 🚀 Deployment

### Environment Variables
```env
# Добавить в backend/.env
APPLICATION_PERIOD_ENABLED=true
DEFAULT_TIMEZONE=Asia/Almaty
```

### Database Migration
```bash
# Production migration
npm run prisma:migrate:deploy
```

### Health Check
```typescript
// Добавить в health check
app.get('/health', async (req, res) => {
  const periodStatus = await settingsService.isApplicationPeriodActive();
  
  res.json({
    status: 'ok',
    timestamp: new Date(),
    applicationPeriod: periodStatus
  });
});
```

---

## 📝 Дополнительные возможности

### Будущие улучшения
1. **Множественные периоды**: Поддержка разных типов заявок
2. **Уведомления**: Email уведомления о начале/окончании периода
3. **Статистика**: Аналитика по периодам подачи заявок
4. **Шаблоны периодов**: Предустановленные периоды
5. **Интеграция с календарем**: Синхронизация с внешними календарями

### Конфигурация
```typescript
// backend/src/config/application.ts
export const APPLICATION_CONFIG = {
  DEFAULT_PERIOD_DAYS: 30,
  MAX_PERIOD_DAYS: 365,
  MIN_PERIOD_HOURS: 1,
  TIMEZONE: 'Asia/Almaty'
};
```

---

**📅 Создано**: 2025-01-01
**👤 Проект**: Business Qoldau 2025
**🌐 Домен**: businessqoldau.kz
**📋 Статус**: Готов к реализации
```