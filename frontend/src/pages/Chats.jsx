import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { MessageSquare, Send, Paperclip, Smile, MoreVertical, ChevronLeft } from 'lucide-react'

// Mock chat data with Unsplash image URLs
const mockChats = [
  {
    id: 1,
    name: 'AI Financial Assistant',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    messages: [
      { id: 1, text: 'Hi there! Ready to discuss your investment strategy?', sender: 'AI', time: '10:30 AM' },
      { id: 2, text: 'Yes, I want to diversify my portfolio. What do you recommend?', sender: 'User', time: '10:32 AM' },
      { id: 3, text: 'Based on your current holdings, I suggest considering a mix of ETFs and some emerging market stocks.', sender: 'AI', time: '10:35 AM' }
    ],
    active: true
  },
  {
    id: 2,
    name: 'Market Updates',
    profileImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=100&q=80',
    messages: [
      { id: 1, text: 'Bitcoin price surges 5% in the last hour!', sender: 'AI', time: '11:45 AM' },
      { id: 2, text: 'Wow, that\'s significant. Any analysis?', sender: 'User', time: '11:47 AM' }
    ],
    active: false
  },
  {
    id: 3,
    name: 'Portfolio Alerts',
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=100&q=80',
    messages: [
      { id: 1, text: 'Your ETH holdings have increased by 3.2%', sender: 'AI', time: '12:15 PM' },
      { id: 2, text: 'Nice! Any recommendations?', sender: 'User', time: '12:16 PM' }
    ],
    active: false
  }
]

export default function Chats() {
  const { isDarkMode } = useTheme()
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [newMessage, setNewMessage] = useState('')
  const [isMobileView, setIsMobileView] = useState(false)
  const [showChatList, setShowChatList] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedChat.messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: selectedChat.messages.length + 1,
        text: newMessage,
        sender: 'User',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, message]
      }))
      setNewMessage('')
    }
  }

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    if (isMobileView) {
      setShowChatList(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-background-light-primary dark:bg-background-dark-primary">
      {/* Mobile Header */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-neutral-light/20 dark:border-neutral-dark/20">
          {!showChatList && (
            <button onClick={() => setShowChatList(true)} className="text-primary dark:text-primary-light">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
            {showChatList ? 'Chats' : selectedChat.name}
          </h1>
          <MessageSquare className="text-primary dark:text-primary-light" />
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        <AnimatePresence>
          {(!isMobileView || showChatList) && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`w-full md:w-1/3 border-r ${
                isDarkMode 
                  ? 'bg-background-dark-secondary border-neutral-dark/20' 
                  : 'bg-background-light-secondary border-neutral-light/20'
              }`}
            >
              {!isMobileView && (
                <div className="flex items-center justify-between p-4 border-b border-neutral-light/20 dark:border-neutral-dark/20">
                  <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Chats</h2>
                  <MessageSquare className="text-primary dark:text-primary-light" />
                </div>
              )}
              
              <div className="h-full overflow-y-auto divide-y divide-neutral-light/10 dark:divide-neutral-dark/10">
                {mockChats.map(chat => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 cursor-pointer flex items-center space-x-4 ${
                      selectedChat.id === chat.id 
                        ? (isDarkMode 
                            ? 'bg-background-dark-accent' 
                            : 'bg-background-light-accent')
                        : ''
                    }`}
                  >
                    <img 
                      src={chat.profileImage} 
                      alt={chat.name} 
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold truncate text-text-light-primary dark:text-text-dark-primary">{chat.name}</h3>
                        <span className="ml-2 text-xs text-text-light-muted dark:text-text-dark-muted whitespace-nowrap">
                          {chat.messages[chat.messages.length - 1].time}
                        </span>
                      </div>
                      <p className="text-sm truncate text-text-light-secondary dark:text-text-dark-secondary">
                        {chat.messages[chat.messages.length - 1].text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {(!isMobileView || !showChatList) && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col w-full md:w-2/3"
            >
              {/* Chat Header */}
              {!isMobileView && (
                <div className="flex items-center justify-between p-4 border-b border-neutral-light/20 dark:border-neutral-dark/20">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedChat.profileImage} 
                      alt={selectedChat.name} 
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <h2 className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary">
                      {selectedChat.name}
                    </h2>
                  </div>
                  <MoreVertical className="text-text-light-secondary dark:text-text-dark-secondary" />
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-background-light-accent dark:bg-background-dark-accent">
                {selectedChat.messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${
                      message.sender === 'User' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div 
                      className={`max-w-[70%] p-3 rounded-xl ${
                        message.sender === 'User'
                          ? 'bg-primary text-white dark:bg-primary-dark'
                          : 'bg-neutral-light dark:bg-neutral-dark text-text-light-primary dark:text-text-dark-primary'
                      }`}
                    >
                      <p className="break-words">{message.text}</p>
                      <span className="block mt-1 text-xs text-right opacity-70">
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex items-center p-4 space-x-2 border-t border-neutral-light/20 dark:border-neutral-dark/20">
                <Smile className="flex-shrink-0 cursor-pointer text-text-light-secondary dark:text-text-dark-secondary" />
                <Paperclip className="flex-shrink-0 cursor-pointer text-text-light-secondary dark:text-text-dark-secondary" />
                <input 
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className={`flex-1 p-2 rounded-full 
                    bg-background-light-secondary dark:bg-background-dark-secondary
                    text-text-light-primary dark:text-text-dark-primary
                    placeholder-text-light-muted dark:placeholder-text-dark-muted`}
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className={`p-2 rounded-full flex-shrink-0 ${
                    newMessage.trim() 
                      ? 'bg-primary text-white dark:bg-primary-dark shadow-btn-light dark:shadow-btn-dark'
                      : 'bg-neutral-light dark:bg-neutral-dark text-text-light-muted dark:text-text-dark-muted cursor-not-allowed'
                  }`}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}