import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'
import { formatCurrency } from '../utils/formatCurrency'

const ActionButton = ({ label, icon: Icon = FaPlus }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center"
  >
    <div className="w-12 h-12 bg-[#CCFF00] rounded-full flex items-center justify-center mb-2">
      <Icon className="w-5 h-5 text-black" />
    </div>
    <span className="text-sm text-gray-400">{label}</span>
  </motion.button>
)

export default function Profile() {
  const actions = [
    { label: 'Add Funds' },
    { label: 'Swap' },
    { label: 'Off Ramp' },
    { label: 'Copy' },
  ]

  const topGainers = [
    { name: 'Christmas themed', percentage: 103.8 },
    { name: 'Yield optimizer', percentage: 39.7 },
    { name: 'Name service', percentage: 35.1 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6 space-y-6"
    >
      {/* Profile Header */}
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-800 rounded-full">
          <span className="text-3xl">👽</span>
        </div>
        <h1 className="text-xl font-bold">Memerizer</h1>
        <p className="text-sm text-gray-400">0x70...52d2</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between px-4">
        {actions.map((action) => (
          <ActionButton key={action.label} {...action} />
        ))}
      </div>

      {/* Portfolio Card */}
      <div className="bg-[#111] rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-bold">Portfolio</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-gray-400">P&L</p>
            <p className="font-bold text-green-400">{formatCurrency(100)} +34.5%</p>
          </div>
          <div>
            <p className="mb-1 text-gray-400">XIRR</p>
            <p className="font-bold text-green-400">+17.32%</p>
          </div>
          <div>
            <p className="mb-1 text-gray-400">Invested</p>
            <p className="font-bold">{formatCurrency(100)}</p>
          </div>
          <div>
            <p className="mb-1 text-gray-400">Current</p>
            <p className="font-bold">{formatCurrency(300)}</p>
          </div>
        </div>
      </div>

      {/* Top Gainers */}
      <div className="bg-[#111] rounded-xl p-4">
        <h2 className="mb-4 text-xl font-bold">Top Gainers</h2>
        <div className="space-y-3">
          {topGainers.map((gainer) => (
            <div key={gainer.name} className="flex items-center justify-between">
              <span className="text-gray-400">{gainer.name}</span>
              <span className="text-green-400">{gainer.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-[#111] rounded-xl p-4">
        <h2 className="mb-4 text-xl font-bold">Rewards</h2>
        <p className="mb-4 text-2xl font-bold">2230 points</p>
        <div className="flex justify-between text-sm text-gray-400">
          <div>
            <p>Refer Friends</p>
            <p className="font-mono text-white">DFG-EJY</p>
          </div>
          <div>
            <p>Daily Streak</p>
            <p className="text-white">🔥 3</p>
          </div>
          <div>
            <p>Bags Invested</p>
            <p className="text-white">💰 2</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}