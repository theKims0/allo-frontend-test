<template>
  <div class="flex flex-col justify-center items-center py-24 gap-3">
    <div class="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
    <p v-if="text" class="text-sm font-medium text-gray-500">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>
