import React, { useState } from 'react';
import { Bot, Send, X, ShieldAlert, Sparkles, User, RefreshCw } from 'lucide-react';
import { RecoveryProfile } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: RecoveryProfile;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'assistant',
      text: "Hello! I am your PRAVYA Recovery Assistant. I can help organize your plan, explain instructions, summarize recorded sessions, or generate weekly stories.\n\nPlease note: I cannot diagnose symptoms or prescribe exercises.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input.trim();
    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsgText,
          planContext: profile,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: `a_${Date.now()}`,
        sender: 'assistant',
        text:
          data.text ||
          'Thank you. Remember to always consult your healthcare professional for medical questions.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI assistant call failed:', err);
      const errorMsg: Message = {
        id: `e_${Date.now()}`,
        sender: 'assistant',
        text: 'I am running in local supportive mode. Please continue adhering to your healthcare provider\'s plan and track your session progress!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestPrompts = [
    'Summarize my recovery adherence for this week',
    'Explain my Ankle Alphabet Circles instruction',
    'Generate a supportive message for my next session',
  ];

  return (
    <div
      id="ai-assistant-drawer-backdrop"
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end"
    >
      <div
        id="ai-assistant-drawer"
        className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-teal-50/50 dark:bg-teal-950/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                Recovery Assistant
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Non-diagnostic recovery companion
              </p>
            </div>
          </div>

          <button
            id="close-ai-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Medical Safety Disclaimer */}
        <div className="px-4 py-2 bg-amber-50/80 dark:bg-amber-950/40 border-b border-amber-200/60 dark:border-amber-800/60 flex items-center gap-2 text-[11px] text-amber-900 dark:text-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>PRAVYA Assistant does not diagnose or prescribe exercises.</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                {m.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-teal-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs whitespace-pre-wrap'
                }`}
              >
                <p>{m.text}</p>
                <span className="block text-[9px] opacity-70 mt-1 text-right">
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
              <span>Assistant is reflecting...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
          {suggestPrompts.map((promptText, i) => (
            <button
              key={i}
              id={`suggested-prompt-btn-${i}`}
              onClick={() => setInput(promptText)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 border border-slate-200 dark:border-slate-700"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            id="ai-assistant-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your plan, sessions, or weekly story..."
            className="flex-1 text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            id="send-ai-message-btn"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
