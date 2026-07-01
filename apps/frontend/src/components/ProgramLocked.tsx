import { Lock } from "lucide-react";

export default function ProgramLocked() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <Lock className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Chương trình này không thuộc lớp học của bạn</h2>
      <p className="text-slate-500 dark:text-slate-400">Liên hệ giáo viên để được thêm vào lớp đúng chương trình.</p>
    </div>
  );
}
