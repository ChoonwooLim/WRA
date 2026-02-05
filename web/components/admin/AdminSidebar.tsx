'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Members', href: '/admin/members' },
    { icon: FileText, label: 'Posts', href: '/admin/posts' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#0a0a1a] border-r border-white/10 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <span className="text-xl font-bold text-white tracking-wider">
                        ADMIN
                    </span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group",
                                isActive
                                    ? "bg-primary/20 text-primary border border-primary/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={20} className={cn(isActive ? "text-primary" : "text-gray-500 group-hover:text-white")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                    <LogOut size={20} />
                    Exit & Logout
                </button>
            </div>
        </aside>
    );
}
