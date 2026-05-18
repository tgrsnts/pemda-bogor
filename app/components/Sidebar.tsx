'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PenTool,
  ScanLine,
  Brain,
  BookOpen,
  User,
  Menu
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  // { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/latihan', icon: PenTool, label: 'Latihan' },
  // { href: '/pindai', icon: ScanLine, label: 'Pindai' },
  // { href: '/kuis', icon: Brain, label: 'Kuis' },
  { href: '/kamus', icon: BookOpen, label: 'Kamus' },
  // { href: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-sidebar border-r border-sidebar-border flex flex-col shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 md:p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="text-3xl md:text-4xl">🏯</div>
            <div>
              <h1 className="text-primary text-lg md:text-xl">YumeKana</h1>
              <p className="text-xs text-muted-foreground">Hiragana & Katakana</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 md:px-4 py-4 md:py-6 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl mb-2 transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm md:text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 md:p-4 border-t border-sidebar-border">
          <div className="bg-gradient-to-r from-primary to-pink-400 rounded-xl p-3 md:p-4 text-white text-center">
            <div className="text-xl md:text-2xl mb-2">🎌</div>
            <p className="text-xs md:text-sm mb-1">Tetap Belajar!</p>
            <p className="text-xs opacity-90">Kuasai semua 96 karakter</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-2xl">🏯</div>
          <div className="text-primary font-bold">日本語</div>
        </div>
      </div>
    </>
  );
}