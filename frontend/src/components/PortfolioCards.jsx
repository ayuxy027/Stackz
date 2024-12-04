const portfolios = [
    { name: 'Crypto Index', price: 2.79, change: 5.2 },
    { name: 'Infra Index', price: 1.45, change: -2.1 },
    { name: 'Meme Index', price: 0.89, change: 12.7 },
  ]
  
  export default function PortfolioCards() {
    return (
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.name}
            className="p-6 transition-shadow duration-200 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-xl hover:scale-105 hover:border-2 hover:border-purple-500"
          >
            <h3 className="mb-2 text-xl font-bold">{portfolio.name}</h3>
            <p className="mb-2 text-3xl font-bold">${portfolio.price.toFixed(2)}</p>
            <p
              className={`text-lg font-semibold ${
                portfolio.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {portfolio.change >= 0 ? '+' : ''}{portfolio.change}%
            </p>
          </div>
        ))}
      </div>
    )
  }
  
  