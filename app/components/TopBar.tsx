'use client';

import { Bell, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ProfileMenu } from './ProfileMenu';

export function TopBar() {
  const user = {
    name: 'Student',
    level: 5,
    xp: 1250,
    xpToNextLevel: 2000,
    streak: 7,
  };

  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="bg-white border-b border-border px-3 md:px-6 py-2 md:py-3">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search characters, lessons..."
              className="w-full pl-10 pr-4 py-2 bg-input-background rounded-full text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-6 flex-1 md:flex-initial justify-end">
          {/* XP and Level - Responsive */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-right">
              <div className="text-xs md:text-sm font-medium text-foreground">Level {user.level}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{user.xp} / {user.xpToNextLevel} XP</div>
            </div>
            <div className="w-20 md:w-32 hidden sm:block">
              <Progress value={xpPercentage} className="h-2" />
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1 md:gap-2 bg-accent/20 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
            <span className="text-base md:text-lg">🔥</span>
            <span className="text-xs md:text-sm font-medium">{user.streak}</span>
          </div>

          {/* Notifications - Hidden on small mobile */}
          <button className="hidden sm:block relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {/* User Avatar with Menu */}
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}