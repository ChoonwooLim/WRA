# 리눅스 디플로이 서버 이미지 갤러리 설정 가이드

GitHub를 통한 배포(Deploy) 시 기존 갤러리 이미지 데이터들이 초기화되거나 엑스박스로 나오는 현상을 방지하기 위해, 리눅스 서버에서 적용해야 할 추가 설정 목록입니다.

## 1. 영구 저장용 외부 폴더 생성

Next.js 프로젝트 소스 코드 폴더 내부(`web/public/uploads`)가 아닌 관리용 서버의 안전한 경로에 갤러리 사진을 저장할 전용 폴더를 새롭게 만듭니다.

```bash
# 예시: /var/www/wra-data/uploads 위치에 폴더 생성 시
sudo mkdir -p /var/www/wra-data/uploads
```

## 2. 폴더 쓰기 권한 부여

현재 리눅스 서버에서 Next.js(앱)를 구동하는 시스템 계정이, 방금 만든 이미지 폴더에 실제로 파일을 저장할 수 있도록 권한을 변경해 주어야 합니다.
*(만약 서버 실행 계정이 `ubuntu` 라면 다음과 같이 설정합니다)*

```bash
sudo chown -R ubuntu:ubuntu /var/www/wra-data/uploads
sudo chmod -R 755 /var/www/wra-data/uploads
```

## 3. 서버의 환경 변수(.env) 설정 수정

배포 중인 리눅스 서버의 WRA 프로젝트 디렉토리 내부 `web/.env` 파일을 편집기로 열어서, 앞서 만든 폴더의 절댓값 경로를 `UPLOAD_DIR` 환경 변수로 추가해 줍니다.

```env
# 데이터베이스 URL(DATABASE_URL) 등 기존 설정들의 맨 아래줄에 추가

UPLOAD_DIR=/var/www/wra-data/uploads
```

**※ 주의사항 ※**
경로 양끝에 큰따옴표(`"`)나 작은따옴표(`'`)를 넣지 마시고 띄어쓰기 없이 순수 경로만 정확하게 입력해 주세요.

## 4. 소스 코드 동기화 및 서버 재시작

GitHub에 푸시된 소스 코드를 서버로 끌어온 뒤 빌드하여 최종 반영합니다.

```bash
# 1. 새 업로드 로직 코드 내려받기
git pull origin main

# 2. 애플리케이션 다시 빌드
npm run build

# 3. 서비스 완전 재시작 (PM2 등의 프로세스 매니저 사용 시)
# 예: pm2 restart <앱이름>
```

---
위 4가지 단계를 잘 완료하셨다면 구성은 끝납니다.
앞으로는 갤러리에서 "사진 올리기"를 하면 매번 안전한 `/var/www/wra-data/uploads` 위치로 저장되며, 여러 번 GitHub 자동/수동 배포를 진행하시더라도 더 이상 갤러리의 사진이 유실되거나 엑스박스 형태가 되지 않고 깔끔하게 통합 운영됩니다!
