// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],

  // i18n configuration
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kk'],
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts'
  },

  // Content configuration
  content: {
    watch: {
      enabled: false
    }
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },

  // Development server configuration
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  // Runtime config
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000/api'
    }
  }
})
