
## 🚀 План SEO-оптимизации для businessqoldau.kz

### ✅ Статус реализации

**Выполнено (2025-10-02):**
- ✅ Установлены SEO модули (@nuxtjs/sitemap, @nuxtjs/robots)
- ✅ Настроен nuxt.config.ts с SEO конфигурацией
- ✅ Создан composable useStructuredData.ts для JSON-LD
- ✅ Создан robots.txt с правилами индексации
- ✅ Обновлена главная страница с SEO meta-тегами и структурированными данными
- ✅ Создана страница 404 (error.vue) с SEO
- ✅ Протестировано: все meta-теги, Open Graph, JSON-LD, sitemap работают

**В процессе:**
- ⏳ Создание OG изображения (og-image.jpg)
- ⏳ Добавление SEO на остальные страницы (/how-to-apply, /contacts, /terms, /privacy)
- ⏳ Оптимизация изображений
- ⏳ Настройка Google Search Console

---

### 1. Создание sitemap.xml ✅

Реализовано с помощью @nuxtjs/sitemap модуля.

Конфигурация Nuxt с SEO модулями:

```typescript:nuxt.config.ts
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
    vueI18n: './i18n.config.ts',
    seo: true
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
    name: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана',
    description: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025!',
    defaultLocale: 'ru'
  },

  // Sitemap configuration
  sitemap: {
    hostname: 'https://businessqoldau.kz',
    gzip: true,
    routes: [
      '/',
      '/how-to-apply',
      '/terms',
      '/contacts',
      '/privacy',
      '/login'
    ]
  },

  // Robots configuration
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://businessqoldau.kz/sitemap.xml'
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана',
      meta: [
        { name: 'description', content: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025!' },
        { name: 'keywords', content: 'бизнес конкурс, qoldau, бизнес camp, предприниматели казахстан, грант, призовой фонд, стартап, бизнес план' },
        { name: 'author', content: 'Бизнес Camp 2025' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана' },
        { property: 'og:description', content: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025!' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://businessqoldau.kz' },
        { property: 'og:site_name', content: 'Бизнес Camp 2025' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:locale:alternate', content: 'kk_KZ' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана' },
        { name: 'twitter:description', content: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025!' }
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
      baseUrl: process.env.BASE_URL || 'https://businessqoldau.kz',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://businessqoldau.kz/api'
    }
  }
})
```

### 2. Улучшение robots.txt ✅

Реализовано в `public/robots.txt`.

```txt:public/robots.txt
User-Agent: *
Allow: /

# Sitemap
Sitemap: https://businessqoldau.kz/sitemap.xml

# Disallow admin and API routes
Disallow: /admin
Disallow: /api/
Disallow: /_nuxt/
Disallow: /uploads/

# Allow important pages
Allow: /
Allow: /how-to-apply
Allow: /terms
Allow: /contacts
Allow: /privacy
Allow: /login
```

### 3. Создание структурированных данных (JSON-LD) ✅

Реализовано в `composables/useStructuredData.ts`.

Composable для структурированных данных:

```typescript:composables/useStructuredData.ts
export const useStructuredData = () => {
  const getOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Бизнес Camp 2025",
      "alternateName": "Business Qoldau",
      "url": "https://businessqoldau.kz",
      "logo": "https://businessqoldau.kz/logo.png",
      "description": "Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Алматы",
        "addressCountry": "KZ"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-XXX-XXX-XX-XX",
        "contactType": "customer service",
        "email": "info@businesscamp.kz"
      },
      "sameAs": [
        "https://businessqoldau.kz"
      ]
    }
  }

  const getEventSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Бизнес Camp 2025",
      "description": "Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге",
      "url": "https://businessqoldau.kz",
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://businessqoldau.kz"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Бизнес Camp 2025",
        "url": "https://businessqoldau.kz"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KZT",
        "availability": "https://schema.org/InStock",
        "url": "https://businessqoldau.kz/how-to-apply"
      }
    }
  }

  const getWebSiteSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Бизнес Camp 2025",
      "alternateName": "Business Qoldau",
      "url": "https://businessqoldau.kz",
      "description": "Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге",
      "inLanguage": ["ru", "kk"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://businessqoldau.kz/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  }

  return {
    getOrganizationSchema,
    getEventSchema,
    getWebSiteSchema
  }
}
```

### 4. Обновление главной страницы с улучшенным SEO ✅

Реализовано в `pages/index.vue`.

```vue:pages/index.vue
<template>
  <div class="overflow-hidden">
    <!-- JSON-LD Structured Data -->
    <Head>
      <script type="application/ld+json" v-html="JSON.stringify(organizationSchema)"></script>
      <script type="application/ld+json" v-html="JSON.stringify(eventSchema)"></script>
      <script type="application/ld+json" v-html="JSON.stringify(webSiteSchema)"></script>
    </Head>

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
              <span class="text-sm font-semibold">Конкурс 2025</span>
            </div>

            <h1 class="mb-6 leading-tight">
              {{ $t('home.title') }}
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              {{ $t('home.subtitle') }}
            </p>

            <!-- Application Period -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
              <!-- ... existing content ... -->
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink 
                to="/how-to-apply" 
                class="btn-primary btn-lg group"
                aria-label="Подать заявку на участие в конкурсе Бизнес Camp 2025"
              >
                {{ $t('home.applyButton') }}
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
              <NuxtLink 
                to="/contacts" 
                class="btn-secondary btn-lg"
                aria-label="Связаться с нами для получения дополнительной информации"
              >
                {{ $t('home.learnMore') }}
              </NuxtLink>
            </div>
          </div>

          <!-- ... rest of existing content ... -->
        </div>
      </div>
    </section>

    <!-- ... rest of existing content ... -->
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
  title: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана | Qoldau',
  description: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025! Получите финансирование, менторство и возможность развить свой бизнес.',
  keywords: 'бизнес конкурс, qoldau, бизнес camp, предприниматели казахстан, грант, призовой фонд, стартап, бизнес план, конкурс 2025, финансирование бизнеса',
  ogTitle: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана',
  ogDescription: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025!',
  ogImage: 'https://businessqoldau.kz/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана',
  twitterDescription: 'Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025!',
  twitterImage: 'https://businessqoldau.kz/og-image.jpg'
})

// Additional head tags
useHead({
  link: [
    { rel: 'canonical', href: 'https://businessqoldau.kz' },
    { rel: 'alternate', hreflang: 'ru', href: 'https://businessqoldau.kz' },
    { rel: 'alternate', hreflang: 'kk', href: 'https://businessqoldau.kz' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://businessqoldau.kz' }
  ]
})
</script>
```

### 5. Установка необходимых пакетов ✅

**Выполнено:**

```bash
npm install @nuxtjs/sitemap @nuxtjs/robots
```

Пакеты установлены и настроены в nuxt.config.ts.

### 6. Создание файла .htaccess для Apache (если используется)

```apache:public/.htaccess
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect www to non-www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

### 7. Создание файла для Google Search Console

Создайте файл `public/google-site-verification.html` с кодом верификации от Google Search Console.

### 8. Обновление локализации с SEO-ключевыми словами

```json:i18n/locales/ru.json
{
  "nav": {
    "home": "Главная",
    "howToApply": "Как подать заявку",
    "terms": "Правила",
    "contacts": "Контакты",
    "privacy": "Политика конфиденциальности",
    "login": "Войти",
    "register": "Регистрация",
    "cabinet": "Личный кабинет",
    "logout": "Выйти"
  },
  "home": {
    "title": "Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана",
    "subtitle": "Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге",
    "applyButton": "Подать заявку",
    "learnMore": "Подробнее",
    "metaTitle": "Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана | Qoldau",
    "metaDescription": "Конкурс для предпринимателей Казахстана с призовым фондом 10 млн тенге. Подайте заявку на участие в Бизнес Camp 2025! Получите финансирование, менторство и возможность развить свой бизнес."
  },
  "footer": {
    "copyright": "© 2025 Бизнес Camp. Все права защищены."
  },
  "forms": {
    "name": "Имя",
    "email": "Email",
    "phone": "Телефон",
    "city": "Город",
    "message": "Сообщение",
    "submit": "Отправить",
    "save": "Сохранить",
    "cancel": "Отмена"
  }
}
```

### 9. Создание страницы 404 с SEO ✅

Реализовано в `error.vue`.

```vue:error.vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <h1 class="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Страница не найдена</h2>
      <p class="text-gray-600 mb-8">К сожалению, запрашиваемая страница не существует.</p>
      <NuxtLink to="/" class="btn-primary">
        Вернуться на главную
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO for 404 page
useSeoMeta({
  title: '404 - Страница не найдена | Бизнес Camp 2025',
  description: 'Страница не найдена. Вернитесь на главную страницу Бизнес Camp 2025 - конкурса для предпринимателей Казахстана.',
  robots: 'noindex, nofollow'
})
</script>
```

## 🎯 Дополнительные рекомендации для быстрой индексации:

1. **Отправьте sitemap в Google Search Console:** ⏳
   - Зайдите в Google Search Console
   - Добавьте свой сайт
   - Отправьте sitemap: `https://businessqoldau.kz/sitemap.xml`

2. **Создайте обратные ссылки:** ⏳
   - Разместите информацию о конкурсе в социальных сетях
   - Опубликуйте пресс-релизы
   - Создайте профили в бизнес-каталогах Казахстана

3. **Локальное SEO:** ✅ (частично)
   - ✅ Указан город (Алматы) в Schema.org данных
   - ✅ Добавлена информация о Казахстане в описания

4. **Контент-маркетинг:** ⏳
   - Создайте блог с полезными статьями для предпринимателей
   - Добавьте FAQ страницу с популярными вопросами

5. **Техническая оптимизация:** ⏳
   - Убедитесь, что сайт быстро загружается
   - Оптимизируйте изображения
   - Используйте CDN если возможно

---

## 📊 Результаты тестирования (2025-10-02)

**✅ Протестировано в dev режиме:**
- Title: "Бизнес Camp 2025 - Конкурс для предпринимателей Казахстана | Qoldau"
- Meta description с ключевыми словами "qoldau", "бизнес camp"
- Keywords: бизнес конкурс, qoldau, грант, призовой фонд, стартап
- Open Graph теги корректно установлены (og:title, og:description, og:image)
- Twitter Card теги присутствуют
- 3 JSON-LD схемы добавлены (Organization, Event, WebSite)
- Sitemap генерируется автоматически для всех страниц
- Robots.txt доступен и настроен
- Canonical URL и hreflang установлены

**Следующие шаги:**
1. Создать OG изображение (og-image.jpg) для социальных сетей
2. Добавить SEO meta-теги на остальные страницы
3. Оптимизировать существующие изображения
4. Протестировать на production после деплоя
5. Отправить sitemap в Google Search Console

После внесения этих изменений ваш сайт будет гораздо лучше индексироваться поисковыми системами, особенно по запросам "qoldau" и "бизнес qoldau"!