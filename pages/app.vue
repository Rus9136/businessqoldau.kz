<template>
  <div class="container-custom py-12">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Личный кабинет</h1>
        <p class="text-gray-600">Добро пожаловать!</p>
      </div>

      <!-- User Profile Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Профиль пользователя</h2>
          <button v-if="profile && !editingProfile" @click="editingProfile = true" class="btn-secondary">
            Редактировать
          </button>
          <button v-if="editingProfile" @click="cancelEdit" class="btn-secondary">
            Отмена
          </button>
        </div>

        <div v-if="profileLoading" class="text-center py-8">
          <p class="text-gray-500">Загрузка...</p>
        </div>

        <!-- View Mode -->
        <div v-else-if="profile && !editingProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Полное имя</label>
            <p class="text-lg">{{ profile.fullName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <p class="text-lg">{{ profile.phone }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <p class="text-lg">{{ profile.city || 'Не указан' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-lg">{{ user?.email || 'Не указан' }}</p>
          </div>
        </div>

        <!-- Edit Mode -->
        <form v-else @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Полное имя *</label>
            <input
              v-model="profileForm.fullName"
              type="text"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваше полное имя"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
            <input
              v-model="profileForm.phone"
              type="tel"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+77001234567"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <input
              v-model="profileForm.city"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваш город"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-lg text-gray-500">{{ user?.email || 'Не указан' }}</p>
          </div>

          <div v-if="profileError" class="text-red-600 text-sm">
            {{ profileError }}
          </div>

          <button type="submit" class="btn-primary w-full">
            Сохранить изменения
          </button>
        </form>
      </div>

      <!-- Application Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Заявка на участие</h2>
          <button
            v-if="application && application.status === 'draft' && !editingApplication"
            @click="editingApplication = true"
            class="btn-secondary"
          >
            Редактировать
          </button>
          <button
            v-if="editingApplication"
            @click="cancelApplicationEdit"
            class="btn-secondary"
          >
            Отмена
          </button>
        </div>

        <div v-if="applicationLoading" class="text-center py-8">
          <p class="text-gray-500">Загрузка...</p>
        </div>

        <!-- View Mode (Submitted Application) -->
        <div v-else-if="application && application.status === 'submitted' && !editingApplication">
          <div class="mb-4">
            <span class="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✓ Заявка отправлена
            </span>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <p class="text-lg capitalize">{{ getCategoryLabel(application.category) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Описание бизнеса</label>
              <p class="text-lg whitespace-pre-wrap">{{ application.summary }}</p>
            </div>
            <div v-if="application.planFilePath">
              <label class="block text-sm font-medium text-gray-700 mb-1">Бизнес-план</label>
              <p class="text-sm text-green-600">✓ Файл загружен</p>
            </div>
          </div>
        </div>

        <!-- View Mode (Draft Application) -->
        <div v-else-if="application && application.status === 'draft' && !editingApplication">
          <div class="mb-4">
            <span class="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Черновик
            </span>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <p class="text-lg">{{ getCategoryLabel(application.category) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Описание бизнеса</label>
              <p class="text-lg whitespace-pre-wrap">{{ application.summary }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Бизнес-план</label>
              <p class="text-sm" :class="application.planFilePath ? 'text-green-600' : 'text-gray-500'">
                {{ application.planFilePath ? '✓ Файл загружен' : 'Не загружен' }}
              </p>
            </div>

            <div class="flex gap-4 pt-4">
              <button
                @click="handleSubmitApplication"
                :disabled="!canSubmitApplication"
                class="btn-primary flex-1"
                :class="{ 'opacity-50 cursor-not-allowed': !canSubmitApplication }"
              >
                Отправить заявку
              </button>
              <button
                @click="handleDeleteApplication"
                class="btn-secondary text-red-600 hover:bg-red-50"
              >
                Удалить
              </button>
            </div>

            <p v-if="!canSubmitApplication" class="text-sm text-amber-600">
              ⚠️ Для отправки заявки необходимо загрузить бизнес-план
            </p>
          </div>
        </div>

        <!-- Create/Edit Form -->
        <form v-else @submit.prevent="saveApplication" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Категория *</label>
            <select
              v-model="applicationForm.category"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Выберите категорию</option>
              <option value="starter">Стартап (начинающий бизнес)</option>
              <option value="active">Активный бизнес</option>
              <option value="it">IT проект</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">
              Выберите категорию, которая лучше всего описывает ваш бизнес
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Описание бизнеса *</label>
            <textarea
              v-model="applicationForm.summary"
              required
              rows="6"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Расскажите о вашем бизнесе: что вы делаете, какую проблему решаете, кто ваши клиенты..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Минимум 50 символов. Опишите суть вашего бизнеса, целевую аудиторию и конкурентные преимущества.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Бизнес-план</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                ref="fileInput"
                type="file"
                @change="handleFileSelect"
                accept=".pdf,.doc,.docx"
                class="hidden"
              />

              <div v-if="uploadProgress > 0 && uploadProgress < 100" class="space-y-2">
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Загрузка...</span>
                  <span>{{ uploadProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: uploadProgress + '%' }"
                  ></div>
                </div>
              </div>

              <div v-else-if="selectedFile || (application && application.planFilePath)" class="text-center">
                <div class="text-green-600 mb-2">
                  <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">
                  {{ selectedFile?.name || 'Файл загружен' }}
                </p>
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  Выбрать другой файл
                </button>
              </div>

              <div v-else class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Загрузить бизнес-план
                </button>
                <p class="text-xs text-gray-500 mt-1">
                  PDF, DOC или DOCX до 20 МБ
                </p>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Загрузите бизнес-план в формате PDF, DOC или DOCX. Максимальный размер файла: 20 МБ.
            </p>
          </div>

          <div v-if="applicationError" class="text-red-600 text-sm bg-red-50 p-3 rounded">
            {{ applicationError }}
          </div>

          <div class="flex gap-4">
            <button type="submit" class="btn-primary flex-1">
              {{ application ? 'Сохранить изменения' : 'Сохранить черновик' }}
            </button>
            <button
              v-if="application"
              type="button"
              @click="cancelApplicationEdit"
              class="btn-secondary"
            >
              Отмена
            </button>
          </div>
        </form>
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
import type { ApplicationCategory } from '~/composables/useApplication'

definePageMeta({
  middleware: 'auth'
})

const { user, logout, fetchCurrentUser } = useAuth()
const { profile, loading: profileLoading, error: profileError, fetchProfile, updateProfile, createProfile } = useProfile()
const {
  application,
  loading: applicationLoading,
  uploadProgress,
  error: applicationError,
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  submitApplication,
  uploadFile
} = useApplication()

// Profile editing state
const editingProfile = ref(false)
const profileForm = ref({
  fullName: '',
  phone: '',
  city: ''
})

// Application editing state
const editingApplication = ref(false)
const applicationForm = ref<{ category: ApplicationCategory | '', summary: string }>({
  category: '',
  summary: ''
})
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

// Fetch user, profile and application on mount
onMounted(async () => {
  try {
    await fetchCurrentUser()
    await fetchProfile()
    await fetchApplications()

    // If profile doesn't exist, enable edit mode
    if (!profile.value) {
      editingProfile.value = true
      profileForm.value = {
        fullName: '',
        phone: '',
        city: ''
      }
    }

    // If no application exists, show the form
    if (!application.value) {
      editingApplication.value = true
      applicationForm.value = {
        category: '',
        summary: ''
      }
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

// Watch for profile changes to update form
watch(profile, (newProfile) => {
  if (newProfile && !editingProfile.value) {
    profileForm.value = {
      fullName: newProfile.fullName,
      phone: newProfile.phone,
      city: newProfile.city || ''
    }
  }
}, { immediate: true })

// Watch for application changes to update form
watch(application, (newApplication) => {
  if (newApplication && editingApplication.value) {
    applicationForm.value = {
      category: newApplication.category,
      summary: newApplication.summary
    }
  }
}, { immediate: true })

// Profile functions
const cancelEdit = () => {
  editingProfile.value = false
  if (profile.value) {
    profileForm.value = {
      fullName: profile.value.fullName,
      phone: profile.value.phone,
      city: profile.value.city || ''
    }
  }
}

const saveProfile = async () => {
  try {
    if (profile.value) {
      await updateProfile(profileForm.value)
    } else {
      await createProfile(profileForm.value)
    }
    editingProfile.value = false
  } catch (error) {
    console.error('Failed to save profile:', error)
  }
}

// Application functions
const cancelApplicationEdit = () => {
  editingApplication.value = false
  selectedFile.value = null
  if (application.value) {
    applicationForm.value = {
      category: application.value.category,
      summary: application.value.summary
    }
  }
}

const saveApplication = async () => {
  try {
    // Validate form
    if (!applicationForm.value.category || !applicationForm.value.summary) {
      return
    }

    if (applicationForm.value.summary.length < 50) {
      alert('Описание бизнеса должно содержать минимум 50 символов')
      return
    }

    let savedApplication

    // Create or update application (without file)
    if (application.value) {
      savedApplication = await updateApplication(application.value.id, {
        category: applicationForm.value.category as ApplicationCategory,
        summary: applicationForm.value.summary
      })
    } else {
      savedApplication = await createApplication({
        category: applicationForm.value.category as ApplicationCategory,
        summary: applicationForm.value.summary
      })
    }

    // Upload file separately if selected
    if (selectedFile.value && savedApplication) {
      try {
        await uploadFile(savedApplication.id, selectedFile.value)
        selectedFile.value = null
      } catch (uploadError) {
        console.error('Failed to upload file:', uploadError)
        alert('Заявка сохранена, но произошла ошибка при загрузке файла. Попробуйте загрузить файл еще раз.')
      }
    }

    editingApplication.value = false
  } catch (error) {
    console.error('Failed to save application:', error)
    alert('Ошибка при сохранении заявки')
  }
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file type
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowedTypes.includes(file.type)) {
    alert('Пожалуйста, загрузите файл в формате PDF, DOC или DOCX')
    return
  }

  // Validate file size (20MB)
  const maxSize = 20 * 1024 * 1024
  if (file.size > maxSize) {
    alert('Размер файла не должен превышать 20 МБ')
    return
  }

  selectedFile.value = file

  // If application already exists, upload immediately
  if (application.value) {
    try {
      await uploadFile(application.value.id, file)
      selectedFile.value = null
    } catch (error) {
      console.error('Failed to upload file:', error)
    }
  }
}

const handleSubmitApplication = async () => {
  if (!application.value) return

  if (!canSubmitApplication.value) {
    alert('Для отправки заявки необходимо загрузить бизнес-план')
    return
  }

  const confirmed = confirm('Вы уверены, что хотите отправить заявку? После отправки её нельзя будет изменить.')
  if (!confirmed) return

  try {
    await submitApplication(application.value.id)
    alert('Заявка успешно отправлена!')
  } catch (error) {
    console.error('Failed to submit application:', error)
    alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.')
  }
}

const handleDeleteApplication = async () => {
  if (!application.value) return

  const confirmed = confirm('Вы уверены, что хотите удалить заявку?')
  if (!confirmed) return

  try {
    await deleteApplication(application.value.id)
    editingApplication.value = true
    applicationForm.value = {
      category: '',
      summary: ''
    }
  } catch (error) {
    console.error('Failed to delete application:', error)
    alert('Ошибка при удалении заявки. Пожалуйста, попробуйте позже.')
  }
}

const canSubmitApplication = computed(() => {
  return application.value?.planFilePath !== null && application.value?.planFilePath !== undefined
})

const getCategoryLabel = (category: ApplicationCategory) => {
  const labels = {
    starter: 'Стартап (начинающий бизнес)',
    active: 'Активный бизнес',
    it: 'IT проект'
  }
  return labels[category] || category
}

const handleLogout = async () => {
  await logout()
}

useSeoMeta({
  title: 'Личный кабинет - Бизнес Camp 2025',
  description: 'Личный кабинет участника',
})
</script>
