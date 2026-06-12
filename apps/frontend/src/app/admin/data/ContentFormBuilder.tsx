"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export function ContentFormBuilder({ 
  contentType, 
  initialData, 
  onChange 
}: { 
  contentType: string, 
  initialData?: any, 
  onChange: (data: string) => void 
}) {
  const [data, setData] = useState<any>(initialData || {});

  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) {
      if (contentType === "THEORY") {
        setData({ word: "", meaning: "", hanzi: "", pinyin: "", type: "noun", example_zh: "", example_vi: "" });
      } else if (contentType === "GRAMMAR") {
        setData({ title: "", desc: "", formula: [], practiceList: [] });
      } else if (contentType === "DIALOGUE") {
        setData({ title: "", lines: [] });
      } else if (contentType === "EXERCISE") {
        setData({ type: "multiple_choice", question: "", options: ["", "", "", ""], correct: "", explanation: "" });
      } else {
        setData({});
      }
    } else {
      setData(initialData);
    }
  }, [contentType, initialData]);

  // Notify parent whenever data changes
  useEffect(() => {
    onChange(JSON.stringify(data));
  }, [data, onChange]);

  const updateField = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (contentType === "THEORY") {
    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Từ vựng (Tiếng Anh/Gốc)</label>
            <input type="text" value={data.word || ""} onChange={e => updateField("word", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Nghĩa tiếng Việt</label>
            <input type="text" value={data.meaning || ""} onChange={e => updateField("meaning", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Chữ Hán (nếu có)</label>
            <input type="text" value={data.hanzi || ""} onChange={e => updateField("hanzi", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Pinyin (nếu có)</label>
            <input type="text" value={data.pinyin || ""} onChange={e => updateField("pinyin", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Từ loại (noun, verb...)</label>
            <input type="text" value={data.type || ""} onChange={e => updateField("type", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Ví dụ (Tiếng nước ngoài)</label>
          <input type="text" value={data.example_zh || ""} onChange={e => updateField("example_zh", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Ví dụ (Dịch nghĩa)</label>
          <input type="text" value={data.example_vi || ""} onChange={e => updateField("example_vi", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
      </div>
    );
  }

  if (contentType === "GRAMMAR") {
    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Tiêu đề ngữ pháp</label>
          <input type="text" value={data.title || ""} onChange={e => updateField("title", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="VD: Cấu trúc S + V + O" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Mô tả / Giải thích</label>
          <textarea value={data.desc || ""} onChange={e => updateField("desc", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[80px]"></textarea>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-500">Công thức (Formula parts)</label>
            <button type="button" onClick={() => updateField("formula", [...(data.formula || []), { text: "", classes: "border-blue-200 bg-blue-50 text-blue-700" }])} className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium">
              <Plus className="w-3 h-3" /> Thêm thành phần
            </button>
          </div>
          <div className="space-y-2">
            {(data.formula || []).map((f: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="text" value={f.text} onChange={e => {
                  const newF = [...data.formula]; newF[i].text = e.target.value; updateField("formula", newF);
                }} placeholder="VD: Chủ ngữ" className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                <button type="button" onClick={() => updateField("formula", data.formula.filter((_:any, idx:number) => idx !== i))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {(!data.formula || data.formula.length === 0) && <div className="text-sm text-gray-400 italic">Chưa có thành phần công thức nào.</div>}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-500">Ví dụ thực hành (Practice)</label>
            <button type="button" onClick={() => updateField("practiceList", [...(data.practiceList || []), { correct: "" }])} className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium">
              <Plus className="w-3 h-3" /> Thêm ví dụ
            </button>
          </div>
          <div className="space-y-2">
            {(data.practiceList || []).map((p: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="text" value={p.correct} onChange={e => {
                  const newP = [...data.practiceList]; newP[i].correct = e.target.value; updateField("practiceList", newP);
                }} placeholder="Câu ví dụ..." className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                <button type="button" onClick={() => updateField("practiceList", data.practiceList.filter((_:any, idx:number) => idx !== i))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
             {(!data.practiceList || data.practiceList.length === 0) && <div className="text-sm text-gray-400 italic">Chưa có ví dụ nào.</div>}
          </div>
        </div>
      </div>
    );
  }

  if (contentType === "DIALOGUE") {
    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Tên/Chủ đề hội thoại</label>
          <input type="text" value={data.title || ""} onChange={e => updateField("title", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="VD: Mua sắm tại siêu thị" />
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-500">Các câu hội thoại</label>
            <button type="button" onClick={() => updateField("lines", [...(data.lines || []), { speaker: "A", zh: "", vi: "", py: "" }])} className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium">
              <Plus className="w-3 h-3" /> Thêm câu thoại
            </button>
          </div>
          <div className="space-y-3">
            {(data.lines || []).map((l: any, i: number) => (
              <div key={i} className="bg-white p-3 rounded-lg border border-gray-200 relative">
                <button type="button" onClick={() => updateField("lines", data.lines.filter((_:any, idx:number) => idx !== i))} className="absolute top-2 right-2 text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-12 gap-3 pr-8">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Nhân vật</label>
                    <input type="text" value={l.speaker} onChange={e => {
                      const newL = [...data.lines]; newL[i].speaker = e.target.value; updateField("lines", newL);
                    }} className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-bold text-center" placeholder="A/B" />
                  </div>
                  <div className="col-span-10 space-y-2">
                    <input type="text" value={l.zh || l.en || ""} onChange={e => {
                      const newL = [...data.lines]; newL[i].zh = e.target.value; newL[i].en = e.target.value; updateField("lines", newL);
                    }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" placeholder="Câu nói (Tiếng gốc)" />
                    <input type="text" value={l.py || ""} onChange={e => {
                      const newL = [...data.lines]; newL[i].py = e.target.value; updateField("lines", newL);
                    }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" placeholder="Pinyin/Phiên âm (Tùy chọn)" />
                    <input type="text" value={l.vi || ""} onChange={e => {
                      const newL = [...data.lines]; newL[i].vi = e.target.value; updateField("lines", newL);
                    }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-600" placeholder="Dịch nghĩa (Tiếng Việt)" />
                  </div>
                </div>
              </div>
            ))}
            {(!data.lines || data.lines.length === 0) && <div className="text-sm text-gray-400 italic">Chưa có câu thoại nào.</div>}
          </div>
        </div>
      </div>
    );
  }

  if (contentType === "EXERCISE") {
    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Loại bài tập</label>
          <select 
            value={data.type || "multiple_choice"} 
            onChange={e => updateField("type", e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="multiple_choice">Trắc nghiệm (multiple_choice)</option>
            <option value="fill_blank">Điền từ (fill_blank)</option>
            <option value="drag_drop">Kéo thả (drag_drop)</option>
            <option value="listening">Nghe (listening)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Câu hỏi</label>
          <input type="text" value={data.question || ""} onChange={e => updateField("question", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nhập câu hỏi..." />
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-500">Các lựa chọn (Options)</label>
            <button type="button" onClick={() => updateField("options", [...(data.options || []), ""])} className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium">
              <Plus className="w-3 h-3" /> Thêm lựa chọn
            </button>
          </div>
          <div className="space-y-2">
            {(data.options || []).map((opt: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="text" value={opt} onChange={e => {
                  const newOpts = [...data.options]; newOpts[i] = e.target.value; updateField("options", newOpts);
                }} placeholder={`Lựa chọn ${i + 1}`} className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                <button type="button" onClick={() => updateField("options", data.options.filter((_:any, idx:number) => idx !== i))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {(!data.options || data.options.length === 0) && <div className="text-sm text-gray-400 italic">Chưa có lựa chọn nào.</div>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Đáp án đúng (Correct)</label>
          <input type="text" value={data.correct || ""} onChange={e => updateField("correct", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nhập đáp án đúng chính xác như trong options" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Giải thích đáp án (Explanation)</label>
          <textarea value={data.explanation || ""} onChange={e => updateField("explanation", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[80px]" placeholder="Giải thích tại sao lại chọn đáp án này..."></textarea>
        </div>
      </div>
    );
  }

  // Fallback for other types or RAW editor mode
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Dữ liệu JSON thô</label>
      <textarea 
        value={typeof data === 'string' ? data : JSON.stringify(data, null, 2)} 
        onChange={e => onChange(e.target.value)}
        className="w-full min-h-[250px] p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-xl border border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-y"
        placeholder="Nhập chuỗi JSON hợp lệ..."
      ></textarea>
      <p className="text-xs text-amber-600 mt-2">Lưu ý: Loại nội dung này chưa có giao diện nhập liệu trực quan, vui lòng nhập JSON thô.</p>
    </div>
  );
}
