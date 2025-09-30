<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Вход</h1>
        <p class="mt-2 text-gray-600">
          Войдите в личный кабинет для подачи заявки
        </p>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md">
        <div class="mb-6">
          <div class="flex border-b">
            <button
              @click="mode = 'login'"
              :class="[
                'flex-1 py-3 font-semibold transition-colors',
                mode === 'login'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              ]"
            >
              Вход
            </button>
            <button
              @click="mode = 'register'"
              :class="[
                'flex-1 py-3 font-semibold transition-colors',
                mode === 'register'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              ]"
            >
              Регистрация
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-2">
              Пароль <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p class="text-sm text-gray-500 mt-1">
              Минимум 6 символов
            </p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full disabled:opacity-50"
            >
              {{ loading ? 'Загрузка...' : (mode === 'login' ? 'Войти' : 'Зарегистрироваться') }}
            </button>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
            {{ success }}
          </div>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-blue-600 hover:underline">
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const { login, register } = useAuth()

const mode = ref<'login' | 'register'>('login')
const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    if (mode.value === 'register') {
      const response = await register(form.email, form.password)
      success.value = response.message

      // Clear form after successful registration
      form.email = ''
      form.password = ''
    } else {
      await login(form.email, form.password)
      router.push('/app')
    }
  } catch (e: any) {
    error.value = e.data?.message || e.message || 'Произошла ошибка'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Вход - Бизнес Camp 2025',
  description: 'Войдите в личный кабинет',
})
</script>