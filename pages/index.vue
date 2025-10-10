<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white section-padding overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div class="animate-fade-in-up">
            <div class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span class="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></span>
              <span class="text-sm font-semibold">Конкурс грант 2025</span>
            </div>

            <h1 class="mb-6 leading-tight">
              {{ $t('home.title') }}
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              {{ $t('home.subtitle') }}
            </p>

            <!-- Application Period -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
              <div v-if="loading" class="text-center py-4">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>

              <div v-else-if="settings && periodStatus">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-medium opacity-90 mb-1">Период подачи заявок</div>
                    <div class="text-xl md:text-2xl font-bold">
                      {{ formatDate(settings.start_date) }} — {{ formatDate(settings.end_date) }}
                    </div>
                    <div v-if="periodStatus.message" class="text-sm opacity-90 mt-3 bg-white/10 rounded-lg px-3 py-2">
                      {{ periodStatus.message }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center text-sm opacity-90 py-4">
                Информация о периоде подачи заявок временно недоступна
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/app" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                {{ $t('home.cta.button') }}
              </NuxtLink>
              <NuxtLink to="/how-to-apply" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Узнать подробнее
              </NuxtLink>
            </div>
          </div>

          <!-- Illustration -->
          <div class="hidden lg:block animate-float">
            <img
              src="/image_svg/undraw_launch-event_aur1.svg"
              alt="Business Launch"
              class="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Этапы конкурса -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{{ $t('home.stages.title') }}</h2>
          <p class="text-xl text-gray-600">Простой и прозрачный процесс участия в конкурсе</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Connection lines for desktop -->
          <div class="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-300 to-secondary-200 z-0" style="width: 66%; left: 17%;"></div>

          <!-- Stage 1 -->
          <div class="card p-8 relative z-10 group">
            <div class="flex justify-center mb-6">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                01
              </div>
            </div>
            <div class="flex justify-center mb-6">
              <img
                src="/image_svg/undraw_data-input_whqw.svg"
                alt="Registration"
                class="w-32 h-32 object-contain"
              />
            </div>
            <h3 class="mb-4 text-center">{{ $t('home.stages.step1.title') }}</h3>
            <p class="text-gray-600 text-center leading-relaxed">
              {{ $t('home.stages.step1.description') }}
            </p>
          </div>

          <!-- Stage 2 -->
          <div class="card p-8 relative z-10 group">
            <div class="flex justify-center mb-6">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                02
              </div>
            </div>
            <div class="flex justify-center mb-6">
              <img
                src="/image_svg/undraw_data-analysis_b7cp.svg"
                alt="Evaluation"
                class="w-32 h-32 object-contain"
              />
            </div>
            <h3 class="mb-4 text-center">{{ $t('home.stages.step2.title') }}</h3>
            <p class="text-gray-600 text-center leading-relaxed">
              {{ $t('home.stages.step2.description') }}
            </p>
          </div>

          <!-- Stage 3 -->
          <div class="card p-8 relative z-10 group">
            <div class="flex justify-center mb-6">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                03
              </div>
            </div>
            <div class="flex justify-center mb-6">
              <img
                src="/image_svg/undraw_success_288d.svg"
                alt="Winners"
                class="w-32 h-32 object-contain"
              />
            </div>
            <h3 class="mb-4 text-center">{{ $t('home.stages.step3.title') }}</h3>
            <p class="text-gray-600 text-center leading-relaxed">
              {{ $t('home.stages.step3.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Призовой фонд -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="mb-4 text-gray-900">{{ $t('home.prizes.title') }}</h2>
          <p class="text-xl text-gray-600">Общий призовой фонд составляет 10 миллионов тенге</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- First Place -->
          <div class="bg-white border-2 border-yellow-400 rounded-2xl p-8 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>

            <div class="relative z-10">
              <div class="w-20 h-20 mx-auto mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.prizes.first') }}</div>
              <div class="text-4xl font-bold text-gray-900 mb-2">5 000 000 ₸</div>
              <p class="text-gray-500 text-sm">Главный приз конкурса</p>
            </div>
          </div>

          <!-- Second Place -->
          <div class="bg-white border-2 border-gray-300 rounded-2xl p-8 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300 md:mt-8">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gray-300"></div>

            <div class="relative z-10">
              <div class="w-20 h-20 mx-auto mb-6 bg-gray-50 border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.prizes.second') }}</div>
              <div class="text-4xl font-bold text-gray-900 mb-2">3 000 000 ₸</div>
              <p class="text-gray-500 text-sm">Второе место</p>
            </div>
          </div>

          <!-- Third Place -->
          <div class="bg-white border-2 border-orange-300 rounded-2xl p-8 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-0 left-0 right-0 h-1 bg-orange-300"></div>

            <div class="relative z-10">
              <div class="w-20 h-20 mx-auto mb-6 bg-orange-50 border-2 border-orange-300 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.prizes.third') }}</div>
              <div class="text-4xl font-bold text-gray-900 mb-2">2 000 000 ₸</div>
              <p class="text-gray-500 text-sm">Третье место</p>
            </div>
          </div>
        </div>

        <!-- Additional Benefits -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-800">Менторство</div>
              <p class="text-sm text-gray-600">От опытных предпринимателей</p>
            </div>
          </div>

          <div class="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-800">Нетворкинг</div>
              <p class="text-sm text-gray-600">Связи с инвесторами и партнерами</p>
            </div>
          </div>

          <div class="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-800">Медиа поддержка</div>
              <p class="text-sm text-gray-600">Освещение в СМИ и социальных сетях</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Illustration -->
          <div class="hidden lg:block animate-float">
            <img
              src="/image_svg/undraw_ideas-flow_lwpa.svg"
              alt="Ideas Flow"
              class="w-full h-auto drop-shadow-2xl"
            />
          </div>

          <!-- Content -->
          <div class="text-center lg:text-left">
            <h2 class="mb-6 leading-tight">{{ $t('home.cta.title') }}</h2>
            <p class="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              {{ $t('home.cta.description') }}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink to="/app" class="px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span>{{ $t('home.cta.button') }}</span>
              </NuxtLink>
              <NuxtLink to="/contacts" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Связаться с нами
              </NuxtLink>
            </div>

            <!-- Trust indicators -->
            <div class="mt-12 pt-8 border-t border-white/20">
              <div class="grid grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <div class="text-sm font-semibold">Безопасность</div>
                    <div class="text-xs text-white/70">Защита данных</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <div class="text-sm font-semibold">Прозрачность</div>
                    <div class="text-xs text-white/70">Честная оценка</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { settings, periodStatus, loading, getApplicationSettings, formatDate } = useSettings()
const { getOrganizationSchema, getEventSchema, getWebSiteSchema } = useStructuredData()

// Structured data
const organizationSchema = getOrganizationSchema()
const eventSchema = getEventSchema()
const webSiteSchema = getWebSiteSchema()

// Загрузить настройки периода при монтировании
onMounted(async () => {
  await getApplicationSettings()
})

// Enhanced SEO meta
useSeoMeta({
  title: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана',
  description: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025! Получите финансирование, менторство и возможность развить свой бизнес.',
  keywords: 'бизнес грант, qoldau, business qoldau, предприниматели казахстан, грант, призовой фонд, стартап, бизнес план, конкурс грант 2025, финансирование бизнеса',
  ogTitle: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана',
  ogDescription: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025!',
  ogImage: 'https://businessqoldau.kz/og-image.jpg',
  ogType: 'website',
  ogUrl: 'https://businessqoldau.kz',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана',
  twitterDescription: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025!',
  twitterImage: 'https://businessqoldau.kz/og-image.jpg'
})

// Additional head tags
useHead({
  link: [
    { rel: 'canonical', href: 'https://businessqoldau.kz' },
    { rel: 'alternate', hreflang: 'ru', href: 'https://businessqoldau.kz' },
    { rel: 'alternate', hreflang: 'kk', href: 'https://businessqoldau.kz' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://businessqoldau.kz' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(eventSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(webSiteSchema)
    }
  ]
})
</script>