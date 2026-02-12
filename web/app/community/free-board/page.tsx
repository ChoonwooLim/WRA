'use client';

import { Search, Pen, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const samplePosts = [
    { id: 1, title: 'WRA 커뮤니티에 오신 것을 환영합니다!', author: '관리자', date: '2026-01-10', views: 567, likes: 32 },
    { id: 2, title: '한국 전통 문화와 현대의 조화에 대해', author: '김태영', date: '2026-01-15', views: 234, likes: 15 },
    { id: 3, title: '왕립 투어 후기 공유합니다', author: '이서연', date: '2026-01-22', views: 189, likes: 23 },
    { id: 4, title: 'K-Culture 교육 프로그램 참여 후기', author: '박은지', date: '2026-01-28', views: 145, likes: 18 },
    { id: 5, title: '디지털 아카이브 프로젝트 아이디어 공유', author: '정하늘', date: '2026-02-01', views: 98, likes: 7 },
    { id: 6, title: 'Royal 33 멤버들의 활동 정보 모음', author: '최준혁', date: '2026-02-05', views: 312, likes: 41 },
    { id: 7, title: '한국어 교육 수업 추천 부탁드립니다', author: '송민아', date: '2026-02-08', views: 67, likes: 4 },
    { id: 8, title: '2026년 상반기 행사 일정 정리', author: '윤재호', date: '2026-02-10', views: 423, likes: 28 },
];

export default function FreeBoardPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = samplePosts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                {/* Board Header */}
                <div className="board-header">
                    <h1 className="board-title">💬 자유게시판</h1>
                </div>

                {/* Controls: Search + Write */}
                <div className="board-controls">
                    <div className="board-search">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="게시글 검색..."
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
                            <th>제목</th>
                            <th style={{ width: '120px' }}>작성자</th>
                            <th style={{ width: '110px' }}>작성일</th>
                            <th style={{ width: '80px' }}>조회수</th>
                            <th style={{ width: '80px' }}>추천</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    게시글이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredPosts.map((post) => (
                                <tr key={post.id}>
                                    <td className="text-center text-gray-400">{post.id}</td>
                                    <td className="post-title">{post.title}</td>
                                    <td className="text-center text-gray-400">{post.author}</td>
                                    <td className="text-center text-gray-400">{post.date}</td>
                                    <td className="text-center text-gray-400">{post.views}</td>
                                    <td className="text-center">
                                        <span className="inline-flex items-center gap-1 text-gray-400">
                                            <ThumbsUp className="w-3 h-3" />
                                            {post.likes}
                                        </span>
                                    </td>
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
