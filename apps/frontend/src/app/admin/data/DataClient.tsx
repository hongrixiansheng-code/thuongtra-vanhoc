"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Database, X, FileJson, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { createContent, updateContent, deleteContent, importContents } from "./actions";
import { ContentFormBuilder } from "./ContentFormBuilder";

export default function DataClient({ programs, lessons, contents }: { programs: any[], lessons: any[], contents: any[] }) {
  const router = useRouter();
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0]?.id || "");
  const filteredLessons = lessons.filter(l => l.programId === selectedProgramId);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");

  useEffect(() => {
    if (filteredLessons.length > 0 && !filteredLessons.find(l => l.id === selectedLessonId)) {
      setSelectedLessonId(filteredLessons[0].id);
    } else if (filteredLessons.length === 0) {
      setSelectedLessonId("");
    }
  }, [selectedProgramId, filteredLessons, selectedLessonId]);

  const [activeTab, setActiveTab] = useState<string>("THEORY");
  
  // Filter contents by lesson and tab
  const tabContents = contents.filter(c => c.lessonId === selectedLessonId && c.contentType === activeTab);

  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [editContentString, setEditContentString] = useState<string>("");
  
  const [isAdding, setIsAdding] = useState(false);
  const [newContentString, setNewContentString] = useState<string>("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Import Modal States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonString, setImportJsonString] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const openImportModal = () => {
    setImportJsonString("");
    setImportError(null);
    setImportSuccess(null);
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
    setImportJsonString("");
    setImportError(null);
    setImportSuccess(null);
  };

  const handleImportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImportError(null);
    setImportSuccess(null);
    setIsImporting(true);

    const formData = new FormData();
    formData.append("lessonId", selectedLessonId);
    formData.append("contents", importJsonString);

    const res = await importContents(formData);
    setIsImporting(false);

    if (res?.error) {
      setImportError(res.error);
    } else if (res?.success) {
      setImportSuccess(`Đã import ${res.count} nội dung thành công!`);
      router.refresh();
      setTimeout(() => closeImportModal(), 1500);
    }
  };

  const handleAddNewClick = () => {
    console.log("Clicked Thêm mới!");
    setExpandedRowId(null);
    setIsAdding(true);
    setNewContentString("");
    setSaveError(null);
  };

  const handleRowClick = (content: any) => {
    if (expandedRowId === content.id) {
      setExpandedRowId(null);
    } else {
      setIsAdding(false);
      setExpandedRowId(content.id);
      setEditContentString(content.content);
      setSaveError(null);
    }
  };

  const handleCancel = () => {
    setExpandedRowId(null);
    setIsAdding(false);
    setSaveError(null);
  };

  const handleSave = async (id: string | null) => {
    setSaveError(null);
    setIsSaving(true);
    
    let rawContent = id ? editContentString : newContentString;
    try {
      rawContent = JSON.stringify(JSON.parse(rawContent), null, 2);
    } catch(err) {
      setSaveError("Chuỗi JSON không hợp lệ. Vui lòng kiểm tra lại dấu phẩy, ngoặc kép.");
      setIsSaving(false);
      return;
    }

    const formData = new FormData();
    formData.append("lessonId", selectedLessonId);
    formData.append("contentType", activeTab);
    formData.append("content", rawContent);

    let res;
    if (id) {
      formData.append("id", id);
      res = await updateContent(formData);
    } else {
      res = await createContent(formData);
    }

    setIsSaving(false);

    if (res?.error) {
      setSaveError(res.error);
    } else {
      setExpandedRowId(null);
      setIsAdding(false);
      router.refresh();
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Ngăn click row
    if (!confirm("Bạn có chắc chắn muốn xóa dữ liệu này?")) return;
    
    setIsDeleting(id);
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteContent(formData);
    
    if (res?.error) {
      alert(res.error);
    } else {
      if (expandedRowId === id) setExpandedRowId(null);
      router.refresh();
    }
    setIsDeleting(null);
  };

  const tabs = [
    { id: "THEORY", label: "Từ vựng" },
    { id: "GRAMMAR", label: "Ngữ pháp" },
    { id: "DIALOGUE", label: "Hội thoại" },
    { id: "EXERCISE", label: "Bài tập" }
  ];

  const renderPreview = (content: any) => {
    let parsed;
    try {
      parsed = JSON.parse(content.content);
    } catch(e) {
      return <span className="text-red-500 text-sm">Invalid JSON</span>;
    }

    if (content.contentType === "THEORY") {
      return (
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-sm">{parsed.word || parsed.hanzi}</span>
          {parsed.meaning && <span className="text-gray-500 text-sm">- {parsed.meaning}</span>}
          {parsed.pinyin && <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs">{parsed.pinyin}</span>}
        </div>
      );
    } else if (content.contentType === "GRAMMAR") {
      return (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-sm">{parsed.title}</span>
          {parsed.desc && <span className="text-gray-500 text-xs truncate max-w-lg">{parsed.desc}</span>}
        </div>
      );
    } else if (content.contentType === "DIALOGUE") {
      return (
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-sm">{parsed.title}</span>
          <span className="text-gray-500 text-xs">({parsed.lines?.length || 0} câu thoại)</span>
        </div>
      );
    } else if (content.contentType === "EXERCISE") {
      return (
        <span className="font-bold text-gray-800 text-sm truncate max-w-lg">{parsed.question || JSON.stringify(parsed).substring(0, 50)}</span>
      );
    }
    return <span className="font-mono text-xs truncate max-w-md">{JSON.stringify(parsed).substring(0, 50)}...</span>;
  };

  return (
    <>
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quản lý Nội dung Bài học</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Chương trình học</label>
            <select 
              value={selectedProgramId}
              onChange={(e) => {
                setSelectedProgramId(e.target.value);
                setExpandedRowId(null);
                setIsAdding(false);
              }}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {programs.map(p => (
                <option key={p.id} value={p.id}>{p.subject?.flag} {p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Bài học</label>
            <select 
              value={selectedLessonId}
              onChange={(e) => {
                setSelectedLessonId(e.target.value);
                setExpandedRowId(null);
                setIsAdding(false);
              }}
              disabled={filteredLessons.length === 0}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {filteredLessons.map(l => (
                <option key={l.id} value={l.id}>#{l.orderIndex} - {l.title}</option>
              ))}
              {filteredLessons.length === 0 && <option value="">Không có bài học</option>}
            </select>
          </div>

          <div className="w-full sm:w-auto sm:pt-5 flex gap-2">
            <button 
              onClick={openImportModal} 
              disabled={!selectedLessonId}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FileJson className="w-4 h-4" /> Import JSON
            </button>
            <button 
              type="button"
              onClick={handleAddNewClick} 
              disabled={!selectedLessonId || isAdding}
              className="w-full sm:w-auto px-4 py-2 bg-[#185FA5] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" /> Thêm mới
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const count = contents.filter(c => c.lessonId === selectedLessonId && c.contentType === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedRowId(null);
                  setIsAdding(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                  isActive 
                    ? "border-[#185FA5] text-[#185FA5]" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? "bg-[#E6F1FB] text-[#185FA5]" : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100 overflow-hidden">
        <div className="flex flex-col">
          {(!selectedLessonId || (tabContents.length === 0 && !isAdding)) && (
            <div className="px-6 py-12 text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-8 h-8 text-gray-400" />
              </div>
              {selectedLessonId ? "Chưa có dữ liệu nào trong mục này." : "Vui lòng chọn bài học để xem dữ liệu."}
            </div>
          )}

          {isAdding && (
            <div className="border-b border-gray-100 bg-[#f8fafc]">
              <div className="px-6 py-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#185FA5]">
                  <Database className="w-4 h-4" /> Thêm {tabs.find(t => t.id === activeTab)?.label} mới
                </div>
                {saveError && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                    {saveError}
                  </div>
                )}
                <ContentFormBuilder 
                  contentType={activeTab}
                  initialData={null}
                  onChange={setNewContentString}
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm">
                    Hủy
                  </button>
                  <button onClick={() => handleSave(null)} disabled={isSaving} className="px-4 py-2 bg-[#185FA5] text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 text-sm">
                    {isSaving ? "Đang lưu..." : "Lưu mới"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {tabContents.map((content) => {
            const isExpanded = expandedRowId === content.id;
            return (
              <div key={content.id} className="flex flex-col border-b border-gray-100 last:border-b-0">
                {/* Row */}
                <div 
                  className={`flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${isExpanded ? "bg-gray-50" : ""}`}
                  onClick={() => handleRowClick(content)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                    {renderPreview(content)}
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, content.id)} 
                    disabled={isDeleting === content.id}
                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 inline-flex items-center justify-center transition-colors disabled:opacity-50 ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Inline Editor */}
                {isExpanded && (
                  <div className="px-6 py-4 bg-[#f8fafc] border-t border-gray-100">
                    <div className="flex flex-col gap-4">
                      {saveError && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                          {saveError}
                        </div>
                      )}
                      <ContentFormBuilder 
                        contentType={activeTab}
                        initialData={typeof content.content === 'string' ? JSON.parse(content.content) : content.content}
                        onChange={setEditContentString}
                      />
                      <div className="flex justify-end gap-3 mt-2">
                        <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm">
                          Hủy
                        </button>
                        <button onClick={() => handleSave(content.id)} disabled={isSaving} className="px-4 py-2 bg-[#185FA5] text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 text-sm">
                          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 shrink-0 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileJson className="w-5 h-5 text-emerald-600" />
                Import JSON
              </h2>
              <button onClick={closeImportModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleImportSubmit} className="flex flex-col">
              <div className="p-6 space-y-4">
                {importError && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                    {importError}
                  </div>
                )}
                {importSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg border border-emerald-100">
                    {importSuccess}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mảng JSON <span className="text-red-500">*</span></label>
                  <textarea 
                    value={importJsonString}
                    onChange={(e) => setImportJsonString(e.target.value)}
                    className="w-full min-h-[250px] p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-xl border border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-y"
                    placeholder={`[\n  {"contentType": "THEORY", "content": "{\\"word\\":\\"hello\\",\\"meaning\\":\\"xin chào\\"}"},\n  {"contentType": "GRAMMAR", "content": "{\\"title\\":\\"To Be\\",\\"desc\\":\\"...\\"}"}\n]`}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button type="button" onClick={closeImportModal} className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  Hủy
                </button>
                <button type="submit" disabled={isImporting} className="flex-1 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center">
                  {isImporting ? "Đang import..." : "Import"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
