// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/supabase'
  ],

  // i18n configuration
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kk']
  },

  // Supabase configuration
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/how-to-apply', '/terms', '/contacts', '/privacy']
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
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    }
  }
})
