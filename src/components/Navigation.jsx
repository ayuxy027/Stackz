import { useState } from 'react'
import { Home, PieChart, Repeat, Star, User } from 'lucide-react'

const navItems = [
  { name: 'Home', icon: Home },
  { name: 'Portfolio', icon: PieChart },
  { name: 'SIPs', icon: Repeat },
  { name: 'Watchlist', icon: Star },
  { name: 'Profile', icon: User },
]

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <nav className="flex items-center justify-between p-2 mt-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveTab(item.name)}
          className={`flex flex-col items-center p-2 rounded-md transition-all duration-200 ${
            activeTab === item.name
              ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md scale-105'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <item.icon className="w-6 h-6 mb-1" />
          <span className="text-xs">{item.name}</span>
        </button>
      ))}
    </nav>
  )
}

