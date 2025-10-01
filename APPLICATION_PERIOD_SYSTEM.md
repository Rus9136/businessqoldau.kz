# 🕐 Система временного ограничения подачи заявок

## 📋 Обзор системы

### Цель
Реализовать механизм временного ограничения подачи заявок с возможностью управления периодом через админ панель.

### Функциональность
- ✅ Установка даты начала и окончания периода подачи заявок
- ⏳ Блокировка регистрации и входа вне периода
- ⏳ Информативные сообщения пользователям
- ⏳ Управление через админ панель
- ⏳ Автоматическая проверка на всех защищенных эндпоинтах

### Архитектурное решение
Глобальные настройки - таблица `application_settings` с JSON-настройками периода.

---

## 🛠️ Техническое решение

### Принцип работы
1. **Администратор** устанавливает период через админ панель
2. **Middleware** проверяет активность периода на каждом запросе
3. **Frontend** показывает соответствующие сообщения пользователям
4. **API** блокирует регистрацию/вход вне периода

### Компоненты системы
```
Admin Panel (Управление периодом)
    ↓
Application Settings (PostgreSQL) {start_date, end_date}
    ↓
Application Period Middleware (Проверка периода)
    ↓
Auth Routes (register, login, protected routes)
```

---

## 🗄️ Модель данных

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

### Файлы
- `backend/src/services/settingsService.ts` - SettingsService (CRUD, проверка периода)
- `backend/src/controllers/settingsController.ts` - API контроллер (GET/PUT)
- `backend/src/routes/settingsRoutes.ts` - Роуты `/api/settings/application-period`
- `backend/src/middleware/applicationPeriod.ts` - Middleware для проверки периода

### Middleware функции
```typescript
// Общий middleware для проверки периода
export const checkApplicationPeriod = async (req, res, next) => { ... }

// Middleware для блокировки регистрации/входа
export const checkApplicationPeriodForAuth = async (req, res, next) => { ... }
```

### Интеграция в Auth Routes
```typescript
// backend/src/routes/auth.ts
import { checkApplicationPeriodForAuth } from '../middleware/applicationPeriod';

router.post('/register', checkApplicationPeriodForAuth, authController.register);
router.post('/login', checkApplicationPeriodForAuth, authController.login);
```

---

## 🎨 Frontend реализация

### Файлы
- `composables/useSettings.ts` - Composable для работы с API
- `pages/admin.vue` - Добавить вкладку "Настройки" с формой управления периодом
- `pages/login.vue` - Проверка периода и отображение блокировки

### Settings Composable
```typescript
export const useSettings = () => {
  const getApplicationSettings = async () => { ... }
  const updateApplicationSettings = async (startDate, endDate) => { ... }
  const checkApplicationPeriod = async () => { ... }

  return { getApplicationSettings, updateApplicationSettings, checkApplicationPeriod }
}
```

---

## 🔌 API эндпоинты

### GET /api/settings/application-period
Получить текущие настройки периода (публичный)

**Ответ:**
```json
{
  "success": true,
  "data": {
    "settings": { "start_date": "...", "end_date": "...", "is_active": true, "message": "..." },
    "periodStatus": { "isActive": true, "settings": {...} }
  }
}
```

### PUT /api/settings/application-period
Обновить настройки периода (admin only)

**Заголовки:** `Authorization: Bearer <token>`

**Тело:**
```json
{
  "start_date": "2025-01-01T00:00:00.000Z",
  "end_date": "2025-02-01T23:59:59.999Z"
}
```

### POST /api/auth/register, /api/auth/login
**Изменения:** Добавлена проверка периода через middleware

**Ошибка при неактивном периоде:**
```json
{
  "success": false,
  "message": "Регистрация временно недоступна",
  "periodStatus": { "isActive": false, "message": "...", "settings": {...} },
  "code": "APPLICATION_PERIOD_INACTIVE"
}
```

---

## 📋 План реализации

### ✅ Этап 1: Backend Foundation (COMPLETED)
- ✅ Создана миграция `add_application_settings_table`
- ✅ Обновлена Prisma Schema
- ✅ Создан `SettingsService` с методами:
  - `getApplicationSettings()` - получить настройки
  - `updateApplicationSettings()` - создать/обновить настройки
  - `isApplicationPeriodActive()` - проверить активность (3 состояния)
- ✅ Создан `SettingsController` с валидацией Zod
- ✅ Созданы Settings Routes и подключены к main router
- ✅ Протестированы все API endpoints

**Статус:** Все endpoints работают, настройки сохраняются в БД, валидация проходит

### ✅ Этап 2: Backend Integration (COMPLETED)
- ✅ Создан `backend/src/middleware/applicationPeriod.ts` middleware
- ✅ Реализованы функции:
  - `checkApplicationPeriod` - общая проверка периода для protected endpoints
  - `checkApplicationPeriodForAuth` - проверка для register/login с персонализированными сообщениями
- ✅ Интегрирован middleware в auth routes (`backend/src/routes/auth.ts`):
  - `POST /api/auth/register` - блокируется вне периода
  - `POST /api/auth/login` - блокируется вне периода
- ✅ Протестирована блокировка через test-application-period.sh
- ✅ Код ошибки `APPLICATION_PERIOD_INACTIVE` возвращается при блокировке

**Статус:** Регистрация и вход корректно блокируются вне периода. Информативные сообщения на русском языке.

### ✅ Этап 3: Frontend Admin Panel (COMPLETED)
- ✅ Создан `composables/useSettings.ts` composable с методами:
  - `getApplicationSettings()` - получение текущих настроек (публичный)
  - `updateApplicationSettings()` - обновление периода (admin only)
  - `checkApplicationPeriod()` - проверка активности периода
  - `formatDate()` и `formatDateForInput()` - утилиты форматирования
- ✅ Добавлена вкладка "Период подачи" в admin panel (`pages/admin.vue`)
- ✅ Создана форма управления периодом с:
  - Отображением текущего статуса (активен/неактивен) с цветными индикаторами
  - Датами начала и окончания в русской локали
  - Input type="datetime-local" для редактирования
  - Success/error сообщениями
  - Info box с подсказками
- ✅ Автозагрузка настроек при переключении на вкладку
- ✅ Кнопка "Сбросить" для отмены изменений

**Статус:** Админ-панель полностью функциональна. Доступ через http://localhost:3004/admin

### ✅ Этап 4: Frontend User Experience (COMPLETED)
- ✅ Обновлен `pages/login.vue` - добавлена проверка периода при загрузке страницы
- ✅ Информационный баннер при неактивном периоде (желтый alert с деталями)
- ✅ Формы входа и регистрации всегда видимы
- ✅ Кнопка "Регистрация" блокируется вне периода (визуально затемнена)
- ✅ Кнопка "Вход" всегда активна для администраторов
- ✅ Frontend-валидация: регистрация блокируется на клиенте
- ✅ Backend middleware обновлен: только регистрация блокируется, вход разрешен
- ✅ Обработка ошибки `APPLICATION_PERIOD_INACTIVE` от backend
- ✅ Подсказка для администраторов в UI
- ✅ Протестированы все сценарии:
  - Регистрация блокируется вне периода ✅
  - Вход администратора работает всегда ✅
  - UI корректно отображает статус периода ✅

**Статус:** Frontend User Experience полностью реализован и протестирован

---

## 🧪 Тестирование

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

- ✅ Проверка формата дат (ISO 8601)
- ✅ Валидация что start_date < end_date
- ✅ Проверка прав администратора (admin only для PUT)
- ✅ JWT аутентификация для изменения настроек
- ✅ Информативные сообщения об ошибках

---

## 📝 Дополнительные возможности (будущее)

1. **Множественные периоды**: Поддержка разных типов заявок
2. **Уведомления**: Email уведомления о начале/окончании периода
3. **Статистика**: Аналитика по периодам подачи заявок
4. **Шаблоны периодов**: Предустановленные периоды
5. **Audit Log**: Логирование всех изменений настроек

---

**📅 Обновлено**: 2025-10-01
**👤 Проект**: Business Qoldau 2025
**🌐 Домен**: businessqoldau.kz
**📋 Статус**: ✅ Все этапы (1-4) успешно завершены и протестированы. Система полностью функциональна.
