import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiHome5Line, RiHome5Fill } from 'react-icons/ri';
import { BsChatDots, BsChatDotsFill } from 'react-icons/bs';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";

export default function Layout() {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { state, open } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const navItems = [
    { path: '/', label: 'Home', IconOutline: RiHome5Line, IconFill: RiHome5Fill },
    { path: '/chats', label: 'Chats', IconOutline: BsChatDots, IconFill: BsChatDotsFill },
    { path: '/profile', label: 'Profile', IconOutline: FaRegUser, IconFill: FaUser },
  ];

  const handleConnectWallet = () => {
    if (!userFriendlyAddress) {
      console.log("Connecting TON wallet...");
      open();
    }  };

      const handleDisconnectWallet = () => {
    if (userFriendlyAddress) {
      console.log("Disconnecting TON wallet...");
      tonConnectUI.disconnect();
    }
  };
  return (
    <div
      className={`min-h-screen transition-colors-all duration-300 ${
        isDarkMode ? 'bg-dark-ambient' : 'bg-light-ambient'
      }`}
    >
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
          Stackz 🍌
        </h1>
        <div className="flex items-center gap-4">
          {!userFriendlyAddress ? (
            <button
              onClick={handleConnectWallet}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                isDarkMode
                  ? 'bg-primary-light text-dark-ambient hover:bg-primary-dark'
                  : 'bg-primary text-light-ambient hover:bg-primary-dark'
              }`}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={handleDisconnectWallet}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                isDarkMode
                  ? 'bg-red-600 text-light-ambient hover:bg-red-800'
                  : 'bg-red-500 text-light-ambient hover:bg-red-700'
              }`}
            >
              Disconnect Wallet
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>

      <main className="pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-background-light-primary dark:bg-background-dark-primary dark:border-gray-800">
        <div className="flex items-center justify-around p-4">
          {navItems.map(({ path, label, IconOutline, IconFill }) => (
            <Link key={path} to={path} className="relative">
              {location.pathname === path && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 bg-red-100 rounded-lg dark:bg-red-100 opacity-20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.2 }}
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                {location.pathname === path ? (
                  <IconFill className="w-6 h-6 text-primary dark:text-primary-light" />
                ) : (
                  <IconOutline className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
                <span
                  className={`text-xs mt-1 ${
                    location.pathname === path
                      ? 'text-primary dark:text-primary-light'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}