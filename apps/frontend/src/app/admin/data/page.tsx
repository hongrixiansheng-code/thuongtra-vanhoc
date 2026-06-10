import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const dataDir = path.join(process.cwd(), '../../../Du_An_HSK1/data');

async function getFiles() {
  if (!fs.existsSync(dataDir)) return [];
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  return files;
}

export default async function AdminData(props: { searchParams: { file?: string } }) {
  const searchParams = await props.searchParams;
  const files = await getFiles();
  const selectedFile = searchParams.file || files[0];
  
  let fileContent = "";
  if (selectedFile && fs.existsSync(path.join(dataDir, selectedFile))) {
    fileContent = fs.readFileSync(path.join(dataDir, selectedFile), 'utf-8');
  }

  // Server Action
  async function saveFile(formData: FormData) {
    "use server";
    const filename = formData.get("filename") as string;
    const content = formData.get("content") as string;
    
    if (filename && content) {
      try {
        // Validate JSON
        JSON.parse(content);
        fs.writeFileSync(path.join(dataDir, filename), content, 'utf-8');
        revalidatePath("/admin/data");
      } catch (e) {
        console.error("Invalid JSON", e);
      }
    }
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Dữ liệu Học tập</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <h2 className="font-bold text-gray-700">Tệp dữ liệu (JSON)</h2>
          </div>
          <div className="p-2 space-y-1">
            {files.map(f => (
              <a 
                key={f} 
                href={`?file=${f}`}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFile === f ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fa-regular fa-file-code mr-2 opacity-50"></i>
                {f}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-gray-700">{selectedFile}</h2>
            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-medium">Chỉ dành cho Admin</span>
          </div>
          <div className="p-4 flex-1">
            <form action={saveFile} className="h-full flex flex-col">
              <input type="hidden" name="filename" value={selectedFile} />
              <textarea 
                name="content" 
                defaultValue={fileContent}
                className="w-full h-[500px] p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                spellCheck={false}
              ></textarea>
              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-save"></i> Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
