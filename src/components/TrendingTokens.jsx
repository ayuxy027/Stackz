const trendingTokens = [
    { name: 'Cross-chain comms', gain: 12.8 },
    { name: 'Base memes', gain: 8.5 },
    { name: 'AI tokens', gain: 15.2 },
  ]
  
  export default function TrendingTokens() {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Trending Tokens ⚡🚀</h2>
        <div className="space-y-4">
          {trendingTokens.map((token) => (
            <div
              key={token.name}
              className="flex items-center justify-between p-3 transition-shadow duration-200 bg-gray-100 rounded-md dark:bg-gray-700 hover:shadow-md"
            >
              <span>{token.name}</span>
              <span className="text-green-500">+{token.gain}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  