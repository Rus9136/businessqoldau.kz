<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Личный кабинет</h1>
          <p class="text-gray-600">Управление профилем и заявками</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div class="space-y-4">
                <!-- User Info -->
                <div class="border-b pb-4">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {{ profile?.fullName?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ profile?.fullName || 'Пользователь' }}</p>
                      <p class="text-sm text-gray-500">{{ user?.email }}</p>
                    </div>
                  </div>
                </div>

                <!-- Navigation -->
                <nav class="space-y-2">
                  <button
                    @click="activeTab = 'profile'"
                    :class="[
                      'w-full text-left px-4 py-2 rounded-lg transition-colors',
                      activeTab === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    <span class="flex items-center">
                      <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Мой профиль
                    </span>
                  </button>
                  <button
                    @click="activeTab = 'applications'"
                    :class="[
                      'w-full text-left px-4 py-2 rounded-lg transition-colors',
                      activeTab === 'applications' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    <span class="flex items-center">
                      <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Мои заявки
                      <span v-if="application" class="ml-auto px-2 py-0.5 text-xs rounded-full" :class="application.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                        {{ application.status === 'submitted' ? 'Отправлена' : 'Черновик' }}
                      </span>
                    </span>
                  </button>
                </nav>

                <!-- Logout Button -->
                <button @click="handleLogout" class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Выйти
                </button>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Profile Tab -->
            <div v-show="activeTab === 'profile'" class="bg-white rounded-lg shadow-md p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold text-gray-900">Профиль пользователя</h2>
                <button v-if="profile && !editingProfile" @click="editingProfile = true" class="btn-secondary">
                  Редактировать
                </button>
                <button v-if="editingProfile" @click="cancelEdit" class="btn-secondary">
                  Отмена
                </button>
              </div>

              <div v-if="profileLoading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="text-gray-500 mt-4">Загрузка...</p>
              </div>

              <!-- View Mode -->
              <div v-else-if="profile && !editingProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <label class="block text-sm font-medium text-gray-500 mb-2">Полное имя</label>
                    <p class="text-lg font-medium text-gray-900">{{ profile.fullName }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <label class="block text-sm font-medium text-gray-500 mb-2">Email</label>
                    <p class="text-lg font-medium text-gray-900">{{ user?.email || 'Не указан' }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <label class="block text-sm font-medium text-gray-500 mb-2">Телефон</label>
                    <p class="text-lg font-medium text-gray-900">{{ profile.phone }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <label class="block text-sm font-medium text-gray-500 mb-2">Город</label>
                    <p class="text-lg font-medium text-gray-900">{{ profile.city || 'Не указан' }}</p>
                  </div>
                </div>
              </div>

              <!-- Edit Mode -->
              <form v-else @submit.prevent="saveProfile" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Полное имя *</label>
                  <input
                    v-model="profileForm.fullName"
                    type="text"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите ваше полное имя"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+77001234567"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Город</label>
                  <input
                    v-model="profileForm.city"
                    type="text"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите ваш город"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p class="text-lg text-gray-500">{{ user?.email || 'Не указан' }}</p>
                  <p class="text-xs text-gray-400 mt-1">Email нельзя изменить</p>
                </div>

                <div v-if="profileError" class="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {{ profileError }}
                </div>

                <button type="submit" class="btn-primary w-full">
                  Сохранить изменения
                </button>
              </form>
            </div>

            <!-- Applications Tab -->
            <div v-show="activeTab === 'applications'">
              <div v-if="applicationLoading" class="bg-white rounded-lg shadow-md p-6">
                <div class="text-center py-12">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p class="text-gray-500 mt-4">Загрузка...</p>
                </div>
              </div>

              <!-- No Application -->
              <div v-else-if="!application" class="bg-white rounded-lg shadow-md p-6">
                <div class="text-center py-12">
                  <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <h3 class="mt-4 text-lg font-medium text-gray-900">У вас пока нет заявок</h3>
                  <p class="mt-2 text-sm text-gray-500">Создайте новую заявку на участие в конкурсе</p>
                  <button @click="showApplicationForm = true" class="mt-6 btn-primary">
                    Создать заявку
                  </button>
                </div>
              </div>

              <!-- Application List -->
              <div v-else class="space-y-4">
                <!-- Application Card -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                  <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <div class="flex items-center gap-3 mb-2">
                          <h3 class="text-xl font-semibold text-gray-900">{{ getCategoryLabel(application.category) }}</h3>
                          <span class="px-3 py-1 rounded-full text-xs font-medium" :class="application.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                            {{ application.status === 'submitted' ? '✓ Отправлена' : 'Черновик' }}
                          </span>
                        </div>
                        <p class="text-sm text-gray-500">
                          Создана: {{ new Date(application.createdAt).toLocaleDateString('ru-RU') }}
                        </p>
                      </div>
                      <button
                        @click="viewingApplication = true"
                        class="btn-secondary"
                      >
                        Посмотреть
                      </button>
                    </div>

                    <p class="text-gray-600 line-clamp-2">{{ application.summary }}</p>

                    <div class="mt-4 flex items-center gap-4 text-sm">
                      <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span :class="application.planFilePath ? 'text-green-600 font-medium' : 'text-gray-500'">
                          {{ application.planFilePath ? '✓ Бизнес-план загружен' : 'Бизнес-план не загружен' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application View Modal -->
    <div v-if="viewingApplication" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="viewingApplication = false">
      <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-900">Заявка на участие</h2>
          <button @click="viewingApplication = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6">
          <div v-if="application && !showApplicationForm">
            <!-- Status Badge -->
            <div class="mb-6">
              <span class="px-4 py-2 rounded-full text-sm font-medium" :class="application.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ application.status === 'submitted' ? '✓ Заявка отправлена' : 'Черновик' }}
              </span>
              <p class="text-sm text-gray-500 mt-2">
                Создана: {{ new Date(application.createdAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </p>
            </div>

            <!-- Application Details -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-2">Категория</label>
                <p class="text-lg font-medium text-gray-900">{{ getCategoryLabel(application.category) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-2">Описание бизнеса</label>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-900 whitespace-pre-wrap">{{ application.summary }}</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-2">Бизнес-план</label>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" :class="application.planFilePath ? 'text-green-600' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span :class="application.planFilePath ? 'text-green-600 font-medium' : 'text-gray-500'">
                    {{ application.planFilePath ? 'Файл загружен' : 'Файл не загружен' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex gap-4">
              <button
                v-if="application.status === 'draft'"
                @click="showApplicationForm = true"
                class="btn-secondary flex-1"
              >
                Редактировать
              </button>
              <button
                v-if="application.status === 'draft'"
                @click="handleSubmitApplication"
                :disabled="!canSubmitApplication"
                class="btn-primary flex-1"
                :class="{ 'opacity-50 cursor-not-allowed': !canSubmitApplication }"
              >
                Отправить заявку
              </button>
              <button
                v-if="application.status === 'draft'"
                @click="confirmDelete"
                class="btn-secondary text-red-600 hover:bg-red-50"
              >
                Удалить
              </button>
            </div>

            <p v-if="application.status === 'draft' && !canSubmitApplication" class="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              ⚠️ Для отправки заявки необходимо загрузить бизнес-план
            </p>
          </div>

          <!-- Edit Form -->
          <form v-if="showApplicationForm" @submit.prevent="saveApplication" class="space-y-6">
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
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Описание бизнеса *</label>
              <textarea
                v-model="applicationForm.summary"
                required
                rows="6"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Расскажите о вашем бизнесе..."
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">Минимум 50 символов</p>
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
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                </div>

                <div v-else-if="selectedFile || (application && application.planFilePath)" class="text-center">
                  <div class="text-green-600 mb-2">
                    <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ selectedFile?.name || 'Файл загружен' }}</p>
                  <button type="button" @click="$refs.fileInput.click()" class="mt-2 text-sm text-blue-600 hover:text-blue-700">
                    Выбрать другой файл
                  </button>
                </div>

                <div v-else class="text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <button type="button" @click="$refs.fileInput.click()" class="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    Загрузить бизнес-план
                  </button>
                  <p class="text-xs text-gray-500 mt-1">PDF, DOC или DOCX до 20 МБ</p>
                </div>
              </div>
            </div>

            <div v-if="applicationError" class="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {{ applicationError }}
            </div>

            <div class="flex gap-4">
              <button type="submit" class="btn-primary flex-1">
                {{ application ? 'Сохранить изменения' : 'Создать заявку' }}
              </button>
              <button type="button" @click="cancelApplicationEdit" class="btn-secondary">
                Отмена
              </button>
            </div>
          </form>
        </div>
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

// Tab state
const activeTab = ref<'profile' | 'applications'>('profile')

// Profile editing state
const editingProfile = ref(false)
const profileForm = ref({
  fullName: '',
  phone: '',
  city: ''
})

// Application state
const viewingApplication = ref(false)
const showApplicationForm = ref(false)
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

    // If no application exists, switch to applications tab
    if (!application.value) {
      activeTab.value = 'applications'
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
  if (newApplication && showApplicationForm.value) {
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
  showApplicationForm.value = false
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

    showApplicationForm.value = false
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
    viewingApplication.value = false
  } catch (error) {
    console.error('Failed to submit application:', error)
    alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.')
  }
}

const confirmDelete = async () => {
  if (!application.value) return

  const confirmed = confirm('Вы уверены, что хотите удалить заявку?')
  if (!confirmed) return

  try {
    await deleteApplication(application.value.id)
    viewingApplication.value = false
    showApplicationForm.value = false
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
