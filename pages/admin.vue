<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b sticky top-0 z-10">
      <div class="container-custom">
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

    <div class="container-custom py-8">
      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow-sm border mb-6">
        <div class="flex border-b">
          <button
            @click="activeTab = 'stats'"
            :class="[
              'px-6 py-3 font-medium transition-colors border-b-2',
              activeTab === 'stats' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            ]"
          >
            Статистика
          </button>
          <button
            @click="activeTab = 'applications'"
            :class="[
              'px-6 py-3 font-medium transition-colors border-b-2',
              activeTab === 'applications' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            ]"
          >
            Заявки
          </button>
          <button
            @click="activeTab = 'users'"
            :class="[
              'px-6 py-3 font-medium transition-colors border-b-2',
              activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            ]"
          >
            Пользователи
          </button>
        </div>
      </div>

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

      <!-- Stats Tab -->
      <div v-else-if="activeTab === 'stats'" class="space-y-6">
        <div v-if="stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total Applications -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Всего заявок</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Draft Applications -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Черновиков</p>
                <p class="text-3xl font-bold text-yellow-600 mt-2">{{ stats.byStatus.draft || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Submitted Applications -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Отправлено</p>
                <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.byStatus.submitted || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Category Stats -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <p class="text-sm font-medium text-gray-600 mb-4">По категориям</p>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Стартапы:</span>
                <span class="font-medium text-gray-900">{{ stats.byCategory.starter || 0 }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Активные:</span>
                <span class="font-medium text-gray-900">{{ stats.byCategory.active || 0 }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">IT проекты:</span>
                <span class="font-medium text-gray-900">{{ stats.byCategory.it || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications Tab -->
      <div v-else-if="activeTab === 'applications'" class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm border p-4">
          <div class="flex flex-wrap gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
              <select
                v-model="filters.status"
                @change="loadApplications"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Все</option>
                <option value="draft">Черновики</option>
                <option value="submitted">Отправленные</option>
              </select>
            </div>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="applications.length === 0">
                  <td colspan="6" class="px-6 py-12 text-center text-gray-500">
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
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="app.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    >
                      {{ app.status === 'submitted' ? 'Отправлена' : 'Черновик' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ new Date(app.createdAt).toLocaleDateString('ru-RU') }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button @click="viewApplication(app)" class="text-blue-600 hover:text-blue-800 font-medium">
                      Посмотреть
                    </button>
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
          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Статус</label>
            <div class="flex items-center gap-4">
              <span
                class="px-4 py-2 rounded-full text-sm font-medium"
                :class="selectedApplication.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ selectedApplication.status === 'submitted' ? 'Отправлена' : 'Черновик' }}
              </span>
              <button
                v-if="selectedApplication.status === 'draft'"
                @click="changeStatus(selectedApplication.id, 'submitted')"
                class="btn-secondary text-sm"
              >
                Отметить как отправленную
              </button>
              <button
                v-if="selectedApplication.status === 'submitted'"
                @click="changeStatus(selectedApplication.id, 'draft')"
                class="btn-secondary text-sm"
              >
                Вернуть в черновики
              </button>
            </div>
          </div>

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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: false
})

const { user, logout } = useAuth()
const { applications, users, stats, loading, error, getAllApplications, updateApplicationStatus, getAllUsers, getStats } = useAdmin()

const activeTab = ref<'stats' | 'applications' | 'users'>('stats')
const filters = ref({
  status: '' as '' | 'draft' | 'submitted',
  category: '' as '' | 'starter' | 'active' | 'it',
  page: 1,
  limit: 20
})
const pagination = ref<{ page: number; limit: number; total: number; pages: number } | null>(null)
const selectedApplication = ref<any>(null)

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
  } else if (newTab === 'stats' && !stats.value) {
    await loadStats()
  }
})

const loadData = async () => {
  if (activeTab.value === 'stats') {
    await loadStats()
  } else if (activeTab.value === 'applications') {
    await loadApplications()
  } else if (activeTab.value === 'users') {
    await loadUsers()
  }
}

const loadStats = async () => {
  try {
    await getStats()
  } catch (err) {
    console.error('Failed to load stats:', err)
  }
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
    status: '',
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

const changeStatus = async (applicationId: string, newStatus: 'draft' | 'submitted') => {
  try {
    await updateApplicationStatus(applicationId, newStatus)
    selectedApplication.value = null
    await loadApplications()
    if (stats.value) {
      await loadStats()
    }
  } catch (err) {
    console.error('Failed to change status:', err)
    alert('Ошибка при изменении статуса')
  }
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    starter: 'Стартап',
    active: 'Активный бизнес',
    it: 'IT проект'
  }
  return labels[category] || category
}

const handleLogout = async () => {
  await logout()
}

useSeoMeta({
  title: 'Админ-панель - Business Camp 2025',
  description: 'Панель администратора',
  robots: 'noindex, nofollow'
})
</script>
