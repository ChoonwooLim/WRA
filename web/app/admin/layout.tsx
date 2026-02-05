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
        if (!session || session?.user?.role !== 'admin') {
            router.replace('/'); // Redirect unauthorized users
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Admin Panel...</div>;
    }

    // @ts-ignore
    if (!session || session?.user?.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 bg-black">
                {children}
            </main>
        </div>
    );
}
