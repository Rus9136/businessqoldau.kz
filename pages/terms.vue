<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <h1 class="mb-8">Правила участия</h1>
        <div class="prose prose-lg max-w-none">
          <ContentDoc path="/terms" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Правила участия - Бизнес Camp 2025',
  description: 'Правила участия в конкурсе для предпринимателей',
})
</script>