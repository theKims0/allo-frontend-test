export interface Manufacturer {
  country_code: string | null
}

export interface Rocket {
  id: number | string
  full_name: string
  description: string | null
  image_url: string | null
  launch_cost: string | number | null
  manufacturer?: Manufacturer | null
  maiden_flight: string | null
  is_local?: boolean
}

export interface NewRocketInput {
  full_name: string
  description: string
  image_url?: string | null
  launch_cost?: string | number | null
  country_code?: string | null
  maiden_flight?: string | null
}
