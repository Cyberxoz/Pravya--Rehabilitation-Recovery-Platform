import React from 'react';
import { NavLink } from 'react-router-dom';
import { PravyaLogo } from './PravyaLogo';
import {
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  TrendingUp,
  Sparkles,
  X,
  ClipboardList,
  History,
  BarChart3,
  FileText,
  Bot,
  Bell,
  User,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainMobileTabs = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/today', label: 'Today', icon: CalendarCheck },
  { path: '/journey', label: 'Journey', icon: MapPin },
  { path: '/what-changed', label: 'Changes', icon: TrendingUp },
  { path: '/weekly', label: 'Stories', icon: Sparkles },
];

const allNavItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/today', label: "Today's Recovery", icon: CalendarCheck },
  { path: '/journey', label: 'Recovery Journey', icon: MapPin },
  { path: '/plan', label: 'My Plan', icon: ClipboardList },
  { path: '/sessions', label: 'Session History', icon: History },
  { path: '/what-changed', label: 'What Changed?', icon: TrendingUp },
  { path: '/weekly', label: 'Weekly Stories', icon: Sparkles },
  { path: '/progress', label: 'Progress & Activity', icon: BarChart3 },
  { path: '/reports', label: 'Progress Report', icon: FileText },
  { path: '/assistant', label: 'Recovery Assistant', icon: Bot },
  { path: '/reminders', label: 'Reminders', icon: Bell },
  { path: '/profile', label: 'Profile', icon: User },
];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Drawer Overlay for hamburger menu */}
      {isOpen && (
        <div
          id="mobile-drawer-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-[#0F4C4A]/20 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Drawer Menu */}
      <div
        id="mobile-navigation-drawer"
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#FAF8F5] dark:bg-slate-900 border-r border-[#0F4C4A]/10 dark:border-slate-800 z-50 transform transition-transform duration-200 ease-in-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-[#0F4C4A]/10 dark:border-slate-800 flex items-center justify-between">
          <PravyaLogo size="sm" showWordmark={true} variant="deep-teal" />
          <button
            id="close-mobile-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-[#0F4C4A]/5 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5 text-[#0F4C4A]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0F4C4A]/10 text-[#0F4C4A] dark:bg-teal-950 dark:text-teal-200 font-semibold border border-[#0F4C4A]/15'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-[#0F4C4A]/5 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#0F4C4A]/70" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Bar for Quick Access */}
      <nav
        id="mobile-bottom-navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAF8F5]/95 dark:bg-slate-900/95 border-t border-[#0F4C4A]/10 dark:border-slate-800 z-30 px-2 py-1 flex justify-around items-center backdrop-blur-md"
      >
        {mainMobileTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#0F4C4A] dark:text-teal-300 font-semibold'
                    : 'text-slate-500 dark:text-slate-400'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

