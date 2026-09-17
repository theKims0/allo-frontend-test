const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0'

export function fetchRockets() {
  return fetch(`${BASE_URL}/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return res.json()
    })
    .then(data => data.results)
}

export function fetchRocketById(id) {
  return fetch(`${BASE_URL}/config/launcher/${id}/`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return res.json()
    })
}
