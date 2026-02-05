import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// This is a Server Component, so it can fetch data directly or call helpers
async function getMembers() {
    try {
        const members = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return members;
    }
    catch (e) {
        console.error("Database connection error or uninitialized:", e);
        return [];
    }
}

export default async function MembersPage() {
    const members = await getMembers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Member Management</h1>
                    <p className="text-gray-400 mt-1">Manage users, roles, and account status (Real DB Data)</p>
                </div>
            </div>

            <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl overflow-hidden p-4">
                {members.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        No users found or Database not connected.
                        <br />
                        Please configure DATABASE_URL in .env
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-sm font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {members.map((member) => (
                                    <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-white font-medium">{member.name}</td>
                                        <td className="px-6 py-4 text-gray-400">{member.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs uppercase font-bold">
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(member.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
