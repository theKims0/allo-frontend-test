import { useState } from 'react'
import Header from '../components/Header'
import RocketCard from '../components/RocketCard'
import Spinner from '../components/Spinner'
import AddRocketModal from '../components/AddRocketModal'
import { useRockets } from '../context/RocketContext'
import { Link } from 'react-router-dom'

function RocketListPage() {
    const [query, setQuery] = useState('')
    const [showModal, setShowModal] = useState(false)
    const { rockets, loading, error, retry } = useRockets()

    const filtered = rockets.filter(r =>
        r.full_name.toLowerCase().includes(query.toLowerCase())
    )

    if (loading) return <Spinner />

    if (error) return (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <p className="text-red-500">Error: {error}</p>
            <button
                onClick={retry}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
            >
                Coba Lagi
            </button>
        </div>
    )

    return (
        <>
            <Header />

            <div className="max-w-5xl mx-auto px-6 py-6">
                <div className="flex gap-3 items-center mb-6">
                    <input
                        type="text"
                        placeholder="Cari rocket..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 max-w-sm px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg whitespace-nowrap"
                    >
                        + Tambah Rocket
                    </button>
                </div>

                {filtered.length === 0 ? (
                    <p className="text-gray-400 text-center mt-12">Tidak ada rocket ditemukan.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                        {filtered.map((rocket) => (
                            <Link to={`/rocket/${rocket.id}`} key={rocket.id}>
                                <RocketCard rocket={rocket} />
                            </Link>
                        ))}
                    </ul>
                )}
            </div>

            {showModal && <AddRocketModal onClose={() => setShowModal(false)} />}
        </>
    )
}

export default RocketListPage