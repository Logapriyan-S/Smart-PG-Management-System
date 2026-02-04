
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your Smart PG Assistant. How can I help you today? You can ask me about PG rules, how to raise complaints, or general facilities.",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const aiResponseText = await getChatbotResponse(inputText);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fadeIn">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900">AI Resident Support</h2>
        <p className="text-slate-500">Instant answers to your PG related queries.</p>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white ml-2' : 'bg-slate-100 text-indigo-600 mr-2'
                }`}>
                  {msg.sender === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-2 opacity-50 ${msg.sender === 'user' ? 'text-white text-right' : 'text-slate-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <form onSubmit={handleSend} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`p-3.5 rounded-2xl transition-all shadow-lg ${
                inputText.trim() && !isTyping 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 active:scale-90' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2">Powered by Gemini AI • Smart PG Assistant</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
