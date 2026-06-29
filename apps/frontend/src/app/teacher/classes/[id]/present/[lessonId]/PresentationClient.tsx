"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import PresentationSlide from "@/components/teacher/presentation/PresentationSlide";
import type { PresentationSlide as SlideType } from "@/lib/data";

export default function PresentationClient({
  slides,
  lessonTitle,
  classId,
}: {
  slides: SlideType[];
  lessonTitle: string;
  classId: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    router.push(`/teacher/classes/${classId}`);
  }, [router, classId]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, exit]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const slide = slides[currentIndex];

  return (
    <div className="fixed inset-0 bg-slate-100 flex flex-col z-50">
      {/* Top bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={exit} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors flex-shrink-0" title="Thoát trình chiếu">
            <X className="w-5 h-5" />
          </button>
          <div className="font-semibold text-slate-800 truncate">{lessonTitle}</div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-medium text-slate-500">{currentIndex + 1} / {slides.length}</span>
          <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" title="Toàn màn hình">
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        {slide && <PresentationSlide slide={slide} />}
      </div>

      {/* Bottom controls */}
      <div className="bg-white border-t px-4 py-4 flex items-center justify-center gap-4 flex-shrink-0">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Trước
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === slides.length - 1}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Tiếp theo <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
