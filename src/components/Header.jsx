function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          <h1 className="text-lg font-semibold text-gray-900">Rocket Explorer</h1>
        </div>
        <p className="text-xs font-mono text-gray-400 tracking-wide">
          SPACEX FLEET
        </p>
      </div>
    </header>
  )
}

export default Header