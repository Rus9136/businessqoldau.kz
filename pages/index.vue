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

          <!-- Timer Placeholder -->
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div class="text-sm mb-2">{{ $t('home.timer.title') }}</div>
            <div class="flex space-x-4 text-3xl font-bold">
              <div class="flex flex-col items-center">
                <span>30</span>
                <span class="text-sm font-normal">{{ $t('home.timer.days') }}</span>
              </div>
              <div class="flex flex-col items-center">
                <span>12</span>
                <span class="text-sm font-normal">{{ $t('home.timer.hours') }}</span>
              </div>
              <div class="flex flex-col items-center">
                <span>45</span>
                <span class="text-sm font-normal">{{ $t('home.timer.minutes') }}</span>
              </div>
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
useSeoMeta({
  title: 'Бизнес Camp 2025 - Конкурс для предпринимателей',
  description: 'Конкурс для предпринимателей Казахстана. Призовой фонд до 10 млн тенге.',
})
</script>