import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";
import { formatCurrency } from "../utils/formatCurrency";
import { useTheme } from "../contexts/ThemeContext";

const SubSection = ({ title, data, render, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`mb-6 rounded-xl overflow-hidden shadow-light-soft dark:shadow-dark-soft ${
        isDarkMode
          ? "bg-background-dark-secondary"
          : "bg-background-light-secondary"
      }`}
    >
      <button
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
          {title}
        </h2>
        <div className="flex items-center">
          {isOpen ? (
            <>
              <FiMinus
                className={`mr-2 ${!isDarkMode ? "text-black" : ""}`}
              />
              <FiChevronUp className={!isDarkMode ? "text-black" : ""} />
            </>
          ) : (
            <>
              <FiPlus className={`mr-2 ${!isDarkMode ? "text-black" : ""}`} />
              <FiChevronDown className={!isDarkMode ? "text-black" : ""} />
            </>
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {render(data)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const { isDarkMode } = useTheme();

  const sipData = [
    {
      id: 1,
      name: "Crypto Blue Chip",
      amount: 100,
      frequency: "Weekly",
      nextDate: "2023-06-15",
    },
    {
      id: 2,
      name: "DeFi Index",
      amount: 50,
      frequency: "Bi-weekly",
      nextDate: "2023-06-22",
    },
    {
      id: 3,
      name: "NFT Collection",
      amount: 25,
      frequency: "Monthly",
      nextDate: "2023-07-01",
    },
  ];

  const portfolioData = [
    { id: 4, name: "Crypto Index", value: 5000, change: 7.2 },
    { id: 5, name: "DeFi Yield", value: 2500, change: 3.5 },
    { id: 6, name: "NFT Collection", value: 1500, change: -2.1 },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);

  const conversionRate = 7.5; // Conversion rate

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handlePay = () => {
    const tonAmount = (amount / conversionRate).toFixed(2);
    alert(`You will pay ${tonAmount} TON for ${selectedItem?.name}`);
    setShowModal(false);
    setAmount("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="p-6 space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
          Welcome to Stackz ✨
        </h1>
        <span className="text-lg font-semibold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
          Simplify. Diversify. Stack Crypto Wealth
        </span>
      </div>

      <div className="space-y-6">
        <SubSection
          title="Stackz"
          data={portfolioData}
          render={(data) => (
            <div className="space-y-4">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                  onClick={() => handleItemClick(item)}
                >
                  <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                      {formatCurrency(item.value)}
                    </p>
                    <p
                      className={
                        item.change >= 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        />
        <SubSection
          title="Stackz SIP"
          data={sipData}
          render={(data) => (
            <div className="space-y-4">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                  onClick={() => handleItemClick(item)}
                >
                  <div>
                    <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                      {item.name}
                    </h3>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {item.frequency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                      {formatCurrency(item.amount)}
                    </p>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      Next: {item.nextDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div
      className={`p-6 rounded-xl shadow-light-soft dark:shadow-dark-soft ${
        isDarkMode ? "bg-background-dark-secondary" : "bg-background-light-secondary"
      } w-full max-w-lg`}
    >
      <h2
        className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4"
      >
        Pay for {selectedItem?.name}
      </h2>
      <label className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">
        Amount (USD):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full mt-2 p-3 rounded-lg shadow-light-soft dark:shadow-dark-soft border border-gray-200 dark:border-gray-700 focus:outline-none ${
            isDarkMode ? "bg-background-dark-primary" : "bg-background-light-primary"
          }`}
          placeholder="Enter amount in USD"
        />
      </label>
      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-2">
        1 TON = {conversionRate} USD
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={handlePay}
          disabled={!amount}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            amount
              ? "bg-gradient-to-r from-primary to-secondary text-light-ambient hover:brightness-110"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Pay {amount ? (amount / conversionRate).toFixed(2) : "0.00"} TON
        </button>
        <button
          onClick={() => setShowModal(false)}
          className={`w-full py-2 px-4 rounded-lg font-semibold ${
            isDarkMode
              ? "bg-background-dark-primary text-text-dark-primary hover:bg-background-dark-secondary"
              : "bg-background-light-primary text-text-light-primary hover:bg-background-light-secondary"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </motion.div>
  );
}
