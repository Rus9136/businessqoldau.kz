<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold mb-6">
            {{ $t('home.title') }}
          </h1>
          <p class="text-xl mb-8">
            {{ $t('home.subtitle') }}
          </p>

          <!-- Application Period -->
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div v-if="loading" class="text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>

            <div v-else-if="settings && periodStatus">
              <div class="flex items-center space-x-3">
                <div class="text-3xl">📅</div>
                <div>
                  <div class="text-sm opacity-90">Период подачи заявок</div>
                  <div class="text-2xl font-bold">
                    {{ formatDate(settings.start_date) }} — {{ formatDate(settings.end_date) }}
                  </div>
                </div>
              </div>

              <div v-if="periodStatus.message" class="text-sm opacity-90 mt-4">
                {{ periodStatus.message }}
              </div>
            </div>

            <div v-else class="text-center text-sm opacity-90">
              Информация о периоде подачи заявок временно недоступна
            </div>
          </div>

          <NuxtLink to="/app" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            {{ $t('home.cta.button') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Этапы конкурса -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-center mb-12">{{ $t('home.stages.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-4xl font-bold text-blue-600 mb-4">01</div>
            <h3 class="mb-4">{{ $t('home.stages.step1.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.stages.step1.description') }}
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-4xl font-bold text-blue-600 mb-4">02</div>
            <h3 class="mb-4">{{ $t('home.stages.step2.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.stages.step2.description') }}
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-4xl font-bold text-blue-600 mb-4">03</div>
            <h3 class="mb-4">{{ $t('home.stages.step3.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.stages.step3.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Призовой фонд -->
    <section class="bg-gray-50 py-16">
      <div class="container-custom">
        <h2 class="text-center mb-12">{{ $t('home.prizes.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-yellow-400">
            <div class="text-5xl mb-4">🥇</div>
            <div class="text-3xl font-bold text-yellow-600 mb-2">{{ $t('home.prizes.first') }}</div>
            <div class="text-2xl font-semibold">5 000 000 ₸</div>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-gray-400">
            <div class="text-5xl mb-4">🥈</div>
            <div class="text-3xl font-bold text-gray-600 mb-2">{{ $t('home.prizes.second') }}</div>
            <div class="text-2xl font-semibold">3 000 000 ₸</div>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-orange-400">
            <div class="text-5xl mb-4">🥉</div>
            <div class="text-3xl font-bold text-orange-600 mb-2">{{ $t('home.prizes.third') }}</div>
            <div class="text-2xl font-semibold">2 000 000 ₸</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-600 text-white py-16">
      <div class="container-custom text-center">
        <h2 class="mb-6">{{ $t('home.cta.title') }}</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          {{ $t('home.cta.description') }}
        </p>
        <NuxtLink to="/app" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">
          {{ $t('home.cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { settings, periodStatus, loading, getApplicationSettings, formatDate } = useSettings()

// Загрузить настройки периода при монтировании
onMounted(async () => {
  await getApplicationSettings()
})

useSeoMeta({
  title: 'Бизнес Camp 2025 - Конкурс для предпринимателей',
  description: 'Конкурс для предпринимателей Казахстана. Призовой фонд до 10 млн тенге.',
})
</script>