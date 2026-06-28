"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Palette } from "lucide-react";

const ACCENT_COLORS = [
  { name: "amber", hex: "#fbbf24", label: "HSK 1" },
  { name: "emerald", hex: "#10b981", label: "HSK 2" },
  { name: "orange", hex: "#f97316", label: "HSK 3" },
  { name: "rose", hex: "#f43f5e", label: "HSK 4" },
  { name: "blue", hex: "#3b82f6", label: "HSK 5" },
  { name: "purple", hex: "#a855f7", label: "HSK 6" },
];

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState("system");
  const [accent, setAccent] = useState("amber");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("theme-accent") || "amber";
    setAccent(savedAccent);
    
    const savedMode = localStorage.getItem("theme-mode") || "system";
    setThemeState(savedMode);
  }, []);

  const changeAccent = (color: string) => {
    setAccent(color);
    document.documentElement.setAttribute("data-accent", color);
    localStorage.setItem("theme-accent", color);
  };

  const setTheme = (mode: string) => {
    setThemeState(mode);
    localStorage.setItem("theme-mode", mode);
    
    if (mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        title="Cài đặt Giao diện"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close the dropdown */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl z-50 p-4 animate-fade-in">
            
            {/* Dark/Light Mode */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">Giao diện (Theme)</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <Sun className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-medium">Sáng</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <Moon className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-medium">Tối</span>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all ${theme === 'system' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <Monitor className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-medium">Auto</span>
                </button>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800 mb-4" />

            {/* Accent Colors */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">Màu nhấn (Accent)</h3>
              <div className="grid grid-cols-3 gap-2">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => changeAccent(c.name)}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${accent === c.name ? 'border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className="w-6 h-6 rounded-full mb-1 shadow-sm" style={{ backgroundColor: c.hex }}></div>
                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
