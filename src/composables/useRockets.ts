import { ref } from 'vue'
import { fetchRockets as apiFetchRockets, fetchRocketById as apiFetchRocketById } from '../api/rocketApi'
import type { Rocket, NewRocketInput } from '../types/rocket'

const LOCAL_KEY = 'local_rockets'

function getLocalRockets(): Rocket[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const rockets = ref<Rocket[]>([])
const selectedRocket = ref<Rocket | null>(null)
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

export function useRockets() {
  const loadRockets = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await apiFetchRockets()
      const local = getLocalRockets()
      rockets.value = [...local, ...data]
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data roket.'
    } finally {
      loading.value = false
    }
  }

  const loadRocketById = async (id: string | number) => {
    const local = getLocalRockets()
    const existing = rockets.value.find(r => String(r.id) === String(id)) ||
                     local.find(r => String(r.id) === String(id))

    if (existing) {
      selectedRocket.value = existing
      error.value = null
      return
    }

    loading.value = true
    error.value = null
    selectedRocket.value = null
    try {
      const data = await apiFetchRocketById(id)
      selectedRocket.value = data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat detail roket.'
    } finally {
      loading.value = false
    }
  }

  const addRocket = (input: NewRocketInput) => {
    const newRocket: Rocket = {
      id: `local_${Date.now()}`,
      full_name: input.full_name,
      description: input.description,
      image_url: input.image_url || null,
      launch_cost: input.launch_cost || null,
      manufacturer: {
        country_code: input.country_code || null,
      },
      maiden_flight: input.maiden_flight || null,
      is_local: true,
    }

    const local = getLocalRockets()
    const updated = [newRocket, ...local]
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated))
    rockets.value = [newRocket, ...rockets.value]
  }

  return {
    rockets,
    selectedRocket,
    loading,
    error,
    loadRockets,
    loadRocketById,
    addRocket,
  }
}
