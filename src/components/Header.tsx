import React from 'react';
import { Search, SlidersHorizontal, Sun, Moon, Bell } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onOpenNewTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h7a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H4V4zm0 8h5a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H4v-8zm8-8h8v3h-8V4zm0 5h6v3h-6V9z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
          Taskly
        </span>
      </div>

      {/* Centered Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="w-full pl-11 pr-24 py-2.5 rounded-full bg-gray-50 dark:bg-gray-800/90 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 border border-gray-200/80 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-inner"
          />
          <div className="absolute right-3 flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-400 bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600 shadow-2xs">
              ⌘S
            </span>
            <button
              title="Filter tasks"
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right User Controls */}
      <div className="flex items-center gap-3">
        {/* Dark / Light Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200/60 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(false)}
            title="Light mode"
            className={`p-1.5 rounded-full transition-all ${
              !darkMode
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDarkMode(true)}
            title="Dark mode"
            className={`p-1.5 rounded-full transition-all ${
              darkMode
                ? 'bg-gray-900 text-white shadow-xs'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-gray-900" />
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

        {/* User profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
            alt="Brenda"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all shadow-xs"
          />
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 hidden md:inline">
            Brenda
          </span>
        </div>
      </div>
    </header>
  );
};
