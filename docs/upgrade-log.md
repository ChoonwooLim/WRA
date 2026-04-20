# 업그레이드 로그

| 날짜 | 변경 내용 | 카테고리 | 관련 파일 |
|------|----------|---------|----------|
| 2026-04-18 | 신광철 프로필 페이지 신규 (저서 42권 masonry 갤러리) | 페이지 추가 | web/app/about/profile/sinkwangchul/page.tsx |
| 2026-04-18 | 이호종 경과보고 페이지 신규 (5개 마일스톤 타임라인) | 페이지 추가 | web/app/about/progress-report/page.tsx |
| 2026-04-18 | 조직도에 프로필/경과보고 링크 및 일관된 pill 스타일 버튼 | UI 개선 | web/app/about/organization/page.tsx |
| 2026-04-18 | "WRA Warrant" → "WRA K-HUMAN" 전역 리네이밍 (10건) | 리네이밍 | web/dictionaries/index.ts, web/app/warrant/**, web/app/services/tours/page.tsx |
| 2026-04-18 | Cache-Control 헤더 추가 — 유저 새로고침 없이 최신 반영 | 인프라 | web/next.config.ts, web/next.config.js |
| 2026-04-20 | 연락처 폼 Resend API 연동 (POST /api/contact → youna789@gmail.com 실수신) | 기능 추가 | web/app/api/contact/route.ts, web/lib/email.ts, web/app/community/contact/page.tsx |
| 2026-04-20 | 관리자 게시글 페이지 인라인 확장 (타이틀 클릭 시 본문 펼치기) | UX 개선 | web/app/admin/posts/page.tsx |
| 2026-04-20 | 관리자 알림 페이지 재작성 — 필터 탭, 개별 삭제, 모두 읽음, 확장 애니메이션 | UX 개선 | web/app/admin/notifications/page.tsx |
| 2026-04-20 | 푸터 전화/이메일 `+82 010-2886-7392` / `youna789@gmail.com` 로 갱신 (ko/en) | 콘텐츠 | web/dictionaries/index.ts |
| 2026-04-20 | Resend 도메인 인증 — `세계왕립아카데미.org` Punycode 변환 + DKIM/SPF/MX 가비아 등록 | 인프라 | (외부 DNS / Render 환경변수) |
| 2026-04-20 | 뉴스레터 구독 시스템 신규 — Subscriber 모델 + 구독/해지 API + 정보통신망법 동의 체크박스 | 기능 추가 | web/prisma/schema.prisma, web/app/api/newsletter/subscribe/route.ts, web/app/api/newsletter/unsubscribe/route.ts, web/app/community/newsletter/page.tsx |
| 2026-04-20 | Resend Batch API 기반 뉴스레터 일괄 발송 (100통씩 chunk, List-Unsubscribe 헤더로 Gmail 네이티브 해지 UI) | 기능 추가 | web/lib/email.ts, web/app/api/admin/newsletter/send/route.ts |
| 2026-04-20 | 관리자 게시글 페이지에 뉴스레터 발송 Send 버튼 추가 (board='newsletter' 행 한정) | UX 개선 | web/app/admin/posts/page.tsx |
| 2026-04-20 | 관리자 구독자 관리 페이지 신규 — 검색/상태필터/CSV/개별토글/일괄삭제 | 페이지 추가 | web/app/admin/subscribers/page.tsx, web/app/api/admin/subscribers/route.ts, web/components/admin/AdminSidebar.tsx |
| 2026-04-20 | wagmi RPC 엔드포인트를 Cloudflare/publicnode 로 교체 — eth.merkle.io CORS 에러 제거 | 버그 수정 | web/lib/config.ts |
