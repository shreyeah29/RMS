'use client';

import { Header } from './Header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900">
        {children}
      </main>
    </div>
  );
}

