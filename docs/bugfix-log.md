# 버그 수정 로그

| 날짜 | 버그 | 원인 | 수정 내용 | 관련 파일 |
|------|------|------|-----------|-----------|
| 2026-04-20 | 모든 페이지 콘솔에 `eth.merkle.io` CORS 에러 수십 건 발생 | wagmi `getDefaultConfig` 기본 transport가 CORS 를 허용하지 않는 `eth.merkle.io` 공용 RPC로 설정됨 | mainnet transport 를 `https://cloudflare-eth.com`, sepolia 를 `https://ethereum-sepolia-rpc.publicnode.com` 로 명시 | web/lib/config.ts |
| 2026-04-20 | 관리자 구독자 페이지에 실제로 DB에 있는 구독자가 표시되지 않음 | catch 블록이 fetch 에러(403/500/세션 만료 등)를 조용히 삼키고 `setSubscribers([])` 만 호출 → 사용자는 에러 없이 "구독자가 없습니다" 로만 보임 | catch 에서 에러 메시지를 상단 빨간 배너로 노출, `cache: 'no-store'` 추가로 항상 최신 데이터 조회 | web/app/admin/subscribers/page.tsx |
| 2026-04-29 | 황태손 인사말 본문에 '왕실' 단독 표기가 위원회 요청대로 '왕실, 황실'로 수정되지 않은 채 남아있음 | 이전 작업에서 dictionary 본문 4곳 누락 | 한글 4곳 + 영문 4곳 (royal → royal and imperial) 일괄 수정 | web/dictionaries/index.ts |
| 2026-04-29 | 영문 모드(EN)로 토글하면 히어로 타이틀이 'WORLD ROYAL ACADEMY'를 두 번 표시하고 메인이 작게 보임 | 메인 타이틀이 language=='en' 분기에서 EN 이미지를 사용하면서 자막도 EN 으로 중복, 너비 정렬도 안 됨 | 언어 토글과 무관하게 메인=한글본 + 자막=WRA 영문 워드마크 항상 표시. 메인을 KO 마스크 div 단일 분기로 고정 | web/components/home/HeroSection.tsx |
| 2026-05-01 | 게시글 작성기에서 이미지 업로드 시 항상 500 "Failed to process upload" 에러 발생 | `/api/upload` 가 원격 프록시 시도 시 `req.formData()` 를 호출해 바디 스트림을 소진한 뒤, 원격 실패로 폴백 진입했을 때 다시 `req.formData()` 호출 → 두 번째 호출이 throw → catch-all 에서 500 응답. 로컬 dev(localhost → 원격 wra.twinverse.org) 는 쿠키 도메인 불일치로 항상 원격이 401 을 돌려주므로 폴백이 매번 발동되어 항상 실패 | 바디를 한 번만 파싱해 `Buffer` 로 보관 → 원격 프록시 시도 → 실패 시 같은 buffer 로 로컬 저장. 두 번째 `req.formData()` 호출 제거 | web/app/api/upload/route.ts |
