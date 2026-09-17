import { useState } from 'react'
import { useRockets } from '../context/RocketContext'

function AddRocketModal({ onClose }) {
    const { addRocket } = useRockets()

    const [form, setForm] = useState({
        full_name: '',
        description: '',
        image_url: '',
        launch_cost: '',
        country_code: '',
        maiden_flight: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.full_name.trim()) newErrors.full_name = 'Nama rocket wajib diisi'
        if (!form.description.trim()) newErrors.description = 'Deskripsi wajib diisi'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        addRocket({
            full_name: form.full_name.trim(),
            description: form.description.trim(),
            image_url: form.image_url.trim() || null,
            launch_cost: form.launch_cost || null,
            manufacturer: {
                country_code: form.country_code.trim() || null,
            },
            maiden_flight: form.maiden_flight || null,
        })

        onClose()
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
             
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-semibold text-gray-900">Tambah Rocket Baru</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl bg-transparent border-none cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Nama Rocket *
                        </label>
                        <input
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            placeholder="Contoh: Falcon Heavy Block 5"
                            className={`w-full px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-orange-400 ${errors.full_name ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.full_name && (
                            <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
                        )}
                    </div>

                   
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Deskripsi *
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Deskripsikan rocket ini..."
                            rows={3}
                            className={`w-full px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-orange-400 resize-y ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                        )}
                    </div>

                    
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            URL Gambar (opsional)
                        </label>
                        <input
                            name="image_url"
                            value={form.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/rocket.jpg"
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">Paste URL gambar dari internet</p>
                    </div>

                   
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Cost per Launch (opsional)
                            </label>
                            <input
                                name="launch_cost"
                                type="number"
                                value={form.launch_cost}
                                onChange={handleChange}
                                placeholder="62000000"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Country Code (opsional)
                            </label>
                            <input
                                name="country_code"
                                value={form.country_code}
                                onChange={handleChange}
                                placeholder="USA"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* First Flight */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            First Flight (opsional)
                        </label>
                        <input
                            name="maiden_flight"
                            type="date"
                            value={form.maiden_flight}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                 
                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold cursor-pointer border-none"
                        >
                            Simpan Rocket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRocketModal
