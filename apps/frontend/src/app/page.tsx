import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllSubjectsWithPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";

const STEPS = [
  { icon: "fa-book-open", label: "Từ vựng", desc: "Học từ mới có ví dụ, audio phát âm" },
  { icon: "fa-pen-to-square", label: "Mini-test", desc: "Kiểm tra nhanh trước khi học tiếp" },
  { icon: "fa-layer-group", label: "Ngữ pháp", desc: "Công thức rõ ràng, có ví dụ minh hoạ" },
  { icon: "fa-comments", label: "Hội thoại", desc: "Áp dụng vào tình huống thực tế" },
];

const PREMIUM_PLANS = [
  { days: 3, price: 30000, perDay: 10000 },
  { days: 7, price: 50000, perDay: 7143 },
  { days: 15, price: 75000, perDay: 5000 },
  { days: 30, price: 99000, perDay: 3300 },
  { days: 90, price: 249000, perDay: 2767, savePct: 16 },
  { days: 180, price: 449000, perDay: 2494, savePct: 24, badge: "Phổ biến nhất" },
  { days: 360, price: 669000, perDay: 1858, savePct: 44, badge: "Tiết kiệm nhất" },
];

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

// TODO: thay link Fanpage Messenger thật sau khi tạo trang FB
const ADMIN_MESSENGER_URL = "https://m.me/your-fanpage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }

  const subjects = await getAllSubjectsWithPrograms();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <section className="text-center pt-10 pb-12 px-4">
        <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wide mb-4">
          Thưởng Trà - Vấn Học
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
          Học Tiếng Trung &amp; Tiếng Anh<br className="hidden md:block" /> theo lộ trình rõ ràng, đi từng bước
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8">
          HSK 1-4 và Cambridge YLE (Starters → PET) trên cùng một nền tảng — học từ vựng, ngữ pháp, hội thoại theo từng bài, mở khóa dần khi đạt điểm yêu cầu.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/register" className="px-6 py-3 rounded-full text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-colors">
            Bắt đầu miễn phí
          </Link>
          <Link href="/login" className="px-6 py-3 rounded-full text-sm font-bold text-primary-600 hover:bg-primary-50 border border-primary-200 transition-colors">
            Đăng nhập
          </Link>
        </div>
      </section>

      {/* Chương trình học */}
      <section className="px-4 mb-16">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Chọn chương trình học</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject: any) => {
            const [entryProgram, ...restPrograms] = subject.programs;
            return (
              <div key={subject.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{subject.flag || "📚"}</span>
                  <span className="font-bold text-gray-800 text-lg">{subject.name}</span>
                </div>

                {entryProgram ? (
                  <>
                    <p className="text-sm text-gray-500 mb-4">{subject.programs.length} cấp độ có sẵn</p>
                    <Link
                      href={`/dashboard?level=${entryProgram.code}`}
                      className="block text-center px-4 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors mb-3"
                    >
                      Bắt đầu học {entryProgram.name} →
                    </Link>
                    {restPrograms.length > 0 && (
                      <details className="group">
                        <summary className="text-sm text-primary-600 font-medium cursor-pointer list-none flex items-center gap-1.5 select-none">
                          Xem tất cả cấp độ ({subject.programs.length})
                          <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                        </summary>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {restPrograms.map((program: any) => (
                            <Link
                              key={program.id}
                              href={`/dashboard?level=${program.code}`}
                              className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 border border-gray-100 transition-colors"
                            >
                              {program.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">Chưa có chương trình nào</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Cách học hoạt động */}
      <section className="px-4 mb-16">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Mỗi bài học đi qua 4 bước</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <div key={step.label} className="relative bg-white rounded-2xl border border-gray-200 p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
                <i className={`fa-solid ${step.icon} text-lg`}></i>
              </div>
              <p className="text-xs font-bold text-primary-600 mb-1">Bước {i + 1}</p>
              <p className="font-bold text-gray-800 text-sm mb-1">{step.label}</p>
              <p className="text-xs text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gói học */}
      <section className="px-4 mb-16">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Gói học</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Free dùng vĩnh viễn — Premium mở thêm flashcard, luyện nghe, luyện đọc. Mua gói dài, giá mỗi ngày càng rẻ.</p>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 max-w-3xl mx-auto mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-800">Free</p>
            <p className="text-sm text-gray-500">Toàn bộ nội dung HSK1-4 và 6 chương trình Cambridge YLE — miễn phí vĩnh viễn</p>
          </div>
          <p className="text-xl font-bold text-gray-800 shrink-0">0đ</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {PREMIUM_PLANS.map((plan) => {
            const isBest = plan.badge === "Tiết kiệm nhất";
            return (
              <a
                key={plan.days}
                href={ADMIN_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative bg-white rounded-2xl p-4 text-center flex flex-col transition-shadow hover:shadow-lg ${
                  isBest
                    ? "border-2 border-primary-500 shadow-md scale-[1.03]"
                    : plan.badge
                    ? "border-2 border-primary-200"
                    : "border border-gray-200"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${
                      isBest ? "bg-primary-600 text-white" : "bg-primary-100 text-primary-700"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <p className="text-sm font-bold text-gray-700 mt-2">{plan.days} ngày</p>
                <p className="text-lg font-bold text-gray-800 mt-1">{formatVnd(plan.price)}</p>
                <p className="text-xs text-gray-400 mt-0.5">~{formatVnd(plan.perDay)}/ngày</p>
                {plan.savePct ? (
                  <p className="text-xs font-semibold text-primary-600 mt-2">Tiết kiệm {plan.savePct}%</p>
                ) : (
                  <p className="text-xs text-gray-300 mt-2">&nbsp;</p>
                )}
                <p className="text-xs font-medium text-primary-600 mt-3 pt-2 border-t border-gray-100">
                  <i className="fa-brands fa-facebook-messenger mr-1"></i> Liên hệ admin để mua
                </p>
              </a>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">* % tiết kiệm tính theo giá/ngày so với gói 30 ngày (99.000đ)</p>
      </section>

      <footer className="text-center text-xs text-gray-400 pb-10">
        © {new Date().getFullYear()} Thưởng Trà - Vấn Học
      </footer>
    </div>
  );
}
