"use client";

import React, { useState } from "react";
import type { PresentationSlide as SlideType } from "@/lib/data";

// Copy riêng (không import từ LessonStepFlow.tsx) để tránh đụng vào luồng học của học sinh.
function stripIPA(text: string): string {
  return text?.replace(/[→].*$/, '').replace(/\/[^/]*\//g, '').replace(/\s+/g, ' ').trim();
}

function speak(text: string, lang: string = 'en-US') {
  if (!text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(stripIPA(text));
  u.lang = lang;
  window.speechSynthesis.speak(u);
}

function SpeakerButton({ text, lang, className = '' }: { text: string; lang?: string; className?: string }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text, lang); }}
      className={`flex-shrink-0 text-blue-400 hover:text-blue-600 transition-colors ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    </button>
  );
}

function VocabSlide({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
      {data.map((item, idx) => {
        const isZH = !!item.hanzi && !item.word;
        return (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col items-center text-center">
            {(item.type || item.type_short) && (
              <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 bg-indigo-100 text-indigo-700 uppercase tracking-wide">
                {isZH ? item.type : (item.type_short || item.type)}
              </span>
            )}
            <div className="flex items-center gap-2 mb-1">
              <div className="text-2xl font-bold text-blue-600">{item.hanzi || item.word}</div>
              <SpeakerButton text={item.hanzi || item.word} lang={isZH ? 'zh-CN' : 'en-US'} className="w-5 h-5" />
            </div>
            {item.pinyin && <div className="text-sm text-indigo-500 font-medium mb-1">{item.pinyin}</div>}
            {item.ipa && <div className="text-sm text-emerald-500 font-mono mb-1">{item.ipa}</div>}
            <div className="text-base text-slate-600 mb-3">{item.meaning}</div>
            {(item.example_en || item.example_zh) && (
              <div className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg w-full">
                <div className="font-medium">{item.example_en || item.example_zh}</div>
                {item.example_py && <div className="text-indigo-400 text-xs mt-1">{item.example_py}</div>}
                {item.example_vi && <div className="text-blue-600/80 text-xs mt-1">{item.example_vi}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GrammarSlide({ data }: { data: any }) {
  const examples = data.examples || data.practiceList || [];
  return (
    <div className="max-w-3xl w-full space-y-4">
      <div className="bg-blue-600 text-white p-8 rounded-2xl">
        <div className="text-sm font-semibold uppercase tracking-widest text-blue-200 mb-2">Kiến thức</div>
        <h2 className="text-3xl font-bold">{data.title}</h2>
        {data.desc && <p className="text-blue-100 mt-3 text-lg leading-relaxed">{data.desc}</p>}
      </div>

      {data.formula?.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {data.formula.map((f: any, idx: number) => (
              <React.Fragment key={idx}>
                <span className={`px-4 py-2 rounded-xl border-2 font-semibold text-base ${f.classes}`}>{f.text}</span>
                {idx < data.formula.length - 1 && <span className="text-slate-300 font-bold">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {examples.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          {examples.map((ex: any, idx: number) => {
            const text = ex.en || ex.correct;
            return (
              <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{idx + 1}</span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{text}</div>
                  {ex.vi && <div className="text-slate-400 text-sm">{ex.vi}</div>}
                  {ex.meaning && <div className="text-slate-400 text-sm">{ex.meaning}</div>}
                </div>
                <SpeakerButton text={text} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DialogueSlide({ data }: { data: any }) {
  const lines = data.lines || [];
  const speakers = Array.from(new Set(lines.map((l: any) => l.speaker)));
  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{data.title}</h2>
      <div className="space-y-4">
        {lines.map((line: any, idx: number) => {
          const text = line.en || line.zh;
          const isA = line.speaker === speakers[0];
          const speakerName = (line.speaker === 'A' || line.speaker === 'B') ? `Nhân vật ${line.speaker}` : line.speaker;
          return (
            <div key={idx} className={`flex ${isA ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 ${isA ? 'bg-blue-50 border border-blue-100 rounded-tl-sm' : 'bg-slate-100 border border-slate-200 rounded-tr-sm'}`}>
                <div className={`font-bold mb-1 text-xs ${isA ? 'text-blue-600' : 'text-slate-500'}`}>{speakerName}</div>
                <div className="flex items-center gap-2">
                  <div className="text-slate-800 font-medium text-base">{text}</div>
                  <SpeakerButton text={text} lang={line.zh ? 'zh-CN' : 'en-US'} />
                </div>
                {line.py && <div className="text-indigo-400 text-sm mt-1">{line.py}</div>}
                {line.vi && <div className={`text-sm mt-1 ${isA ? 'text-blue-500/80' : 'text-slate-500'}`}>{line.vi}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SKILL_LABEL: Record<string, { text: string; classes: string }> = {
  reading: { text: 'Reading', classes: 'bg-emerald-100 text-emerald-700' },
  listening: { text: 'Listening', classes: 'bg-amber-100 text-amber-700' },
  writing: { text: 'Writing', classes: 'bg-purple-100 text-purple-700' },
  speaking: { text: 'Speaking', classes: 'bg-rose-100 text-rose-700' },
};

function SkillSlide({ type, data }: { type: 'reading' | 'listening' | 'writing' | 'speaking'; data: any }) {
  const label = SKILL_LABEL[type];
  const bodyText = data.passage || data.transcript || data.prompt;
  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{data.title}</h2>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex-shrink-0 ${label.classes}`}>{label.text}</span>
      </div>

      {data.cueCard && (
        <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl mb-4">
          <div className="font-bold text-slate-800 mb-2">{data.cueCard.topic}</div>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            {data.cueCard.bullets?.map((b: string, idx: number) => <li key={idx}>{b}</li>)}
          </ul>
        </div>
      )}

      {bodyText && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 leading-relaxed mb-4 whitespace-pre-line flex items-start gap-2">
          <div className="flex-1">{bodyText}</div>
          <SpeakerButton text={bodyText} />
        </div>
      )}

      {data.questions?.length > 0 && (
        <div className="space-y-2 mb-4">
          {data.questions.map((q: any, idx: number) => {
            const qText = typeof q === 'string' ? q : q.question;
            return (
              <div key={idx} className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-slate-800 font-medium">{qText}</div>
                <SpeakerButton text={qText} />
              </div>
            );
          })}
        </div>
      )}

      {data.sampleAnswer && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 whitespace-pre-line">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Đáp án mẫu</div>
          {data.sampleAnswer}
        </div>
      )}
    </div>
  );
}

function MCOrFillBlankCard({ q }: { q: any }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="font-semibold text-slate-800 mb-3">{q.question}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {q.options?.map((opt: string, idx: number) => {
          const isCorrect = opt === q.correct;
          let cls = 'bg-slate-50 border-slate-200 text-slate-700';
          if (revealed) {
            cls = isCorrect ? 'bg-green-50 border-green-400 text-green-700' : 'bg-white border-slate-100 text-slate-300';
          }
          return (
            <div key={idx} className={`px-3 py-2 rounded-lg border text-sm font-medium ${cls}`}>
              {revealed && isCorrect && '✓ '}{opt}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setRevealed((r) => !r)}
        className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
      >
        {revealed ? 'Ẩn đáp án' : 'Hiện đáp án'}
      </button>
      {revealed && q.explanation && (
        <div className="mt-2 text-sm text-slate-500">{q.explanation}</div>
      )}
    </div>
  );
}

function DragDropCard({ q }: { q: any }) {
  const [revealedIdx, setRevealedIdx] = useState<Set<number>>(new Set());
  const toggle = (idx: number) => {
    setRevealedIdx((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="font-semibold text-slate-800 mb-3">{q.question}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.pairs?.map((p: any, idx: number) => (
          <button
            key={idx}
            onClick={() => toggle(idx)}
            className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-left"
          >
            <span className="font-medium text-slate-800">{p.en}</span>
            <span className="text-sm text-blue-600">{revealedIdx.has(idx) ? p.vi : 'Hiện nghĩa'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Copy riêng (không import từ KhaiMonClient.tsx) — đúng convention của file này.
function KhaiMonSoundTable({ rows }: { rows: any[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 my-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Thanh</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Pinyin</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Chữ Hán</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Nghĩa</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b last:border-0 border-slate-50">
              <td className="px-4 py-2 text-slate-400 text-xs">{row.tone}</td>
              <td className="px-4 py-2 font-mono text-lg text-indigo-600 font-semibold">{row.pinyin}</td>
              <td className="px-4 py-2 text-xl text-slate-800">{row.hanzi}</td>
              <td className="px-4 py-2 text-slate-600">{row.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KhaiMonSectionBlock({ section }: { section: any }) {
  if (section.type === "text" && section.body) {
    const parts = section.body.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
        {parts.map((part: string, i: number) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  }
  if (section.type === "sound_table" && section.rows) {
    return <KhaiMonSoundTable rows={section.rows} />;
  }
  if (section.type === "note" && section.body) {
    return (
      <div className="my-3 flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
        <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
        <div>
          {section.label && <p className="font-semibold text-amber-800 text-sm mb-1">{section.label}</p>}
          <p className="text-amber-700 text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      </div>
    );
  }
  if (section.type === "comparison" && section.vietnamese && section.difference) {
    return (
      <div className="my-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-500">🇻🇳</span>
          <p className="font-semibold text-blue-800 text-sm">So sánh tiếng Việt</p>
        </div>
        <p className="text-blue-600 text-sm font-medium mb-1">{section.vietnamese}</p>
        <p className="text-blue-700 text-sm leading-relaxed whitespace-pre-line">{section.difference}</p>
      </div>
    );
  }
  return null;
}

function KhaiMonSlide({ data }: { data: { sections?: any[]; group?: any; instruction?: string } }) {
  return (
    <div className="max-w-2xl w-full space-y-6 max-h-[80vh] overflow-y-auto">
      {data.sections && data.sections.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-2">
          {data.sections.map((section, i) => <KhaiMonSectionBlock key={i} section={section} />)}
        </div>
      )}
      {data.group && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          {data.instruction && <p className="text-sm text-slate-500 italic mb-4">{data.instruction}</p>}
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{data.group.label}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.group.words.map((word: any, wi: number) => (
              <div key={wi} className="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-100 bg-white">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{wi + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg text-slate-800 font-medium">{word.hanzi}</span>
                    <span className="text-sm text-indigo-500 font-mono">{word.pinyin}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{word.meaning}</p>
                </div>
                <SpeakerButton text={word.hanzi} lang="zh-CN" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuizSlide({ data }: { data: any[] }) {
  return (
    <div className="max-w-2xl w-full space-y-3 max-h-[80vh] overflow-y-auto">
      {data.map((q, idx) => (
        q.type === 'drag_drop'
          ? <DragDropCard key={idx} q={q} />
          : <MCOrFillBlankCard key={idx} q={q} />
      ))}
    </div>
  );
}

export default function PresentationSlide({ slide }: { slide: SlideType }) {
  switch (slide.type) {
    case 'vocab':
      return <VocabSlide data={slide.data} />;
    case 'grammar':
      return <GrammarSlide data={slide.data} />;
    case 'dialogue':
      return <DialogueSlide data={slide.data} />;
    case 'reading':
    case 'listening':
    case 'writing':
    case 'speaking':
      return <SkillSlide type={slide.type} data={slide.data} />;
    case 'quiz':
      return <QuizSlide data={slide.data} />;
    case 'khaimon':
      return <KhaiMonSlide data={slide.data} />;
    default:
      return null;
  }
}
