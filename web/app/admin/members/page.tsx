'use client';

import { Search, MoreVertical, Edit, Trash, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const initialMembers = [
    { id: 1, name: 'Kim Min-su', email: 'minsu@wra.com', role: 'Student', status: 'Active', joined: '2025-12-01' },
    { id: 2, name: 'Lee Ha-eun', email: 'haeun@wra.com', role: 'Student', status: 'Active', joined: '2025-12-05' },
    { id: 3, name: 'Park Ji-sung', email: 'jisung@wra.com', role: 'Teacher', status: 'Active', joined: '2025-11-20' },
    { id: 4, name: 'Choi Woo-jin', email: 'woojin@wra.com', role: 'Student', status: 'Suspended', joined: '2026-01-10' },
    { id: 5, name: 'Jung Soo-min', email: 'soomin@wra.com', role: 'Admin', status: 'Active', joined: '2025-10-15' },
];

export default function MembersPage() {
    const [members, setMembers] = useState(initialMembers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Member Management</h1>
                    <p className="text-gray-400 mt-1">Manage users, roles, and account status</p>
                </div>
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors">
                    Add New Member
                </button>
            </div>

            <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white">Filter</button>
                        <button className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white">Export</button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white">
                                                {member.name.slice(0, 1)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{member.name}</p>
                                                <p className="text-xs text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${member.role === 'Admin' ? 'bg-purple-500/10 text-purple-400' :
                                                member.role === 'Teacher' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'
                                            }`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${member.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                            }`}>
                                            {member.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{member.joined}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredMembers.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No members found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
