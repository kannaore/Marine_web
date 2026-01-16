# Services Section V2 Fixes

## Context

### Original Request
사용자가 보고한 3가지 이슈:
1. 글래스모피즘 효과가 글래스 느낌이 전혀 안남. 윤곽선이 너무 굵음. 디버그 콘솔에 슬라이더로 다양한 옵션 조정 가능하게 구현
2. Swiper 루프가 완전히 꼬임. 끝페이지 도달시 페이지 이동 안되고 락 걸림
3. 상세페이지 바깥 클릭은 되지만, 카테고리 페이지는 구현 안됨

### Interview Summary
**Key Discussions**:
- Debug UI: Leva 라이브러리 사용 (이미 설치됨 v0.10.1)
- Debug 위치: 좌측 사이드바
- Debug 표시: 개발 환경에서만
- Glass 파라미터: 확장 (blur, opacity, color, border, shadow, noise)
- Glass 세션 저장: localStorage에 저장
- Glass 적용 범위: 전체 glass 요소 (btn-more-nav, btn-all-nav, pop-inner)
- Swiper 수정: Controller 모듈 사용
- Swiper 검증: 로그 추가하여 원인 확인 후 수정

**Research Findings**:
- Leva v0.10.1 이미 설치됨 (`marine-web-app/package.json:26`)
- `useAnimationConfig` 훅 존재 - 여기에 glass 컨트롤 추가
- 현재 CSS 문제: opacity 0.4-0.6 (권장 0.1-0.25), blur 32-40px (권장 8-20px)
- 배경색 `rgb(47,54,58)` 너무 어두움 - 유리 느낌 안남
- Swiper Controller 모듈이 loop 경계를 내부적으로 처리
- BusinessDetailPopup에 backdrop onClick 있음, BusinessMenuPopup에 없음

### Metis Review
**Identified Gaps** (addressed):
- CSS 변수 런타임 주입 로직 필요 → useLayoutEffect로 :root에 주입
- Controller 모듈 적용시 기존 수동 sync 코드 제거 필요 → 명시적 제거 단계 추가
- 색상도 조정 대상 → glass 컨트롤에 배경색 포함
- onSlideChangeTransitionEnd 실제로 안 불리는지 확인 필요 → 로깅 단계 추가

---

## Work Objectives

### Core Objective
Services 섹션의 3가지 UX 버그 수정: 글래스모피즘 시각 개선 + 디버그 도구, Swiper 루프 데드락 해결, 카테고리 팝업 바깥 클릭 닫기

### Concrete Deliverables
- `marine-web-app/src/hooks/useAnimationConfig.ts`: glass 컨트롤 추가 + CSS 변수 주입 로직
- `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx`: Swiper Controller 모듈 적용
- `marine-web-app/src/components/sections/business/BusinessMenuPopup.tsx`: backdrop 요소 추가
- `marine-web-app/src/app/globals.css`: glass CSS 변수 기본값 조정

### Definition of Done
- [ ] 개발 환경에서 Leva 패널에 Glass 컨트롤 표시됨
- [ ] 슬라이더 조작시 실시간으로 글래스 효과 변경됨
- [ ] 새로고침 후에도 조정한 값 유지됨
- [ ] Swiper 6번→1번, 1번→6번 루프 정상 작동
- [ ] 빠른 휠 스크롤에도 데드락 발생 안함
- [ ] 카테고리 팝업 바깥 영역 클릭시 닫힘
- [ ] `npm run build` 성공

### Must Have
- Glass 슬라이더: blur, opacity, background color, border alpha, border width
- Swiper: 루프 경계에서 락 안 걸림
- Popup: 바깥 클릭으로 닫기

### Must NOT Have (Guardrails)
- Services 섹션 외 컴포넌트에 glass 컨트롤 추가 금지
- 프리셋 시스템이나 테마 스위처 생성 금지
- Swiper 휠 핸들러 전체 교체 금지 (데드락만 수정)
- Swiper 페이지네이션/네비게이션 UI 추가 금지
- 슬라이드 전환 애니메이션/타이밍 변경 금지
- 팝업 레이아웃/스타일 변경 금지
- 새로운 훅 생성 금지 (기존 useAnimationConfig 확장)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO (자동화된 테스트 없음)
- **User wants tests**: Manual QA
- **QA approach**: 브라우저 수동 검증 + 콘솔 로그 확인

### Manual QA Procedures

**Task별 검증 방법 요약**:
| Task | 검증 도구 | 방법 |
|------|-----------|------|
| Glass Debug Panel | 브라우저 DevTools | Leva 패널 확인, CSS 변수 인스펙트 |
| Swiper Loop | 브라우저 콘솔 + 휠 | 로그 확인, 루프 경계 테스트 |
| Popup Outside Click | 브라우저 클릭 | 바깥 영역 클릭 테스트 |

---

## Task Flow

```
Task 0 (Swiper 로깅) → Task 1 (Swiper Controller) → Task 2 (Popup Fix)
                                                          ↓
                                                   Task 3 (Glass Debug)
```

## Parallelization

| Task | Depends On | Reason |
|------|------------|--------|
| 0 | - | 독립 |
| 1 | 0 | 로그로 원인 확인 후 수정 |
| 2 | - | 독립 (1과 병렬 가능) |
| 3 | - | 독립 (1,2와 병렬 가능) |

---

## TODOs

- [ ] 0. Swiper 데드락 원인 로깅 추가

  **What to do**:
  - `BusinessServicesPage.tsx`에 `handleSlideChangeTransitionEnd` 호출 확인 로그 추가
  - 루프 경계(slide 6→1, 1→6)에서 로그 출력 확인
  - `isTransitioning` 상태 변화 로그 추가

  **Must NOT do**:
  - 로직 변경 없이 로그만 추가
  - 프로덕션 코드에 영향 없는 console.log만

  **Parallelizable**: YES (독립)

  **References**:
  
  **Pattern References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:316-318` - handleSlideChangeTransitionEnd 함수 위치
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:272` - isTransitioning.current = true 설정 위치
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:244` - handleWheel에서 isTransitioning 체크 위치
  
  **API/Type References**:
  - Swiper onSlideChangeTransitionEnd 이벤트: https://swiperjs.com/swiper-api#event-slideChangeTransitionEnd

  **Acceptance Criteria**:
  
  **Manual Execution Verification**:
  - [ ] `npm run dev` 실행
  - [ ] 브라우저에서 http://localhost:3000/ko/services 접속
  - [ ] 콘솔 열고 (F12 → Console)
  - [ ] 휠 스크롤로 슬라이드 1→2→3 이동
  - [ ] 콘솔에 `[Swiper] TransitionEnd fired` 로그 확인
  - [ ] 슬라이드 6까지 이동 후 휠 다운
  - [ ] 로그 확인: TransitionEnd가 불리는지, isTransitioning 상태 확인
  - [ ] 락 걸리면: 콘솔에 `isTransitioning: true` 상태로 남아있는지 확인

  **Commit**: NO (다음 Task와 그룹)

---

- [ ] 1. Swiper Controller 모듈로 동기화 재작성

  **What to do**:
  - `swiper/modules`에서 Controller 모듈 import
  - 두 Swiper에 `modules={[Controller]}` 추가
  - `controller={{ control: otherSwiper }}` 양방향 바인딩
  - 기존 수동 동기화 코드 제거:
    - `handleSlideChange` 내 `slideToLoop` 호출 제거
    - `isTransitioning` ref 제거
    - `handleSlideChangeTransitionEnd`에서 isTransitioning 리셋 로직 제거
  - `handleWheel`에서 `isTransitioning` 체크 제거
  - 대신 Swiper 내장 `swiper.animating` 속성 사용 가능

  **Must NOT do**:
  - 휠 accumulator/threshold 로직 제거 금지 (UX 결정사항)
  - 새 Swiper 모듈 추가 금지 (Controller만)
  - 슬라이드 전환 속도 변경 금지

  **Parallelizable**: NO (Task 0 완료 후)

  **References**:
  
  **Pattern References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:332-364` - bgSwiper 설정
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:369-399` - dataSwiper 설정
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:305-313` - handleSlideChange (제거 대상)
  
  **API/Type References**:
  - Swiper Controller module: https://swiperjs.com/swiper-api#controller
  - React usage: `import { Controller } from 'swiper/modules'`
  
  **External References**:
  - Controller 모듈 React 예제 (librarian 리서치 결과):
    ```tsx
    const [bgSwiper, setBgSwiper] = useState(null);
    const [contentSwiper, setContentSwiper] = useState(null);
    
    <Swiper 
      modules={[Controller]} 
      onSwiper={setBgSwiper} 
      controller={{ control: contentSwiper }}
      loop={true}
    >
    ```

  **Acceptance Criteria**:
  
  **Manual Execution Verification**:
  - [ ] `npm run dev` 실행
  - [ ] 브라우저에서 http://localhost:3000/ko/services 접속
  - [ ] 휠 스크롤로 슬라이드 1→6 이동 (정상 작동)
  - [ ] 슬라이드 6에서 휠 다운 → 슬라이드 1로 이동 (락 없음)
  - [ ] 슬라이드 1에서 휠 업 → 슬라이드 6으로 이동 (락 없음)
  - [ ] 빠른 연속 휠 스크롤 → 데드락 없음
  - [ ] 배경 Swiper와 콘텐츠 Swiper 완벽 동기화 확인
  - [ ] 모바일 시뮬레이션 (DevTools → 모바일 뷰): 터치 스와이프 작동 확인

  **Commit**: YES
  - Message: `fix(services): replace manual Swiper sync with Controller module`
  - Files: `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 2. BusinessMenuPopup 바깥 클릭 닫기 추가

  **What to do**:
  - BusinessDetailPopup의 backdrop 패턴 복사
  - `.pop-backdrop` div 추가 with `onClick={onClose}`
  - CSS에 `.business-pop .pop-backdrop` 스타일 추가 (pointer-events: auto)
  - `.pop-inner`에 `pointer-events: auto` 추가 (클릭 이벤트 전파 방지용)

  **Must NOT do**:
  - 팝업 레이아웃 변경 금지
  - 닫힘 애니메이션 추가 금지
  - Escape 키 로직 변경 금지

  **Parallelizable**: YES (Task 1과 병렬 가능)

  **References**:
  
  **Pattern References**:
  - `marine-web-app/src/components/sections/business/BusinessDetailPopup.tsx:86-90` - backdrop 패턴 (복사 대상)
    ```tsx
    {/* Background overlay - click to close */}
    <div 
        className="detail-backdrop" 
        onClick={onClose}
        aria-hidden="true"
    />
    ```
  - `marine-web-app/src/app/globals.css:683-690` - detail-backdrop CSS 스타일
  
  **Target Files**:
  - `marine-web-app/src/components/sections/business/BusinessMenuPopup.tsx:83-91` - backdrop 추가 위치

  **Acceptance Criteria**:
  
  **Manual Execution Verification**:
  - [ ] `npm run dev` 실행
  - [ ] 브라우저에서 http://localhost:3000/ko/services 접속
  - [ ] "ALL" 버튼 클릭 → 카테고리 팝업 열림
  - [ ] 팝업 바깥 어두운 영역 클릭 → 팝업 닫힘
  - [ ] 팝업 내 메뉴 아이템 클릭 → 해당 슬라이드로 이동 (닫히기 전에 동작)
  - [ ] Escape 키 → 팝업 닫힘 (기존 동작 유지)
  - [ ] X 버튼 → 팝업 닫힘 (기존 동작 유지)

  **Commit**: YES
  - Message: `fix(services): add outside click to close for category popup`
  - Files: `marine-web-app/src/components/sections/business/BusinessMenuPopup.tsx`, `marine-web-app/src/app/globals.css`
  - Pre-commit: `npm run build`

---

- [ ] 3. Glass Debug Panel 구현 (useAnimationConfig 확장)

  **What to do**:
  - `useAnimationConfig.ts`에 glass 관련 Leva 컨트롤 추가
  - 컨트롤 항목:
    - blur (8-40px, 기본값: 32px)
    - bgOpacity (0.1-0.6, 기본값: 0.4)
    - bgColor (color picker, 기본값: rgb(47,54,58))
    - borderOpacity (0-0.5, 기본값: 0.15)
    - borderWidth (0-2px, 기본값: 1px)
    - innerShadow (boolean, 기본값: false)
    - noiseOpacity (0-0.3, 기본값: 0)
  - `useLayoutEffect`로 CSS 변수를 `:root`에 주입
  - Leva store 옵션으로 localStorage 저장 활성화

  **Must NOT do**:
  - 새 훅 파일 생성 금지 (useAnimationConfig 확장만)
  - Services 섹션 외 컴포넌트 영향 금지
  - 프리셋/테마 시스템 생성 금지

  **Parallelizable**: YES (Task 1,2와 병렬 가능)

  **References**:
  
  **Pattern References**:
  - `marine-web-app/src/hooks/useAnimationConfig.ts` - 기존 훅 구조, Leva 사용 패턴
  - `marine-web-app/src/app/globals.css:45-54` - 현재 glass CSS 변수 정의
    ```css
    --glass-bg-dark: rgba(47, 54, 58, 0.40);
    --glass-bg-darker: rgba(47, 54, 58, 0.60);
    --glass-blur-lg: blur(40px);
    --glass-blur-md: blur(32px);
    --glass-blur-sm: blur(20px);
    --glass-border: 1px solid rgba(255, 255, 255, 0.15);
    ```
  
  **API/Type References**:
  - Leva folder/collapsed: https://github.com/pmndrs/leva#folder
  - Leva color picker: `{ value: '#2f363a', label: 'BG Color' }`
  - Leva store/localStorage: https://github.com/pmndrs/leva#scalable-store
  
  **CSS Variable Injection Pattern**:
  ```tsx
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--glass-blur-md', `blur(${blur}px)`);
    document.documentElement.style.setProperty('--glass-bg-dark', 
      `rgba(${r}, ${g}, ${b}, ${opacity})`);
  }, [blur, opacity, r, g, b]);
  ```

  **Acceptance Criteria**:
  
  **Manual Execution Verification**:
  - [ ] `npm run dev` 실행
  - [ ] 브라우저에서 http://localhost:3000/ko/services 접속
  - [ ] 좌측에 Leva 패널 표시 확인
  - [ ] "Glass" 폴더 확인 (collapsed 상태)
  - [ ] 폴더 열고 blur 슬라이더 조작 → 버튼/팝업 blur 실시간 변경
  - [ ] opacity 슬라이더 조작 → 배경 투명도 실시간 변경
  - [ ] color picker 조작 → 배경색 실시간 변경
  - [ ] 새로고침 → 조정한 값 유지됨 (localStorage)
  - [ ] DevTools → Elements → :root 인스펙트 → `--glass-*` 변수 값 변경 확인
  - [ ] `npm run build` → 프로덕션 빌드에서 Leva 패널 안 보임

  **Commit**: YES
  - Message: `feat(services): add glass debug panel with real-time CSS control`
  - Files: `marine-web-app/src/hooks/useAnimationConfig.ts`
  - Pre-commit: `npm run build`

---

- [ ] 4. 통합 테스트 및 최종 검증

  **What to do**:
  - 모든 수정사항 통합 동작 확인
  - 빌드 성공 확인
  - 프로덕션 빌드에서 debug 패널 안 보이는지 확인

  **Parallelizable**: NO (모든 Task 완료 후)

  **References**:
  - 모든 이전 Task 파일들

  **Acceptance Criteria**:
  
  **Manual Execution Verification**:
  - [ ] `npm run build` 성공
  - [ ] `npm run start` (프로덕션 모드)
  - [ ] http://localhost:3000/ko/services 접속
  - [ ] Leva 패널 안 보임 (프로덕션)
  - [ ] Swiper 루프 정상 (6→1, 1→6)
  - [ ] 카테고리 팝업 바깥 클릭 닫힘
  - [ ] glass 효과 기본값으로 표시됨

  **Commit**: NO (이미 개별 커밋 완료)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `fix(services): replace manual Swiper sync with Controller module` | marine-web-app/src/.../BusinessServicesPage.tsx | npm run build |
| 2 | `fix(services): add outside click to close for category popup` | marine-web-app/src/.../BusinessMenuPopup.tsx, globals.css | npm run build |
| 3 | `feat(services): add glass debug panel with real-time CSS control` | marine-web-app/src/hooks/useAnimationConfig.ts | npm run build |

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Expected: 빌드 성공, 에러 없음
npm run dev    # Expected: 개발 서버 정상 시작
```

### Final Checklist
- [ ] Swiper 루프 데드락 해결됨
- [ ] 카테고리 팝업 바깥 클릭 닫힘
- [ ] Glass 디버그 패널 작동 (개발 환경)
- [ ] 프로덕션에서 디버그 패널 안 보임
- [ ] 모든 Must Have 구현됨
- [ ] 모든 Must NOT Have 준수됨
