import { createContext, useContext, useState, useEffect } from 'react'
import { fetchRockets, fetchRocketById } from '../api/rocketApi'

const RocketContext = createContext(null)

const LOCAL_KEY = 'local_rockets'

function getLocalRockets() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []
  } catch {
    return []
  }
}

export function RocketProvider({ children }) {
  const [rockets, setRockets] = useState([])
  const [rocketDetail, setRocketDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadRockets = () => {
    setLoading(true)
    setError(null)
    fetchRockets()
      .then(data => {
        const localRockets = getLocalRockets()
       
        setRockets([...localRockets, ...data])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const loadRocketById = (id) => {
    
    const existing = rockets.find(r => String(r.id) === String(id))
    if (existing) {
      setRocketDetail(existing)
      return
    }

    setLoading(true)
    setError(null)
    setRocketDetail(null)
    fetchRocketById(id)
      .then(data => setRocketDetail(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadRockets() }, [])

  const addRocket = (newRocket) => {
    const rocket = {
      ...newRocket,
      id: `local_${Date.now()}`,  
      isLocal: true,              
    }

    const localRockets = getLocalRockets()
    localStorage.setItem(LOCAL_KEY, JSON.stringify([rocket, ...localRockets]))

    setRockets(prev => [rocket, ...prev])
  }

  return (
    <RocketContext.Provider value={{
      rockets, rocketDetail, loading, error,
      retry: loadRockets, addRocket, loadRocketById,
    }}>
      {children}
    </RocketContext.Provider>
  )
}

export function useRockets() {
  return useContext(RocketContext)
}