"use client";

import { Check, Zap, Sparkles } from "lucide-react";

export default function Paywall() {
  const features = [
    "Unlimited access to all premium lessons",
    "Advanced AI pronunciation feedback",
    "Offline mode for learning anywhere",
    "Personalized learning paths",
    "Ad-free experience"
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 w-full max-w-2xl rounded-3xl p-8 md:p-12 text-center border border-indigo-100 dark:border-indigo-900/50 shadow-xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-32 h-32 text-indigo-600" />
        </div>
        
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6 text-white shadow-lg animate-pulse-slow">
          <Zap className="w-8 h-8" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Unlock Your Full Potential
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          You&apos;ve discovered a premium feature! Upgrade to Pro to access our advanced learning tools and accelerate your progress.
        </p>

        <div className="text-left bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block shadow-sm">
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-1 rounded-full text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="hover-lift px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all">
            Upgrade to Premium
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors">
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
}
