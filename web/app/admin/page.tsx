'use client';

import { Users, FileText, Activity, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    { title: 'Total Members', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Active Posts', value: '854', change: '+5%', icon: FileText, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Pending Reports', value: '12', change: '-2', icon: Activity, color: 'text-red-400', bg: 'bg-red-400/10' },
    { title: 'Total Revenue', value: '$45K', change: '+8%', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-400 mt-1">Overview of system status and activities</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0a0a1a] border border-white/5 p-6 rounded-2xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-white">User #{item} joined the academy</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">System Health</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Server Load</span>
                                <span className="text-green-400">24%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[24%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Database Usage</span>
                                <span className="text-blue-400">45%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[45%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Memory Usage</span>
                                <span className="text-yellow-400">62%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[62%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
