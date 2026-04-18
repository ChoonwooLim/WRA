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
