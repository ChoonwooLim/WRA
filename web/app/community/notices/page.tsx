'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Search, Pen } from 'lucide-react';
import { useState } from 'react';

const sampleNotices = [
    { id: 5, title: '황태손 전하 인도네시아 문화교류 활동 보고', category: '활동', author: '관리자', date: '2026-01-15', views: 234 },
    { id: 4, title: 'K-Royal Warrant 인증 절차 개선 공지', category: '인증', author: '관리자', date: '2026-01-20', views: 187 },
    { id: 3, title: '왕립 투어 프로그램 일정 업데이트', category: '투어', author: '관리자', date: '2026-01-28', views: 156 },
    { id: 2, title: 'The Royal 33 제2기 멤버 모집 안내', category: '인증', author: '관리자', date: '2026-02-05', views: 312 },
    { id: 1, title: '세계왕립아카데미 2026년 상반기 교육과정 안내', category: '교육', author: '관리자', date: '2026-02-10', views: 489 },
];

export default function NoticesPage() {
    const { dict } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotices = sampleNotices.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                {/* Board Header */}
                <div className="board-header">
                    <h1 className="board-title">📢 {dict.pages.community.noticesTitle}</h1>
                </div>

                {/* Controls: Search + Write */}
                <div className="board-controls">
                    <div className="board-search">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="공지사항 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-tv-primary">
                        <Pen className="w-3.5 h-3.5" />
                        글쓰기
                    </button>
                </div>

                {/* Board Table */}
                <table className="board-table">
                    <thead>
                        <tr>
                            <th style={{ width: '70px' }}>번호</th>
                            <th style={{ width: '80px' }}>카테고리</th>
                            <th>제목</th>
                            <th style={{ width: '100px' }}>작성자</th>
                            <th style={{ width: '110px' }}>작성일</th>
                            <th style={{ width: '80px' }}>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    게시글이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredNotices.map((notice) => (
                                <tr key={notice.id}>
                                    <td className="text-center text-gray-400">{notice.id}</td>
                                    <td className="text-center">
                                        <span className="board-badge">{notice.category}</span>
                                    </td>
                                    <td className="post-title">{notice.title}</td>
                                    <td className="text-center text-gray-400">{notice.author}</td>
                                    <td className="text-center text-gray-400">{notice.date}</td>
                                    <td className="text-center text-gray-400">{notice.views}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="board-pagination">
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>»</button>
                </div>
            </div>
        </div>
    );
}
