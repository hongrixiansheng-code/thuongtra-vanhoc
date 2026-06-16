"use client";

import React, { useState, useMemo, useEffect } from "react";
import { pinyin } from 'pinyin-pro';
import { VocabDetailModal } from '@/components/legacy/VocabTab';

function playSound(type: 'correct' | 'wrong') {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);      // C5
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch(e) {
    console.log('Audio not supported');
  }
}

// ==========================================
// Speech Context — cài đặt giọng đọc chung
// ==========================================
interface SpeechSettings {
  rate: number;
  voiceURI: string;
}

const SpeechContext = React.createContext<{
  settings: SpeechSettings;
  speak: (text: string, lang?: string, onEnd?: () => void) => void;
}>({
  settings: { rate: 1.0, voiceURI: '' },
  speak: () => {}
});

const SPEED_OPTIONS = [
  { rate: 0.5,  icon: '🦥', label: 'Rất chậm' },
  { rate: 0.75, icon: '🐢', label: 'Chậm' },
  { rate: 1.0,  icon: '🧘', label: 'Bình thường' },
  { rate: 1.5,  icon: '🚀', label: 'Nhanh' },
  { rate: 2.0,  icon: '💥', label: 'Rất nhanh' },
];

interface LessonStepFlowProps {
  vocabItems: any[];
  grammarItems: any[];
  dialogueItems: any[];
  exerciseItems: any[];
  lessonTitle: string;
  lessonId?: string;
  nextLessonTitle?: string;
  onComplete?: (score: number) => void;
  onBack?: () => void;
}

type StepType = "vocab" | "mini-test" | "grammar" | "dialogue" | "final-test" | "completion";

interface Step {
  id: string;
  type: StepType;
  data?: any;
}

// Helpers
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function LessonStepFlow({
  vocabItems,
  grammarItems,
  dialogueItems,
  exerciseItems,
  lessonTitle,
  lessonId,
  nextLessonTitle,
  onComplete,
  onBack,
}: LessonStepFlowProps) {
  // Speech settings
  const [speechRate, setSpeechRate] = useState(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

  useEffect(() => {
    const loadVoices = () => {
      const isZH = vocabItems?.[0]?.hanzi && !vocabItems?.[0]?.word;
      const available = window.speechSynthesis.getVoices()
        .filter(v => isZH ? v.lang.startsWith('zh') : v.lang.startsWith('en'));
      setVoices(available);
      if (available.length > 0 && !selectedVoiceURI) {
        setSelectedVoiceURI(available[0].voiceURI);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const isZH = vocabItems?.[0]?.hanzi && !vocabItems?.[0]?.word;
  const defaultLang = isZH ? 'zh-CN' : 'en-US';
  const speak = (text: string, lang = defaultLang, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = speechRate;
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
    if (voice) u.voice = voice;
    if (onEnd) u.onend = onEnd;
    window.speechSynthesis.speak(u);
  };

  // 1. Build steps
  const steps = useMemo(() => {
    const s: Step[] = [];
    let batchCount = 0;

    // Vocab + Mini-test
    for (let i = 0; i < vocabItems.length; i += 5) {
      const batch = vocabItems.slice(i, i + 5);
      s.push({ type: "vocab", id: `vocab-${i}`, data: batch });
      batchCount++;

      if (batchCount % 2 === 0) {
        // Lấy 10 từ của 2 batch vừa học
        const startIdx = Math.max(0, i - 4);
        const recentVocab = vocabItems.slice(startIdx, i + 5);
        
        // Tạo 3 câu hỏi MC từ các từ vừa học
        const questions = shuffleArray(recentVocab).slice(0, 3).map((item: any) => {
          // Lấy nghĩa chính (trước dấu phẩy đầu tiên) để tránh trùng lặp
          const mainMeaning = item.meaning?.split(',')[0].trim() || item.meaning;

          // Lọc từ sai: loại bỏ từ có nghĩa chính giống hoặc gần giống
          const wrongPool = vocabItems.filter((v: any) => {
            const vKey = v.hanzi || v.word;
            const itemKey = item.hanzi || item.word;
            if (vKey === itemKey) return false;
            const vMainMeaning = v.meaning?.split(',')[0].trim() || '';
            // Loại bỏ nếu nghĩa chính giống nhau
            if (vMainMeaning === mainMeaning) return false;
            // Loại bỏ nếu nghĩa chứa nhau (ví dụ: "bố" và "bố, ba, cha")
            if (mainMeaning.includes(vMainMeaning) || vMainMeaning.includes(mainMeaning)) return false;
            return true;
          });

          const wrongs = shuffleArray(wrongPool).slice(0, 3).map((v: any) =>
            v.meaning?.split(',')[0].trim() || v.meaning
          );

          // Nếu không đủ 3 đáp án sai → dùng nghĩa đầy đủ
          if (wrongs.length < 3) {
            const fallbackWrongs = shuffleArray(wrongPool).slice(0, 3).map((v: any) => v.meaning);
            return {
              type: 'multiple_choice',
              question: `"${item.hanzi || item.word}" có nghĩa là gì?`,
              options: shuffleArray([item.meaning, ...fallbackWrongs]),
              correct: item.meaning,
              explanation: `"${item.hanzi || item.word}" = ${item.meaning}`
            };
          }

          const options = shuffleArray([mainMeaning, ...wrongs]);
          return {
            type: 'multiple_choice',
            question: `"${item.hanzi || item.word}" có nghĩa là gì?`,
            options,
            correct: mainMeaning,
            explanation: `"${item.hanzi || item.word}" = ${item.meaning}`
          };
        });

        if (questions.length > 0) {
          s.push({ type: "mini-test", id: `mini-test-${i}`, data: questions });
        }
      }
    }

    // Grammar
    grammarItems.forEach((g, i) => {
      s.push({ type: "grammar", id: `grammar-${i}`, data: g });
    });

    // Dialogue
    dialogueItems.forEach((d, i) => {
      s.push({ type: "dialogue", id: `dialogue-${i}`, data: d });
    });

    // Final test
    if (vocabItems.length > 0) {
      const allVocab = shuffleArray([...vocabItems]);

      // 2 câu MC: hỏi nghĩa từ vựng random
      const mcQuestions = allVocab.slice(0, 2).map((item: any) => {
        const wrongPool = vocabItems.filter((v: any) => (v.hanzi || v.word) !== (item.hanzi || item.word));
        const wrongs = shuffleArray(wrongPool).slice(0, 3).map((v: any) => v.meaning);
        return {
          type: 'multiple_choice',
          question: `"${item.hanzi || item.word}" có nghĩa là gì?`,
          options: shuffleArray([item.meaning, ...wrongs]),
          correct: item.meaning,
          explanation: `"${item.hanzi || item.word}" = ${item.meaning}`
        };
      });

      // 2 câu fill_blank: tạo từ practiceList của grammar random
      const grammarPool = shuffleArray([...grammarItems]);
      const fbQuestions = grammarPool.slice(0, 2).map((g: any) => {
        // Lấy 1 câu ví dụ từ practiceList, đục lỗ 1 từ quan trọng
        const example = g.practiceList?.[Math.floor(Math.random() * (g.practiceList?.length || 1))];
        const sentence = example?.correct || '';

        let targetWord = '';
        let blanked = sentence;
        let wrongOptions: string[] = [];

        if (isZH) {
          const vocabWords = vocabItems.map((v: any) => v.hanzi).filter(Boolean);
          const formulaWords = (g.formula || []).flatMap((f: any) =>
            f.text.split(/[\s\/+→]/).filter((w: string) => /[\u4e00-\u9fa5]/.test(w))
          );
          
          targetWord = formulaWords.find((w: string) => sentence.includes(w)) || 
                       vocabWords.find((w: string) => sentence.includes(w)) || 
                       sentence.charAt(1) || sentence.charAt(0);
          
          if (targetWord) {
            blanked = sentence.replace(targetWord, '___');
          }
          wrongOptions = shuffleArray(vocabItems.map((v: any) => v.hanzi).filter(Boolean));
        } else {
          const formulaWords = (g.formula || []).flatMap((f: any) =>
            f.text.split(/[\s\/+→]/).filter((w: string) => w.length > 1 && /^[a-zA-Z]+$/.test(w))
          );
          const wordsInSentence = sentence.split(' ').map((w: string) => w.replace(/[.,!?]/g, ''));
          targetWord = formulaWords.find((w: string) =>
            wordsInSentence.some((sw: string) => sw.toLowerCase() === w.toLowerCase())
          ) || wordsInSentence.find((w: string) => w.length > 2) || wordsInSentence[1] || wordsInSentence[0] || '';

          if (targetWord) {
            blanked = sentence.replace(new RegExp(`\\b${targetWord}\\b`, 'i'), '___');
          }

          wrongOptions = shuffleArray(
            grammarItems
              .filter((og: any) => og !== g)
              .flatMap((og: any) =>
                (og.formula || []).flatMap((f: any) =>
                  f.text.split(/[\s\/+→]/).filter((w: string) => w.length > 1 && /^[a-zA-Z]+$/.test(w))
                )
              )
          );
        }
        if (wrongOptions.length < 3) {
          wrongOptions = [...wrongOptions, ...shuffleArray(vocabItems.map((v: any) => v.hanzi || v.word))];
        }
        wrongOptions = Array.from(new Set(wrongOptions.filter((w: string) => w && w !== targetWord))).slice(0, 3);

        return {
          type: 'fill_blank',
          question: blanked || `___ (${g.title})`,
          options: shuffleArray([targetWord, ...wrongOptions].filter(Boolean).slice(0, 4)),
          correct: targetWord,
          explanation: g.desc || ''
        };
      });

      // 2 câu drag_drop: ghép từ - nghĩa từ vocab random
      const ddQuestions = [0, 1].map((i) => {
        const startIdx = i * 4;
        const batch = shuffleArray([...vocabItems]).slice(startIdx, startIdx + 4);
        return {
          type: 'drag_drop',
          question: isZH ? 'Ghép từ tiếng Trung với nghĩa tiếng Việt' : 'Ghép từ tiếng Anh với nghĩa tiếng Việt',
          pairs: batch.map((v: any) => ({ en: v.hanzi || v.word, vi: v.meaning }))
        };
      });

      // Xen kẽ MC → FB → DD → MC → FB → DD
      const finalExercises = [
        mcQuestions[0], fbQuestions[0], ddQuestions[0],
        mcQuestions[1], fbQuestions[1], ddQuestions[1],
      ].filter(Boolean);

      s.push({ type: "final-test", id: "final-test", data: finalExercises });
    }

    // Completion
    s.push({ type: "completion", id: "completion" });

    return s;
  }, [vocabItems, grammarItems, dialogueItems, exerciseItems]);

  // Global State
  const [currentStep, setCurrentStep] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const step = steps[currentStep];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleMiniTestFinish = (correctCount: number, questionCount: number) => {
    setTotalCorrect((p) => p + correctCount);
    setTotalQuestions((p) => p + questionCount);
    handleNextStep();
  };

  const handleFinalTestFinish = (correctCount: number, questionCount: number) => {
    setTotalCorrect((p) => p + correctCount);
    setTotalQuestions((p) => p + questionCount);
    handleNextStep();
  };

  const handleComplete = async () => {
    const score = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 100;

    // Lưu progress lên DB
    if (lessonId) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId, score })
        });
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
    }

    if (onComplete) onComplete(score);
  };

  if (!step) return null;

  return (
    <SpeechContext.Provider value={{ settings: { rate: speechRate, voiceURI: selectedVoiceURI }, speak }}>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Topbar */}
        <div className="bg-white border-b sticky top-0 z-10 px-4 py-3 flex items-center justify-between shadow-sm gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : window.history.back()}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              ←
            </button>
            <div className="font-semibold text-slate-800">{lessonTitle}</div>
          </div>

          <div className="flex items-center gap-3 ml-auto">

            {/* Chọn giọng đọc */}
            {voices.length > 1 && (
              <select
                value={selectedVoiceURI}
                onChange={e => setSelectedVoiceURI(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:border-blue-400 max-w-[130px] hidden sm:block"
              >
                {voices.map(v => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name.replace('Microsoft ', '').replace(' Online (Natural)', '')}
                  </option>
                ))}
              </select>
            )}

            {/* 5 nút tốc độ */}
            <div className="flex items-center gap-1">
              {SPEED_OPTIONS.map(opt => (
                <button
                  key={opt.rate}
                  onClick={() => setSpeechRate(opt.rate)}
                  title={`${opt.label} (${opt.rate}x)`}
                  className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all
                    ${speechRate === opt.rate
                      ? 'bg-blue-100 ring-2 ring-blue-400 scale-110'
                      : 'hover:bg-slate-100 opacity-50 hover:opacity-100'
                    }`}
                >
                  {opt.icon}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                {currentStep + 1} / {steps.length}
              </span>
            </div>

          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
          {step.type === "vocab" && (
            <VocabStep data={step.data} onNext={handleNextStep} onPrev={currentStep > 0 ? () => setCurrentStep(prev => prev - 1) : undefined} />
          )}
          {step.type === "mini-test" && (
            <MiniTestStep data={step.data} onFinish={handleMiniTestFinish} />
          )}
          {step.type === "grammar" && (
            <GrammarStep data={step.data} isZH={isZH} onNext={handleNextStep} onPrev={currentStep > 0 ? () => setCurrentStep(prev => prev - 1) : undefined} />
          )}
          {step.type === "dialogue" && (
            <DialogueStep data={step.data} onNext={handleNextStep} onPrev={currentStep > 0 ? () => setCurrentStep(prev => prev - 1) : undefined} />
          )}
          {step.type === "final-test" && (
            <FinalTestStep data={step.data} onFinish={handleFinalTestFinish} />
          )}
          {step.type === "completion" && (
            <CompletionStep
              score={totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 100}
              lessonTitle={lessonTitle}
              nextLessonTitle={nextLessonTitle}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </SpeechContext.Provider>
  );
}

// ==========================================
// Sub-components for Steps
// ==========================================

function VocabStep({ data, onNext, onPrev }: { data: any[]; onNext: () => void; onPrev?: () => void }) {
  const { speak } = React.useContext(SpeechContext);
  const isZH = data?.[0]?.hanzi && !data?.[0]?.word;
  const [detailWord, setDetailWord] = useState<any | null>(null);

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex justify-between items-center">
        <span>Từ vựng mới</span>
        {isZH && <span className="text-sm font-normal text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full"><i className="fa-solid fa-mouse-pointer mr-2"></i>Bấm vào thẻ từ để luyện viết chữ</span>}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {data.map((item, idx) => (
          <div key={idx} 
               onClick={() => setDetailWord(item)}
               className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center relative cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all group">
            <button
              onClick={(e) => { e.stopPropagation(); speak(item.hanzi || item.word); }}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
            {(item.type || item.type_short) && (
              <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 bg-indigo-100 text-indigo-700 uppercase tracking-wide">
                {isZH ? item.type : (item.type_short || item.type)}
              </span>
            )}
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {item.hanzi || item.word}
            </div>
            {item.pinyin && (
              <div className="text-sm text-indigo-500 font-medium mb-1">{item.pinyin}</div>
            )}
            {item.ipa && (
              <div className="text-sm text-emerald-500 font-mono mb-1">{item.ipa}</div>
            )}
            <div className="text-lg text-slate-600 mb-4">{item.meaning}</div>
            {(item.example_en || item.example_zh) && (
              <div
                onClick={(e) => { e.stopPropagation(); speak(item.example_en || item.example_zh); }}
                className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg w-full cursor-pointer hover:bg-blue-100 transition-colors group/ex mt-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-blue-400 group-hover:text-blue-600">Nhấn để nghe ví dụ</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                </div>
                <div>{item.example_en || item.example_zh}</div>
                {(item.example_py || item.example_zh) && (
                  <div className="text-indigo-400 text-xs mb-1 font-medium">
                    {item.example_py || (item.example_zh ? pinyin(item.example_zh) : '')}
                  </div>
                )}
                <div className="text-blue-600/80">{item.example_vi}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {detailWord && <VocabDetailModal word={detailWord} onClose={() => setDetailWord(null)} />}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-100 p-4 -mx-4 mt-8 flex gap-3">
        {onPrev && (
          <button
            onClick={onPrev}
            className="flex-shrink-0 px-5 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            ← Trước
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
        >
          Tiếp theo →
        </button>
      </div>
    </div>
  );
}

function MiniTestStep({ data, onFinish }: { data: any[]; onFinish: (c: number, t: number) => void }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = data[qIndex];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const isCorrect = opt === currentQ.correct;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
    setTimeout(() => {
      if (qIndex < data.length - 1) {
        setQIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        onFinish(correctCount + (isCorrect ? 1 : 0), data.length);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-blue-50 p-8">
        <div className="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-blue-100 text-blue-700 mb-4 text-center">
          Mini Test - Câu {qIndex + 1}/{data.length}
        </div>
        <div className="text-center mb-8">
          {/[\u4e00-\u9fa5]/.test(currentQ.question) && (
            <div className="text-indigo-400 text-lg font-medium mb-1">
              {pinyin(currentQ.question)}
            </div>
          )}
          <h3 className="text-2xl font-bold text-blue-700">
            {currentQ.question}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt: string, idx: number) => {
            const isSelected = selected === opt;
            const isCorrectOpt = opt === currentQ.correct;
            let btnClass = "bg-white border-2 border-blue-100 text-slate-700 hover:border-blue-400 hover:bg-blue-50";
            if (selected) {
              if (isCorrectOpt) {
                btnClass = "bg-green-50 border-2 border-green-400 text-green-700";
              } else if (isSelected) {
                btnClass = "bg-red-50 border-2 border-red-400 text-red-700";
              } else {
                btnClass = "bg-white border-2 border-blue-50 text-slate-300 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className={`w-full text-center p-4 rounded-2xl font-semibold transition-all text-base ${btnClass}`}
              >
                {selected && isCorrectOpt && (
                  <span className="mr-2">✓</span>
                )}
                {selected && isSelected && !isCorrectOpt && (
                  <span className="mr-2">✗</span>
                )}
                <div>{opt}</div>
                {/[\u4e00-\u9fa5]/.test(opt) && (
                  <div className="text-indigo-400 text-xs mt-1 font-medium">
                    {pinyin(opt)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className={`mt-6 p-4 rounded-2xl text-center font-semibold border ${selected === currentQ.correct ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            {selected === currentQ.correct ? "Chính xác!" : "Sai rồi!"}
            <div className="text-sm mt-1 opacity-80">{currentQ.explanation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function GrammarStep({ data, isZH, onNext, onPrev }: { data: any; isZH?: boolean; onNext: () => void; onPrev?: () => void }) {
  const { speak } = React.useContext(SpeechContext);

  const getFormulaText = (text: string) => {
    if (!isZH) return text;
    return text
      .replace(/\bS\b/g, 'Chủ ngữ')
      .replace(/\bV\b/g, 'Động từ')
      .replace(/\bAdj\b/g, 'Tính từ')
      .replace(/\bN\b/g, 'Danh từ')
      .replace(/\bO\b/g, 'Tân ngữ')
      .replace(/\bPron\b/g, 'Đại từ');
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 space-y-4">
        
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Ngữ pháp</div>
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <p className="text-blue-100 mt-2 text-sm leading-relaxed">{data.desc}</p>
        </div>

        {/* Công thức */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            📐 Công thức
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {data.formula?.map((f: any, idx: number) => (
              <React.Fragment key={idx}>
                <span className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm ${f.classes}`}>
                  {getFormulaText(f.text)}
                </span>
                {idx < data.formula.length - 1 && (
                  <span className="text-slate-300 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Ví dụ */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            💬 Ví dụ thực tế
          </div>
          <div className="space-y-3">
            {data.practiceList?.map((p: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-800">{p.correct}</div>
                  {(p.pinyin || (p.correct && /[\u4e00-\u9fa5]/.test(p.correct))) && (
                    <div className="text-indigo-400 text-xs font-medium">
                      {p.pinyin || pinyin(p.correct)}
                    </div>
                  )}
                  {p.meaning && <div className="text-slate-400 text-xs">{p.meaning}</div>}
                </div>
                <button
                  onClick={() => speak(p.correct)}
                  className="ml-auto text-green-400 hover:text-green-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-100 p-4 -mx-4 mt-6 flex gap-3">
        {onPrev && (
          <button
            onClick={onPrev}
            className="flex-shrink-0 px-5 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            ← Trước
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
        >
          Tiếp theo →
        </button>
      </div>
    </div>
  );
}

function DialogueStep({ data, onNext, onPrev }: { data: any; onNext: () => void; onPrev?: () => void }) {
  const { speak } = React.useContext(SpeechContext);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playingLine, setPlayingLine] = useState<number | null>(null);
  const timeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  const clearAllAudio = () => {
    window.speechSynthesis.cancel();
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    setIsPlayingAll(false);
    setPlayingLine(null);
  };

  // Dọn dẹp khi unmount hoặc chuyển bước
  React.useEffect(() => {
    return () => clearAllAudio();
  }, []);

  const handlePlayAll = () => {
    if (isPlayingAll) {
      clearAllAudio();
      return;
    }
    clearAllAudio();
    setIsPlayingAll(true);

    let delay = 0;
    data.lines?.forEach((line: any, idx: number) => {
      const t1 = setTimeout(() => {
        setPlayingLine(idx);
        speak(line.en || line.zh, line.zh ? 'zh-CN' : undefined);
      }, delay);
      timeoutsRef.current.push(t1);
      delay += 2500;
    });

    // Kết thúc
    const tEnd = setTimeout(() => {
      setIsPlayingAll(false);
      setPlayingLine(null);
    }, delay);
    timeoutsRef.current.push(tEnd);
  };

  const handlePlayLine = (line: any, idx: number) => {
    clearAllAudio();
    setPlayingLine(idx);
    speak(line.en || line.zh, line.zh ? 'zh-CN' : 'en-US', () => setPlayingLine(null));
  };

  const handleNext = () => {
    clearAllAudio();
    onNext();
  };

  const handlePrev = () => {
    clearAllAudio();
    if (onPrev) onPrev();
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col">
        
        {/* Header + nút đọc toàn bài */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">{data.title}</h2>
          <button
            onClick={handlePlayAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-shrink-0
              ${isPlayingAll
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isPlayingAll
                ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                : <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>
              }
            </svg>
            {isPlayingAll ? 'Dừng lại' : 'Nghe toàn bài'}
          </button>
        </div>

        {/* Các dòng hội thoại */}
        <div className="flex-1 overflow-y-auto space-y-4 px-2">
          {data.lines?.map((line: any, idx: number) => {
            const speakers = Array.from(new Set(data.lines.map((l: any) => l.speaker)));
            const isA = line.speaker === speakers[0];
            const isThisPlaying = playingLine === idx;
            const speakerName = (line.speaker === 'A' || line.speaker === 'B') ? `Nhân vật ${line.speaker}` : line.speaker;
            
            return (
              <div key={idx} className={`flex ${isA ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 transition-all
                  ${isThisPlaying
                    ? 'ring-2 ring-blue-400 shadow-md scale-[1.02]'
                    : ''
                  }
                  ${isA
                    ? 'bg-blue-50 border border-blue-100 rounded-tl-sm'
                    : 'bg-slate-100 border border-slate-200 rounded-tr-sm'
                  }`}>
                  <div className={`font-bold mb-1 text-xs ${isA ? 'text-blue-600' : 'text-slate-500'}`}>
                    {speakerName}
                  </div>
                  <div className="text-slate-800 font-medium text-base mb-1">{line.en || line.zh}</div>
                  {(line.py || line.zh) && (
                    <div className="text-indigo-400 text-sm mb-1 font-medium">
                      {line.py || pinyin(line.zh)}
                    </div>
                  )}
                  <div className={`text-sm ${isA ? 'text-blue-500/80' : 'text-slate-500'}`}>{line.vi}</div>
                  <button
                    onClick={() => handlePlayLine(line, idx)}
                    className={`mt-2 flex items-center gap-1 text-xs transition-colors
                      ${isThisPlaying ? 'text-blue-500' : 'text-slate-400 hover:text-blue-500'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                    {isThisPlaying ? 'Đang phát...' : 'Nghe'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-100 p-4 -mx-4 mt-6 flex gap-3">
        {onPrev && (
          <button
            onClick={handlePrev}
            className="flex-shrink-0 px-5 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            ← Trước
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
        >
          Tiếp theo →
        </button>
      </div>
    </div>
  );
}

function FinalTestStep({ data, onFinish }: { data: any[]; onFinish: (c: number, t: number) => void }) {
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQueue, setWrongQueue] = useState<any[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewCorrect, setReviewCorrect] = useState(0);

  const currentList = isReviewMode ? wrongQueue : data;
  const currentIdx = isReviewMode ? reviewIndex : qIndex;
  const currentEx = currentList[currentIdx];

  const handleNextQuestion = (isCorrect: boolean) => {
    if (!isReviewMode) {
      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      } else {
        setWrongQueue(prev => [...prev, data[qIndex]]);
      }
      if (qIndex < data.length - 1) {
        setQIndex(prev => prev + 1);
      } else {
        // Hết câu gốc
        if (wrongQueue.length > 0 || !isCorrect) {
          // Có câu sai → vào review mode
          setTimeout(() => setIsReviewMode(true), 300);
        } else {
          onFinish(correctCount + 1, data.length);
        }
      }
    } else {
      // Review mode
      if (isCorrect) setReviewCorrect(prev => prev + 1);
      if (reviewIndex < wrongQueue.length - 1) {
        setReviewIndex(prev => prev + 1);
      } else {
        onFinish(correctCount + reviewCorrect + (isCorrect ? 1 : 0), data.length + wrongQueue.length);
      }
    }
  };

  if (!currentEx) return null;

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full">
      {/* Header */}
      <div className="w-full max-w-2xl mb-6">
        {isReviewMode ? (
          <div className="text-center">
            <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full">
              🔄 Ôn lại câu sai — {reviewIndex + 1}/{wrongQueue.length}
            </span>
          </div>
        ) : (
          <div className="text-center">
            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full">
              Bài tập cuối — Câu {qIndex + 1}/{data.length}
            </span>
          </div>
        )}
        {/* Progress dots */}
        <div className="flex gap-2 justify-center mt-4">
          {data.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
              i < qIndex ? 'bg-blue-500' : i === qIndex ? 'bg-blue-300' : 'bg-slate-200'
            }`} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        {currentEx.type === "multiple_choice" || currentEx.type === "fill_blank" ? (
          <QuizQuestion ex={currentEx} onNext={handleNextQuestion} />
        ) : currentEx.type === "drag_drop" ? (
          <DragDropQuestion ex={currentEx} onNext={handleNextQuestion} />
        ) : null}
      </div>
    </div>
  );
}

function QuizQuestion({ ex, onNext }: { ex: any; onNext: (isCorrect: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const isCorrect = opt === ex.correct;
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => {
      onNext(isCorrect);
      setSelected(null);
    }, 1500);
  };

  const isFillBlank = ex.type === 'fill_blank';

  return (
    <div>
      {/* Nhãn loại câu hỏi */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest
          ${isFillBlank ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'}`}>
          <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px] font-black">
            {isFillBlank ? 'B' : 'A'}
          </span>
          {isFillBlank ? 'Điền vào chỗ trống' : 'Chọn đáp án đúng'}
        </div>
      </div>

      {/* Câu hỏi */}
      <div className="text-center mb-8">
        {/[\u4e00-\u9fa5]/.test(ex.question) && (
          <div className="text-indigo-400 text-lg font-medium mb-1">
            {pinyin(ex.question)}
          </div>
        )}
        <h3 className="text-2xl font-bold text-blue-700 leading-relaxed">
          {ex.question}
        </h3>
      </div>

      {/* Đáp án */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ex.options.map((opt: string, idx: number) => {
          const isSelected = selected === opt;
          const isCorrectOpt = opt === ex.correct;

          let btnClass = 'bg-white border-2 border-blue-100 text-slate-700 hover:border-blue-400 hover:bg-blue-50';
          if (selected) {
            if (isCorrectOpt) {
              btnClass = 'bg-green-50 border-2 border-green-500 text-green-700';
            } else if (isSelected) {
              btnClass = 'bg-red-50 border-2 border-red-400 text-red-700';
            } else {
              btnClass = 'bg-white border-2 border-slate-100 text-slate-300 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              className={`w-full text-center p-4 rounded-2xl font-semibold transition-all text-base ${btnClass}`}
            >
              {selected && isCorrectOpt && (
                <span className="mr-2">✓</span>
              )}
              {selected && isSelected && !isCorrectOpt && (
                <span className="mr-2">✗</span>
              )}
              <div>{opt}</div>
              {/[\u4e00-\u9fa5]/.test(opt) && (
                <div className="text-indigo-400 text-xs mt-1 font-medium">
                  {pinyin(opt)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selected && (
        <div className={`mt-6 p-4 rounded-2xl text-center font-semibold
          ${selected === ex.correct
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
          {selected === ex.correct ? '✓ Chính xác!' : '✗ Sai rồi!'}
          {ex.explanation && (
            <div className="text-sm mt-1 font-normal opacity-80">{ex.explanation}</div>
          )}
        </div>
      )}
    </div>
  );
}

function DragDropQuestion({ ex, onNext }: { ex: any; onNext: (isCorrect: boolean) => void }) {
  const [enList, setEnList] = useState<string[]>([]);
  const [viList, setViList] = useState<string[]>([]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedVi, setSelectedVi] = useState<string | null>(null);
  const [matchedEn, setMatchedEn] = useState<string[]>([]);

  useEffect(() => {
    setEnList(shuffleArray(ex.pairs.map((p: any) => p.en)));
    setViList(shuffleArray(ex.pairs.map((p: any) => p.vi)));
  }, [ex]);

  useEffect(() => {
    if (selectedEn && selectedVi) {
      const isMatch = ex.pairs.find((p: any) => p.en === selectedEn && p.vi === selectedVi);
      if (isMatch) {
        setMatchedEn((prev) => [...prev, selectedEn]);
        playSound('correct');
      } else {
        playSound('wrong');
      }
      setTimeout(() => {
        setSelectedEn(null);
        setSelectedVi(null);
      }, 300);
    }
  }, [selectedEn, selectedVi, ex.pairs]);

  useEffect(() => {
    if (matchedEn.length > 0 && matchedEn.length === ex.pairs.length) {
      setTimeout(() => {
        onNext(true); // Always true for drag drop completion
        setMatchedEn([]);
      }, 1000);
    }
  }, [matchedEn, ex.pairs.length, onNext]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-teal-600 text-white">
          <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px] font-black">C</span>
          Ghép đôi
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{ex.question}</h3>
      <div className="flex gap-8 justify-center">
        {/* EN Column */}
        <div className="flex flex-col gap-3 w-48">
          {enList.map((en, idx) => {
            const isMatched = matchedEn.includes(en);
            const isSelected = selectedEn === en;
            return (
              <button
                key={`en-${idx}`}
                disabled={isMatched}
                onClick={() => {
                  setSelectedEn(en);
                  window.speechSynthesis.cancel();
                  const u = new SpeechSynthesisUtterance(en);
                  u.lang = 'en-US';
                  u.rate = 0.85;
                  window.speechSynthesis.speak(u);
                }}
                className={`p-3 rounded-xl border-2 font-medium transition-all text-center
                  ${isMatched
                    ? "opacity-0 invisible"
                    : isSelected
                    ? "bg-blue-100 border-blue-500 text-blue-800 shadow-sm"
                    : "bg-white border-blue-100 text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                  }`}
              >
                <div>{en}</div>
                {/[\u4e00-\u9fa5]/.test(en) && (
                  <div className="text-indigo-500 text-xs mt-1 font-medium">
                    {pinyin(en)}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* VI Column */}
        <div className="flex flex-col gap-3 w-48">
          {viList.map((vi, idx) => {
            const enPair = ex.pairs.find((p: any) => p.vi === vi)?.en;
            const isMatched = enPair ? matchedEn.includes(enPair) : false;
            const isSelected = selectedVi === vi;
            return (
              <button
                key={`vi-${idx}`}
                disabled={isMatched}
                onClick={() => setSelectedVi(vi)}
                className={`p-3 rounded-xl border-2 font-medium transition-all text-center
                  ${isMatched
                    ? "opacity-0 invisible"
                    : isSelected
                    ? "bg-blue-100 border-blue-500 text-blue-800 shadow-sm"
                    : "bg-white border-blue-100 text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                  }`}
              >
                {vi}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CompletionStep({
  score,
  lessonTitle,
  nextLessonTitle,
  onComplete
}: {
  score: number;
  lessonTitle: string;
  nextLessonTitle?: string;
  onComplete: () => void;
}) {
  const passed = score >= 40;

  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md w-full overflow-hidden">

        {/* Header */}
        <div className={`p-8 ${passed ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
          <div className="text-5xl mb-3">{passed ? '🎉' : '💪'}</div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {passed ? 'Xuất sắc!' : 'Cố lên!'}
          </h2>
          <p className="text-blue-100 text-sm">
            {passed ? `Bạn đã hoàn thành ${lessonTitle}` : 'Hãy thử lại để đạt điểm cao hơn'}
          </p>
        </div>

        {/* Score */}
        <div className="px-8 py-6 border-b border-slate-100">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className={`text-4xl font-black ${passed ? 'text-blue-600' : 'text-slate-400'}`}>
                {score}%
              </div>
              <div className="text-xs text-slate-400 mt-1">Điểm của bạn</div>
            </div>
            <div className="w-px h-12 bg-slate-100"></div>
            <div className="text-center">
              <div className={`text-4xl font-black ${passed ? 'text-green-500' : 'text-slate-400'}`}>
                40%
              </div>
              <div className="text-xs text-slate-400 mt-1">Điểm tối thiểu</div>
            </div>
          </div>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${passed ? 'bg-blue-500' : 'bg-slate-300'}`}
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
        </div>

        {/* Unlock thông báo */}
        {passed && (
          <div className="px-8 py-5 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              🔓 Đã mở khóa
            </div>
            <div className="space-y-2">
              {nextLessonTitle && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-lg">📖</span>
                  <div className="text-left">
                    <div className="text-xs text-green-600 font-semibold">Bài học mới</div>
                    <div className="text-sm font-semibold text-slate-700">{nextLessonTitle}</div>
                  </div>
                  <span className="ml-auto text-green-500">✓</span>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-lg">📚</span>
                <div className="text-left">
                  <div className="text-xs text-blue-600 font-semibold">Từ điển</div>
                  <div className="text-sm font-semibold text-slate-700">20 từ mới được thêm vào từ điển</div>
                </div>
                <span className="ml-auto text-blue-500">✓</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-lg">🎯</span>
                <div className="text-left">
                  <div className="text-xs text-purple-600 font-semibold">Luyện tập</div>
                  <div className="text-sm font-semibold text-slate-700">Flashcard và quiz bài này</div>
                </div>
                <span className="ml-auto text-purple-500">✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="px-8 py-5 flex flex-col gap-3">
          {passed ? (
            <button
              onClick={onComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {nextLessonTitle ? `Học ${nextLessonTitle} →` : 'Về trang chủ →'}
            </button>
          ) : (
            <>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors"
              >
                Học lại bài này
              </button>
              <button
                onClick={onComplete}
                className="w-full border border-slate-200 text-slate-500 py-3 rounded-xl font-medium transition-colors hover:bg-slate-50"
              >
                Về trang chủ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
