import { VocabTab } from "@/components/legacy/VocabTab";

export default async function LessonPage({ 
  params 
}: { 
  params: Promise<{ subject: string; program: string; lessonId: string }> 
}) {
  const { subject, program, lessonId } = await params;
  
  // Mock content data
  const contentData = {
    vocab: [
      { word: "Hello", translation: subject === "chinese" ? "你好 (Nǐ hǎo)" : "Xin chào" },
      { word: "Thank you", translation: subject === "chinese" ? "谢谢 (Xièxiè)" : "Cảm ơn" },
      { word: "Goodbye", translation: subject === "chinese" ? "再见 (Zàijiàn)" : "Tạm biệt" }
    ]
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 capitalize">{subject} Lesson</h1>
      <p className="text-gray-600 mb-6 capitalize">Program: {program} | Lesson: {lessonId}</p>
      
      <VocabTab vocabData={contentData.vocab} />
    </div>
  );
}
