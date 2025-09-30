<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h1>Личный кабинет</h1>
          <button @click="handleLogout" class="btn-secondary">
            Выйти
          </button>
        </div>

        <!-- User Profile -->
        <div v-if="user" class="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 class="text-xl font-semibold mb-4">Профиль</h2>
          <p class="text-gray-600">
            Email: <span class="font-semibold">{{ user.email }}</span>
          </p>
        </div>

        <!-- Application Status -->
        <div v-if="application" class="bg-white p-6 rounded-lg shadow-md mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Статус заявки</h2>
            <span
              :class="[
                'px-4 py-2 rounded-full text-sm font-semibold',
                application.status === 'submitted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{ application.status === 'submitted' ? 'Отправлено' : 'Черновик' }}
            </span>
          </div>

          <div v-if="application.status === 'submitted'" class="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
            <p>
              Ваша заявка успешно отправлена! Мы свяжемся с вами после завершения экспертной оценки.
            </p>
          </div>
        </div>

        <!-- Application Form -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-6">
            {{ application?.status === 'submitted' ? 'Ваша заявка' : 'Заявка на участие' }}
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Full Name -->
            <div>
              <label for="fullName" class="block text-sm font-medium mb-2">
                ФИО <span class="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                :disabled="isSubmitted"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium mb-2">
                Телефон <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                :disabled="isSubmitted"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <!-- City -->
            <div>
              <label for="city" class="block text-sm font-medium mb-2">
                Город <span class="text-red-500">*</span>
              </label>
              <input
                id="city"
                v-model="form.city"
                type="text"
                required
                :disabled="isSubmitted"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <!-- Category -->
            <div>
              <label for="category" class="block text-sm font-medium mb-2">
                Категория <span class="text-red-500">*</span>
              </label>
              <select
                id="category"
                v-model="form.category"
                required
                :disabled="isSubmitted"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Выберите категорию</option>
                <option value="starter">Стартап</option>
                <option value="active">Действующий бизнес</option>
                <option value="it">IT проект</option>
              </select>
            </div>

            <!-- Summary -->
            <div>
              <label for="summary" class="block text-sm font-medium mb-2">
                Краткое описание бизнеса <span class="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                v-model="form.summary"
                rows="5"
                required
                :disabled="isSubmitted"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              ></textarea>
            </div>

            <!-- Business Plan Upload -->
            <div>
              <label class="block text-sm font-medium mb-2">
                Бизнес-план (PDF, до 20 МБ) <span class="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf"
                :disabled="isSubmitted"
                @change="handlePlanUpload"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
              />
              <p v-if="form.planFilePath" class="text-sm text-green-600 mt-2">
                ✓ Файл загружен
              </p>
            </div>

            <!-- Video Upload -->
            <div>
              <label class="block text-sm font-medium mb-2">
                Видео-презентация (MP4, до 300 МБ) <span class="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".mp4"
                :disabled="isSubmitted"
                @change="handleVideoUpload"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
              />
              <p v-if="form.videoFilePath" class="text-sm text-green-600 mt-2">
                ✓ Файл загружен
              </p>
            </div>

            <!-- Terms Checkbox -->
            <div>
              <label class="flex items-start space-x-3">
                <input
                  v-model="form.agreeTerms"
                  type="checkbox"
                  required
                  :disabled="isSubmitted"
                  class="mt-1 disabled:opacity-50"
                />
                <span class="text-sm">
                  Я согласен с
                  <NuxtLink to="/terms" target="_blank" class="text-blue-600 hover:underline">
                    правилами участия
                  </NuxtLink>
                  и
                  <NuxtLink to="/privacy" target="_blank" class="text-blue-600 hover:underline">
                    политикой конфиденциальности
                  </NuxtLink>
                  <span class="text-red-500">*</span>
                </span>
              </label>
            </div>

            <!-- Buttons -->
            <div v-if="!isSubmitted" class="flex space-x-4">
              <button
                type="button"
                @click="saveDraft"
                :disabled="loading"
                class="btn-secondary flex-1 disabled:opacity-50"
              >
                Сохранить черновик
              </button>
              <button
                type="submit"
                :disabled="loading || !canSubmit"
                class="btn-primary flex-1 disabled:opacity-50"
              >
                {{ loading ? 'Отправка...' : 'Отправить заявку' }}
              </button>
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {{ error }}
            </div>

            <div v-if="success" class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {{ success }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
const { profile, loading: profileLoading, getProfile, createProfile, updateProfile } = useProfile()

const form = reactive({
  fullName: '',
  phone: '',
  city: '',
  category: '',
  summary: '',
  planFilePath: '',
  videoFilePath: '',
  agreeTerms: false
})

const application = ref<any>(null)
const loading = ref(false)
const error = ref('')
const success = ref('')

const isSubmitted = computed(() => application.value?.status === 'submitted')
const canSubmit = computed(() => {
  return form.fullName && form.phone && form.city && form.category &&
         form.summary && form.planFilePath && form.videoFilePath && form.agreeTerms
})

// Load profile data
onMounted(async () => {
  try {
    await getProfile()

    // Pre-fill form with profile data if it exists
    if (profile.value) {
      form.fullName = profile.value.fullName
      form.phone = profile.value.phone
      form.city = profile.value.city
    }
  } catch (e: any) {
    // Profile doesn't exist yet, that's ok
    console.log('No profile yet')
  }

  // TODO: Load application data
})

const handlePlanUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (file.size > 20 * 1024 * 1024) {
      error.value = 'Размер файла превышает 20 МБ'
      return
    }
    // TODO: Upload file to backend
    form.planFilePath = 'placeholder-path'
  }
}

const handleVideoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (file.size > 300 * 1024 * 1024) {
      error.value = 'Размер файла превышает 300 МБ'
      return
    }
    // TODO: Upload file to backend
    form.videoFilePath = 'placeholder-path'
  }
}

const saveDraft = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Save/update profile first
    if (!profile.value) {
      await createProfile({
        fullName: form.fullName,
        phone: form.phone,
        city: form.city,
      })
    } else {
      await updateProfile({
        fullName: form.fullName,
        phone: form.phone,
        city: form.city,
      })
    }

    // TODO: Save application draft to backend
    success.value = 'Черновик сохранен'
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!canSubmit.value) return

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Save/update profile first
    if (!profile.value) {
      await createProfile({
        fullName: form.fullName,
        phone: form.phone,
        city: form.city,
      })
    } else {
      await updateProfile({
        fullName: form.fullName,
        phone: form.phone,
        city: form.city,
      })
    }

    // TODO: Submit application to backend
    success.value = 'Заявка успешно отправлена!'
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await logout()
}

useSeoMeta({
  title: 'Личный кабинет - Бизнес Camp 2025',
  description: 'Подача заявки на участие в конкурсе',
})
</script>