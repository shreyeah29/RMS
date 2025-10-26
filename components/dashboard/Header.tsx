'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  History,
  Users, 
  BarChart3,
  FileCheck,
  LogOut,
  BookOpen,
  Bell,
  Moon,
  Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  adminOnly?: boolean;
  employeeOnly?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', adminOnly: false },
  { name: 'Profile', icon: User, href: '/dashboard/profile', adminOnly: false },
  { name: 'Submit Claim', icon: FileText, href: '/dashboard/claims/submit', adminOnly: false, employeeOnly: true },
  { name: 'My Claims', icon: History, href: '/dashboard/claims', adminOnly: false, employeeOnly: true },
  { name: 'Policy', icon: BookOpen, href: '/dashboard/policy', adminOnly: false },
  { name: 'Employees', icon: Users, href: '/dashboard/admin/employees', adminOnly: true },
  { name: 'All Claims', icon: FileCheck, href: '/dashboard/admin/claims', adminOnly: true },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/admin/analytics', adminOnly: true },
];

export function Header() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">RMS</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l dark:border-slate-700">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

