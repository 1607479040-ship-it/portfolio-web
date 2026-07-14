import type { Metadata } from "next";
import "./globals.css";
import { PreloaderProvider } from "@/providers/preloader-provider";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Wei Bowen | Brand Visual Designer",
  description:
    "魏博文 — 品牌视觉设计师，专注于品牌秩序、视觉系统与商业表达。",
  keywords: ["brand design", "visual identity", "packaging", "portfolio"],
  openGraph: {
    title: "Wei Bowen | Brand Visual Designer",
    description: "品牌视觉设计师作品集",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <PreloaderProvider>
          <SmoothScrollProvider>
            <ClientLayout>{children}</ClientLayout>
          </SmoothScrollProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
