import React from 'react';
import { NavLink } from 'react-router-dom';
import { PravyaLogo } from './PravyaLogo';
import {
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  ClipboardList,
  History,
  TrendingUp,
  Sparkles,
  BarChart3,
  FileText,
  Bot,
  Bell,
  User,
  Heart,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/today', label: "Today's Recovery", icon: CalendarCheck },
  { path: '/journey', label: 'Recovery Journey', icon: MapPin, highlight: true },
  { path: '/plan', label: 'My Plan', icon: ClipboardList },
  { path: '/sessions', label: 'Session History', icon: History },
  { path: '/what-changed', label: 'What Changed?', icon: TrendingUp, highlight: true },
  { path: '/weekly', label: 'Weekly Stories', icon: Sparkles, highlight: true },
  { path: '/progress', label: 'Progress & Activity', icon: BarChart3 },
  { path: '/reports', label: 'Progress Report', icon: FileText },
  { path: '/assistant', label: 'Recovery Assistant', icon: Bot },
  { path: '/reminders', label: 'Reminders', icon: Bell },
  { path: '/profile', label: 'Profile', icon: User },
];

export const Sidebar: React.FC = () => {
  return (
    <aside
      id="pravya-sidebar"
      className="hidden lg:flex flex-col w-64 border-r border-[#0F4C4A]/10 dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-900 h-screen sticky top-0 shrink-0 select-none z-20"
    >
      {/* App Brand Header */}
      <div className="p-5 border-b border-[#0F4C4A]/10 dark:border-slate-800/80 flex flex-col gap-1.5">
        <PravyaLogo size="md" showWordmark={true} variant="deep-teal" />
        <p className="text-[11px] font-medium text-[#0F4C4A]/70 dark:text-teal-300/70 mt-1 italic tracking-tight">
          "Your Recovery. Your Journey. Your Progress."
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              id={`nav-link-${item.path.replace('/', '') || 'dashboard'}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0F4C4A]/10 text-[#0F4C4A] dark:bg-teal-950/60 dark:text-teal-200 font-semibold shadow-2xs border border-[#0F4C4A]/15'
                    : 'text-slate-600 hover:text-[#0F4C4A] hover:bg-[#0F4C4A]/5 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0 text-[#0F4C4A]/70 group-hover:text-[#0F4C4A]" />
              <span className="flex-1">{item.label}</span>
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C4A] shrink-0" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Support Notice */}
      <div className="p-4 border-t border-[#0F4C4A]/10 dark:border-slate-800 bg-[#FAF8F5]/80 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 font-semibold text-[#0F4C4A] dark:text-teal-300 mb-1">
          <Heart className="w-3.5 h-3.5 text-[#0F4C4A]" />
          <span>Recovery Companion</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
          Supporting your healthcare provider's rehabilitation plan safely every day.
        </p>
      </div>
    </aside>
  );
};

