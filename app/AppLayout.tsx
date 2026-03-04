'use client';

import { usePathname } from 'next/navigation';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const hideSidebarAndTopBar = pathname === '/' || pathname === '/auth';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {!hideSidebarAndTopBar && <Sidebar />}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {!hideSidebarAndTopBar && <TopBar />}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}