import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Paperclip, Smile, MoreVertical, ChevronLeft } from 'lucide-react'

const mockChats = [
  {
    id: 1,
    name: 'AI Financial Assistant',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    messages: [
      { id: 1, text: 'Hi there! Ready to discuss your investment strategy?', sender: 'AI', time: '10:30 AM' }
    ],
    active: true
  }
]

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [newMessage, setNewMessage] = useState('')
  const [isMobileView, setIsMobileView] = useState(false)
  const [showChatList, setShowChatList] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
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

  const getAIPrompt = (userInput) => {
    return `You are a highly knowledgeable and engaging AI Financial Assistant for investment advice. 
    Provide a strategic, informative, and slightly witty response to the following query: ${userInput}

    Guidelines:
    - Be precise and actionable, but add a touch of humor or an interesting fact when appropriate
    - Offer clear investment insights with real-world examples or analogies
    - Consider risk and potential returns, explaining them in an easy-to-understand manner
    - Use professional financial language, but explain any complex terms
    - Limit response to 150-200 words
    - End with a thought-provoking question or a call-to-action to encourage further engagement`;
  };

  const getAIResponse = async (userInput) => {
    const API_KEY = 'AIzaSyAOLy9mK_xrJ5cpYPTaO-TokDC87UFeThQ';
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: getAIPrompt(userInput)
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('API Error:', error);
      return "I apologize, but I'm experiencing difficulties processing your request. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'User',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));

    setNewMessage('');
    setIsLoading(true);

    try {
      const aiResponseText = await getAIResponse(newMessage);

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'AI',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage]
      }));
    } catch (error) {
      console.error('Error processing AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    if (isMobileView) {
      setShowChatList(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-gray-900">
      {/* Mobile Header */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!showChatList && (
            <button onClick={() => setShowChatList(true)} className="text-blue-600 dark:text-blue-400">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {showChatList ? 'Chats' : selectedChat.name}
          </h1>
          <MessageSquare className="text-blue-600 dark:text-blue-400" />
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
              className="w-full border-r border-gray-200 md:w-1/3 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              {!isMobileView && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chats</h2>
                  <MessageSquare className="text-blue-600 dark:text-blue-400" />
                </div>
              )}
              
              <div className="h-full overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                {mockChats.map(chat => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 cursor-pointer flex items-center space-x-4 ${
                      selectedChat.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <img 
                      src={chat.profileImage} 
                      alt={chat.name} 
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900 truncate dark:text-white">{chat.name}</h3>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {chat.messages[chat.messages.length - 1].time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedChat.profileImage} 
                      alt={selectedChat.name} 
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedChat.name}
                    </h2>
                  </div>
                  <MoreVertical className="text-gray-500 dark:text-gray-400" />
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
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
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="break-words">{message.text}</p>
                      <span className="block mt-1 text-xs text-right opacity-70">
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-xl bg-white dark:bg-gray-700">
                      <p className="animate-pulse">AI is thinking...</p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex items-center p-4 space-x-2 border-t border-gray-200 dark:border-gray-700">
                <Smile className="flex-shrink-0 text-gray-500 cursor-pointer dark:text-gray-400" />
                <Paperclip className="flex-shrink-0 text-gray-500 cursor-pointer dark:text-gray-400" />
                <input 
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className={`p-2 rounded-full flex-shrink-0 ${
                    newMessage.trim() 
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!newMessage.trim() || isLoading}
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