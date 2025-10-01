<template>
  <div class="container-custom py-12">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Личный кабинет</h1>
        <p class="text-gray-600">Добро пожаловать!</p>
      </div>

      <!-- User Profile Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Профиль пользователя</h2>

        <div v-if="profileLoading" class="text-center py-8">
          <p class="text-gray-500">Загрузка...</p>
        </div>

        <div v-else-if="profile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Полное имя</label>
            <p class="text-lg">{{ profile.fullName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <p class="text-lg">{{ profile.phone }}</p>
          </div>
          <div v-if="profile.city">
            <label class="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <p class="text-lg">{{ profile.city }}</p>
          </div>
          <div v-if="profile">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-lg">{{ accessToken ? 'Авторизован' : 'Не авторизован' }}</p>
          </div>
        </div>
      </div>

      <!-- Application Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Заявка на участие</h2>

        <div v-if="applicationLoading" class="text-center py-8">
          <p class="text-gray-500">Загрузка...</p>
        </div>

        <div v-else-if="application">
          <div class="mb-4">
            <span class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  :class="application.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
              {{ application.status === 'submitted' ? 'Отправлена' : 'Черновик' }}
            </span>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <p class="text-lg capitalize">{{ application.category }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Описание бизнеса</label>
              <p class="text-lg">{{ application.summary }}</p>
            </div>
            <div v-if="application.planFilePath">
              <label class="block text-sm font-medium text-gray-700 mb-1">Бизнес-план</label>
              <p class="text-sm text-blue-600">✓ Загружен</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <p class="text-gray-500 mb-4">У вас пока нет заявки на участие</p>
          <p class="text-sm text-gray-400">Функция подачи заявки будет доступна позже</p>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="text-center">
        <button @click="handleLogout" class="btn-secondary">
          Выйти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { accessToken, logout } = useAuth()
const { profile, loading: profileLoading, fetchProfile } = useProfile()
const { application, loading: applicationLoading, fetchApplications } = useApplication()

// Fetch profile and application on mount
onMounted(async () => {
  try {
    await fetchProfile()
    await fetchApplications()
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

const handleLogout = async () => {
  await logout()
}

useSeoMeta({
  title: 'Личный кабинет - Бизнес Camp 2025',
  description: 'Личный кабинет участника',
})
</script>
