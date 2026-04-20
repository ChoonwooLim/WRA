# 작업일지

이 프로젝트의 모든 세션별 작업 내역을 날짜순으로 기록합니다.
`/end` 스킬이 세션 종료 시 자동으로 append 합니다.

---

## 2026-04-18

### 작업 요약

| 카테고리 | 작업 내용 | 상태 |
|----------|----------|------|
| feat | 조직도에 신광철 프로필·이호종 경과보고 링크 페이지 추가, "WRA Warrant" → "WRA K-HUMAN" 전역 리네이밍 | 완료 |
| feat | Next.js `headers()`에 Cache-Control 추가 (HTML `must-revalidate`, `/_next/static/*` `immutable`) — 유저가 새로고침 없이 수정사항 확인 가능 | 완료 |
| chore | Render.com 자동 배포 테스트용 빈 커밋 | 완료 |
| infra | 전역 settings.json에 `permissions.defaultMode: "bypassPermissions"` 적용 | 완료 |

### 세부 내용

- **286fd82** `feat: rename WRA Warrant to WRA K-HUMAN and add profile/progress-report pages`
  - `web/app/about/profile/sinkwangchul/page.tsx` 신규: 프로필 히어로 + 저서 42권 masonry 갤러리
  - `web/app/about/progress-report/page.tsx` 신규: 이호종 창설자 카드 + 5개 마일스톤 (1990/1995/2011.10/2015.11/Vision) 타임라인
  - `web/app/about/organization/page.tsx`: 신광철 노드에 "프로필 →", 이호종 노드에 "경과보고 →" 필 버튼 추가, 모든 프로필 버튼 일관된 pill 스타일로 통일
  - `web/dictionaries/index.ts` 등: "WRA Warrant"/"WRA 워런트" → "WRA K-HUMAN" 10건 치환
- **383ca9d** `feat: add Cache-Control headers to force revalidation on every visit`
  - `web/next.config.ts` + `web/next.config.js` (Linux 빌드용 미러) 동시 수정
  - `/_next/static/*` → `public, max-age=31536000, immutable`
  - 그 외 전부 → `public, max-age=0, must-revalidate`
- **2ed9ce7** `chore: trigger Render auto-deploy test`
  - 빈 커밋으로 GitHub → Render 웹훅 경로 확인
- Render.com 호스팅. Auto-Deploy: On Commit 확인. GitHub 수동 웹훅 중복 가능성 안내.
- 로고 변경은 사용자가 파일 미수령 상태로 보류.

---

## 2026-04-20

### 작업 요약

| 카테고리 | 작업 내용 | 상태 |
|----------|----------|------|
| feat | 연락처 폼을 Resend API 연동 — 고객 입력 → `/api/contact` → youna789@gmail.com 실수신 | 완료 |
| feat | 관리자 게시글/알림 페이지 인라인 확장 UX (타이틀 클릭 시 본문 펼치기, 필터/개별삭제) | 완료 |
| feat | 푸터 전화/이메일 `+82 010-2886-7392` / `youna789@gmail.com` 으로 갱신 (ko/en) | 완료 |
| infra | Resend 도메인 인증 (`세계왕립아카데미.org` → Punycode `xn--989ao0kixfkpc53jxpgt2bj12a.org`), DKIM/SPF/MX 레코드 가비아 등록 | 완료 |
| fix  | wagmi RPC 를 Cloudflare/publicnode 로 교체 — `eth.merkle.io` CORS 에러 제거 | 완료 |

### 세부 내용

- **58b19c2** `feat: wire contact form to Resend and add inline post/notification expand`
  - `web/app/api/contact/route.ts` 신규: POST 핸들러 (필수 필드 검증, 이메일 정규식, 길이 제한 100/200/5000)
  - `web/lib/email.ts`: Resend SDK 기반 `sendContactEmail` 추가. `replyTo: input.email` 로 관리자가 바로 회신 가능. 환경변수 미설정 시 console.log 폴백
  - `web/app/community/contact/page.tsx`: `useState` 기반 폼 바인딩, async submit, "전송 중..." 상태, 에러 배너
  - `web/app/admin/posts/page.tsx`: 타이틀을 버튼으로 감싸고 `ChevronDown` 아이콘 토글, `prose prose-invert` + `dangerouslySetInnerHTML` 로 본문 인라인 표시. `ExternalLink` 는 새 탭
  - `web/app/admin/notifications/page.tsx` 전면 재작성: `useState` 로 상태화, 필터 탭(all/unread/signup/cert/post), 개별 삭제, 전체 삭제 확인, 모두 읽음, `AnimatePresence` 확장 애니메이션
  - `web/dictionaries/index.ts`: 푸터 phone/email 갱신 (ko/en 모두)
  - `web/package.json`: `resend` 의존성 추가
- **819cf28** `fix: use CORS-enabled RPC endpoints for wagmi to silence eth.merkle.io errors`
  - `web/lib/config.ts`: `getDefaultConfig` 에 `transports` 명시
  - mainnet → `https://cloudflare-eth.com`, sepolia → `https://ethereum-sepolia-rpc.publicnode.com`
  - 기본값 `eth.merkle.io` 는 CORS 차단 → 모든 페이지에서 콘솔이 빨갛게 찍히던 원인
- Render 환경변수 3개 등록 완료: `RESEND_API_KEY`, `RESEND_FROM="World Royal Academy <noreply@xn--989ao0kixfkpc53jxpgt2bj12a.org>"`, `CONTACT_TO=youna789@gmail.com`
- Resend 도메인 인증 과정: 한글 도메인을 Punycode 로 변환 후 가비아에 DKIM TXT / MX (trailing dot 필수) / SPF TXT 등록. 3개 레코드 모두 Verified.
- Gmail 계정(youna789)은 받기 전용으로 유지. Resend 가 발송 주체이므로 Gmail SMTP 설정 불필요.

### 세션 후반 — 뉴스레터 구독 시스템 신규

- **a422ef0** `feat: newsletter subscription system (Resend batch + admin subscriber management)`
  - **DB 마이그레이션**: `Subscriber` 모델 신규 (`email` unique / `unsubscribeToken` unique default cuid / `consent` / `createdAt` / `unsubscribedAt`). 기존 마이그레이션 히스토리가 `db push` 로 생성되어 `add_password_reset_token` 이 failed 상태로 남아있어 `prisma migrate resolve --applied` 로 정리 후 `migrate deploy` 로 신규 마이그레이션 적용.
  - `web/app/api/newsletter/subscribe/route.ts` 신규: POST (이메일 정규식·동의 플래그 검증, 기존 구독자는 `alreadySubscribed`, 해지자는 `resubscribed` 로 분기)
  - `web/app/api/newsletter/unsubscribe/route.ts` 신규: GET (token 검증 → `unsubscribedAt` 세팅 → 완료 HTML 페이지 반환)
  - `web/app/api/admin/newsletter/send/route.ts` 신규: 관리자 전용, `postId` 로 뉴스레터 게시글을 받아 활성 구독자 전원에 Resend Batch API 100통씩 chunk 발송
  - `web/app/api/admin/subscribers/route.ts` 신규: GET(목록·카운트), DELETE(선택 일괄), PATCH(개별 수신거부↔재구독 토글)
  - `web/app/admin/subscribers/page.tsx` 신규: 검색·상태 필터(전체/활성/수신거부)·CSV 다운로드·개별 토글·일괄 삭제
  - `web/components/admin/AdminSidebar.tsx`: "뉴스레터 구독자" 메뉴 추가 (Mail 아이콘)
  - `web/app/community/newsletter/page.tsx`: 가짜 submit → 실제 `/api/newsletter/subscribe` 호출. **정보통신망법 대응 필수 동의 체크박스** 추가 (체크 없으면 제출 차단). 이미구독/재구독 케이스별 메시지 분기
  - `web/app/admin/posts/page.tsx`: `board='newsletter'` 게시글 행에 파란 Send 버튼 추가. 클릭 시 confirm → `/api/admin/newsletter/send` 호출 → `총 N · 성공 N · 실패 N` 결과 alert
  - `web/lib/email.ts`: `sendNewsletterBatch()` 추가. 100통씩 chunk, 각 통마다 고유 unsubscribe 링크 + `List-Unsubscribe` 헤더 (Gmail/Outlook 네이티브 해지 UI 활성화)
- 환영 메일(welcome email)은 미구현 — 필요 시 추후 추가.
- 프론트 typecheck: 신규 파일은 clean. `authOptions` export 경고는 Next 16 + 기존 `[...nextauth]/route.ts` 구조상 발생하는 프로젝트 전역 기존 경고로, 이번 세션 변경과 무관.

---
