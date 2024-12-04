import { motion } from 'framer-motion'
import { FaPlus, FaExchangeAlt, FaMoneyBillWave, FaCopy } from 'react-icons/fa'
import { formatCurrency } from '../utils/formatCurrency'
import { useTheme } from '../contexts/ThemeContext'

const ActionButton = ({ label, icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center"
  >
    <div className="flex items-center justify-center mb-2 rounded-full shadow-lg w-14 h-14 bg-neon">
      <Icon className="w-6 h-6 text-background-dark-primary" />
    </div>
    <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{label}</span>
  </motion.button>
)

const StatCard = ({ label, value, change }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 bg-background-light-secondary dark:bg-background-dark-secondary rounded-xl shadow-light-soft dark:shadow-dark-soft"
  >
    <h3 className="mb-1 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">{label}</h3>
    <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{value}</p>
    {change && (
      <p className={`text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </p>
    )}
  </motion.div>
)

export default function Profile() {
  const { isDarkMode } = useTheme()

  const actions = [
    { label: 'Add Funds', icon: FaPlus },
    { label: 'Swap', icon: FaExchangeAlt },
    { label: 'Copy', icon: FaCopy },
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
      className="p-6 space-y-8"
    >
      {/* Profile Header */}
      <motion.div 
        className="space-y-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full shadow-xl bg-gradient-to-br from-primary to-secondary">
          <span className="text-4xl">🍌</span>
        </div>
        <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Ayush Yadav</h1>
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">0x70...52d2</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex justify-between px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {actions.map((action, index) => (
          <ActionButton key={action.label} {...action} />
        ))}
      </motion.div>

      {/* Portfolio Stats */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* <StatCard label="P&L" value={formatCurrency(100)} change={34.5} />
        <StatCard label="XIRR" value="17.32%" change={17.32} /> */}
        <StatCard label="Invested" value={formatCurrency(100)} />
        <StatCard label="Current" value={formatCurrency(300)} />
      </motion.div>

      {/* Top Gainers */}
      <motion.div 
        className="p-6 bg-background-light-secondary dark:bg-background-dark-secondary rounded-xl shadow-light-soft dark:shadow-dark-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="mb-4 text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Top Gainers</h2>
        <div className="space-y-4">
          {topGainers.map((gainer) => (
            <motion.div 
              key={gainer.name} 
              className="flex items-center justify-between"
              whileHover={{ x: 5 }}
            >
              <span className="text-text-light-secondary dark:text-text-dark-secondary">{gainer.name}</span>
              <span className="font-semibold text-green-400">+{gainer.percentage}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rewards Section */}
      <motion.div 
        className="p-6 bg-background-light-secondary dark:bg-background-dark-secondary rounded-xl shadow-light-soft dark:shadow-dark-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h2 className="mb-4 text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Rewards</h2>
        <div className="flex items-center justify-between mb-6">
          <p className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">2230</p>
          <div className="px-3 py-1 text-sm font-semibold rounded-full bg-neon text-background-dark-primary">
            Points
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="mb-1 text-text-light-secondary dark:text-text-dark-secondary">Refer Friends</p>
            <p className="px-2 py-1 font-mono rounded text-text-light-primary dark:text-text-dark-primary bg-background-light-accent dark:bg-background-dark-accent">DFG-EJY</p>
          </div>
          <div>
            <p className="mb-1 text-text-light-secondary dark:text-text-dark-secondary">Daily Streak</p>
            <p className="text-xl text-text-light-primary dark:text-text-dark-primary">🔥 3</p>
          </div>
          <div>
            <p className="mb-1 text-text-light-secondary dark:text-text-dark-secondary">Bags Invested</p>
            <p className="text-xl text-text-light-primary dark:text-text-dark-primary">💰 2</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}