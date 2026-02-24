'use client';

import { useSearchParams } from 'next/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isEmbed = searchParams.get('embed') === '1';

    if (isEmbed) {
        return <main className="flex-1">{children}</main>;
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
