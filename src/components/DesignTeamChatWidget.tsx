import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  ChevronDown,
  Bell,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  CheckCheck,
} from 'lucide-react';
import type { ChatMessage } from '../types';

interface DesignTeamChatWidgetProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const DesignTeamChatWidget: React.FC<DesignTeamChatWidgetProps> = ({
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-3xl p-5 border border-gray-100/80 dark:border-gray-700/80 shadow-xs flex flex-col justify-between h-full transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <MessageSquare className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">
            Design Team Chat
          </h3>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-1 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 max-h-[160px] my-2 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            {!msg.isMe && (
              <span className="text-[11px] font-semibold text-rose-500 mb-0.5 ml-1">
                {msg.sender}
              </span>
            )}

            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-2xl ${
                msg.isMe
                  ? 'bg-purple-50 dark:bg-purple-950/70 text-purple-950 dark:text-purple-100 rounded-br-xs border border-purple-200/50 dark:border-purple-800/40'
                  : 'bg-gray-100/90 dark:bg-gray-700/60 text-gray-900 dark:text-gray-100 rounded-bl-xs'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
            </div>

            <div
              className={`flex items-center gap-1 mt-0.5 text-[10px] text-gray-400 ${
                msg.isMe ? 'mr-1' : 'ml-1'
              }`}
            >
              {msg.isMe && (
                <CheckCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              )}
              <span>{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative mt-2">
        <div className="flex items-center bg-gray-50 dark:bg-gray-700/60 rounded-full px-3 py-1.5 border border-gray-200/70 dark:border-gray-600/60 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20 transition-all">
          <button
            type="button"
            title="Attach file"
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5 rotate-45" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message Here..."
            className="flex-1 bg-transparent border-none text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none px-2"
          />

          <button
            type="button"
            title="Insert emoji"
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <Smile className="w-3.5 h-3.5" />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            title="Send message"
            className="ml-1 w-7 h-7 rounded-full bg-gray-950 dark:bg-white text-white dark:text-black flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-3 h-3 translate-x-px" />
          </button>
        </div>
      </form>
    </div>
  );
};
