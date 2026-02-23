'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        // @ts-ignore
        const role = session?.user?.role;
        if (!session || (role !== 'admin' && role !== 'sub-admin')) {
            router.replace('/'); // Redirect unauthorized users
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Admin Panel...</div>;
    }

    // @ts-ignore
    const userRole = session?.user?.role;
    if (!session || (userRole !== 'admin' && userRole !== 'sub-admin')) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white flex pt-[72px]">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 bg-black min-h-[calc(100vh-72px)]">
                {children}
            </main>
        </div>
    );
}
