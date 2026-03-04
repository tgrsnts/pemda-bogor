'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Settings, Trophy, LogOut, Crown, BarChart3 } from 'lucide-react';

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = {
    name: 'Student',
    email: 'student@example.com',
    level: 5,
    xp: 1250,
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { icon: User, label: 'My Profile', to: '/profile' },
    { icon: Trophy, label: 'Achievements', to: '/profile?tab=achievements' },
    { icon: BarChart3, label: 'Statistics', to: '/profile?tab=stats' },
    { icon: Settings, label: 'Settings', to: '/profile?tab=settings' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Avatar className="w-8 h-8 md:w-10 md:h-10 cursor-pointer border-2 border-primary ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-white text-xs md:text-sm">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="w-12 h-12 border-2 border-primary">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary to-pink-400 rounded-xl px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-white">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">Level {user.level}</span>
              </div>
              <span className="text-sm text-white font-medium">{user.xp} XP</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-2">
            <Link
              href="/auth"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                Logout
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
