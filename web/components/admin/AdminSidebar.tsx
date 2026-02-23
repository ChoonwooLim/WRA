'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Shield, BarChart3, Bell, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const menuItems = [
    { icon: LayoutDashboard, label: '대시보드', href: '/admin' },
    { icon: Users, label: '회원 관리', href: '/admin/members' },
    { icon: FileText, label: '게시글 관리', href: '/admin/posts' },
    { icon: Shield, label: '인증 관리', href: '/admin/certifications' },
    { icon: BookOpen, label: '인증서 매뉴얼', href: '/admin/certifications/guide', indent: true },
    { icon: BarChart3, label: '통계', href: '/admin/analytics' },
    { icon: Bell, label: '알림', href: '/admin/notifications' },
    { icon: Settings, label: '설정', href: '/admin/settings' },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-[calc(100vh-72px)] fixed left-0 top-[72px] overflow-y-auto flex flex-col border-r border-white/10"
            style={{
                background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0d20 50%, #0a0a1a 100%)',
            }}
        >
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                        style={{
                            background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)',
                        }}
                    >
                        W
                    </div>
                    <div>
                        <span className="text-lg font-bold text-white tracking-wider">WRA</span>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-4 mb-3">메뉴</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
                    const isIndented = 'indent' in item && item.indent;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl transition-all font-medium group relative",
                                isIndented ? "px-4 py-2 pl-11 text-xs" : "px-4 py-2.5 text-sm",
                                isActive
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {/* Active indicator line */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                                    style={{ background: 'linear-gradient(180deg, #00d4ff, #8b5cf6)' }}
                                />
                            )}
                            {isActive && (
                                <div className="absolute inset-0 rounded-xl opacity-10"
                                    style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }}
                                />
                            )}
                            <item.icon size={isIndented ? 14 : 18} className={cn(
                                "transition-colors relative z-10",
                                isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-white"
                            )} />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl w-full text-left text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    로그아웃
                </button>
            </div>
        </aside>
    );
}
