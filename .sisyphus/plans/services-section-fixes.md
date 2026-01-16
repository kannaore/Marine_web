# Services Section 4가지 이슈 수정

## Context

### Original Request
서비스 섹션 구현 중 4가지 문제 수정:
1. Swiper 무한 루프 버그 (마지막→첫 페이지 역방향 문제)
2. 상세 팝업 바깥 클릭으로 닫기 (현재 안 됨)
3. 글래스모피즘 디자인 개선 (올드함 → Modern Premium)
4. 배경 그라데이션 제거 (비디오만 사용)

### Interview Summary
**Key Discussions**:
- Loop: 사용자는 무한 루프 유지 원함 (Simpac처럼 loop 제거 X)
- 팝업: 현재 backdrop onClick 있지만 전혀 작동 안 함
- 글래스: Modern Premium 스타일, 전체 적용 (버튼 + 팝업 + 메뉴)
- 배경: gradient overlay 완전 제거, 비디오만 (fallback 시에만 gradient 유지)
- 테스트: Playwright 수동 QA

**Research Findings**:
- Simpac 원본은 `loop: false` 사용 (front_ui.js line 2441)
- Simpac 글래스: `rgba(47, 54, 58, 0.40)` + `blur(32px)`
- **팝업 문제 원인 발견**: CSS `pointer-events: none`이 backdrop 클릭 차단

### Metis Review
**Identified Gaps** (addressed):
- Swiper 버전 확인 필요 → `loopAdditionalSlides` 값 조정으로 해결 시도
- 팝업 문제 오진 → `pointer-events: auto` 추가로 간단히 해결
- Safari backdrop-filter 성능 → blur 값 최적화로 대응

---

## Work Objectives

### Core Objective
서비스 섹션의 Swiper 루프 버그, 팝업 닫기, 글래스모피즘 디자인, 배경 그라데이션 4가지 이슈를 수정하여 Simpac 수준의 완성도 달성

### Concrete Deliverables
- 수정된 `BusinessServicesPage.tsx` (Swiper loop 버그 수정)
- 수정된 `BusinessDetailPopup.tsx` (팝업 닫기 로직 - 필요시)
- 수정된 `globals.css` (글래스모피즘 + popup pointer-events)
- 수정된 VideoBackground 컴포넌트 (gradient overlay 조건부 제거)

### Definition of Done
- [ ] 슬라이드 6→1 전환 시 자연스럽게 다음으로 넘어감 (역방향 X)
- [ ] 슬라이드 1→6 전환 시 자연스럽게 이전으로 넘어감
- [ ] 상세 팝업 바깥 클릭 시 닫힘
- [ ] 글래스 버튼이 배경이 비치는 Modern Premium 스타일
- [ ] 비디오 배경에 gradient overlay 없음 (fallback 제외)

### Must Have
- 무한 루프 정상 작동 (양방향)
- 팝업 바깥 클릭 닫기
- 배경 비디오만 (gradient 없음)
- Modern Premium 글래스모피즘

### Must NOT Have (Guardrails)
- `loop: true` 설정 변경 금지 (loop 유지)
- `handleSlideChange` sync 로직 불필요한 변경 금지
- BusinessMenuPopup 수정 금지 (문제없음)
- 인라인 rgba 사용 금지 (CSS 변수 사용)
- 비디오 fallback 체인 변경 금지

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO
- **User wants tests**: Manual-only
- **Framework**: none
- **QA approach**: Playwright 브라우저 수동 검증

---

## Task Flow

```
Task 0 (CSS 변수 추가)
    ↓
Task 1 (Swiper Loop) ─────┐
Task 2 (Popup Close) ─────┼─→ Task 4 (글래스모피즘)
Task 3 (Background) ──────┘         ↓
                              Task 5 (최종 검증)
```

## Parallelization

| Group | Tasks | Reason |
|-------|-------|--------|
| A | 1, 2, 3 | 서로 다른 기능, 독립적 |
| B | 0 → 4 | CSS 변수 추가 후 글래스 적용 |

| Task | Depends On | Reason |
|------|------------|--------|
| 4 | 0 | CSS 변수가 먼저 정의되어야 함 |
| 5 | 1, 2, 3, 4 | 모든 수정 완료 후 통합 검증 |

---

## TODOs

- [ ] 0. CSS 변수 및 글래스모피즘 기반 추가

  **What to do**:
  - `globals.css` 상단에 Modern Premium 글래스 CSS 변수 추가
  - Simpac 참조: `--Colors-Solid-Glass-Dark: rgba(47, 54, 58, 0.40)`
  - 추가할 변수: `--glass-bg`, `--glass-blur`, `--glass-border`

  **Must NOT do**:
  - 기존 CSS 변수 덮어쓰기 금지
  - 인라인 값 사용 금지

  **Parallelizable**: NO (다른 태스크의 선행 조건)

  **References**:
  
  **Pattern References**:
  - `me_make/Template/simpac/resources/_asset/kr/css/base/variable.css:50-80` - Simpac 글래스 변수 정의
  
  **Current Implementation**:
  - `marine-web-app/src/app/globals.css:1-50` - 현재 CSS 변수 섹션

  **Acceptance Criteria**:
  
  **Manual Execution Verification:**
  - [ ] `globals.css` 상단에 다음 변수들이 정의됨:
    ```css
    --glass-bg-dark: rgba(47, 54, 58, 0.40);
    --glass-blur-md: blur(32px);
    --glass-blur-sm: blur(20px);
    --glass-border: 1px solid rgba(255, 255, 255, 0.15);
    ```
  - [ ] 빌드 에러 없음: `npm run build` 성공

  **Commit**: YES
  - Message: `style(services): add glassmorphism CSS variables`
  - Files: `globals.css`
  - Pre-commit: `npm run lint`

---

- [ ] 1. Swiper 무한 루프 버그 수정

  **What to do**:
  - `BusinessServicesPage.tsx`의 Swiper 설정 검토
  - `loopAdditionalSlides: 1` → `loopAdditionalSlides: 2` 시도
  - 그래도 안 되면: `slideToLoop` 방향 로직 확인 및 수정
  - 두 Swiper(bg + data) 동기화 로직 검토

  **Must NOT do**:
  - `loop: true` 설정 제거 금지
  - 불필요한 sync 로직 변경 금지

  **Parallelizable**: YES (with 2, 3)

  **References**:
  
  **Pattern References**:
  - `me_make/Template/simpac/resources/_asset/kr/js/front_ui.js:2440-2486` - Simpac Swiper 설정 (loop: false 사용)
  - `me_make/Template/simpac/resources/_asset/kr/js/front_ui.js:2712-2750` - Simpac wheel 핸들러
  
  **Current Implementation**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:336-380` - 현재 Swiper 설정
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:309-317` - handleSlideChange sync 로직
  
  **External References**:
  - Swiper Loop 공식 문서: https://swiperjs.com/swiper-api#param-loop

  **Acceptance Criteria**:
  
  **Manual Execution Verification (Playwright):**
  - [ ] Navigate to: `http://localhost:3000/services` (또는 해당 페이지)
  - [ ] 마지막 슬라이드(6번)에서 아래로 스크롤
  - [ ] **Expected**: 자연스럽게 1번 슬라이드로 전환 (역방향 애니메이션 X)
  - [ ] 첫 슬라이드(1번)에서 위로 스크롤
  - [ ] **Expected**: 자연스럽게 6번 슬라이드로 전환
  - [ ] 배경 비디오와 텍스트 Swiper가 동기화되어 움직임
  - [ ] Screenshot: `.sisyphus/evidence/task-1-loop-forward.png`, `task-1-loop-backward.png`

  **Commit**: YES
  - Message: `fix(services): correct swiper infinite loop direction`
  - Files: `BusinessServicesPage.tsx`
  - Pre-commit: `npm run lint`

---

- [ ] 2. 상세 팝업 바깥 클릭 닫기 수정

  **What to do**:
  - `globals.css`에서 `.detail-backdrop`에 `pointer-events: auto` 추가
  - 또는 `.business-detail.active .detail-backdrop`에 명시적 추가
  - 기존 `onClick={onClose}` 로직은 이미 있음 (BusinessDetailPopup.tsx:88)

  **Must NOT do**:
  - React 컴포넌트 로직 불필요한 변경 금지
  - BusinessMenuPopup 수정 금지

  **Parallelizable**: YES (with 1, 3)

  **References**:
  
  **Pattern References**:
  - `me_make/Template/simpac/resources/_asset/kr/js/front_ui.js:2470-2483` - Simpac detail click handler
  
  **Current Implementation**:
  - `marine-web-app/src/components/sections/business/BusinessDetailPopup.tsx:86-90` - backdrop onClick (이미 있음)
  - `marine-web-app/src/app/globals.css:653-678` - .business-detail CSS (pointer-events: none 문제)

  **Acceptance Criteria**:
  
  **Manual Execution Verification (Playwright):**
  - [ ] Navigate to services page
  - [ ] "Learn More" 버튼 클릭하여 상세 팝업 열기
  - [ ] 콘텐츠 영역 바깥 (어두운 backdrop) 클릭
  - [ ] **Expected**: 팝업이 닫힘
  - [ ] 콘텐츠 영역 (이미지, 텍스트) 클릭
  - [ ] **Expected**: 팝업이 닫히지 않음
  - [ ] ESC 키 누르기
  - [ ] **Expected**: 팝업이 닫힘
  - [ ] X 버튼 클릭
  - [ ] **Expected**: 팝업이 닫힘
  - [ ] Screenshot: `.sisyphus/evidence/task-2-popup-close.png`

  **Commit**: YES
  - Message: `fix(services): enable popup backdrop click to close`
  - Files: `globals.css`
  - Pre-commit: `npm run lint`

---

- [ ] 3. 배경 그라데이션 오버레이 제거

  **What to do**:
  - `BusinessServicesPage.tsx`의 `VideoBackground` 컴포넌트에서 gradient overlay div 조건부 렌더링
  - 비디오 성공 시: overlay 없음
  - 비디오 실패/fallback 시: gradient overlay 유지

  **Must NOT do**:
  - fallback 체인 (ImageBackground, AnimatedGradientBackground) 변경 금지
  - 텍스트 가독성을 위한 `bg-marine-dark/30` 제거 금지

  **Parallelizable**: YES (with 1, 2)

  **References**:
  
  **Pattern References**:
  - `me_make/Template/simpac/resources/_asset/kr/css/view/business.css:579-600` - Simpac video-wrap (gradient 없음)
  
  **Current Implementation**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:163-178` - VideoBackground 컴포넌트
  - Line 175: `<div className={...gradient opacity-40} />` ← 제거 대상

  **Acceptance Criteria**:
  
  **Manual Execution Verification (Playwright):**
  - [ ] Navigate to services page
  - [ ] 각 슬라이드의 배경 비디오 확인
  - [ ] **Expected**: 비디오 위에 컬러 그라데이션 오버레이 없음
  - [ ] **Expected**: 텍스트 가독성을 위한 어두운 오버레이는 유지됨
  - [ ] 비디오 없는 슬라이드 (R&D 등) 확인
  - [ ] **Expected**: fallback 이미지에는 gradient 유지
  - [ ] Screenshot: `.sisyphus/evidence/task-3-video-no-gradient.png`

  **Commit**: YES
  - Message: `style(services): remove gradient overlay from video backgrounds`
  - Files: `BusinessServicesPage.tsx`
  - Pre-commit: `npm run lint`

---

- [ ] 4. 글래스모피즘 스타일 전체 적용

  **What to do**:
  - `.btn-more-nav`, `.btn-all-nav` 버튼 스타일 업데이트
  - `.business-pop .pop-inner` 배경 스타일 업데이트
  - `.business-detail .detail-backdrop` 스타일 업데이트
  - Task 0에서 추가한 CSS 변수 사용
  - 투명도 낮추기 (0.7 → 0.4), blur 최적화 (Safari 고려)

  **Must NOT do**:
  - 인라인 rgba 값 사용 금지 (변수 사용)
  - hover/active 상태 제거 금지

  **Parallelizable**: NO (Task 0 완료 후)

  **References**:
  
  **Pattern References**:
  - `me_make/Template/simpac/resources/_asset/kr/css/view/business.css:465-533` - Simpac nav 버튼 스타일
  - `me_make/Template/simpac/resources/_asset/kr/css/base/variable.css:50-80` - 글래스 변수
  
  **Current Implementation**:
  - `marine-web-app/src/app/globals.css:383-476` - 현재 버튼 스타일
  - `marine-web-app/src/app/globals.css:504-519` - 현재 팝업 배경 스타일
  - `marine-web-app/src/app/globals.css:672-678` - 현재 detail backdrop 스타일

  **Acceptance Criteria**:
  
  **Manual Execution Verification (Playwright):**
  - [ ] Navigate to services page
  - [ ] 하단 "Learn More" 버튼 확인
  - [ ] **Expected**: 배경이 살짝 비치는 반투명 글래스 효과
  - [ ] **Expected**: 버튼 배경 불투명도 약 40%
  - [ ] Grid 버튼 클릭하여 메뉴 팝업 열기
  - [ ] **Expected**: 팝업 배경이 고급스러운 blur 처리
  - [ ] "Learn More" 버튼 클릭하여 상세 팝업 열기
  - [ ] **Expected**: 상세 팝업 배경도 동일한 글래스 스타일
  - [ ] Safari에서 테스트 (가능한 경우)
  - [ ] **Expected**: 심한 성능 저하 없음
  - [ ] Screenshot: `.sisyphus/evidence/task-4-glassmorphism.png`

  **Commit**: YES
  - Message: `style(services): apply modern premium glassmorphism`
  - Files: `globals.css`
  - Pre-commit: `npm run lint`

---

- [ ] 5. 통합 검증 및 최종 테스트

  **What to do**:
  - 모든 수정사항 통합 검증
  - 빌드 성공 확인
  - 전체 사용자 플로우 테스트

  **Must NOT do**:
  - 새로운 기능 추가 금지

  **Parallelizable**: NO (모든 태스크 완료 후)

  **References**:
  
  **All Previous Tasks**: 1, 2, 3, 4

  **Acceptance Criteria**:
  
  **Build Verification:**
  - [ ] `npm run build` → 성공, 에러 없음
  - [ ] `npm run lint` → 에러 없음

  **Manual Execution Verification (Playwright):**
  - [ ] 전체 플로우:
    1. 페이지 로드 → 첫 슬라이드 비디오 배경 (gradient 없음)
    2. 스크롤하여 모든 슬라이드 탐색 (루프 정상 작동)
    3. "Learn More" 클릭 → 상세 팝업 열림
    4. 바깥 클릭 → 팝업 닫힘
    5. Grid 버튼 클릭 → 메뉴 팝업 열림
    6. 메뉴 항목 클릭 → 해당 슬라이드로 이동
  - [ ] 모바일 뷰포트에서 동일 플로우 테스트
  - [ ] Screenshot: `.sisyphus/evidence/task-5-final-*.png`

  **Commit**: YES (통합 커밋 또는 태그)
  - Message: `feat(services): complete services section improvements`
  - Files: 모든 수정 파일
  - Pre-commit: `npm run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 0 | `style(services): add glassmorphism CSS variables` | globals.css | npm run lint |
| 1 | `fix(services): correct swiper infinite loop direction` | BusinessServicesPage.tsx | npm run lint |
| 2 | `fix(services): enable popup backdrop click to close` | globals.css | npm run lint |
| 3 | `style(services): remove gradient overlay from video backgrounds` | BusinessServicesPage.tsx | npm run lint |
| 4 | `style(services): apply modern premium glassmorphism` | globals.css | npm run lint |
| 5 | `feat(services): complete services section improvements` | - | npm run build |

---

## Success Criteria

### Verification Commands
```bash
npm run lint    # Expected: 0 errors
npm run build   # Expected: 성공
npm run dev     # Expected: localhost에서 정상 작동
```

### Final Checklist
- [ ] Swiper 무한 루프 양방향 정상 작동
- [ ] 상세 팝업 바깥 클릭으로 닫힘
- [ ] 글래스모피즘 Modern Premium 스타일 적용
- [ ] 비디오 배경에 gradient overlay 없음
- [ ] 빌드 성공, 린트 에러 없음
- [ ] 모바일에서도 정상 작동
