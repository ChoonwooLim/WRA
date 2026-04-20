# 버그 수정 로그

| 날짜 | 버그 | 원인 | 수정 내용 | 관련 파일 |
|------|------|------|-----------|-----------|
| 2026-04-20 | 모든 페이지 콘솔에 `eth.merkle.io` CORS 에러 수십 건 발생 | wagmi `getDefaultConfig` 기본 transport가 CORS 를 허용하지 않는 `eth.merkle.io` 공용 RPC로 설정됨 | mainnet transport 를 `https://cloudflare-eth.com`, sepolia 를 `https://ethereum-sepolia-rpc.publicnode.com` 로 명시 | web/lib/config.ts |
| 2026-04-20 | 관리자 구독자 페이지에 실제로 DB에 있는 구독자가 표시되지 않음 | catch 블록이 fetch 에러(403/500/세션 만료 등)를 조용히 삼키고 `setSubscribers([])` 만 호출 → 사용자는 에러 없이 "구독자가 없습니다" 로만 보임 | catch 에서 에러 메시지를 상단 빨간 배너로 노출, `cache: 'no-store'` 추가로 항상 최신 데이터 조회 | web/app/admin/subscribers/page.tsx |
