import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/legacy/Navigation";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilingual Education App",
  description: "Learn English and Chinese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gray-50`}
      >
        <Providers>
          <Navigation />
          <main className="pt-16 pb-16 md:pb-0">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
