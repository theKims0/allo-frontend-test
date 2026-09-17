<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
    >
      <div class="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
        <div>
          <h2 class="text-lg font-bold text-gray-900">Tambah Rocket Baru</h2>
          <p class="text-xs text-gray-500 mt-0.5">Tambahkan data roket baru ke daftar SpaceX</p>
        </div>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">
            Nama Rocket <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.full_name"
            type="text"
            placeholder="Contoh: Falcon Heavy Block 5"
            class="w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition focus:ring-2 focus:ring-orange-400"
            :class="errors.full_name ? 'border-red-400 bg-red-50/30' : 'border-gray-300 focus:border-orange-400'"
            @input="clearError('full_name')"
          />
          <p v-if="errors.full_name" class="text-xs text-red-500 mt-1 font-medium">
            {{ errors.full_name }}
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">
            Deskripsi <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Deskripsikan roket ini..."
            class="w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition focus:ring-2 focus:ring-orange-400 resize-y"
            :class="errors.description ? 'border-red-400 bg-red-50/30' : 'border-gray-300 focus:border-orange-400'"
            @input="clearError('description')"
          ></textarea>
          <p v-if="errors.description" class="text-xs text-red-500 mt-1 font-medium">
            {{ errors.description }}
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">
            URL Gambar <span class="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            v-model="form.image_url"
            type="url"
            placeholder="https://example.com/rocket.jpg"
            class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
          <p class="text-[11px] text-gray-400 mt-1">Gunakan tautan gambar langsung dari internet</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">
              Cost per Launch ($) <span class="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input
              v-model="form.launch_cost"
              type="number"
              min="0"
              placeholder="Contoh: 62000000"
              class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">
              Country Code <span class="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input
              v-model="form.country_code"
              type="text"
              placeholder="Contoh: USA"
              maxlength="10"
              class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 uppercase"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">
            First Flight <span class="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            v-model="form.maiden_flight"
            type="date"
            class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        <div class="flex gap-3 justify-end pt-3 border-t border-gray-100">
          <button
            type="button"
            class="px-4 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            @click="emit('close')"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 text-sm font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-xs hover:shadow transition cursor-pointer"
          >
            Simpan Rocket
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRockets } from '../composables/useRockets'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addRocket } = useRockets()

const form = reactive({
  full_name: '',
  description: '',
  image_url: '',
  launch_cost: '',
  country_code: '',
  maiden_flight: '',
})

const errors = reactive<{
  full_name?: string
  description?: string
}>({})

const clearError = (field: 'full_name' | 'description') => {
  delete errors[field]
}

const validate = () => {
  let valid = true
  if (!form.full_name.trim()) {
    errors.full_name = 'Nama rocket wajib diisi'
    valid = false
  }
  if (!form.description.trim()) {
    errors.description = 'Deskripsi wajib diisi'
    valid = false
  }
  return valid
}

const handleSubmit = () => {
  if (!validate()) return

  addRocket({
    full_name: form.full_name.trim(),
    description: form.description.trim(),
    image_url: form.image_url.trim() || null,
    launch_cost: form.launch_cost ? Number(form.launch_cost) : null,
    country_code: form.country_code.trim() || null,
    maiden_flight: form.maiden_flight || null,
  })

  emit('close')
}
</script>
