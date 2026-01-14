# simpac.com/business → Marine_web 서비스 섹션 포팅

## Context

### Original Request
simpac.com/business 페이지를 Marine_web 프로젝트의 서비스 섹션으로 100% 동일하게 포팅.
- 헤더, nav바 제외
- 애니메이션, 구성요소, UI 디테일, 레이아웃 전부 동일하게

### Interview Summary
**Key Discussions**:
- 배경 유형: 그라데이션 유지 (비디오 사용 안 함)
- 상세 팝업: BusinessDetailPopup 신규 생성 (기본 필드: 제목, 설명, Learn More 버튼)
- 색상: Marine_web Cyan/Ocean Blue 유지
- 네비게이션: Prev/Next 화살표 제거, Learn more pill + Grid 버튼만
- 서비스 수: 6개 (해상풍력, 지구물리조사, 수로조사, 해양물리조사, 수산자원조사, R&D)
- Swiper 속도: 1600ms (simpac 동일)
- Autoplay: 제거
- 이미지: 자유롭게 추가 가능

**Research Findings**:
- simpac business.css: 1123줄 상세 스타일 정의
- simpac front_ui.js: GSAP ScrollTrigger, Swiper 동기화, stagger 0.05s
- 현재 Marine_web: GSAP 설치됨 (@/lib/gsap), Swiper 사용 중

### Metis Review
**Identified Gaps** (addressed):
- 서비스 개수 확정: 6개로 변경
- Learn More 동작 확정: Detail Popup 열기
- Autoplay 설정 확정: 제거
- 100% 동일 기준 확정: 기능적 동일 (픽셀 퍼펙트 아님)

---

## Work Objectives

### Core Objective
simpac.com/business 페이지의 레이아웃, 애니메이션, UI 디테일을 Marine_web의 서비스 섹션에 기능적으로 동일하게 구현

### Concrete Deliverables
- `BusinessServicesPage.tsx` 수정 (Swiper 속도, Autoplay 제거, 6개 서비스)
- `BusinessNav.tsx` 수정 (화살표 제거, simpac 구조)
- `BusinessMenuPopup.tsx` 수정 (3+2 staggered 그리드)
- `BusinessDetailPopup.tsx` 신규 생성
- `globals.css` 업데이트 (business-detail CSS 추가)

### Definition of Done
- [ ] 모든 6개 서비스가 슬라이더에 표시됨
- [ ] Learn More 클릭 → Detail Popup 열림
- [ ] Grid 버튼 클릭 → Menu Popup 열림 (3+2 그리드)
- [ ] Swiper 전환 속도 1600ms
- [ ] Prev/Next 화살표 버튼 없음
- [ ] 3개 breakpoint에서 정상 동작 (1024px, 768px, 480px)
- [ ] `npm run build` 성공
- [ ] Playwright 브라우저 테스트 통과

### Must Have
- simpac과 동일한 stagger 애니메이션 (0.05s 간격)
- easeOutQuart 이징 함수 적용
- glassmorphism 스타일 팝업
- ESC 키로 팝업 닫기
- 배경 클릭으로 팝업 닫기

### Must NOT Have (Guardrails)
- 비디오 배경 구현
- Prev/Next 화살표 버튼
- simpac의 Lime Green 색상
- 새로운 npm 패키지 설치
- 다른 페이지 컴포넌트 수정
- 헤더/네비게이션 바 수정

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES (Playwright 사용 가능)
- **User wants tests**: Manual verification (Playwright 브라우저)
- **Framework**: Playwright browser automation

### Manual QA Verification

**For each task:**
1. `npm run dev` 실행
2. `http://localhost:3000/ko/services` 접속
3. 시각적 확인 및 상호작용 테스트
4. Playwright 스크린샷 캡처

---

## Task Flow

```
Task 0 (서비스 데이터) 
    ↓
Task 1 (BusinessServicesPage) → Task 2 (BusinessNav) 병렬 가능
                                    ↓
                              Task 3 (BusinessMenuPopup)
                                    ↓
                              Task 4 (BusinessDetailPopup)
                                    ↓
                              Task 5 (globals.css)
                                    ↓
                              Task 6 (최종 검증)
```

## Parallelization

| Group | Tasks | Reason |
|-------|-------|--------|
| A | 1, 2 | 독립적인 컴포넌트 수정 |

| Task | Depends On | Reason |
|------|------------|--------|
| 3 | 2 | Nav 구조 변경 후 팝업 수정 |
| 4 | 3 | 메뉴 팝업 구조 확인 후 상세 팝업 생성 |
| 5 | 4 | 모든 컴포넌트 완성 후 CSS 정리 |
| 6 | 5 | 모든 작업 완료 후 검증 |

---

## TODOs

- [ ] 0. 서비스 데이터 업데이트 (6개 서비스)

  **What to do**:
  - `BusinessServicesPage.tsx`의 `servicesData` 배열을 6개로 확장
  - 서비스 목록: 해상풍력, 지구물리조사, 수로조사, 해양물리조사, 수산자원조사, R&D
  - 각 서비스에 적절한 영문 title, 한글 titleKo, description 배열 추가
  - 각 서비스에 고유한 gradient 색상 지정

  **Must NOT do**:
  - 데이터 타입 구조 변경 (기존 interface 유지)
  - 다른 파일에서 서비스 데이터 import (현재 파일 내 유지)

  **Parallelizable**: NO (기반 작업)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:16-79` - 현재 servicesData 배열 구조
  - `marine-web-app/src/lib/navData.ts` - 실제 서비스 카테고리 참고 가능

  **Acceptance Criteria**:
  - [ ] servicesData 배열에 6개 서비스 정의됨
  - [ ] 각 서비스에 id, title, titleKo, description, gradient, accentColor 존재
  - [ ] TypeScript 컴파일 에러 없음: `npx tsc --noEmit`
  - [ ] 브라우저에서 6개 슬라이드 확인

  **Commit**: YES
  - Message: `feat(services): update servicesData to 6 marine survey categories`
  - Files: `BusinessServicesPage.tsx`

---

- [ ] 1. BusinessServicesPage.tsx 핵심 수정

  **What to do**:
  - Swiper speed를 800ms → 1600ms로 변경
  - Autoplay 설정 제거 (현재 delay: 6000)
  - Prev/Next 핸들러 제거 (handlePrev, handleNext)
  - nav-scroller 위치를 BusinessNav 컴포넌트 내부로 이동
  - BusinessDetailPopup 상태 관리 추가 (isDetailOpen, activeDetailIndex)

  **Must NOT do**:
  - Swiper 모듈 변경 (EffectFade 유지)
  - 배경 레이어 구조 변경

  **Parallelizable**: YES (with Task 2)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:166-211` - 현재 Swiper 설정
  - `Template/simpac/resources/_asset/kr/js/front_ui.js` - simpac Swiper speed: 1600ms

  **Acceptance Criteria**:
  - [ ] Swiper speed가 1600ms로 설정됨
  - [ ] Autoplay 관련 코드 제거됨
  - [ ] handlePrev, handleNext 함수 제거됨
  - [ ] isDetailOpen, activeDetailIndex 상태 추가됨
  - [ ] 브라우저에서 슬라이드 전환 속도 확인 (약 1.6초)
  - [ ] 자동 슬라이드 없음 확인

  **Commit**: YES
  - Message: `refactor(services): update Swiper to 1600ms speed, remove autoplay`
  - Files: `BusinessServicesPage.tsx`

---

- [ ] 2. BusinessNav.tsx simpac 구조로 변경

  **What to do**:
  - Prev/Next 화살표 버튼 완전 제거
  - btn-more-nav 구조 변경:
    - 썸네일 (현재 서비스 이미지/그라데이션)
    - "Learn more" 텍스트
    - Plus 아이콘 (ChevronDown 대신)
  - btn-all-nav (Grid 버튼) 유지
  - nav-scroller 추가 ("Scroll to explore" + ChevronDown)
  - onLearnMore prop 추가 (Detail Popup 열기용)

  **Must NOT do**:
  - 새로운 아이콘 라이브러리 설치 (lucide-react 사용)
  - Grid 버튼 동작 변경

  **Parallelizable**: YES (with Task 1)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessNav.tsx` - 현재 구현
  - `Template/simpac/resources/_asset/kr/css/view/business.css:465-533` - btn-more-nav, btn-all-nav 스타일
  - `Template/simpac/scroll page.png` - 하단 네비게이션 시각적 참고

  **Acceptance Criteria**:
  - [ ] Prev/Next 버튼 없음
  - [ ] "Learn more" 텍스트와 Plus 아이콘 표시
  - [ ] 썸네일에 현재 서비스 표시
  - [ ] Grid 버튼 클릭 → onMenuOpen 호출
  - [ ] Learn more 버튼 클릭 → onLearnMore 호출
  - [ ] "Scroll to explore" 텍스트 표시

  **Commit**: YES
  - Message: `refactor(services): update BusinessNav to simpac structure`
  - Files: `BusinessNav.tsx`

---

- [ ] 3. BusinessMenuPopup.tsx 3+2 그리드 레이아웃

  **What to do**:
  - 메뉴 그리드를 3+2 staggered 레이아웃으로 변경
  - gap: 5.25rem 6.25rem (PC)
  - 아이템 너비: 15rem (PC)
  - active 아이템에 cyan dot 표시 (::before pseudo-element)
  - 썸네일 hover 시 scale(1.1) 애니메이션
  - GSAP 진입 애니메이션: y:40, opacity:0, scale:0.9 → y:0, opacity:1, scale:1
  - stagger: 0.05s, duration: 0.6s, ease: power4.out

  **Must NOT do**:
  - simpac의 Lime Green 사용 (Cyan 사용)
  - 닫기 버튼 구조 변경

  **Parallelizable**: NO (depends on Task 2)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessMenuPopup.tsx` - 현재 구현
  - `Template/simpac/resources/_asset/kr/css/view/business.css:68-173` - business-menu 스타일
  - `Template/simpac/category.png` - 3+2 그리드 시각적 참고
  - `marine-web-app/src/app/globals.css:505-579` - 현재 business-menu CSS

  **Acceptance Criteria**:
  - [ ] 6개 메뉴 아이템이 3+2 staggered 그리드로 표시
  - [ ] 현재 활성 아이템에 cyan dot 표시
  - [ ] 아이템 hover 시 이미지 scale(1.1)
  - [ ] 팝업 열릴 때 stagger 애니메이션 (0.05s 간격)
  - [ ] ESC 키로 닫기 동작
  - [ ] 반응형: 1024px에서 gap, width 조정

  **Commit**: YES
  - Message: `feat(services): implement 3+2 staggered grid in BusinessMenuPopup`
  - Files: `BusinessMenuPopup.tsx`

---

- [ ] 4. BusinessDetailPopup.tsx 신규 생성

  **What to do**:
  - 새 파일 생성: `BusinessDetailPopup.tsx`
  - 풀스크린 모달 형태 (business-pop 스타일 재사용)
  - glassmorphism 배경 (backdrop-filter: blur)
  - 콘텐츠: 서비스 제목, 설명, "사이트 바로가기" 버튼
  - 닫기 버튼 (X 아이콘, 우상단)
  - ESC 키 닫기, 배경 클릭 닫기
  - GSAP 진입/퇴장 애니메이션
  - index.ts에 export 추가

  **Must NOT do**:
  - 복잡한 상세 콘텐츠 (기본 필드만)
  - 새로운 데이터 타입 도입
  - 외부 API 호출

  **Parallelizable**: NO (depends on Task 3)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessMenuPopup.tsx` - 팝업 구조 참고
  - `Template/simpac/resources/_asset/kr/css/view/business.css:175-379` - business-detail 스타일
  - `Template/simpac/learn more.png` - 상세 팝업 시각적 참고
  - `marine-web-app/src/app/globals.css:445-503` - business-pop CSS

  **Acceptance Criteria**:
  - [ ] BusinessDetailPopup.tsx 파일 생성됨
  - [ ] index.ts에 export 추가됨
  - [ ] 풀스크린 모달 형태로 표시
  - [ ] glassmorphism 배경 적용
  - [ ] 서비스 제목, 설명 표시
  - [ ] "사이트 바로가기" 버튼 표시
  - [ ] X 버튼 클릭 → 닫힘
  - [ ] ESC 키 → 닫힘
  - [ ] 배경 클릭 → 닫힘
  - [ ] TypeScript 에러 없음

  **Commit**: YES
  - Message: `feat(services): create BusinessDetailPopup component`
  - Files: `BusinessDetailPopup.tsx`, `index.ts`

---

- [ ] 5. globals.css 업데이트 및 반응형 완성

  **What to do**:
  - business-detail 관련 CSS 추가 (Template/simpac/business.css:175-379 참고)
  - nav-scroller CSS 완성 (현재 기본만 있음)
  - 3+2 그리드 레이아웃 CSS 추가
  - 반응형 breakpoints 완성:
    - 1024px: 태블릿 레이아웃
    - 768px: 모바일 레이아웃
    - 480px: 소형 모바일 레이아웃
  - easeOutQuart 이징 함수 확인 (이미 있음)

  **Must NOT do**:
  - 기존 CSS 변수 덮어쓰기
  - .business- 프리픽스 외 클래스 추가
  - 다른 섹션 CSS 수정

  **Parallelizable**: NO (depends on Task 4)

  **References**:
  - `marine-web-app/src/app/globals.css:244-719` - 현재 business CSS
  - `Template/simpac/resources/_asset/kr/css/view/business.css` - 전체 1123줄
  - `Template/simpac/resources/_asset/kr/css/base/variable.css` - CSS 변수

  **Acceptance Criteria**:
  - [ ] .business-detail 클래스 추가됨
  - [ ] .detail-scroller, .detail-items 스타일 정의됨
  - [ ] nav-scroller 애니메이션 완성
  - [ ] 3+2 그리드 레이아웃 CSS 추가됨
  - [ ] 1024px breakpoint 동작 확인
  - [ ] 768px breakpoint 동작 확인
  - [ ] 480px breakpoint 동작 확인
  - [ ] CSS 문법 에러 없음

  **Commit**: YES
  - Message: `style(services): add business-detail CSS and complete responsive breakpoints`
  - Files: `globals.css`

---

- [ ] 6. 최종 통합 테스트 및 검증

  **What to do**:
  - 모든 컴포넌트 통합 확인
  - BusinessServicesPage에서 DetailPopup 연결
  - Playwright 브라우저로 전체 플로우 테스트:
    1. 페이지 로드 → 6개 슬라이드 확인
    2. 슬라이드 전환 → 1600ms 속도 확인
    3. Learn more 클릭 → Detail Popup 열림
    4. ESC/X/배경 클릭 → Popup 닫힘
    5. Grid 버튼 클릭 → Menu Popup 열림
    6. 메뉴 아이템 클릭 → 해당 슬라이드로 이동
  - 3개 breakpoint 스크린샷 캡처
  - npm run build 성공 확인

  **Must NOT do**:
  - 추가 기능 구현
  - 성능 최적화 (별도 태스크)

  **Parallelizable**: NO (최종 단계)

  **References**:
  - 모든 이전 태스크의 결과물
  - `Template/simpac/scroll page.png` - 최종 비교 기준
  - `Template/simpac/category.png` - 메뉴 팝업 비교
  - `Template/simpac/learn more.png` - 상세 팝업 비교

  **Acceptance Criteria**:
  - [ ] `npm run build` 성공
  - [ ] 6개 서비스 슬라이드 정상 표시
  - [ ] 슬라이드 전환 1600ms 동작
  - [ ] Autoplay 없음 확인
  - [ ] Learn more → Detail Popup 동작
  - [ ] Grid → Menu Popup 동작
  - [ ] ESC/X/배경 클릭으로 팝업 닫힘
  - [ ] 1024px 레이아웃 정상
  - [ ] 768px 레이아웃 정상
  - [ ] 480px 레이아웃 정상
  - [ ] simpac 스크린샷과 기능적으로 동일

  **Commit**: YES
  - Message: `feat(services): complete simpac business page porting`
  - Files: `BusinessServicesPage.tsx` (최종 통합)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 0 | `feat(services): update servicesData to 6 marine survey categories` | BusinessServicesPage.tsx | `npx tsc --noEmit` |
| 1 | `refactor(services): update Swiper to 1600ms speed, remove autoplay` | BusinessServicesPage.tsx | 브라우저 확인 |
| 2 | `refactor(services): update BusinessNav to simpac structure` | BusinessNav.tsx | 브라우저 확인 |
| 3 | `feat(services): implement 3+2 staggered grid in BusinessMenuPopup` | BusinessMenuPopup.tsx | 브라우저 확인 |
| 4 | `feat(services): create BusinessDetailPopup component` | BusinessDetailPopup.tsx, index.ts | `npx tsc --noEmit` |
| 5 | `style(services): add business-detail CSS and complete responsive breakpoints` | globals.css | 브라우저 확인 |
| 6 | `feat(services): complete simpac business page porting` | BusinessServicesPage.tsx | `npm run build` |

---

## Success Criteria

### Verification Commands
```bash
# TypeScript 검증
npx tsc --noEmit  # Expected: 에러 없음

# 빌드 검증
npm run build  # Expected: 성공

# 개발 서버 실행
npm run dev  # Expected: localhost:3000 접속 가능
```

### Final Checklist
- [ ] 모든 "Must Have" 항목 구현됨
- [ ] 모든 "Must NOT Have" 항목 없음
- [ ] 6개 서비스 정상 표시
- [ ] simpac과 기능적으로 동일한 UX
- [ ] 3개 breakpoint 정상 동작
- [ ] 빌드 성공
