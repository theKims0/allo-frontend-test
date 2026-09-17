<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />

    <main class="max-w-5xl w-full mx-auto px-6 py-8 flex-1">
      <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-8">
        <div class="relative flex-1 max-w-md">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="query"
            type="text"
            placeholder="Cari roket berdasarkan nama..."
            class="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl outline-none shadow-2xs focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold rounded-xl shadow-2xs hover:shadow transition cursor-pointer"
          @click="showModal = true"
        >
          <span class="text-base leading-none">+</span>
          <span>Tambah Rocket</span>
        </button>
      </div>

      <div v-if="loading && rockets.length === 0" class="py-16">
        <Spinner text="Sedang memuat data roket SpaceX..." />
      </div>

      <div
        v-else-if="error && rockets.length === 0"
        class="bg-white border border-red-200 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-xs my-8"
      >
        <div class="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-base font-bold text-gray-900 mb-1">Gagal Memuat Data</h2>
        <p class="text-xs text-red-600 mb-5 leading-relaxed">{{ error }}</p>
        <button
          type="button"
          class="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-xs transition cursor-pointer"
          @click="loadRockets"
        >
          Coba Lagi
        </button>
      </div>

      <div v-else>
        <div
          v-if="filteredRockets.length === 0"
          class="bg-white border border-dashed border-gray-300 rounded-2xl py-16 text-center text-gray-500 my-4"
        >
          <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm font-medium text-gray-600">Tidak ada roket yang cocok dengan "{{ query }}".</p>
          <button
            v-if="query"
            type="button"
            class="mt-3 text-xs text-orange-500 hover:text-orange-600 font-semibold underline cursor-pointer"
            @click="query = ''"
          >
            Reset Pencarian
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <router-link
            v-for="rocket in filteredRockets"
            :key="rocket.id"
            :to="`/rocket/${rocket.id}`"
            class="block focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-xl"
          >
            <RocketCard :rocket="rocket" />
          </router-link>
        </div>
      </div>
    </main>

    <AddRocketModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Header from '../components/Header.vue'
import RocketCard from '../components/RocketCard.vue'
import Spinner from '../components/Spinner.vue'
import AddRocketModal from '../components/AddRocketModal.vue'
import { useRockets } from '../composables/useRockets'

const query = ref('')
const showModal = ref(false)

const { rockets, loading, error, loadRockets } = useRockets()

onMounted(() => {
  if (rockets.value.length === 0) {
    loadRockets()
  }
})

const filteredRockets = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return rockets.value
  return rockets.value.filter(r => (r.full_name || '').toLowerCase().includes(q))
})
</script>
