"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addUserToClass, removeUserFromClass } from "../actions";

type Enrollment = { id: string; className: string; programName: string };
type AvailableClass = { id: string; name: string; programName: string };

export default function ClassEnrollmentClient({
  userId,
  enrollments,
  availableClasses
}: {
  userId: string;
  enrollments: Enrollment[];
  availableClasses: AvailableClass[];
}) {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const enrolledClassIds = new Set(
    availableClasses
      .filter(c => enrollments.some(e => e.className === c.name && e.programName === c.programName))
      .map(c => c.id)
  );
  const selectableClasses = availableClasses.filter(c => !enrolledClassIds.has(c.id));

  const handleAdd = async () => {
    if (!selectedClassId) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("classId", selectedClassId);
    const res = await addUserToClass(formData);
    if (res?.error) alert(res.error);
    setSelectedClassId("");
    setIsLoading(false);
  };

  const handleRemove = async (enrollmentId: string) => {
    if (!confirm("Xóa học sinh này khỏi lớp?")) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("enrollmentId", enrollmentId);
    const res = await removeUserFromClass(formData);
    if (res?.error) alert(res.error);
    setIsLoading(false);
  };

  return (
    <div>
      {enrollments.length === 0 ? (
        <p className="text-gray-500 text-sm mb-4">Người dùng chưa thuộc lớp học nào.</p>
      ) : (
        <ul className="divide-y divide-gray-100 mb-4">
          {enrollments.map(e => (
            <li key={e.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{e.className}</p>
                <p className="text-xs text-gray-400">{e.programName}</p>
              </div>
              <button
                onClick={() => handleRemove(e.id)}
                disabled={isLoading}
                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectableClasses.length > 0 && (
        <div className="flex gap-2">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Chọn lớp học để thêm vào...</option>
            {selectableClasses.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.programName})</option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedClassId || isLoading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            Thêm vào lớp
          </button>
        </div>
      )}
    </div>
  );
}
