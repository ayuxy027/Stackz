import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <motion.button
      className="p-2 text-gray-800 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-200"
      onClick={toggleDarkMode}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 17 }}
    >
      {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
    </motion.button>
  )
}

