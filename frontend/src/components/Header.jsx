import { useState } from 'react'
import { Search, Moon, Sun } from 'lucide-react'

export default function Header({ isDarkMode, toggleDarkMode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white backdrop-blur-md bg-opacity-70 dark:bg-opacity-70 dark:bg-gray-900">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text animate-pulse">
          Ton 🤑
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Search className="w-6 h-6" />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search..."
                className="absolute right-0 p-2 mt-2 bg-white border border-gray-300 rounded-md top-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

