import type { Metadata } from "next";
import AppLayout from './AppLayout';
import "./globals.css";

export const metadata: Metadata = {
  title: "Yumekana",
  description: "Kuasai Hiragana dan Katakana dengan YumeKana! Latih kemampuan bahasa Jepangmu melalui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
