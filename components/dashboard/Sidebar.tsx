'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  History, 
  Settings, 
  Users, 
  BarChart3,
  FileCheck,
  LogOut,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  adminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', adminOnly: false },
  { name: 'Profile', icon: User, href: '/dashboard/profile', adminOnly: false },
  { name: 'Submit Claim', icon: FileText, href: '/dashboard/claims/submit', adminOnly: false },
  { name: 'My Claims', icon: History, href: '/dashboard/claims', adminOnly: false },
  { name: 'Policy', icon: BookOpen, href: '/dashboard/policy', adminOnly: false },
  { name: 'Employees', icon: Users, href: '/dashboard/admin/employees', adminOnly: true },
  { name: 'All Claims', icon: FileCheck, href: '/dashboard/admin/claims', adminOnly: true },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/admin/analytics', adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const filteredItems = sidebarItems.filter(
    item => !item.adminOnly || session?.user?.role === 'admin'
  );

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold">RMS</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white w-full"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

