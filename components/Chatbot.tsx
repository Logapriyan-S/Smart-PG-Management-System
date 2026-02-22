import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Welcome to the Sri Sai Balaji Digital Concierge. I am your AI assistant, dedicated to ensuring your residency experience is exceptional. How may I serve you today?",
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
      <div className="mb-8 relative">
        <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Automated Support</p>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">AI Residency Concierge</h2>
        <div className="absolute top-0 right-0 hidden md:flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500/70">Neural Network Active</span>
        </div>
      </div>

      <div className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] flex flex-col overflow-hidden relative shadow-2xl">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] lg:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} items-start space-x-4`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-[10px] font-bold border ${
                  msg.sender === 'user' ? 'bg-[#D4AF37] border-transparent text-[#030614]' : 'bg-white/5 border-white/10 text-[#D4AF37]'
                }`}>
                  {msg.sender === 'user' ? 'ME' : 'AI'}
                </div>
                <div className={`relative p-6 rounded-[2rem] text-sm leading-relaxed shadow-lg ${
                  msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-[#0A0F1D] to-[#030614] border border-white/5 text-slate-200 rounded-tr-none' 
                  : 'bg-white/5 backdrop-blur-md border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                  <div className={`text-[9px] mt-4 font-bold tracking-tighter opacity-40 ${msg.sender === 'user' ? 'text-white text-right' : 'text-slate-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/5 p-5 rounded-[1.5rem] rounded-tl-none">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5">
          <form onSubmit={handleSend} className="flex items-center space-x-4 bg-[#030614]/50 rounded-[2rem] p-2 border border-white/5 focus-within:border-[#D4AF37]/30 transition-all">
            <input
              type="text"
              placeholder="Ask anything about rules, food, or residency..."
              className="flex-1 bg-transparent px-6 py-4 text-sm text-white outline-none placeholder:text-slate-600"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                inputText.trim() && !isTyping 
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#030614] shadow-lg shadow-amber-500/20 active:scale-90' 
                : 'bg-white/5 text-slate-700 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
          <div className="mt-4 flex justify-center items-center space-x-2">
             <div className="h-[1px] w-12 bg-white/5" />
             <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-slate-600">Encrypted Neural link • Gemini Core</p>
             <div className="h-[1px] w-12 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;