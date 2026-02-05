'use client';

import { Search, MoreVertical, Eye, MessageSquare, ThumbsUp } from 'lucide-react';

const posts = [
    { id: 1, title: 'Welcome to the new semester!', author: 'Admin', category: 'Announcements', views: 1240, date: '2026-02-01' },
    { id: 2, title: 'Guide to Web3 Wallets', author: 'Kim Min-su', category: 'Tutorials', views: 856, date: '2026-02-02' },
    { id: 3, title: 'Upcoming Hackathon Details', author: 'Park Ji-sung', category: 'Events', views: 2300, date: '2026-02-03' },
    { id: 4, title: 'My first NFT minting experience', author: 'Lee Ha-eun', category: 'General', views: 450, date: '2026-02-04' },
    { id: 5, title: 'Library maintenance schedule', author: 'System', category: 'Notice', views: 120, date: '2026-02-05' },
];

export default function PostsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Post Management</h1>
                    <p className="text-gray-400 mt-1">Moderate user content and announcements</p>
                </div>
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors">
                    Create New Post
                </button>
            </div>

            <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white">All Categories</button>
                        <button className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white">Sort by Date</button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="divide-y divide-white/5">
                    {posts.map((post) => (
                        <div key={post.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group">
                            <div className="flex items-start gap-4">
                                <div className="pt-1">
                                    <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium group-hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-300">{post.category}</span>
                                        <span>by {post.author}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4 text-gray-500 text-sm">
                                    <div className="flex items-center gap-1"><Eye size={14} /> {post.views}</div>
                                    <div className="flex items-center gap-1"><ThumbsUp size={14} /> 12</div>
                                    <div className="flex items-center gap-1"><MessageSquare size={14} /> 5</div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
