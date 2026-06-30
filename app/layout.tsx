import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammed Iqbal — AI Application Engineer",
  description:
    "Engineer at the intersection of AI, operations, and product — building internal tools that ship at scale.",
  openGraph: {
    title: "Muhammed Iqbal — AI Application Engineer",
    description:
      "Engineer at the intersection of AI, operations, and product — building internal tools that ship at scale.",
    url: "https://muhammed-iqbal.dev",
    siteName: "Muhammed Iqbal",
    locale: "en_SG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
