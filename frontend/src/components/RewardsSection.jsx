import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function RewardsSection() {
  const [copied, setCopied] = useState(false)

  const copyReferralCode = () => {
    navigator.clipboard.writeText('DFG-EJY')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 mt-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold">Rewards & Gamification</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-700">
          <h3 className="mb-2 text-lg font-semibold">Referral Code</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">DFG-EJY</span>
            <button
              onClick={copyReferralCode}
              className="p-2 transition-colors duration-200 bg-purple-500 rounded-full hover:bg-purple-600"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-700">
          <h3 className="mb-2 text-lg font-semibold">Daily Streak</h3>
          <p className="text-xl font-bold">
            🔥 <span className="animate-pulse">7 days</span>
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-700">
          <h3 className="mb-2 text-lg font-semibold">Rewards Points</h3>
          <p className="text-xl font-bold">
            <span className="animate-pulse">2230 points</span> 🎉
          </p>
        </div>
      </div>
    </div>
  )
}

