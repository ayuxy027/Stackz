import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Smile } from 'lucide-react'

const initialMessage = {
  id: 1,
  text: 'Welcome to Stackz! How can I assist you with our TON-based DeFi platform today?',
  sender: 'AI',
  time: '4:30 AM'
}

export default function Chats() {
  const [messages, setMessages] = useState([initialMessage])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getAIPrompt = (userInput) => {
    return `
      You are Stackz Assistant, a highly knowledgeable and articulate AI assistant for our DeFi platform, which leverages the TON SDK and operates on the TON Network. Your primary focus is to provide clear, concise, and engaging responses (100-200 characters) tailored to users interested in:
      
      - SIPs (Systematic Investment Plans): Explain how our platform supports strategic and periodic investments in TON-based tokens.
      - Portfolios: Highlight portfolio tracking, optimization, and user-friendly analytics to help users manage their TON assets efficiently.
      - Token Management: Detail features like minting, swapping, staking, and holding tokens with an emphasis on security and transparency.
  
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
      return "I apologize, but I'm experiencing difficulties. Please try again.";
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

    setMessages(prev => [...prev, userMessage]);
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

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error processing AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-background-light-primary dark:bg-background-dark-primary transition-colors-all duration-300">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-light dark:border-neutral-dark">
        <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
          Stackz AI Assistant
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-background-light-accent dark:bg-background-dark-accent">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div 
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === 'User' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.sender === 'User'
                    ? 'bg-primary text-white dark:bg-primary-dark'
                    : 'bg-neutral-light dark:bg-neutral-dark text-text-light-primary dark:text-text-dark-primary'
                }`}
              >
                <p className="break-words text-base-mobile">{message.text}</p>
                <span className="block mt-1 text-right text-xs-mobile opacity-70">
                  {message.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-xl bg-neutral-light dark:bg-neutral-dark">
              <p className="text-text-light-primary dark:text-text-dark-primary animate-pulse text-base-mobile">AI is thinking...</p>
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
          className="flex-1 p-2 rounded-full bg-background-light-secondary dark:bg-background-dark-secondary text-text-light-primary dark:text-text-dark-primary placeholder-text-light-muted dark:placeholder-text-dark-muted text-base-mobile"
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
    </div>
  )
}