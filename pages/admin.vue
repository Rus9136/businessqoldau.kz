<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b sticky top-0 z-10">
      <div class="px-6">
        <div class="flex items-center justify-between py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Админ-панель</h1>
            <p class="text-sm text-gray-600">Business Camp 2025</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600">{{ user?.email }}</span>
            <button @click="handleLogout" class="btn-secondary">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <aside class="w-64 bg-white border-r min-h-[calc(100vh-73px)] sticky top-[73px]">
        <nav class="p-4 space-y-1">
          <button
            @click="activeTab = 'applications'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left',
              activeTab === 'applications'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Заявки</span>
          </button>

          <button
            @click="activeTab = 'users'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left',
              activeTab === 'users'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span>Пользователи</span>
          </button>

          <button
            @click="activeTab = 'templates'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left',
              activeTab === 'templates'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <span>Шаблоны</span>
          </button>

          <button
            @click="activeTab = 'contacts'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left',
              activeTab === 'contacts'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span>Сообщения</span>
          </button>

          <button
            @click="activeTab = 'stats'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left',
              activeTab === 'stats'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Статистика</span>
          </button>

          <button
            @click="activeTab = 'settings'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left',
              activeTab === 'settings'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Период подачи</span>
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow-sm p-12 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-gray-500 mt-4">Загрузка...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-700">{{ error }}</p>
        <button @click="loadData" class="mt-4 btn-primary">
          Попробовать снова
        </button>
      </div>

      <!-- Applications Tab -->
      <div v-else-if="activeTab === 'applications'" class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm border p-4">
          <div class="flex flex-wrap gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <select
                v-model="filters.category"
                @change="loadApplications"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Все</option>
                <option value="starter">Стартапы</option>
                <option value="active">Активные</option>
                <option value="it">IT проекты</option>
              </select>
            </div>
            <div class="flex items-end">
              <button @click="resetFilters" class="btn-secondary">
                Сбросить фильтры
              </button>
            </div>
          </div>
        </div>

        <!-- Applications Table -->
        <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Пользователь</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="applications.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                    Заявок не найдено
                  </td>
                </tr>
                <tr v-for="app in applications" :key="app.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                    {{ app.id.substring(0, 8) }}...
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ app.user?.profile?.fullName || 'Не указано' }}</div>
                    <div class="text-sm text-gray-500">{{ app.user?.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-900">{{ getCategoryLabel(app.category) }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ new Date(app.createdAt).toLocaleDateString('ru-RU') }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center gap-3">
                      <button @click="viewApplication(app)" class="text-blue-600 hover:text-blue-800 font-medium">
                        Посмотреть
                      </button>
                      <a
                        v-if="app.planFilePath"
                        :href="`${apiUrl.replace('/api', '')}/${app.planFilePath}`"
                        download
                        target="_blank"
                        class="text-green-600 hover:text-green-800 transition-colors"
                        title="Скачать бизнес-план"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </a>
                      <span
                        v-else
                        class="text-gray-300"
                        title="Файл не загружен"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="pagination" class="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Показано {{ applications.length }} из {{ pagination.total }}
            </div>
            <div class="flex gap-2">
              <button
                @click="changePage(pagination.page - 1)"
                :disabled="pagination.page <= 1"
                class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Назад
              </button>
              <span class="px-3 py-1">Страница {{ pagination.page }} из {{ pagination.pages }}</span>
              <button
                @click="changePage(pagination.page + 1)"
                :disabled="pagination.page >= pagination.pages"
                class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Вперед
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-else-if="activeTab === 'users'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Город</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата регистрации</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="users.length === 0">
                  <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                    Пользователей не найдено
                  </td>
                </tr>
                <tr v-for="userItem in users" :key="userItem.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                    {{ userItem.id.substring(0, 8) }}...
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ userItem.email }}</div>
                    <div v-if="userItem.emailVerified" class="text-xs text-green-600">✓ Подтвержден</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ userItem.profile?.fullName || '—' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ userItem.profile?.phone || '—' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ userItem.profile?.city || '—' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="userItem.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'"
                    >
                      {{ userItem.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ new Date(userItem.createdAt).toLocaleDateString('ru-RU') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Contacts Tab -->
      <div v-else-if="activeTab === 'contacts'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Сообщения от пользователей</h3>
            <div class="text-sm text-gray-500">
              Всего: {{ contacts.length }}
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-gray-600">Загрузка сообщений...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-8">
            <div class="text-red-600 mb-2">Ошибка загрузки</div>
            <p class="text-gray-600">{{ error }}</p>
            <button 
              @click="loadContacts" 
              class="mt-4 btn-primary text-sm"
            >
              Попробовать снова
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="contacts.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Нет сообщений</h3>
            <p class="mt-1 text-sm text-gray-500">Пока нет сообщений от пользователей</p>
          </div>

          <!-- Contacts List -->
          <div v-else class="space-y-4">
            <div 
              v-for="contact in contacts" 
              :key="contact.id"
              class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="selectedContact = contact"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-2">
                    <h4 class="text-sm font-medium text-gray-900 truncate">
                      {{ contact.name }}
                    </h4>
                    <span class="text-xs text-gray-500">
                      {{ contact.email }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {{ contact.message }}
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0 text-xs text-gray-500">
                  {{ formatDate(contact.createdAt) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="contactPagination && contactPagination.totalPages > 1" class="mt-6 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="loadContacts(contactPagination.page - 1)"
                :disabled="contactPagination.page <= 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Назад
              </button>
              <span class="px-3 py-2 text-sm text-gray-700">
                Страница {{ contactPagination.page }} из {{ contactPagination.totalPages }}
              </span>
              <button
                @click="loadContacts(contactPagination.page + 1)"
                :disabled="contactPagination.page >= contactPagination.totalPages"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Вперед
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Stats Tab -->
      <div v-else-if="activeTab === 'stats'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Статистика платформы</h3>
          <p class="text-gray-600">Раздел в разработке...</p>
        </div>
      </div>

      <!-- Settings Tab - Application Period -->
      <div v-else-if="activeTab === 'settings'" class="space-y-6">
        <!-- Current Status -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Текущий статус периода</h3>
          <div v-if="settingsLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="text-gray-500 mt-2">Загрузка...</p>
          </div>
          <div v-else-if="periodSettings" class="space-y-4">
            <div class="flex items-center gap-3">
              <span v-if="periodStatus?.isActive" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Период активен
              </span>
              <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                Период неактивен
              </span>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Начало периода</p>
                  <p class="text-lg font-semibold text-gray-900">{{ formatSettingsDate(periodSettings.start_date) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Окончание периода</p>
                  <p class="text-lg font-semibold text-gray-900">{{ formatSettingsDate(periodSettings.end_date) }}</p>
                </div>
              </div>
              <div v-if="periodStatus?.message" class="mt-4 pt-4 border-t">
                <p class="text-sm text-gray-600">Сообщение пользователям:</p>
                <p class="text-gray-900 mt-1">{{ periodStatus.message }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            Настройки периода не установлены
          </div>
        </div>

        <!-- Update Period Form -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Изменить период подачи заявок</h3>
          <form @submit.prevent="handleUpdatePeriod" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Дата начала
                </label>
                <input
                  v-model="periodForm.start_date"
                  type="datetime-local"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Дата окончания
                </label>
                <input
                  v-model="periodForm.end_date"
                  type="datetime-local"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div v-if="settingsError" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <p class="text-red-700 text-sm">{{ settingsError }}</p>
            </div>

            <div v-if="settingsSuccess" class="bg-green-50 border border-green-200 rounded-lg p-4">
              <p class="text-green-700 text-sm">Настройки периода успешно обновлены!</p>
            </div>

            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="settingsLoading"
                class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ settingsLoading ? 'Сохранение...' : 'Сохранить изменения' }}
              </button>
              <button
                type="button"
                @click="resetPeriodForm"
                class="btn-secondary"
              >
                Сбросить
              </button>
            </div>
          </form>
        </div>

        <!-- Info Box -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 class="font-semibold text-blue-900 mb-2">ℹ️ Информация</h4>
          <ul class="text-sm text-blue-800 space-y-2">
            <li>• Регистрация и вход пользователей будут заблокированы вне указанного периода</li>
            <li>• Пользователи увидят информативное сообщение с указанием дат периода</li>
            <li>• Изменения вступают в силу немедленно</li>
            <li>• Убедитесь, что даты указаны правильно перед сохранением</li>
          </ul>
        </div>
      </div>

      <!-- Templates Tab -->
      <div v-else-if="activeTab === 'templates'" class="space-y-6">
        <!-- Upload Template Form -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Загрузить шаблон бизнес-плана</h3>
          <form @submit.prevent="handleUploadTemplate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Название шаблона</label>
              <input
                v-model="templateForm.name"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Например: Шаблон бизнес-плана 2025"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Файл шаблона (PDF, DOC, DOCX)</label>
              <input
                type="file"
                @change="handleFileSelect"
                accept=".pdf,.doc,.docx"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <p class="text-sm text-gray-500 mt-1">Максимальный размер: 20 МБ</p>
            </div>
            <div v-if="templateError" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {{ templateError }}
            </div>
            <div v-if="uploadSuccess" class="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
              Шаблон успешно загружен!
            </div>
            <button
              type="submit"
              :disabled="templateLoading"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ templateLoading ? 'Загрузка...' : 'Загрузить шаблон' }}
            </button>
          </form>
        </div>

        <!-- Current Template -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Текущий шаблон</h3>
          <div v-if="currentTemplate" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">{{ currentTemplate.name }}</p>
              <p class="text-sm text-gray-500">{{ currentTemplate.fileName }}</p>
              <p class="text-xs text-gray-400 mt-1">
                Загружен: {{ new Date(currentTemplate.createdAt).toLocaleString('ru-RU') }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="downloadCurrentTemplate"
                class="btn-secondary text-sm"
              >
                Скачать
              </button>
              <button
                @click="handleDeleteTemplate"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Удалить
              </button>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gray-500">
            Шаблон не загружен
          </div>
        </div>
      </div>
      </main>
    </div>

    <!-- Application Details Modal -->
    <div v-if="selectedApplication" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="selectedApplication = null">
      <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-900">Детали заявки</h2>
          <button @click="selectedApplication = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- User Info -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 mb-3">Информация о пользователе</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Email:</span>
                <span class="ml-2 text-gray-900">{{ selectedApplication.user?.email }}</span>
              </div>
              <div>
                <span class="text-gray-500">Имя:</span>
                <span class="ml-2 text-gray-900">{{ selectedApplication.user?.profile?.fullName || '—' }}</span>
              </div>
              <div>
                <span class="text-gray-500">Телефон:</span>
                <span class="ml-2 text-gray-900">{{ selectedApplication.user?.profile?.phone || '—' }}</span>
              </div>
              <div>
                <span class="text-gray-500">Город:</span>
                <span class="ml-2 text-gray-900">{{ selectedApplication.user?.profile?.city || '—' }}</span>
              </div>
            </div>
          </div>

          <!-- Application Details -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Категория</label>
            <p class="text-lg font-medium text-gray-900">{{ getCategoryLabel(selectedApplication.category) }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Описание бизнеса</label>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-900 whitespace-pre-wrap">{{ selectedApplication.summary }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Бизнес-план</label>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  :class="selectedApplication.planFilePath ? 'text-green-600' : 'text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span :class="selectedApplication.planFilePath ? 'text-green-600 font-medium' : 'text-gray-500'">
                  {{ selectedApplication.planFilePath ? 'Файл загружен' : 'Файл не загружен' }}
                </span>
              </div>
              <a
                v-if="selectedApplication.planFilePath"
                :href="`${apiUrl.replace('/api', '')}/${selectedApplication.planFilePath}`"
                download
                target="_blank"
                class="btn-primary text-sm inline-flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Скачать файл
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Дата создания</label>
              <p class="text-gray-900">{{ new Date(selectedApplication.createdAt).toLocaleString('ru-RU') }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Последнее обновление</label>
              <p class="text-gray-900">{{ new Date(selectedApplication.updatedAt).toLocaleString('ru-RU') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Details Modal -->
    <div v-if="selectedContact" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="selectedContact = null">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-900">Сообщение от пользователя</h2>
          <button @click="selectedContact = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Contact Info -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 mb-3">Информация об отправителе</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Имя:</span>
                <span class="ml-2 text-gray-900">{{ selectedContact.name }}</span>
              </div>
              <div>
                <span class="text-gray-500">Email:</span>
                <a :href="`mailto:${selectedContact.email}`" class="ml-2 text-blue-600 hover:underline">
                  {{ selectedContact.email }}
                </a>
              </div>
              <div class="col-span-2">
                <span class="text-gray-500">Дата отправки:</span>
                <span class="ml-2 text-gray-900">{{ formatDate(selectedContact.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Сообщение</label>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-900 whitespace-pre-wrap">{{ selectedContact.message }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <a 
              :href="`mailto:${selectedContact.email}?subject=Ответ на ваше сообщение&body=Здравствуйте, ${selectedContact.name}!%0A%0AСпасибо за ваше сообщение:%0A%0A${selectedContact.message}%0A%0A---%0AОтвет:%0A`"
              class="btn-primary text-sm inline-flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Ответить
            </a>
            <button 
              @click="selectedContact = null" 
              class="btn-secondary text-sm"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: false
})

const { user, logout } = useAuth()
const { applications, users, contacts, stats, loading, error, getAllApplications, updateApplicationStatus, getAllUsers, getStats, getAllContacts, getContactById } = useAdmin()
const { activeTemplate, uploadTemplate, getActiveTemplate, downloadTemplate, deleteTemplate } = useTemplate()
const { settings: periodSettings, periodStatus, loading: settingsLoading, error: settingsError, getApplicationSettings, updateApplicationSettings, formatDateForInput, formatDate: formatSettingsDate } = useSettings()

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const activeTab = ref<'applications' | 'users' | 'templates' | 'contacts' | 'stats' | 'settings'>('applications')
const filters = ref({
  status: 'submitted' as '' | 'draft' | 'submitted',
  category: '' as '' | 'starter' | 'active' | 'it',
  page: 1,
  limit: 20
})
const pagination = ref<{ page: number; limit: number; total: number; pages: number } | null>(null)
const contactPagination = ref<{ page: number; limit: number; total: number; totalPages: number } | null>(null)
const selectedApplication = ref<any>(null)
const selectedContact = ref<any>(null)

// Template state
const currentTemplate = ref<any>(null)
const templateForm = ref({
  name: '',
  file: null as File | null
})
const templateLoading = ref(false)
const templateError = ref<string | null>(null)
const uploadSuccess = ref(false)

// Settings state
const periodForm = ref({
  start_date: '',
  end_date: ''
})
const settingsSuccess = ref(false)

// Load data on mount
onMounted(async () => {
  await loadData()
})

// Watch activeTab to load appropriate data
watch(activeTab, async (newTab) => {
  if (newTab === 'applications' && applications.value.length === 0) {
    await loadApplications()
  } else if (newTab === 'users' && users.value.length === 0) {
    await loadUsers()
  } else if (newTab === 'templates' && !currentTemplate.value) {
    await loadTemplate()
  } else if (newTab === 'settings' && !periodSettings.value) {
    await loadSettings()
  }
})

const loadData = async () => {
  if (activeTab.value === 'applications') {
    await loadApplications()
  } else if (activeTab.value === 'users') {
    await loadUsers()
  } else if (activeTab.value === 'templates') {
    await loadTemplate()
  }
}

const loadTemplate = async () => {
  const template = await getActiveTemplate()
  currentTemplate.value = template
}

const loadApplications = async () => {
  try {
    const params: any = {
      page: filters.value.page,
      limit: filters.value.limit
    }
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.category) params.category = filters.value.category

    const response = await getAllApplications(params)
    pagination.value = response.pagination
  } catch (err) {
    console.error('Failed to load applications:', err)
  }
}

const loadUsers = async () => {
  try {
    await getAllUsers()
  } catch (err) {
    console.error('Failed to load users:', err)
  }
}

const resetFilters = () => {
  filters.value = {
    status: 'submitted',
    category: '',
    page: 1,
    limit: 20
  }
  loadApplications()
}

const changePage = (page: number) => {
  filters.value.page = page
  loadApplications()
}

const viewApplication = (app: any) => {
  selectedApplication.value = app
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    starter: 'Стартап',
    active: 'Активный бизнес',
    it: 'IT проект'
  }
  return labels[category] || category
}

const loadContacts = async (page: number = 1) => {
  try {
    const response = await getAllContacts({
      page,
      limit: 20
    })
    contactPagination.value = response.pagination
  } catch (err) {
    console.error('Failed to load contacts:', err)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLogout = async () => {
  await logout()
}

// Template handlers
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    templateForm.value.file = target.files[0]
  }
}

const handleUploadTemplate = async () => {
  if (!templateForm.value.name || !templateForm.value.file) return

  templateLoading.value = true
  templateError.value = null
  uploadSuccess.value = false

  try {
    await uploadTemplate(templateForm.value.file, templateForm.value.name)
    uploadSuccess.value = true

    // Reset form
    templateForm.value = { name: '', file: null }
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''

    // Reload template
    await loadTemplate()
  } catch (err: any) {
    templateError.value = err.data?.error || 'Не удалось загрузить шаблон'
  } finally {
    templateLoading.value = false
  }
}

const downloadCurrentTemplate = () => {
  if (currentTemplate.value) {
    downloadTemplate(currentTemplate.value)
  }
}

const handleDeleteTemplate = async () => {
  if (!currentTemplate.value) return

  if (!confirm('Вы уверены, что хотите удалить текущий шаблон?')) return

  try {
    await deleteTemplate(currentTemplate.value.id)
    currentTemplate.value = null
  } catch (err) {
    alert('Не удалось удалить шаблон')
  }
}

// Settings handlers
const loadSettings = async () => {
  try {
    await getApplicationSettings()
    if (periodSettings.value) {
      periodForm.value.start_date = formatDateForInput(periodSettings.value.start_date)
      periodForm.value.end_date = formatDateForInput(periodSettings.value.end_date)
    }
  } catch (err) {
    console.error('Failed to load settings:', err)
  }
}

const handleUpdatePeriod = async () => {
  settingsSuccess.value = false

  try {
    // Convert local datetime to ISO string
    const startDate = new Date(periodForm.value.start_date).toISOString()
    const endDate = new Date(periodForm.value.end_date).toISOString()

    await updateApplicationSettings(startDate, endDate)
    settingsSuccess.value = true

    // Hide success message after 3 seconds
    setTimeout(() => {
      settingsSuccess.value = false
    }, 3000)
  } catch (err: any) {
    console.error('Failed to update settings:', err)
  }
}

const resetPeriodForm = () => {
  if (periodSettings.value) {
    periodForm.value.start_date = formatDateForInput(periodSettings.value.start_date)
    periodForm.value.end_date = formatDateForInput(periodSettings.value.end_date)
  }
  settingsSuccess.value = false
}

// Watch for tab changes to load data
watch(activeTab, (newTab) => {
  if (newTab === 'contacts' && contacts.value.length === 0) {
    loadContacts()
  }
})

useSeoMeta({
  title: 'Админ-панель - Business Camp 2025',
  description: 'Панель администратора',
  robots: 'noindex, nofollow'
})
</script>
