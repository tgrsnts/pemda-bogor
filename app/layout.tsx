import type { Metadata } from "next";
import AppLayout from './AppLayout';
import "./globals.css";

export const metadata: Metadata = {
  title: "日本語 Learning App",
  description: "Master Japanese characters with interactive learning",
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
