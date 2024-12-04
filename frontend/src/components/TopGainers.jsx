const topGainers = [
    { name: 'Meme Index', gain: 103.8 },
    { name: 'Infra Index', gain: 75.2 },
    { name: 'DeFi Index', gain: 62.4 },
  ]
  
  export default function TopGainers() {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Top Gainers 📈</h2>
        <div className="space-y-4">
          {topGainers.map((gainer) => (
            <div
              key={gainer.name}
              className="flex items-center justify-between p-3 transition-shadow duration-200 bg-gray-100 rounded-md dark:bg-gray-700 hover:shadow-md"
            >
              <span>{gainer.name}</span>
              <span className="text-green-500">+{gainer.gain}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  