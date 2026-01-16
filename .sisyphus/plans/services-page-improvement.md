# Services Page Improvement Plan

## Context

### Original Request
Marine Research 웹사이트의 서비스 페이지(/services)를 simpac 템플릿 수준으로 개선
- Swiper 무한 루프가 부자연스러움 (6→1 전환 시 왼쪽으로 역주행)
- UI가 simpac 템플릿에 비해 덜 고급스러움

### Interview Summary
**Key Discussions**:
- Swiper 루프 방식: **진짜 무한 루프** (1→2→3→4→5→6→1 계속 오른쪽)
- 배경: **비디오 사용** (이미지 폴백)
- 상세 팝업: **간단히** (제목 + 비주얼 + 설명 + CTA)
- 모바일 비디오: `-mo.mp4` 있으면 사용, 없으면 PC 비디오 + object-fit:cover
- 헤더/네비게이션: **수정 금지**
- npm 패키지: **새 패키지 금지**

**Research Findings**:
- Swiper v12 사용 중 (v11에서 `loopedSlides` 제거됨 → `loopAdditionalSlides` 사용)
- simpac은 `loop: false` 사용 (참고용, 우리는 true 유지)
- simpac 리소스: 메뉴 썸네일, 상세 비주얼, 배경 비디오 존재

### Metis Review
**Identified Gaps** (addressed):
- 비디오 폴백 전략: ImageBackground 유지하여 폴백으로 사용
- 모바일 비디오 전략: PC/모바일 분리 (-mo.mp4 존재시)
- 상세 팝업 범위: 간단히로 결정 (스코프 크립 방지)

---

## Work Objectives

### Core Objective
서비스 페이지의 Swiper 무한 루프를 자연스럽게 수정하고, 비디오 배경 및 실제 이미지 썸네일을 적용하여 UI 품질 향상

### Concrete Deliverables
- `BusinessServicesPage.tsx`: VideoBackground 컴포넌트 추가, Swiper 무한 루프 수정
- `BusinessMenuPopup.tsx`: 썸네일에 실제 이미지 적용
- `BusinessDetailPopup.tsx`: 16:9 비주얼 영역 개선
- `globals.css`: glassmorphism 효과 강화

### Definition of Done
- [ ] 6→1 슬라이드 전환 시 **오른쪽**으로 자연스럽게 이동
- [ ] 모든 슬라이드에서 비디오 배경 재생 (muted, autoplay, loop)
- [ ] 메뉴 팝업 썸네일에 실제 이미지 표시
- [ ] 상세 팝업에서 16:9 비주얼 영역에 이미지 표시
- [ ] `npm run build` 성공
- [ ] `npm run dev`로 localhost:3000/services 페이지 정상 동작 확인

### Must Have
- 진짜 무한 루프 (6→1이 오른쪽으로)
- 비디오 배경 (autoplay, muted, loop, playsInline)
- 비디오 로드 실패 시 이미지 폴백
- 모바일에서 `-mo.mp4` 사용 (있는 경우)

### Must NOT Have (Guardrails)
- **BusinessNav.tsx 수정 금지**
- **헤더 관련 컴포넌트 수정 금지**
- **새 npm 패키지 설치 금지**
- **휠 스크롤 로직 (lines 184-215) 수정 금지** - 이미 정상 작동
- **servicesData 기존 필드 삭제 금지** - 새 필드 추가만 허용
- Ken Burns 이미지 애니메이션 삭제 금지 (폴백용)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES (Next.js dev server)
- **User wants tests**: Manual-only
- **QA approach**: Manual verification via browser

### Manual Execution Verification

**Verification Tool**: Playwright browser automation (localhost:3000/services)

**Required Checks**:
1. 슬라이드 6→1 전환 방향 확인
2. 비디오 재생 상태 확인
3. 메뉴 팝업 썸네일 이미지 로딩 확인
4. 상세 팝업 비주얼 확인
5. 빌드 성공 확인

---

## Pre-requisites (User Action Required)

### 사용자가 먼저 완료해야 할 작업

simpac 리소스를 `marine-web-app/public/images/services/` 폴더로 복사:

**메뉴 썸네일** (6개):
```
Template/simpac/resources/_asset/kr/images/contents/business-menu-visual-1.jpg → public/images/services/menu-1.jpg
Template/simpac/resources/_asset/kr/images/contents/business-menu-visual-3.jpg → public/images/services/menu-2.jpg
Template/simpac/resources/_asset/kr/images/contents/business-menu-visual-4.jpg → public/images/services/menu-3.jpg
Template/simpac/resources/_asset/kr/images/contents/business-menu-visual-5.jpg → public/images/services/menu-4.jpg
Template/simpac/resources/_asset/kr/images/contents/business-menu-visual-6.jpg → public/images/services/menu-5.jpg
(6번째는 기존 이미지 사용 또는 추가)
```

**배경 비디오** (PC):
```
Template/simpac/resources/_asset/kr/images/video/business-visual-1.mp4 → public/videos/services/bg-1.mp4
Template/simpac/resources/_asset/kr/images/video/business-visual-3.mp4 → public/videos/services/bg-2.mp4
Template/simpac/resources/_asset/kr/images/video/business-visual-4.mp4 → public/videos/services/bg-3.mp4
Template/simpac/resources/_asset/kr/images/video/business-visual-5.mp4 → public/videos/services/bg-4.mp4
Template/simpac/resources/_asset/kr/images/video/business-visual-6.mp4 → public/videos/services/bg-5.mp4
```

**배경 비디오** (Mobile, 있는 경우):
```
Template/simpac/resources/_asset/kr/images/video/business-visual-3-mo.mp4 → public/videos/services/bg-2-mo.mp4
Template/simpac/resources/_asset/kr/images/video/business-visual-4-mo.mp4 → public/videos/services/bg-3-mo.mp4
Template/simpac/resources/_asset/kr/images/video/business-visual-5-mo.mp4 → public/videos/services/bg-4-mo.mp4
```

> **Note**: 6번째 서비스(R&D)용 비디오가 simpac에 없을 수 있음. 기존 이미지로 폴백되거나 다른 비디오 사용.

---

## Task Flow

```
Task 0 (Pre-req) → Task 1 → Task 2 → Task 3 → Task 4 → Task 5
                              ↘ Task 3 (parallel with 2)
```

## Parallelization

| Group | Tasks | Reason |
|-------|-------|--------|
| A | 2, 3 | 독립적인 컴포넌트 수정 |

| Task | Depends On | Reason |
|------|------------|--------|
| 1 | 0 (Pre-req) | 비디오 파일 필요 |
| 2 | 1 | servicesData에 새 필드 필요 |
| 3 | 1 | servicesData에 새 필드 필요 |
| 4 | 2, 3 | 컴포넌트 완료 후 CSS 조정 |
| 5 | 4 | 모든 변경 완료 후 검증 |

---

## TODOs

- [x] 1. servicesData 확장 및 VideoBackground 컴포넌트 추가

  **What to do**:
  - `servicesData` 배열에 새 필드 추가:
    - `thumbnailSrc`: 메뉴 썸네일 이미지 경로
    - `videoSrc`: PC 비디오 경로
    - `videoSrcMobile`: 모바일 비디오 경로 (optional)
  - `VideoBackground` 컴포넌트 생성 (ImageBackground 패턴 참고)
    - `<video>` 태그: autoPlay, muted, loop, playsInline 속성
    - poster 속성으로 첫 프레임 빠른 표시
    - onError 핸들러로 ImageBackground 폴백
    - 모바일 감지하여 -mo 비디오 사용
  - 기존 `ImageBackground` 컴포넌트 유지 (폴백용)

  **Must NOT do**:
  - BusinessNav.tsx 수정
  - 휠 스크롤 로직 수정 (lines 184-215)
  - servicesData 기존 필드 삭제

  **Parallelizable**: NO (다른 작업의 기반)

  **References**:
  
  **Pattern References**:
  - `BusinessServicesPage.tsx:93-116` - AnimatedGradientBackground 컴포넌트 구조
  - `BusinessServicesPage.tsx:118-158` - ImageBackground 컴포넌트 (복제하여 VideoBackground 생성)
  - `BusinessServicesPage.tsx:17-90` - servicesData 현재 구조
  
  **External References**:
  - HTML video 속성: muted, autoPlay, loop, playsInline
  
  **WHY Each Reference Matters**:
  - ImageBackground 패턴을 그대로 따라 VideoBackground 생성
  - servicesData에 필드 추가하여 각 서비스별 비디오/썸네일 매핑

  **Acceptance Criteria**:
  - [x] servicesData에 thumbnailSrc, videoSrc, videoSrcMobile 필드 추가됨
  - [x] VideoBackground 컴포넌트가 video 태그 렌더링
  - [x] video 태그에 autoPlay, muted, loop, playsInline 속성 있음
  - [x] 비디오 로드 실패 시 ImageBackground로 폴백
  - [x] 모바일(768px 이하)에서 videoSrcMobile 사용 (있는 경우)
  - [x] `npm run build` 성공

  **Commit**: YES
  - Message: `feat(services): add VideoBackground component and extend servicesData`
  - Files: `BusinessServicesPage.tsx`
  - Pre-commit: `npm run build`

---

- [x] 2. Swiper 무한 루프 수정

  **What to do**:
  - 두 Swiper 인스턴스(bgSwiper, dataSwiper)에 `loopAdditionalSlides: 1` 추가
  - `loopPreventsSliding: false` 추가 (애니메이션 중 슬라이딩 허용)
  - 슬라이드 6→1 전환 테스트
  - 필요시 Swiper 이벤트 핸들러 조정 (방향 강제)

  **Must NOT do**:
  - loop: true를 false로 변경하지 않음
  - 휠 스크롤 로직 수정하지 않음

  **Parallelizable**: YES (Task 3과 병렬 가능)

  **References**:
  
  **Pattern References**:
  - `BusinessServicesPage.tsx:274-303` - bgSwiper 설정
  - `BusinessServicesPage.tsx:308-337` - dataSwiper 설정
  
  **API/Type References**:
  - Swiper v12 loop 옵션: loopAdditionalSlides, loopPreventsSliding
  
  **Documentation References**:
  - Swiper Migration Guide v11: loopedSlides 제거됨, loopAdditionalSlides 사용
  
  **WHY Each Reference Matters**:
  - 두 Swiper가 동기화되어 있으므로 동일한 설정 적용 필요

  **Acceptance Criteria**:
  - [x] 휠 스크롤로 6→1 전환 시 **오른쪽**으로 이동 (왼쪽으로 돌아가지 않음)
  - [x] 터치 스와이프로 6→1 전환 동일하게 동작
  - [x] 1→6 (역방향)도 자연스러운 왼쪽 이동
  - [x] 배경/콘텐츠 Swiper 동기화 유지
  - [ ] Using playwright: localhost:3000/services에서 6번 스크롤 후 방향 확인

  **Commit**: YES
  - Message: `fix(services): correct Swiper infinite loop direction`
  - Files: `BusinessServicesPage.tsx`
  - Pre-commit: `npm run build`

---

- [x] 3. BusinessMenuPopup 썸네일 이미지 적용

  **What to do**:
  - `Service` 인터페이스에 `thumbnailSrc` 필드 추가
  - gradient div를 `<img>` 태그로 교체
  - 이미지 로딩 상태 처리 (로딩 중 gradient 표시)
  - hover 시 이미지 1.1x 확대 유지

  **Must NOT do**:
  - 3+2 staggered grid 레이아웃 변경하지 않음
  - 애니메이션 타이밍 변경하지 않음

  **Parallelizable**: YES (Task 2와 병렬 가능)

  **References**:
  
  **Pattern References**:
  - `BusinessMenuPopup.tsx:116-118` - 현재 gradient 사용하는 thumb 영역
  - `BusinessMenuPopup.tsx:141-143` - 하단 row thumb 영역
  - `globals.css:609-618` - .btn-menu-nav .thumb img 스타일 (이미 정의됨!)
  
  **WHY Each Reference Matters**:
  - 이미 CSS에 img 스타일이 정의되어 있음 → div를 img로만 교체하면 됨

  **Acceptance Criteria**:
  - [x] 메뉴 팝업 열면 6개 썸네일에 실제 이미지 표시
  - [x] 이미지 로딩 전에는 gradient 플레이스홀더 표시
  - [x] hover 시 이미지 1.1x 확대 애니메이션 동작
  - [x] active 상태에서 lime dot 표시
  - [ ] Using playwright: 메뉴 열고 썸네일 이미지 확인

  **Commit**: YES
  - Message: `feat(services): add real thumbnail images to menu popup`
  - Files: `BusinessMenuPopup.tsx`
  - Pre-commit: `npm run build`

---

- [x] 4. BusinessDetailPopup 비주얼 개선

  **What to do**:
  - 16:9 비주얼 영역에 실제 이미지 표시 (gradient 대신)
  - 이미지 위에 gradient overlay 유지 (가독성)
  - Service 인터페이스에 detailImageSrc 필드 추가 (또는 imageSrc 재활용)

  **Must NOT do**:
  - 콘텐츠 구조 복잡하게 만들지 않음 (간단히로 결정됨)
  - Escape 키 핸들링 수정하지 않음
  - body 스크롤 락 로직 수정하지 않음

  **Parallelizable**: NO (Task 1, 2, 3 완료 후)

  **References**:
  
  **Pattern References**:
  - `BusinessDetailPopup.tsx:110-113` - 현재 gradient 사용하는 detail-visual 영역
  - `globals.css:747-760` - .detail-visual 스타일
  
  **WHY Each Reference Matters**:
  - 현재 gradient만 있는 영역에 이미지 추가

  **Acceptance Criteria**:
  - [x] "Learn More" 클릭 시 상세 팝업에 16:9 이미지 표시
  - [x] 이미지 위에 gradient overlay 적용 (하단으로 갈수록 어두워짐)
  - [x] 텍스트 가독성 유지
  - [ ] Using playwright: Learn More 클릭 후 비주얼 이미지 확인

  **Commit**: YES
  - Message: `feat(services): add real images to detail popup visual`
  - Files: `BusinessDetailPopup.tsx`
  - Pre-commit: `npm run build`

---

- [x] 5. glassmorphism 효과 강화 (globals.css)

  **What to do**:
  - 메뉴 팝업 배경 blur 강화: `blur(30px)` → `blur(40px)`
  - 상세 팝업 배경 blur 강화: `blur(20px)` → `blur(30px)`
  - 버튼 테두리 효과 강화: `rgba(255,255,255,0.1)` → `rgba(255,255,255,0.15)`
  - 전체적인 투명도 조정 (배경이 너무 어두우면 밝게)

  **Must NOT do**:
  - 기존 클래스 이름 변경하지 않음
  - 미디어 쿼리 브레이크포인트 변경하지 않음
  - CSS 변수 삭제하지 않음

  **Parallelizable**: NO (마지막 조정 작업)

  **References**:
  
  **Pattern References**:
  - `globals.css:511-515` - .business-pop .pop-inner backdrop-filter
  - `globals.css:672-678` - .business-detail .detail-backdrop backdrop-filter
  - `globals.css:391-394` - .btn-more-nav backdrop-filter
  
  **WHY Each Reference Matters**:
  - glassmorphism 효과가 적용된 모든 요소 일괄 개선

  **Acceptance Criteria**:
  - [x] 메뉴 팝업 배경이 더 뚜렷하게 블러됨
  - [x] 상세 팝업 배경이 더 뚜렷하게 블러됨
  - [x] 버튼 테두리가 살짝 더 밝아짐
  - [x] 전체적으로 "고급스러운" 느낌 향상
  - [ ] Using playwright: 팝업 열고 배경 블러 효과 확인 (스크린샷 비교)

  **Commit**: YES
  - Message: `style(services): enhance glassmorphism effects`
  - Files: `globals.css`
  - Pre-commit: `npm run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(services): add VideoBackground component and extend servicesData` | BusinessServicesPage.tsx | npm run build |
| 2 | `fix(services): correct Swiper infinite loop direction` | BusinessServicesPage.tsx | npm run build |
| 3 | `feat(services): add real thumbnail images to menu popup` | BusinessMenuPopup.tsx | npm run build |
| 4 | `feat(services): add real images to detail popup visual` | BusinessDetailPopup.tsx | npm run build |
| 5 | `style(services): enhance glassmorphism effects` | globals.css | npm run build |

---

## Success Criteria

### Verification Commands
```bash
npm run build        # Expected: Build successful
npm run dev          # Start dev server for manual testing
```

### Final Checklist
- [ ] 슬라이드 6→1 전환이 **오른쪽**으로 자연스럽게 이동
- [ ] 모든 슬라이드에서 비디오 배경 자동 재생
- [ ] 비디오 없는 경우 이미지 폴백 동작
- [ ] 모바일에서 -mo 비디오 사용 (있는 경우)
- [ ] 메뉴 팝업 썸네일에 실제 이미지 표시
- [ ] 상세 팝업 비주얼에 실제 이미지 표시
- [ ] glassmorphism 효과 개선됨
- [ ] BusinessNav.tsx 미수정 확인
- [ ] 헤더 미수정 확인
- [ ] 새 npm 패키지 미설치 확인
- [ ] `npm run build` 성공
