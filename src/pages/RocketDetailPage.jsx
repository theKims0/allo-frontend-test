import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRockets } from "../context/RocketContext";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

function RocketDetailPage() {
    const { id } = useParams();
    const { rocketDetail: rocket, loading, error, loadRocketById } = useRockets();

    useEffect(() => {
        loadRocketById(id);
    }, [id]);

    if (loading || !rocket) return <Spinner />;

    if (error) return (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <p className="text-red-500">Error: {error}</p>
            <button
                onClick={() => loadRocketById(id)}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
            >
                Coba Lagi
            </button>
        </div>
    );

    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto px-6 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6"
                >
                    ← Kembali ke daftar roket
                </Link>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                        {rocket.image_url ? (
                            <img
                                src={rocket.image_url}
                                alt={rocket.full_name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm text-gray-400">Gambar tidak tersedia</span>
                        )}
                    </div>

                    <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                            {rocket.full_name}
                        </h1>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {rocket.description || 'Deskripsi tidak tersedia untuk roket ini.'}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                                    Cost per Launch
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {rocket.launch_cost
                                        ? `$${Number(rocket.launch_cost).toLocaleString()}`
                                        : <span className="text-gray-400 font-normal">Data tidak tersedia</span>}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                                    Country
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {rocket.manufacturer?.country_code
                                        ?? <span className="text-gray-400 font-normal">—</span>}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                                    Maiden Flight
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {rocket.maiden_flight
                                        ?? <span className="text-gray-400 font-normal">—</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RocketDetailPage;