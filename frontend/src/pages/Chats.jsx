import { motion } from 'framer-motion'

export default function Chats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <p className="text-gray-400">No messages yet</p>
    </motion.div>
  )
}

