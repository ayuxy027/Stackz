import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chats from './pages/Chats'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chats" element={<Chats />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App