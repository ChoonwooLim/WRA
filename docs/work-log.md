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

### 세션 후반 2 — 구독자 목록 버그 수정 + 관리자 알림 시스템 실DB 연동

- **a1571aa** `fix: surface admin subscribers fetch errors instead of silent empty list`
  - 증상: 관리자 구독자 페이지에서 실제 DB에 있는 행이 표시되지 않음. 사용자 피드백으로 발견.
  - 원인: `web/app/admin/subscribers/page.tsx` 의 catch 블록이 에러(403/500/세션 만료)를 조용히 삼키고 `setSubscribers([])` 만 호출 → 에러 메시지 없이 "구독자가 없습니다" 로만 표시됨.
  - 수정: catch 에서 에러 메시지를 상단 빨간 배너로 노출, `fetch` 에 `cache: 'no-store'` 추가해 항상 최신 데이터 조회.
  - 프로덕션 curl 테스트로 subscribe/admin-subscribers 엔드포인트 모두 정상 배포·동작 확인 (`HTTP 200 {"ok":true}` / `HTTP 403` without auth).
- **5b09652** `feat: 관리자 알림 시스템 실DB 연동`
  - **DB 마이그레이션 `20260420125233_add_notification`**: `Notification` 모델 (id/type/title/message/detail/actionLabel/actionHref/isRead/createdAt + 2 indexes). Orbitron dev-postgres 에 적용 완료. Render 재배포 시 `prisma migrate deploy` 로 자동 적용.
  - `web/lib/notifications.ts` 신규: `createNotification()` 헬퍼. 실패해도 메인 플로우 차단하지 않도록 try/catch 로 감쌈.
  - **이벤트 훅 3곳**:
    - `web/app/api/auth/signup/route.ts`: 회원가입 성공 후 'signup' 알림 적재 (이메일/전화 상세 포함)
    - `web/app/api/posts/route.ts`: 게시글 생성 후 'post' (또는 Q&A의 경우 'comment') 알림 적재. `BOARD_LABEL` 맵으로 한글 라벨 표시.
    - `web/app/api/newsletter/subscribe/route.ts`: 신규 구독 시 'subscribe' 알림 적재.
  - `web/app/api/admin/notifications/route.ts` 신규: 관리자 권한 체크 → GET(filter=all/unread/signup/cert/post/subscribe) / PATCH(action=markRead|markAllRead) / DELETE(id|all:true). `findMany` take 200 cap.
  - `web/app/admin/notifications/page.tsx` 전면 재작성: mock 제거. `useEffect` 로 실 API 페치, 필터 탭 6종(전체/읽지않음/회원가입/뉴스레터/게시글/인증), `timeAgo()` 로 상대시간 표시, 클릭 시 자동 읽음 + 낙관적 UI 업데이트, 개별/일괄 삭제, 모두 읽음, 새로고침 버튼, 에러 배너.
- 인증(`cert`) 타입은 향후 인증 신청 API 추가되면 동일 방식으로 `createNotification({ type: 'cert', ... })` 호출하여 훅 걸면 됨. 지금은 훅 대상 API가 없으므로 필터 탭만 존재.
- `/admin/subscribers` 에러 배너 노출 fix 덕분에 향후 유사한 403/세션 만료 이슈가 발생해도 사용자가 원인을 바로 식별 가능.

---

## 2026-04-28

### 작업 요약

| 카테고리 | 작업 내용 | 상태 |
|----------|----------|------|
| feat | 신광철 작가 프로필 책 갤러리 갱신 (황금 액자 + 4열 그리드, 신규 표지 36점) | 완료 |
| chore | 작업 트리 일괄 커밋 (로고/원본 이미지/크라운·타이틀 자산, 페이지 수정, .claude 로컬 설정) | 완료 |

### 세부 내용

- **1f11a37** `feat: 신광철 작가 프로필 책 갤러리 갱신 (황금 액자 + 4열 그리드)`
  - 신규 책 표지 36점 추가 (`web/public/images/books/sinkwangchul/`, `그림1`~`그림38` 4·34 누락)
  - 그리드 레이아웃 4열(데스크탑)로 변경, 가로 우선 정렬 (CSS columns → grid)
  - 황금 그라데이션 액자(프레임) + 매트지 + floor reflection 호버 효과
  - 모든 표지가 동일한 3:4 액자 안에서 비율 유지하며 통일된 크기로 표시 (`object-contain`)
- **e4d6a73** `chore: 작업 트리 일괄 커밋`
  - 로고 자산 추가 (`Logo/`)
  - 신광철 도서 원본 이미지 백업 (`image/`)
  - WRA 크라운/타이틀 이미지 추가 (`web/public/images/wra-{crown,title-en,title-ko}.png`)
  - about/organization, progress-report, HeroSection, Footer, Navbar 미커밋 변경 일괄 정리
  - AI_WIKI.md, 실행 미리보기 HTML, 로컬 .claude 설정 포함

---

## 2026-04-29

### 작업 요약

| 카테고리 | 작업 내용 | 상태 |
|----------|----------|------|
| style | 히어로 한글 타이틀 80% 축소 + 흰색 렌더링 (CSS filter brightness(0) invert(1)) | 완료 |
| feat | 히어로 한글 타이틀 색상 흐름 애니메이션 (CSS mask + 그라데이션 sweep + hue-rotate 사이클) | 완료 |
| fix | 황태손 인사말 본문 '왕실' → '왕실, 황실' 통일 (한 4곳 + 영 4곳) | 완료 |
| fix | 히어로 타이틀 언어 토글 무관하게 한글본 동일 표시 (글자 순서 보존) | 완료 |
| feat (i18n) | 영문 모드 미번역 한글 일괄 번역 — 11개 페이지 (Navbar, certification, CEO 프로필, education 4종, warrant 2종, community 2종, about 2종, services/tours) | 부분완료 |

### 세부 내용

- **9c40738** `style: 히어로 한글 타이틀 80% 축소 + 흰색 렌더링`
  - `Logo/세계왕립아카데미.png` → `web/public/images/wra-title-ko.png` 교체 (cache-busting `?v=3`)
  - 너비 정렬: KO·EN 메인 둘 다 `w-[19/28.5/33.3]rem` 로 통일 (높이는 비율 자동)
  - CSS filter `brightness(0) invert(1) drop-shadow(...)` 로 어두운 글자 → 순백 + 그림자
- **730401f** `feat: 히어로 한글 타이틀 색상 흐름 애니메이션`
  - `<motion.div>` + CSS `mask-image` 로 글자 모양만 추출
  - `linear-gradient(90deg, white→fceda6→d4af37→fceda6→white)` + `background-size: 200%` + `repeat` 으로 무한 sweep
  - `backgroundPosition: ['200% 0%', '0% 0%']` (좌→우, 6초 linear)
  - `filter: hue-rotate(0→360deg)` 18초 사이클 추가 — 무지개 색 순환
- **0574a1e** `fix: 황태손 인사말 '왕실' → '왕실, 황실' 통일`
  - 한글 4곳: 역사적으로/국제 네트워크/협력 네트워크/이제 ~의 품격
  - 영문 4곳: royal families → royal and imperial families 등 자연스러운 영문 변환
  - 위원회 요청 반영 (이전 누락분)
- **f08bc59** `fix: 히어로 타이틀 언어 무관하게 한글본과 동일하게 표시`
  - 사용자 피드백: 글자 순서·구성을 한글본 기준으로 항상 표시
  - 메인 타이틀 (세계왕립아카데미) + 자막 (WORLD ROYAL ACADEMY) 둘 다 언어 무관 고정
  - 미사용 `language` destructuring 정리

#### i18n 대규모 번역 작업 (6 커밋)

- **e6f3208** `i18n: 영문 모드 미번역 한글 일괄 번역 (Navbar/Certification/CEO)`
  - Navbar: `지갑 로딩...` → `Loading...` (Web3 ConnectButton 비-React 컨텍스트)
  - certification 페이지: 철학 인용구, 혜택 카드 3종, CEO 필수교육 카드 3종, 로열 헤리티지 파트너스
  - CEO 프로필 (`about/ceo/`): 인트로/핵심역량 3종/B2B 클라이언트 4종/주요 프로젝트/한국일보·국민일보 기사/어워드/타임라인 5종/글로벌 인사이트/클로징 인용구
  - 인라인 `ko ? KO : EN` 패턴 (CEO 페이지 기존 패턴 확장)
- **f9bf2ff** `i18n: 교육 페이지 번역 (literature/culture/books/language)`
  - literature 페이지: 시·철학 본문 의역 — 데이터 배열 KO/EN 분리(curriculumSteps/expectedEffects/programFormats), AI시대 인문학 시구, "가장 먼 거리"·"인문학이란" 카드, 프로그램 목표/운영방식/차별성/기대효과/대상, 책 글쓰기 12단계
  - culture 페이지: literature 와 동일 콘텐츠 → 번역된 literature 파일 복사 (BOM 보존)
  - books 페이지: 대표 서적 헤더, 인용구, CTA 버튼
  - language 페이지: 훈민정음 시구 영문판
- **b8aa0d2** `i18n: warrant 랜딩/교육·커뮤니티 contact·newsletter 영문화`
  - warrant: 4영역 카드 (교육/투어/멤버십/컨설팅) + 히어로/섹션 헤더
  - warrant/education: 한국학/한국인문학/한국어 프로그램 카드 + 자세히 보기 라벨
  - community/contact: 라벨, 에러 메시지, 전송 완료 상태, 제출 버튼
  - community/newsletter: 구독 결과 메시지(이미/재구독/신규), 동의 문구, 로딩/빈 상태
- **db42378** `i18n: about-progress-report / about-organization 영문화`
  - progress-report: 8개 마일스톤 KO/EN 분기(1990 대중음악 산업화 ~ 2026.11 세계왕립도서관)
  - organization: 조직도 4계층, 황태손/CEO/원장 카드, 4개 공통 협력 본부, CEO 모달, 황태손 모달 4가지 활동 영역
  - 황실 호칭 학술 영문 표기 (Empress Myeongseong, Jongmyo Daeje, Crown Prince Yi Gu 등)
- **b4acebb** `i18n: services/tours 1차`
  - palaceTours/ceremonyTours/museumTours: KO/EN 배열 분리 (5궁 + 3제향 + 6박물관)
  - 섹션 헤더: 3대 제향 / 왕릉제향 / 5대궁 투어 / 박물관 투어 + 부제
  - 왕릉 4가지 특징 (풍수 합일 / 공간 철학 / 의궤 기록 / 살아있는 제례) KO/EN 분기
  - 능역 콜랩스 라벨 (제향일 안내, 일시/장소/시간, '기'→'tombs')
- **791bbcf** `i18n: services/tours palaceData 영문판`
  - 587줄 추가 — 15개 항목 모달 본문 영문 의역
  - 5대궁 + 5대궁 안내도 + 3대 제향 (preIntro/schedule 포함) + 6박물관
  - 모든 갤러리 캡션 KO/EN 분기

### 미완료 (다음 세션)

- `services/tours` 모달 UI 라벨 (이미지 갤러리 네비게이션 등)
- `warrant/tours` 와 `services/tours` 동기화 (warrant/tours 는 UNESCO 섹션 추가됨)
- 사용자 요청: "이섹션까지만하고 멈춰" — palaceData EN 작성 완료 후 일시 중단 상태

---
