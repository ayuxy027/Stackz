import { Outlet, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiHome5Line, RiHome5Fill } from 'react-icons/ri'
import { BsChatDots, BsChatDotsFill } from 'react-icons/bs'
import { FaRegUser, FaUser } from 'react-icons/fa'

export default function Layout() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', IconOutline: RiHome5Line, IconFill: RiHome5Fill },
    { path: '/chats', label: 'Chats', IconOutline: BsChatDots, IconFill: BsChatDotsFill },
    { path: '/profile', label: 'Profile', IconOutline: FaRegUser, IconFill: FaUser },
  ]

  return (
    <div className="min-h-screen text-white bg-black">
      <main className="pb-20">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-gray-800">
        <div className="flex items-center justify-around p-4">
          {navItems.map(({ path, label, IconOutline, IconFill }) => (
            <Link key={path} to={path} className="relative">
              {location.pathname === path && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 rounded-lg bg-blue-500/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                {location.pathname === path ? (
                  <IconFill className="w-6 h-6 text-blue-400" />
                ) : (
                  <IconOutline className="w-6 h-6 text-gray-400" />
                )}
                <span className={`text-xs mt-1 ${
                  location.pathname === path ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

