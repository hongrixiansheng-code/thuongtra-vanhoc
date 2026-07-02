import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/legacy/Navigation";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thưởng Trà - Vấn Học",
  description: "Học Tiếng Trung HSK và Tiếng Anh Cambridge YLE theo lộ trình rõ ràng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var accent = localStorage.getItem('theme-accent') || 'amber';
                document.documentElement.setAttribute('data-accent', accent);
                
                var mode = localStorage.getItem('theme-mode') || 'system';
                if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-[#FDFBF7] dark:bg-slate-950 relative text-slate-800 dark:text-slate-200`}
        suppressHydrationWarning
      >
        {/* Họa tiết Grid chìm */}
        <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.25] dark:opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        {/* Mesh Gradients lơ lửng */}
        <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400/15 dark:bg-orange-500/5 blur-[120px] z-[-1]"></div>
        <div className="pointer-events-none fixed bottom-[-10%] right-[-5%] w-[35%] h-[40%] rounded-full bg-rose-400/10 dark:bg-rose-500/5 blur-[120px] z-[-1]"></div>

        <Providers>
          <Suspense fallback={<div>Loading Navigation...</div>}>
            <Navigation />
          </Suspense>
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 mt-2 md:mt-4 pb-24 md:pb-12 relative z-0">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
