<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <h1 class="mb-8">{{ $t('privacy.title') }}</h1>
        <div class="prose prose-lg max-w-none">
          <ContentDoc path="/privacy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('privacy.metaTitle'),
  description: t('privacy.metaDescription'),
})
</script>