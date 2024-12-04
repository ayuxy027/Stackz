import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Paperclip, Smile, MoreVertical, ChevronLeft } from 'lucide-react'

const mockChats = [
  {
    id: 1,
    name: 'Stackz AI Assistant',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    messages: [
      { id: 1, text: 'Welcome to Stackz! How can I assist you today?', sender: 'AI', time: '4:30 AM' }
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
    return `
      You are Stackz Assistant, a highly knowledgeable and articulate AI assistant for our DeFi platform, which leverages the TON SDK and operates on the TON Network. Your primary focus is to provide clear, concise, and engaging responses (100-200 characters) tailored to users interested in:
      
      - **SIPs (Systematic Investment Plans)**: Explain how our platform supports strategic and periodic investments in TON-based tokens.
      - **Portfolios**: Highlight portfolio tracking, optimization, and user-friendly analytics to help users manage their TON assets efficiently.
      - **Token Management**: Detail features like minting, swapping, staking, and holding tokens with an emphasis on security and transparency.
  
      Key goals:
      - Ensure technical accuracy while maintaining simplicity for a diverse user audience, from beginners to experienced DeFi users.
      - Provide relevant examples or comparisons to enhance user understanding when appropriate.
      - Highlight the unique value proposition of our platform compared to other DeFi platforms.
  
      Respond with actionable and precise answers while avoiding overly technical jargon unless explicitly requested. Query: ${userInput}
    `;
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
      return "Error. Please try again.";
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
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-background-light-primary dark:bg-background-dark-primary transition-colors-all duration-300">
      {/* Mobile Header */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-neutral-light dark:border-neutral-dark">
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
              className="w-full border-r md:w-1/3 border-neutral-light dark:border-neutral-dark bg-background-light-secondary dark:bg-background-dark-secondary"
            >
              {!isMobileView && (
                <div className="flex items-center justify-between p-4 border-b border-neutral-light dark:border-neutral-dark">
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
                        ? 'bg-background-light-accent dark:bg-background-dark-accent' 
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
                <div className="flex items-center justify-between p-4 border-b border-neutral-light dark:border-neutral-dark">
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
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-xl bg-neutral-light dark:bg-neutral-dark">
                      <p className="text-background-dark-primary animate-pulse">AI is thinking...</p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex items-center p-4 space-x-2 border-t border-neutral-light dark:border-neutral-dark">
                <Smile className="flex-shrink-0 cursor-pointer text-text-light-secondary dark:text-text-dark-secondary" />
                <Paperclip className="flex-shrink-0 cursor-pointer text-text-light-secondary dark:text-text-dark-secondary" />
                <input 
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-full bg-background-light-secondary dark:bg-background-dark-secondary text-text-light-primary dark:text-text-dark-primary placeholder-text-light-muted dark:placeholder-text-dark-muted"
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className={`p-2 rounded-full flex-shrink-0 ${
                    newMessage.trim() 
                      ? 'bg-primary text-white dark:bg-primary-dark shadow-btn-light dark:shadow-btn-dark'
                      : 'bg-neutral-light dark:bg-neutral-dark text-text-light-muted dark:text-text-dark-muted cursor-not-allowed'
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