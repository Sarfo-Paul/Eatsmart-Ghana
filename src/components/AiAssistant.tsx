import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { localKnowledgeBaseAnswers } from '../data/ghanaianFoods';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Akwaaba! 🇬🇭 I'm Adwoa, your EatSmart Ghana AI consultant. Ask me anything about local dishes and how they affect diabetes, hypertension, ulcers, or weight loss!\n\n🚨 **Development Notice**: I'm currently in development phase by Paul Sarfo. My responses are based on local nutritional knowledge but should not replace professional medical advice.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = inputValue.toLowerCase();
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponseText = "That's a great question! For specific conditions, Ghanaian carbohydrates like white yam or polished rice should be replaced with high-fiber local alternatives like brown rice, oats, or boiled water yam. Also, keep palm oil and salt minimal.";

      // Find best match in knowledge base
      for (const item of localKnowledgeBaseAnswers) {
        if (item.keywords.some(keyword => userQuery.includes(keyword))) {
          aiResponseText = item.answer;
          break;
        }
      }

      const aiMessage: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const sampleQuestions = [
    "Can I eat Waakye if I have Diabetes?",
    "Is Koobi okay for High Blood Pressure?",
    "Is Shito bad for stomach ulcer?",
    "How to eat Fufu and lose weight?",
    "What Ghanaian foods help with hypertension?",
    "Is Banku better than Kenkey for diabetics?",
    "Can I eat Jollof rice on a diet?",
    "What snacks are good for ulcer patients?",
    "How does Palm oil affect cholesterol?",
    "Are groundnuts good for weight loss?",
    "What can I eat instead of Fufu?",
    "Is Tuo Zaafi good for diabetics?"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col h-[600px]">
      <div className="border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Ask Adwoa — AI Health Assistant
          </h2>
          <p className="text-xs text-slate-500">Traditional Ghanaian Diet Expert | Developed by Paul Sarfo</p>
        </div>
        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md flex items-center gap-1 animate-pulse">
          ● In Development
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : 'bg-slate-100 text-slate-800 rounded-tl-none font-light'
            }`}>
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 text-slate-400 text-sm font-light p-4 rounded-2xl rounded-tl-none animate-pulse">
              Adwoa is typing a response...
            </div>
          </div>
        )}
      </div>

      {/* Sample Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Suggested questions to ask:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputValue(q);
                }}
                className="text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 p-3 rounded-xl transition-all flex items-center justify-between group"
              >
                {q}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="flex gap-2 border-t border-slate-100 pt-4 mt-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about Kontomire, Banku, salt levels, ulcer triggers..."
          className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white border border-slate-100 focus:border-emerald-600"
        />
        <button
          onClick={handleSendMessage}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl shadow-md transition-all flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
