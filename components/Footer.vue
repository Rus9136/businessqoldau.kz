<template>
  <footer class="bg-gray-900 text-white py-12 mt-auto">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-xl font-bold mb-4">Бизнес Camp</h3>
          <p class="text-gray-400">
            Конкурс для предпринимателей Казахстана
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold mb-4">Навигация</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                {{ $t('nav.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/how-to-apply" class="text-gray-400 hover:text-white transition-colors">
                {{ $t('nav.howToApply') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-gray-400 hover:text-white transition-colors">
                {{ $t('nav.terms') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacts" class="text-gray-400 hover:text-white transition-colors">
                {{ $t('nav.contacts') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-gray-400 hover:text-white transition-colors">
                {{ $t('nav.privacy') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold mb-4">{{ $t('nav.contacts') }}</h4>
          <p class="text-gray-400">
            Email: info@businesscamp.kz<br>
            Телефон: +7 (XXX) XXX-XX-XX
          </p>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>