'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Search, Pen } from 'lucide-react';
import { useState } from 'react';

const sampleQnA = [
    { id: 1, title: 'WRA 회원가입은 어떻게 하나요?', author: '김민수', date: '2026-02-01', views: 89, answered: true },
    { id: 2, title: 'K-Royal Warrant 인증을 받으려면?', author: '이정아', date: '2026-02-03', views: 156, answered: true },
    { id: 3, title: 'The Royal 33 멤버십 자격요건은?', author: '박서현', date: '2026-02-05', views: 203, answered: false },
    { id: 4, title: '교육 프로그램은 온라인으로 참여할 수 있나요?', author: '최원호', date: '2026-02-07', views: 78, answered: true },
    { id: 5, title: '왕립 투어 예약 방법 문의', author: '송예진', date: '2026-02-09', views: 45, answered: false },
    { id: 6, title: '디지털 씰 인증서 발급 기간은 어느정도인가요?', author: '윤지수', date: '2026-02-10', views: 67, answered: false },
    { id: 7, title: 'CEO 프로그램 일정 문의합니다', author: '한도윤', date: '2026-02-11', views: 34, answered: true },
];

export default function QnAPage() {
    const { dict } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredQnA = sampleQnA.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                {/* Board Header */}
                <div className="board-header">
                    <h1 className="board-title">❓ Q&A</h1>
                </div>

                {/* Controls: Search + Write */}
                <div className="board-controls">
                    <div className="board-search">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="질문 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-tv-primary">
                        <Pen className="w-3.5 h-3.5" />
                        질문하기
                    </button>
                </div>

                {/* Board Table */}
                <table className="board-table">
                    <thead>
                        <tr>
                            <th style={{ width: '70px' }}>번호</th>
                            <th style={{ width: '100px' }}>상태</th>
                            <th>제목</th>
                            <th style={{ width: '120px' }}>작성자</th>
                            <th style={{ width: '110px' }}>작성일</th>
                            <th style={{ width: '80px' }}>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQnA.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    게시글이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredQnA.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-center text-gray-400">{item.id}</td>
                                    <td className="text-center">
                                        <span className={item.answered ? 'status-answered' : 'status-pending'}>
                                            {item.answered ? '답변완료' : '답변대기'}
                                        </span>
                                    </td>
                                    <td className="post-title">{item.title}</td>
                                    <td className="text-center text-gray-400">{item.author}</td>
                                    <td className="text-center text-gray-400">{item.date}</td>
                                    <td className="text-center text-gray-400">{item.views}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="board-pagination">
                    <button className="active">1</button>
                    <button>2</button>
                    <button>»</button>
                </div>
            </div>
        </div>
    );
}
