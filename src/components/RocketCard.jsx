function RocketCard({ rocket }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition cursor-pointer">
      <img src={rocket.image_url} alt={rocket.full_name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lg">{rocket.full_name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{rocket.description}</p>
    </div>
  )
}
export default RocketCard;