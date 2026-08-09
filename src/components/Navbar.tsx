import React from 'react';
import { Play, Bot, Menu, Sparkles } from 'lucide-react';
import { PravyaLogo } from './PravyaLogo';

interface NavbarProps {
  onStartSessionClick?: () => void;
  onOpenAssistant?: () => void;
  onOpenAi?: () => void;
  onToggleMobileMenu?: () => void;
  streakCount?: number;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartSessionClick,
  onOpenAssistant,
  onOpenAi,
  onToggleMobileMenu,
  streakCount = 5,
}) => {
  const handleOpenAi = onOpenAssistant || onOpenAi;

  return (
    <header
      id="pravya-header"
      className="sticky top-0 z-30 bg-[#FAF8F5]/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-[#0F4C4A]/10 dark:border-slate-800 px-4 sm:px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-[#0F4C4A]/5 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="lg:hidden">
            <PravyaLogo size="sm" showWordmark={true} variant="deep-teal" />
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#0F4C4A]/8 text-[#0F4C4A] dark:bg-teal-950/80 dark:text-teal-300 border border-[#0F4C4A]/15 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5 text-[#0F4C4A] dark:text-teal-400" />
            <span>Adherence Streak: {streakCount} Days</span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* AI Assistant Button */}
          <button
            id="open-ai-assistant-btn"
            onClick={handleOpenAi}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border border-[#0F4C4A]/15 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-[#0F4C4A] dark:text-slate-200 hover:bg-[#0F4C4A]/5 dark:hover:bg-slate-700 transition-colors shadow-2xs"
          >
            <Bot className="w-4 h-4 text-[#0F4C4A] dark:text-teal-400" />
            <span className="hidden sm:inline">Recovery Assistant</span>
          </button>

          {/* Today's Session Quick Start */}
          <button
            id="quick-start-session-btn"
            onClick={onStartSessionClick}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0F4C4A] hover:bg-[#0B3A39] text-white shadow-sm shadow-[#0F4C4A]/20 transition-all active:scale-98"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Session</span>
          </button>
        </div>
      </div>
    </header>
  );
};


