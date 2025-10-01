<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container-custom py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
          Бизнес Camp
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/how-to-apply" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.howToApply') }}
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.terms') }}
          </NuxtLink>
          <NuxtLink to="/contacts" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.contacts') }}
          </NuxtLink>
        </div>

        <!-- Auth & Language -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="flex space-x-2">
            <button
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="setLocale(locale.code)"
              :class="[
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                currentLocale === locale.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ locale.code.toUpperCase() }}
            </button>
          </div>

          <!-- Auth Buttons -->
          <NuxtLink
            v-if="!user"
            to="/login"
            class="btn-primary"
          >
            {{ $t('nav.login') }}
          </NuxtLink>
          <NuxtLink
            v-else
            to="/app"
            class="btn-primary"
          >
            {{ $t('nav.cabinet') }}
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 pb-4 border-t pt-4"
      >
        <div class="flex flex-col space-y-4">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/how-to-apply" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.howToApply') }}
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.terms') }}
          </NuxtLink>
          <NuxtLink to="/contacts" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.contacts') }}
          </NuxtLink>
          <NuxtLink v-if="user" to="/app" class="hover:text-blue-600 transition-colors">
            {{ $t('nav.cabinet') }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale: setI18nLocale } = useI18n()
const { user } = useAuth()
const mobileMenuOpen = ref(false)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const setLocale = (code: string) => {
  setI18nLocale(code)
  mobileMenuOpen.value = false
}
</script>