# WRA Certificate NFT — 배포 가이드

## 1. 사전 준비

### 테스트 ETH 받기

- [sepoliafaucet.com](https://sepoliafaucet.com) 에서 Sepolia 테스트 ETH 받기
- MetaMask 지갑에 Sepolia 네트워크 추가

### Remix IDE 사용 (가장 간단)

1. [remix.ethereum.org](https://remix.ethereum.org) 접속
2. 좌측 File Explorer에서 새 파일 생성: `WRACertificate.sol`
3. `contracts/WRACertificate.sol` 내용 복사 붙여넣기

## 2. 컴파일

1. Remix 좌측 **Solidity Compiler** 탭 클릭
2. Compiler 버전: `0.8.20` 선택
3. **Compile** 클릭

## 3. 배포

1. Remix 좌측 **Deploy & Run** 탭 클릭
2. Environment: **Injected Provider - MetaMask** 선택
3. MetaMask에서 **Sepolia** 네트워크 확인
4. Contract: **WRACertificate** 선택
5. **Deploy** 클릭 → MetaMask에서 트랜잭션 승인

## 4. 주소 등록

배포 완료 후 표시되는 **Contract Address**를 복사하여:

```typescript
// lib/contracts/wraCertificate.ts
export const WRA_CERT_CONTRACT_ADDRESS = '0x여기에_컨트랙트_주소_입력';
```

## 5. 확인

- [sepolia.etherscan.io](https://sepolia.etherscan.io)에서 컨트랙트 주소 검색
- 관리자 페이지(`/admin/certifications`)에서 지갑 연결 후 인증서 발급 테스트
- 공개 검증 페이지(`/verify`)에서 Token ID로 조회 테스트
