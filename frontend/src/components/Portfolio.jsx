import { useState, useEffect } from 'react'

export default function Portfolio() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6 mt-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold">Your Portfolio</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 transition-shadow duration-200 bg-gray-100 rounded-md dark:bg-gray-700 hover:shadow-md">
          <h3 className="mb-2 text-lg font-semibold">Profit & Loss</h3>
          <p className="text-2xl font-bold text-green-500">$100 (+34.5%)</p>
        </div>
        <div className="p-4 transition-shadow duration-200 bg-gray-100 rounded-md dark:bg-gray-700 hover:shadow-md">
          <h3 className="mb-2 text-lg font-semibold">Invested Amount</h3>
          <p className="text-2xl font-bold">$100</p>
        </div>
        <div className="p-4 transition-shadow duration-200 bg-gray-100 rounded-md dark:bg-gray-700 hover:shadow-md">
          <h3 className="mb-2 text-lg font-semibold">Current Value</h3>
          <p className="text-2xl font-bold transition-transform duration-200 hover:scale-105">$300</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Portfolio Completion</h3>
        <div className="relative pt-1">
          <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded dark:bg-gray-600">
            <div
              style={{ width: `${progress}%` }}
              className="flex flex-col justify-center text-center text-white bg-purple-500 shadow-none whitespace-nowrap"
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

