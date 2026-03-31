import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoYaan | Sustainable Shopping Experience",
  description: "Experience a premium, modular, and eco-friendly shopping journey with EcoYaan.",
  keywords: ["eco-friendly", "sustainability", "shopping", "checkout", "green living"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} antialiased selection:bg-brand-500 selection:text-white`}
      >
        <div className="fixed inset-0 pointer-events-none -z-50 bg-[#fdfcfb]">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-50/40 rounded-full blur-[140px] mix-blend-multiply" />
          <div className="absolute bottom-[-15%] right-[-5%] w-[45%] h-[45%] bg-emerald-50/40 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-50/5 rounded-full blur-[160px]" />
        </div>
        
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
