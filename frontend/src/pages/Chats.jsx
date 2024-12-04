import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const mockChats = [
  { id: 1, name: 'AI Assistant', lastMessage: 'How can I help you with your investments today?', time: '10:30 AM' },
  { id: 2, name: 'Market Updates', lastMessage: 'Bitcoin price surges 5% in the last hour!', time: '11:45 AM' },
  { id: 3, name: 'Portfolio Alerts', lastMessage: 'Your ETH holdings have increased by 3.2%', time: '12:15 PM' },
  { id: 4, name: 'Support Team', lastMessage: 'Your ticket has been resolved. Is there anything else we can help with?', time: '2:00 PM' },
];

export default function Chats() {
  const { isDarkMode } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6 space-y-6"
    >
      <h1 className="mb-4 text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Chats</h1>
      <div className="space-y-4">
        {mockChats.map((chat) => (
          <motion.div
            key={chat.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl shadow-light-soft dark:shadow-dark-soft ${
              isDarkMode ? 'bg-background-dark-secondary' : 'bg-background-light-secondary'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-text-light-primary dark:text-text-dark-primary">{chat.name}</h2>
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{chat.time}</span>
            </div>
            <p className="truncate text-text-light-secondary dark:text-text-dark-secondary">{chat.lastMessage}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}