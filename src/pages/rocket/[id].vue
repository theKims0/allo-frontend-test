<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />

    <main class="max-w-3xl w-full mx-auto px-6 py-8 flex-1">
      <router-link
        to="/"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 transition mb-6 group"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span>
        <span>Kembali ke daftar roket</span>
      </router-link>

      <div v-if="loading" class="py-16">
        <Spinner text="Sedang memuat detail roket..." />
      </div>

      <div
        v-else-if="error"
        class="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-xs my-8"
      >
        <div class="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-base font-bold text-gray-900 mb-1">Gagal Memuat Detail Roket</h2>
        <p class="text-xs text-red-600 mb-5 leading-relaxed">{{ error }}</p>
        <button
          type="button"
          class="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-xs transition cursor-pointer"
          @click="fetchDetail"
        >
          Coba Lagi
        </button>
      </div>

      <div
        v-else-if="!rocket"
        class="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xs my-8"
      >
        <p class="text-gray-500 text-sm mb-4">Roket dengan ID ini tidak ditemukan.</p>
        <router-link
          to="/"
          class="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg inline-block"
        >
          Kembali ke Beranda
        </router-link>
      </div>

      <div
        v-else
        class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs animate-in fade-in duration-300"
      >
        <div class="w-full aspect-video sm:aspect-21/9 bg-gray-100 flex items-center justify-center relative overflow-hidden">
          <img
            v-if="rocket.image_url"
            :src="rocket.image_url"
            :alt="rocket.full_name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div v-else class="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
            <svg class="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <span class="text-sm font-medium">Gambar tidak tersedia</span>
          </div>

          <span
            v-if="rocket.is_local"
            class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
          >
            Roket Buatan Pengguna
          </span>
        </div>

        <div class="p-6 sm:p-8">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            {{ rocket.full_name }}
          </h1>

          <p class="text-gray-600 leading-relaxed text-sm sm:text-base mb-8 whitespace-pre-line">
            {{ rocket.description || 'Deskripsi tidak tersedia untuk roket ini.' }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
            <div class="p-4 sm:p-5">
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Cost per Launch
              </p>
              <p class="text-sm sm:text-base font-semibold text-gray-900">
                <span v-if="rocket.launch_cost">
                  ${{ Number(rocket.launch_cost).toLocaleString() }}
                </span>
                <span v-else class="text-gray-400 font-normal">Data tidak tersedia</span>
              </p>
            </div>

            <div class="p-4 sm:p-5">
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Country
              </p>
              <p class="text-sm sm:text-base font-semibold text-gray-900">
                <span v-if="rocket.manufacturer?.country_code">
                  {{ rocket.manufacturer.country_code }}
                </span>
                <span v-else class="text-gray-400 font-normal">—</span>
              </p>
            </div>

            <div class="p-4 sm:p-5">
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                First Flight
              </p>
              <p class="text-sm sm:text-base font-semibold text-gray-900">
                <span v-if="rocket.maiden_flight">
                  {{ rocket.maiden_flight }}
                </span>
                <span v-else class="text-gray-400 font-normal">—</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../../components/Header.vue'
import Spinner from '../../components/Spinner.vue'
import { useRockets } from '../../composables/useRockets'

const route = useRoute()
const { selectedRocket: rocket, loading, error, loadRocketById } = useRockets()

const fetchDetail = () => {
  const id = route.params.id as string
  if (id) {
    loadRocketById(id)
  }
}

onMounted(() => {
  fetchDetail()
})

watch(() => route.params.id, () => {
  fetchDetail()
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}
</script>
