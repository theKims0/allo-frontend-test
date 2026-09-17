import type { Rocket } from '../types/rocket'

const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0'

export async function fetchRockets(): Promise<Rocket[]> {
  const res = await fetch(`${BASE_URL}/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`)
  if (!res.ok) {
    throw new Error(`Gagal memuat daftar roket (${res.status})`)
  }
  const data = await res.json()
  return data.results as Rocket[]
}

export async function fetchRocketById(id: string | number): Promise<Rocket> {
  const res = await fetch(`${BASE_URL}/config/launcher/${id}/`)
  if (!res.ok) {
    throw new Error(`Gagal memuat detail roket (${res.status})`)
  }
  const data = await res.json()
  return data as Rocket
}
