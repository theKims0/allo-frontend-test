<template>
  <div class="h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-200 overflow-hidden cursor-pointer group">
    <div class="w-full h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
      <img
        v-if="rocket.image_url"
        :src="rocket.image_url"
        :alt="rocket.full_name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError"
      />
      <div v-else class="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
        <svg class="w-10 h-10 mb-1 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
        <span class="text-xs font-medium">Gambar tidak tersedia</span>
      </div>

      <span
        v-if="rocket.is_local"
        class="absolute top-2.5 right-2.5 bg-orange-500/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs"
      >
        Lokal
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-bold text-base text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
        {{ rocket.full_name }}
      </h3>
      <p class="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed flex-1">
        {{ rocket.description || 'Deskripsi tidak tersedia untuk roket ini.' }}
      </p>

      <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Detail Roket</span>
        <span class="text-orange-500 font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rocket } from '../types/rocket'

const props = defineProps<{
  rocket: Rocket
}>()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}
</script>
