import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllSubjectsWithPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";

const STEPS = [
  { icon: "fa-book-open", label: "Từ vựng", desc: "Học từ mới có ví dụ, audio phát âm chuẩn", color: "from-blue-500 to-cyan-400" },
  { icon: "fa-pen-to-square", label: "Mini-test", desc: "Kiểm tra nhanh trước khi học tiếp", color: "from-violet-500 to-purple-400" },
  { icon: "fa-layer-group", label: "Ngữ pháp", desc: "Công thức rõ ràng, ví dụ minh hoạ", color: "from-amber-500 to-orange-400" },
  { icon: "fa-comments", label: "Hội thoại", desc: "Áp dụng vào tình huống thực tế", color: "from-emerald-500 to-teal-400" },
];

const FEATURES = [
  { icon: "fa-route", title: "Lộ trình rõ ràng", desc: "Học theo từng bài, mở khoá dần khi đạt điểm yêu cầu. Không bỏ sót kiến thức." },
  { icon: "fa-gamepad", title: "Học qua trò chơi", desc: "Typing game, Matching game, Flashcard SRS — ôn tập vui mà nhớ lâu." },
  { icon: "fa-language", title: "Đa ngôn ngữ", desc: "Tiếng Trung HSK 1-4 và Tiếng Anh Cambridge YLE trên cùng một nền tảng." },
  { icon: "fa-chalkboard-user", title: "Giáo viên quản lý", desc: "Giáo viên giao bài, theo dõi tiến độ, chấm điểm — hệ thống LMS đầy đủ." },
  { icon: "fa-headphones", title: "Luyện 4 kỹ năng", desc: "Luyện Đọc, Nghe, Viết, Nói — chuẩn bị thi thật với bài thi thử." },
  { icon: "fa-mobile-screen", title: "Mobile-first", desc: "Giao diện tối ưu cho điện thoại. Học mọi lúc, mọi nơi." },
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
    <div className="max-w-6xl mx-auto">
      {/* ═══════════ HERO ═══════════ */}
      <section className="text-center pt-12 pb-16 px-4 relative">
        {/* Decorative floating elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-8 right-12 w-32 h-32 bg-rose-400/10 dark:bg-rose-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-100/80 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-6 border border-primary-200/50 dark:border-primary-500/20 backdrop-blur-sm">
          <i className="fa-solid fa-graduation-cap" />
          Thưởng Trà - Vấn Học
        </span>

        {/* Heading with gradient */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          <span className="text-slate-800 dark:text-white">Làm chủ </span>
          <span className="bg-gradient-to-r from-primary-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
            Tiếng Trung &amp; Tiếng Anh
          </span>
          <br className="hidden md:block" />
          <span className="text-slate-800 dark:text-white"> từ con số 0</span>
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Nền tảng học tập bài bản giúp bạn chinh phục HSK 1-4 và Cambridge YLE. Mở khóa lộ trình cá nhân hóa, học qua trò chơi và theo dõi tiến độ mỗi ngày.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/register" className="group px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 dark:shadow-primary-500/10 transition-all hover:scale-105 hover:shadow-xl">
            Bắt đầu miễn phí
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </Link>
          <Link href="/login" className="px-8 py-3.5 rounded-full text-sm font-bold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 border-2 border-primary-200 dark:border-primary-500/30 transition-all hover:scale-105">
            Đăng nhập
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-users text-primary-400" />
            Hàng trăm học sinh đang sử dụng
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <i className="fa-solid fa-star text-amber-400" />
            Miễn phí vĩnh viễn
          </span>
        </div>
      </section>

      {/* ═══════════ CHƯƠNG TRÌNH HỌC ═══════════ */}
      <section className="px-4 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">Bắt đầu với chương trình phù hợp dành cho bạn</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Hệ thống sẽ tự động lưu lại tiến độ học tập của bạn.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((subject: any) => {
            const [entryProgram, ...restPrograms] = subject.programs;
            return (
              <div key={subject.id} className="group bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/50 p-6 transition-all hover:-translate-y-1 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{subject.flag || "📚"}</span>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white text-lg block">{subject.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{subject.programs.length} cấp độ có sẵn</span>
                  </div>
                </div>

                {entryProgram ? (
                  <>
                    <Link
                      href={`/dashboard?level=${entryProgram.code}`}
                      className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm hover:shadow-md mb-3"
                    >
                      Bắt đầu học {entryProgram.name}
                      <i className="fa-solid fa-arrow-right ml-2" />
                    </Link>
                    {restPrograms.length > 0 && (
                      <details className="group/details">
                        <summary className="text-sm text-primary-600 dark:text-primary-400 font-medium cursor-pointer list-none flex items-center gap-1.5 select-none hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                          Xem tất cả cấp độ ({subject.programs.length})
                          <i className="fa-solid fa-chevron-down text-xs transition-transform group-open/details:rotate-180" />
                        </summary>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {restPrograms.map((program: any) => (
                            <Link
                              key={program.id}
                              href={`/dashboard?level=${program.code}`}
                              className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-700 dark:hover:text-primary-400 border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                              {program.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Chưa có chương trình nào</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 4 BƯỚC HỌC ═══════════ */}
      <section className="px-4 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">Phương pháp học tập 4 bước chuẩn hóa</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Quy trình học được thiết kế khoa học, từng bước vững chắc</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <div key={step.label} className="group relative bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 text-center transition-all hover:shadow-lg dark:hover:shadow-slate-900/50 hover:-translate-y-1 backdrop-blur-sm overflow-hidden">
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity rounded-2xl`} />
              
              {/* Step number */}
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </div>

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${step.icon} text-xl`} />
              </div>
              <p className="font-bold text-slate-800 dark:text-white text-sm mb-1">{step.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ TÍNH NĂNG NỔI BẬT ═══════════ */}
      <section className="px-4 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">Tại sao chọn chúng tôi?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Hàng trăm học viên đã cải thiện ngoại ngữ nhờ những công cụ này.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 transition-all hover:shadow-lg dark:hover:shadow-slate-900/50 hover:-translate-y-1 backdrop-blur-sm">
              <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${f.icon} text-lg`} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ GÓI HỌC ═══════════ */}
      <section className="px-4 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">Đầu tư cho tương lai của bạn</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Free dùng vĩnh viễn — Premium mở thêm flashcard, luyện nghe, luyện đọc. Mua gói dài, giá mỗi ngày càng rẻ.
          </p>
        </div>

        {/* Free tier */}
        <div className="bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 max-w-3xl mx-auto mb-6 flex items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-gift text-xl" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white text-lg">Miễn phí vĩnh viễn</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toàn bộ nội dung HSK 1-4 và 6 chương trình Cambridge YLE</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">0đ</p>
            <p className="text-xs text-slate-400">Mãi mãi</p>
          </div>
        </div>

        {/* Premium grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {PREMIUM_PLANS.filter(plan => plan.days >= 30).map((plan) => {
            const isBest = plan.badge === "Tiết kiệm nhất";
            const isPopular = plan.badge === "Phổ biến nhất";
            return (
              <a
                key={plan.days}
                href={ADMIN_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative bg-white/80 dark:bg-slate-900/60 rounded-2xl p-4 text-center flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm ${
                  isBest
                    ? "border-2 border-primary-500 shadow-lg shadow-primary-500/10 scale-[1.03]"
                    : isPopular
                    ? "border-2 border-primary-300 dark:border-primary-500/40"
                    : "border border-slate-200/80 dark:border-slate-800"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap shadow-sm ${
                      isBest ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white" : "bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-2">{plan.days} ngày</p>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">{formatVnd(plan.price)}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">~{formatVnd(plan.perDay)}/ngày</p>
                {plan.savePct ? (
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-2">
                    <i className="fa-solid fa-tag mr-1" />
                    Tiết kiệm {plan.savePct}%
                  </p>
                ) : (
                  <p className="text-xs text-transparent mt-2 select-none">&nbsp;</p>
                )}
                <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <i className="fa-brands fa-facebook-messenger mr-1" /> Liên hệ mua
                </p>
              </a>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4">* % tiết kiệm tính theo giá/ngày so với gói 30 ngày (99.000đ)</p>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 text-white p-2 rounded-xl">
              <i className="fa-solid fa-graduation-cap text-lg" />
            </div>
            <div>
              <p className="font-extrabold text-slate-800 dark:text-white tracking-tight">Thưởng Trà - Vấn Học</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Nền tảng học ngôn ngữ theo lộ trình</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/login" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Đăng nhập</Link>
            <Link href="/register" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Đăng ký</Link>
            <a href={ADMIN_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <i className="fa-brands fa-facebook-messenger mr-1" />
              Liên hệ
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
          © {new Date().getFullYear()} Thưởng Trà - Vấn Học. Tất cả quyền được bảo lưu.
        </p>
      </footer>
    </div>
  );
}
