import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/formatCurrency'

export default function Home() {
  const portfolios = [
    { name: 'Crypto Index', price: 2.79, change: 5.2 },
    { name: 'Infra Index', price: 1.45, change: -2.1 },
    { name: 'Meme Index', price: 0.89, change: 12.7 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text">
        Ton 🤑
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {portfolios.map((portfolio) => (
          <motion.div
            key={portfolio.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#111] p-6 rounded-xl"
          >
            <h3 className="mb-2 text-xl font-bold">{portfolio.name}</h3>
            <p className="mb-2 text-3xl font-bold">{formatCurrency(portfolio.price)}</p>
            <p className={`text-lg font-semibold ${
              portfolio.change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {portfolio.change >= 0 ? '+' : ''}{portfolio.change}%
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}