import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { formatCurrency } from '../utils/formatCurrency'
import { useTheme } from '../contexts/ThemeContext'

const SubSection = ({ title, data, render }) => {
  const [isOpen, setIsOpen] = useState(true)  // Default to true
  const { isDarkMode } = useTheme()

  return (
    <div className={`mb-6 rounded-xl overflow-hidden shadow-light-soft dark:shadow-dark-soft ${
      isDarkMode ? 'bg-background-dark-secondary' : 'bg-background-light-secondary'
    }`}>
      <button
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{title}</h2>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {render(data)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Home() {
  const { isDarkMode } = useTheme()

  const exploreData = [
    { name: 'Bitcoin', symbol: 'BTC', price: 45000, change: 2.5 },
    { name: 'Ethereum', symbol: 'ETH', price: 3200, change: 1.8 },
    { name: 'Cardano', symbol: 'ADA', price: 1.2, change: -0.5 },
  ]

  const sipData = [
    { name: 'Crypto Blue Chip', amount: 100, frequency: 'Weekly', nextDate: '2023-06-15' },
    { name: 'DeFi Index', amount: 50, frequency: 'Bi-weekly', nextDate: '2023-06-22' },
    { name: 'NFT Collection', amount: 25, frequency: 'Monthly', nextDate: '2023-07-01' },
  ]

  const portfolioData = [
    { name: 'Crypto Index', value: 5000, change: 7.2 },
    { name: 'DeFi Yield', value: 2500, change: 3.5 },
    { name: 'NFT Collection', value: 1500, change: -2.1 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
        Welcome to Bagz ✨
      </h1>

      <SubSection
        title="Explore"
        data={exploreData}
        render={(data) => (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary">{item.name}</h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{item.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">{formatCurrency(item.price)}</p>
                  <p className={item.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      />

      <SubSection
        title="SIP (Systematic Investment Plan)"
        data={sipData}
        render={(data) => (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary">{item.name}</h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{item.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">{formatCurrency(item.amount)}</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Next: {item.nextDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      />

      <SubSection
        title="Portfolio"
        data={portfolioData}
        render={(data) => (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary">{item.name}</h3>
                <div className="text-right">
                  <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">{formatCurrency(item.value)}</p>
                  <p className={item.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </motion.div>
  )
}