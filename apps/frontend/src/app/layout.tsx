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
        className={`${inter.className} antialiased min-h-screen bg-gray-50`}
        suppressHydrationWarning
      >
        <Providers>
          <Suspense fallback={<div>Loading Navigation...</div>}>
            <Navigation />
          </Suspense>
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-24 md:pb-6 relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
