# 헤더 애니메이션 문제 해결 가이드

## 문제 분석

현재 `MorphingDesktopNav.tsx` 컴포넌트의 헤더 드롭다운 애니메이션이 제대로 작동하지 않을 수 있는 잠재적 원인들을 분석했습니다.

---

## 가능한 문제 원인

### 1. createPortal과 useGSAP scope 충돌

**문제점:**
- `MorphingDesktopNav.tsx`에서 드롭다운 메뉴가 `createPortal`을 통해 `document.body`에 렌더링됨
- `useGSAP`의 `scope` 옵션이 `dropdownWrapperRef`로 설정되어 있지만, 포털로 렌더링된 요소는 React 컴포넌트 트리와 분리됨

**현재 코드 (라인 41):**
```tsx
const { contextSafe } = useGSAP({ scope: dropdownWrapperRef });
```

**문제:**
- 포털 내부의 요소들이 scope 범위 밖에 있어 애니메이션 타겟팅이 실패할 수 있음

---

### 2. dependencies 배열 누락 또는 부정확

**문제점:**
- `useGSAP` 훅의 dependencies 배열이 실제 의존성과 일치하지 않을 수 있음

**현재 코드 (라인 134-218):**
```tsx
useGSAP(
    () => { /* 애니메이션 로직 */ },
    { dependencies: [activeTab, safeHeaderOffset, mounted], scope: dropdownWrapperRef }
);
```

**확인 필요:**
- `revertOnUpdate: true` 옵션 추가 검토

---

### 3. 애니메이션 충돌 및 overwrite 문제

**문제점:**
- 여러 `useGSAP` 훅이 동일한 요소를 타겟으로 할 때 애니메이션 충돌 가능
- `gsap.killTweensOf()` 호출 타이밍 문제

**현재 사용 중인 훅들:**
1. 라인 134: 드롭다운 패널 열기/닫기 애니메이션
2. 라인 220: 카테고리 영역 애니메이션
3. 라인 256: 콘텐츠 영역 애니메이션

---

### 4. 마운트 타이밍 이슈

**문제점:**
- `mounted` 상태가 `false`일 때 애니메이션이 건너뛰어짐
- SSR 환경에서의 hydration mismatch 가능성

**현재 코드 (라인 51-53):**
```tsx
useEffect(() => {
    setMounted(true);
}, []);
```

---

## 단계별 해결 방법

### Step 1: 포털 요소에 대한 애니메이션 scope 수정

포털로 렌더링되는 요소는 별도로 처리해야 합니다.

**변경 방안:**
```tsx
// useGSAP scope를 포털 내부의 실제 래퍼로 변경
useGSAP(
    () => {
        // 애니메이션 로직
    },
    { 
        dependencies: [activeTab, safeHeaderOffset, mounted], 
        scope: dropdownWrapperRef,
        revertOnUpdate: true  // 추가
    }
);
```

---

### Step 2: revertOnUpdate 옵션 활성화

의존성이 변경될 때 이전 애니메이션을 정리하고 새로 시작하도록 설정합니다.

**변경 전:**
```tsx
{ dependencies: [displayedTab] }
```

**변경 후:**
```tsx
{ dependencies: [displayedTab], revertOnUpdate: true }
```

---

### Step 3: contextSafe 함수 활용 강화

이벤트 핸들러에서 생성되는 애니메이션에 대해 `contextSafe` 래핑을 추가합니다.

**현재 코드:**
```tsx
const scheduleClose = useCallback(
    contextSafe(() => {
        // ...
    }),
    [contextSafe]
);
```

**확장 필요:**
- 모든 GSAP 애니메이션 생성 함수를 `contextSafe`로 래핑

---

### Step 4: 애니메이션 타임라인 관리 개선

동시에 실행되는 애니메이션들 간의 충돌을 방지합니다.

**개선 방안:**
```tsx
// 기존 타임라인 정리
if (closeTimelineRef.current) {
    closeTimelineRef.current.kill();
    closeTimelineRef.current = null;
}
```

---

### Step 5: gsap.set() 초기화 순서 확인

애니메이션 시작 전 초기 상태를 명확히 설정합니다.

**체크리스트:**
- [ ] `display` 속성이 먼저 설정되는지 확인
- [ ] 초기 `height`, `opacity` 값이 올바른지 확인
- [ ] `pointerEvents` 설정이 적절한지 확인

---

### Step 6: clipPath 애니메이션 호환성 확인

`clipPath` 및 `webkitClipPath` 애니메이션의 브라우저 호환성을 점검합니다.

**현재 코드 (라인 244-250):**
```tsx
gsap.to(target, {
    clipPath: "inset(0 0 0 0)",
    webkitClipPath: "inset(0 0 0 0)",
    clearProps: "clipPath,webkitClipPath",
});
```

---

### Step 7: 디버깅을 위한 로깅 추가

문제 진단을 위해 애니메이션 상태 로깅을 추가합니다.

**디버그 코드:**
```tsx
useEffect(() => {
    console.log('Animation state:', {
        activeTab,
        displayedTab,
        mounted,
        headerOffset: safeHeaderOffset
    });
}, [activeTab, displayedTab, mounted, safeHeaderOffset]);
```

---

## 검증 방법

1. 브라우저 개발자 도구에서 Console 탭을 확인하여 GSAP 관련 오류 메시지 확인
2. Elements 탭에서 드롭다운 요소의 스타일 변화 실시간 모니터링
3. Performance 탭에서 애니메이션 프레임 드롭 확인
4. React DevTools에서 컴포넌트 상태 변화 추적

---

## 참고 자료

- [GSAP React Integration Guide](https://gsap.com/docs/v3/Plugins)
- [@gsap/react useGSAP Hook](https://www.npmjs.com/package/@gsap/react)
- [React createPortal와 애니메이션](https://react.dev/reference/react-dom/createPortal)
