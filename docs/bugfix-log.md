# 버그 수정 로그

| 날짜 | 버그 | 원인 | 수정 내용 | 관련 파일 |
|------|------|------|-----------|-----------|
| 2026-04-20 | 모든 페이지 콘솔에 `eth.merkle.io` CORS 에러 수십 건 발생 | wagmi `getDefaultConfig` 기본 transport가 CORS 를 허용하지 않는 `eth.merkle.io` 공용 RPC로 설정됨 | mainnet transport 를 `https://cloudflare-eth.com`, sepolia 를 `https://ethereum-sepolia-rpc.publicnode.com` 로 명시 | web/lib/config.ts |
