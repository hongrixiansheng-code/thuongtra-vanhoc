"use client";

import { Bell, Search, User } from "lucide-react";

export default function Header() {
  // Hardcoded for demo purposes
  const user = {
    name: "Alex Learner",
    isPremium: false,
  };

  return (
    <header className="h-16 border-b border-[var(--sidebar-border)] bg-[var(--background)] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">{user.name}</div>
            <div className={`text-xs ${user.isPremium ? 'text-amber-500' : 'text-gray-500'}`}>
              {user.isPremium ? 'Premium Member' : 'Free Plan'}
            </div>
          </div>
          <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-800">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
