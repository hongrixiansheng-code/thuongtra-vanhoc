"use client";

import { Volume2, Play } from "lucide-react";
import { useState } from "react";

export function AudioButton({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    setIsPlaying(true);
    // Simulate audio playing
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return (
    <button
      onClick={playAudio}
      className={`p-2 rounded-full transition-all duration-300 ${
        isPlaying 
          ? "bg-indigo-100 text-indigo-600 scale-110" 
          : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/30"
      }`}
      aria-label="Play audio"
    >
      <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );
}

export function VocabularyItem({ word, translation, pinyin }: { word: string, translation: string, pinyin?: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow mb-3 hover-lift">
      <div className="flex items-center gap-4">
        <AudioButton text={word} />
        <div>
          <div className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-baseline gap-2">
            {word}
            {pinyin && <span className="text-sm font-normal text-gray-500">{pinyin}</span>}
          </div>
          <div className="text-gray-600 dark:text-gray-400">{translation}</div>
        </div>
      </div>
    </div>
  );
}

export function LessonText({ title, content }: { title: string, content: string[] }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Play className="w-4 h-4" />
        </span>
        {title}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-lg leading-relaxed space-y-4">
        {content.map((paragraph, idx) => (
          <p key={idx} className="text-gray-700 dark:text-gray-300">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
