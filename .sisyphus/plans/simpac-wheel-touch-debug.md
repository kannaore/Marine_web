# simpac.com/business 완전 동일 구현 - Wheel, Touch, Debug Console

## Context

### Original Request
simpac.com/business 페이지와 완전 동일한 UX 구현:
1. 마우스 휠 스크롤 → 슬라이드 전환 (핵심 누락 기능)
2. 터치 디바이스에서 스와이프 활성화
3. 그라데이션 대신 이미지 에셋 사용
4. 모든 애니메이션 조절 가능한 leva 디버그 콘솔

### Interview Summary
**Key Discussions**:
- Edge 동작: 무한 스크롤 (Swiper `loop` 모드)
- 이미지 에셋: AI 생성 (6개 서비스별)
- Leva 범위: 핵심 파라미터만 (Swiper 속도, 텍스트 애니메이션, wheel 설정)
- Leva 표시: 개발 모드만 (NODE_ENV=development)

**Research Findings**:
- simpac wheel 구현: DELTA_THRESHOLD=60, DECAY_MS=150, pageActive 플래그
- leva 라이브러리: pmndrs 팀, useControls 훅, React 네이티브
- 현재 이미지: public 폴더에 logo.png만 존재

### Metis Review
**Identified Gaps** (addressed):
- 첫/마지막 슬라이드 동작 → 무한 스크롤로 해결
- 이미지 소스 → AI 생성으로 결정
- leva 파라미터 범위 → 핵심만 (Swiper, 텍스트, wheel)
- leva 표시 조건 → 개발 모드만

---

## Work Objectives

### Core Objective
simpac.com/business와 동일한 마우스 휠 스크롤 → 슬라이드 전환 UX를 구현하고, 터치 스와이프, 이미지 배경, 실시간 애니메이션 조절 디버그 콘솔을 추가한다.

### Concrete Deliverables
- `BusinessServicesPage.tsx` 수정: wheel 이벤트 핸들러, loop 모드, 터치 지원
- `public/images/services/` 폴더: 6개 서비스별 배경 이미지
- `DebugControls.tsx` 신규: leva 기반 디버그 콘솔
- `useAnimationConfig.ts` 신규: 애니메이션 설정 커스텀 훅

### Definition of Done
- [ ] 마우스 휠 스크롤로 슬라이드 전환됨
- [ ] 무한 스크롤 (loop) 동작함
- [ ] 터치 디바이스에서 스와이프 동작함
- [ ] 6개 서비스별 이미지 배경 표시됨
- [ ] leva 콘솔에서 애니메이션 파라미터 실시간 조절됨
- [ ] 개발 모드에서만 leva 콘솔 표시됨
- [ ] `npm run build` 성공

### Must Have
- simpac 동일 wheel 로직 (누적/감쇠/임계값)
- 터치 디바이스 자동 감지
- Swiper loop 모드
- leva 핵심 컨트롤 (swiperSpeed, textDuration, textStagger, textDelay, wheelThreshold, wheelDecay) - **총 6개**

### Must NOT Have (Guardrails)
- ❌ 이미지 lazy loading, srcset 등 최적화 (별도 작업)
- ❌ 키보드 네비게이션 (v2로 연기)
- ❌ 기존 BusinessNav, BusinessMenuPopup, BusinessDetailPopup 수정
- ❌ 다른 페이지 수정

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES (Playwright 설치됨)
- **User wants tests**: Manual-only (자동화 테스트 없음)
- **Verification method**: 수동 브라우저 테스트 (개발 서버에서 직접 확인)

### Manual QA Verification (수동 테스트)

**For each task:**
1. `npm run dev` 실행 (개발 서버 시작)
2. 브라우저에서 `http://localhost:3000/ko/services` 접속
3. 시각적 확인 및 상호작용 테스트 (수동)
4. 결과 스크린샷 저장 (선택)

---

## Task Flow

```
Task 0 (leva 설치 + 설정 훅)
    ↓
Task 1 (이미지 에셋 생성) ──┐
    ↓                      │ 병렬 가능
Task 2 (wheel 이벤트)  ←───┘
    ↓
Task 3 (터치 + loop)
    ↓
Task 4 (DebugControls 연결)
    ↓
Task 5 (최종 통합 테스트)
```

## Parallelization

| Group | Tasks | Reason |
|-------|-------|--------|
| A | 1, 2 | 독립적인 작업 (이미지 vs 코드) |

| Task | Depends On | Reason |
|------|------------|--------|
| 2 | 0 | 설정 훅 필요 |
| 3 | 2 | wheel 핸들러 구조 필요 |
| 4 | 0, 3 | 훅과 컴포넌트 모두 필요 |
| 5 | 4 | 모든 기능 완료 후 |

---

## TODOs

- [ ] 0. leva 설치 및 애니메이션 설정 훅 생성

  **What to do**:
  - `npm install leva` 실행
  - `src/hooks/useAnimationConfig.ts` 생성
  - 핵심 파라미터 정의:
    - swiperSpeed: { value: 1600, min: 500, max: 3000, step: 100 }
    - textDuration: { value: 0.6, min: 0.2, max: 2, step: 0.1 }
    - textStagger: { value: 0.05, min: 0.01, max: 0.2, step: 0.01 }
    - textDelay: { value: 0.05, min: 0, max: 0.5, step: 0.01 }
    - wheelThreshold: { value: 60, min: 20, max: 150, step: 10 }
    - wheelDecay: { value: 150, min: 50, max: 300, step: 10 }
  - 개발 모드 조건부 렌더링 로직 포함

  **Must NOT do**:
  - 복잡한 폴더 구조 추가
  - 다른 훅과 의존성 연결

  **Parallelizable**: NO (기반 작업)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:38-46` - 현재 GSAP 애니메이션 설정
  - `marine-web-app/src/components/sections/business/SentenceReveal.tsx:38-46` - 텍스트 reveal 타이밍
  - leva 공식 문서: https://github.com/pmndrs/leva

  **Acceptance Criteria**:
  - [ ] `npm install leva` 성공
  - [ ] `src/hooks/useAnimationConfig.ts` 파일 생성됨
  - [ ] `useAnimationConfig` 훅이 6개 파라미터 반환
  - [ ] TypeScript 에러 없음: `npx tsc --noEmit`

  **Commit**: YES
  - Message: `feat(services): add leva and useAnimationConfig hook`
  - Files: `package.json`, `package-lock.json`, `src/hooks/useAnimationConfig.ts`

---

- [ ] 1. 6개 서비스별 배경 이미지 생성

  **What to do**:
  - `public/images/services/` 폴더 생성
  - 6개 이미지 생성 (AI 또는 placeholder):
    - `offshore-wind.jpg` - 해상풍력 (바다 + 풍력발전기)
    - `geophysical.jpg` - 지구물리조사 (해저 지형)
    - `hydrographic.jpg` - 수로조사 (수심 측량)
    - `oceanography.jpg` - 해양물리조사 (해류, 파도)
    - `fisheries.jpg` - 수산자원조사 (어장)
    - `research.jpg` - R&D (연구 장비)
  - **이미지 스펙**:
    - 포맷: JPEG (.jpg)
    - 해상도: 1920x1080 (16:9, Full HD)
    - 용량: 제한 없음 (최적화는 별도 작업)
  - `servicesData`에 `imageSrc` 필드 추가

  **Must NOT do**:
  - 이미지 최적화/압축 (별도 작업)
  - srcset/반응형 이미지 (별도 작업)

  **Parallelizable**: YES (with Task 2)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:17-85` - servicesData 배열
  - `marine-web-app/public/` - 현재 public 폴더 구조

  **Acceptance Criteria**:
  - [ ] `public/images/services/` 폴더에 6개 이미지 존재
  - [ ] `servicesData`에 `imageSrc` 필드 추가됨
  - [ ] 브라우저에서 이미지 로드 확인

  **Commit**: YES
  - Message: `feat(services): add service background images`
  - Files: `public/images/services/*`, `BusinessServicesPage.tsx`

---

- [ ] 2. wheel 이벤트 핸들러 구현 (simpac 동일)

  **What to do**:
  - `BusinessServicesPage.tsx`에 wheel 이벤트 핸들러 추가
  - simpac 로직 구현:
    ```typescript
    // Constants (from useAnimationConfig)
    const { wheelThreshold, wheelDecay } = useAnimationConfig();
    
    // Refs
    const wheelAccum = useRef(0);
    const decayTimer = useRef<ReturnType<typeof setTimeout>>();
    const isTransitioning = useRef(false);
    
    // Handler
    const handleWheel = useCallback((e: WheelEvent) => {
        if (isTransitioning.current || isMenuOpen || isDetailOpen) return;
        e.preventDefault();
        
        const dy = (e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) || 0;
        
        wheelAccum.current += dy;
        clearTimeout(decayTimer.current);
        decayTimer.current = setTimeout(() => {
            wheelAccum.current = 0;
        }, wheelDecay);
        
        if (Math.abs(wheelAccum.current) > wheelThreshold) {
            if (wheelAccum.current > 0) {
                dataSwiperRef.current?.slideNext();
            } else {
                dataSwiperRef.current?.slidePrev();
            }
            wheelAccum.current = 0;
            isTransitioning.current = true;
        }
    }, [wheelThreshold, wheelDecay, isMenuOpen, isDetailOpen]);
    ```
  - useEffect로 wheel 이벤트 리스너 등록/해제
  - Swiper의 `onSlideChangeTransitionEnd`에서 `isTransitioning.current = false` 설정

  **Must NOT do**:
  - Swiper의 Mousewheel 모듈 사용 (커스텀 로직 필요)
  - 팝업 열린 상태에서 스크롤 허용

  **Parallelizable**: YES (with Task 1)

  **References**:
  - `Template/simpac/resources/_asset/kr/js/front_ui.js:2712-2740` - simpac onWheel 구현
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:137-147` - 현재 handleSlideChange
  - `marine-web-app/src/hooks/useAnimationConfig.ts` - wheelThreshold, wheelDecay 값

  **Acceptance Criteria**:
  - [ ] 마우스 휠 down → 다음 슬라이드 전환
  - [ ] 마우스 휠 up → 이전 슬라이드 전환
  - [ ] 연속 스크롤 시 한 번만 전환 (debounce)
  - [ ] 전환 애니메이션 완료 후 다음 입력 수락
  - [ ] 팝업 열린 상태에서 스크롤 무시
  - [ ] leva에서 threshold/decay 조절 시 실시간 반영

  **Commit**: YES
  - Message: `feat(services): implement wheel scroll to slide transition`
  - Files: `BusinessServicesPage.tsx`

---

- [ ] 3. 터치 스와이프 활성화 + Swiper loop 모드

  **What to do**:
  - 터치 디바이스 감지:
    ```typescript
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);
    ```
  - Swiper에 조건부 `allowTouchMove` 적용
  - Swiper에 `loop={true}` 추가
  - 이미지 배경 렌더링 (그라데이션 → 이미지)

  **Must NOT do**:
  - 터치 감지 라이브러리 추가
  - Swiper 외 터치 이벤트 직접 처리

  **Parallelizable**: NO (depends on Task 2)

  **References**:
  - `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx:161-190` - 현재 Swiper 설정
  - `Template/simpac/resources/_asset/kr/js/front_ui.js:2440-2461` - simpac Swiper 설정

  **Acceptance Criteria**:
  - [ ] 터치 디바이스에서 좌우 스와이프로 슬라이드 전환
  - [ ] 데스크톱에서 wheel 스크롤 동작 유지
  - [ ] 마지막 슬라이드에서 다음 → 첫 슬라이드로 이동 (loop)
  - [ ] 첫 슬라이드에서 이전 → 마지막 슬라이드로 이동 (loop)
  - [ ] 6개 이미지 배경 정상 표시

  **Commit**: YES
  - Message: `feat(services): enable touch swipe and loop mode`
  - Files: `BusinessServicesPage.tsx`

---

- [ ] 4. DebugControls 컴포넌트 생성 및 연결

  **What to do**:
  - `src/components/debug/DebugControls.tsx` 생성
  - leva Leva 컴포넌트 렌더링
  - 개발 모드 조건부 렌더링:
    ```typescript
    if (process.env.NODE_ENV !== 'development') return null;
    ```
  - `BusinessServicesPage.tsx`에서 DebugControls 렌더링
  - `SentenceReveal.tsx`에서 useAnimationConfig 사용하여 타이밍 적용

  **Must NOT do**:
  - 프로덕션 모드에서 leva 패널 렌더링 (조건부 렌더링으로 숨김)
  - 다른 페이지에 DebugControls 추가

  **Parallelizable**: NO (depends on Task 0, 3)

  **References**:
  - `marine-web-app/src/hooks/useAnimationConfig.ts` - 설정 훅
  - `marine-web-app/src/components/sections/business/SentenceReveal.tsx:38-46` - 텍스트 애니메이션
  - leva 공식 예제: https://github.com/pmndrs/leva/tree/main/packages/leva/stories

  **Acceptance Criteria**:
  - [ ] 개발 모드에서 leva 패널 표시됨
  - [ ] 프로덕션 모드에서 leva 패널 숨겨짐
  - [ ] swiperSpeed 조절 → Swiper 전환 속도 변경
  - [ ] textDuration/textStagger 조절 → 텍스트 애니메이션 변경
  - [ ] wheelThreshold/wheelDecay 조절 → 스크롤 감도 변경
  - [ ] TypeScript 에러 없음

  **Commit**: YES
  - Message: `feat(services): create DebugControls with leva integration`
  - Files: `DebugControls.tsx`, `BusinessServicesPage.tsx`, `SentenceReveal.tsx`

---

- [ ] 5. 최종 통합 테스트

  **What to do**:
  - 수동 브라우저 테스트로 전체 플로우 검증:
    1. 페이지 로드 → 6개 이미지 배경 확인
    2. 마우스 휠 스크롤 → 슬라이드 전환 확인
    3. 무한 스크롤 (loop) 확인
    4. leva 콘솔에서 파라미터 조절 → 실시간 반영 확인
    5. Learn more 클릭 → Detail Popup (기존 기능 유지)
    6. Grid 버튼 클릭 → Menu Popup (기존 기능 유지)
  - `npm run build` 성공 확인
  - 프로덕션 모드에서 leva 패널 렌더링 안됨 확인 (NODE_ENV=production)

  **Must NOT do**:
  - 추가 기능 구현
  - 성능 최적화

  **Parallelizable**: NO (최종 단계)

  **References**:
  - 모든 이전 태스크 결과물
  - `Template/simpac/scroll page.png` - 비교 기준

  **Acceptance Criteria**:
  - [ ] `npm run build` 성공
  - [ ] 마우스 휠 → 슬라이드 전환 동작
  - [ ] 무한 스크롤 동작
  - [ ] 터치 스와이프 동작 (모바일 에뮬레이션)
  - [ ] leva 콘솔 실시간 조절 동작
  - [ ] 기존 기능 (팝업들) 정상 동작
  - [ ] 프로덕션 모드에서 leva 패널 렌더링 안됨 (NODE_ENV 확인)

  **Commit**: YES
  - Message: `feat(services): complete wheel scroll and debug console integration`
  - Files: 최종 정리

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 0 | `feat(services): add leva and useAnimationConfig hook` | package.json, useAnimationConfig.ts | `npx tsc --noEmit` |
| 1 | `feat(services): add service background images` | public/images/*, BusinessServicesPage.tsx | 브라우저 확인 |
| 2 | `feat(services): implement wheel scroll to slide transition` | BusinessServicesPage.tsx | 브라우저 확인 |
| 3 | `feat(services): enable touch swipe and loop mode` | BusinessServicesPage.tsx | 브라우저 확인 |
| 4 | `feat(services): create DebugControls with leva integration` | DebugControls.tsx, *.tsx | 브라우저 확인 |
| 5 | `feat(services): complete wheel scroll and debug console integration` | - | `npm run build` |

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
- [ ] 마우스 휠 스크롤 → 슬라이드 전환
- [ ] 무한 스크롤 (loop) 동작
- [ ] 터치 스와이프 동작
- [ ] 6개 이미지 배경 표시
- [ ] leva 디버그 콘솔 동작 (개발 모드)
- [ ] 기존 기능 유지 (팝업들)
- [ ] 빌드 성공
