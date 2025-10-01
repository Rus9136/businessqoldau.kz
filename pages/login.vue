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
          <!-- Full Name (only for registration) -->
          <div v-if="mode === 'register'">
            <label for="fullName" class="block text-sm font-medium mb-2">
              Полное имя <span class="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              v-model="form.fullName"
              type="text"
              :required="mode === 'register'"
              minlength="2"
              maxlength="100"
              placeholder="Иванов Иван Иванович"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Phone (only for registration) -->
          <div v-if="mode === 'register'">
            <label for="phone" class="block text-sm font-medium mb-2">
              Телефон <span class="text-red-500">*</span>
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              :required="mode === 'register'"
              placeholder="+77001234567"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p class="text-sm text-gray-500 mt-1">
              Формат: +77001234567
            </p>
          </div>

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
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :minlength="mode === 'register' ? 8 : undefined"
                class="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Минимум 8 символов
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
  fullName: '',
  phone: '',
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const showPassword = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    if (mode.value === 'register') {
      const response = await register(form.email, form.password, form.fullName, form.phone)
      success.value = response.message

      // Clear form after successful registration
      form.fullName = ''
      form.phone = ''
      form.email = ''
      form.password = ''
    } else {
      console.log('Attempting login...')
      const response = await login(form.email, form.password)
      console.log('Login successful, tokens saved:', {
        hasAccessToken: !!response.accessToken,
        hasRefreshToken: !!response.refreshToken,
        hasUser: !!response.user
      })
      // Navigate to app
      await navigateTo('/app')
    }
  } catch (e: any) {
    console.error('Login error:', e)
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