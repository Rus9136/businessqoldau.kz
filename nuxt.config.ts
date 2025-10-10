// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
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

  // SEO Configuration
  site: {
    url: 'https://businessqoldau.kz',
    name: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана',
    description: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025!',
    defaultLocale: 'ru'
  },

  // Sitemap configuration
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  // Robots configuration
  robots: {
    rules: [
      {
        UserAgent: '*',
        Allow: '/',
        Disallow: ['/admin', '/api/', '/_nuxt/', '/uploads/']
      }
    ]
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана',
      meta: [
        { name: 'description', content: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025!' },
        { name: 'keywords', content: 'бизнес грант, qoldau, business qoldau, предприниматели казахстан, грант, призовой фонд, стартап, бизнес план, конкурс грант 2025' },
        { name: 'author', content: 'Business Qoldau 2025' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана' },
        { property: 'og:description', content: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025!' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://businessqoldau.kz' },
        { property: 'og:site_name', content: 'Business Qoldau 2025' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:locale:alternate', content: 'kk_KZ' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Инновационный грант Business Qoldau 2025 - Грант для предпринимателей Казахстана' },
        { name: 'twitter:description', content: 'Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Business Qoldau 2025!' }
      ],
      link: [
        { rel: 'canonical', href: 'https://businessqoldau.kz' },
        { rel: 'alternate', hreflang: 'ru', href: 'https://businessqoldau.kz' },
        { rel: 'alternate', hreflang: 'kk', href: 'https://businessqoldau.kz' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://businessqoldau.kz' }
      ]
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
