import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI chat",
  description: "AI chat with TS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br selection:bg-[#520e52] from-[#0e000e] to-[#160416] text-[#ffebff]`}
      >
        {children}
      </body>
    </html>
  );
}
