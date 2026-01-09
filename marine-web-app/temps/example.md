# 헤더 애니메이션 수정 작업 계획

## 개요

`temps/feature-A.md`에서 분석한 헤더 애니메이션 문제를 해결하기 위한 구체적인 작업 단위입니다.
각 작업은 독립적으로 테스트 가능하며, 순차적으로 진행됩니다.

---

## 작업 목록

### Phase 1: 진단 및 준비

#### Task 1.1: 현재 상태 진단
- **예상 시간:** 15분
- **목표:** 애니메이션이 실패하는 정확한 지점 파악

**작업 내용:**
- [ ] 브라우저 개발자 도구 Console 확인
- [ ] GSAP 관련 경고/오류 메시지 기록
- [ ] 네트워크 탭에서 GSAP 라이브러리 로딩 확인
- [ ] `mounted` 상태 변화 시점 로깅 추가

**확인 파일:**
- `src/components/layout/MorphingDesktopNav.tsx`
- `src/lib/gsap.ts`

---

#### Task 1.2: GSAP 플러그인 등록 확인
- **예상 시간:** 10분
- **목표:** GSAP 플러그인이 올바르게 등록되었는지 확인

**작업 내용:**
- [ ] `src/lib/gsap.ts`에서 `registerPlugin` 호출 확인
- [ ] 필요한 플러그인 목록 검토:
  - `ScrollTrigger`
  - `useGSAP`
- [ ] 중복 등록 여부 확인

---

### Phase 2: 코드 수정

#### Task 2.1: useGSAP revertOnUpdate 옵션 추가
- **예상 시간:** 20분
- **목표:** 의존성 변경 시 애니메이션 정리 및 재생성 보장

**수정 대상:**
```
src/components/layout/MorphingDesktopNav.tsx
```

**변경 위치:**
- 라인 134-218: 첫 번째 useGSAP 훅
- 라인 220-254: 두 번째 useGSAP 훅
- 라인 256-312: 세 번째 useGSAP 훅

**변경 내용:**
```tsx
// Before
{ dependencies: [activeTab, safeHeaderOffset, mounted], scope: dropdownWrapperRef }

// After
{ 
    dependencies: [activeTab, safeHeaderOffset, mounted], 
    scope: dropdownWrapperRef,
    revertOnUpdate: true 
}
```

---

#### Task 2.2: 포털 요소 애니메이션 처리 개선
- **예상 시간:** 30분
- **목표:** createPortal로 렌더링된 요소의 애니메이션 정상화

**수정 대상:**
```
src/components/layout/MorphingDesktopNav.tsx
```

**작업 내용:**
- [ ] 포털 내부 요소에 대한 직접 ref 참조 확인
- [ ] GSAP 타겟 셀렉터가 포털 요소를 올바르게 찾는지 확인
- [ ] 필요시 gsap.utils.selector() 활용

---

#### Task 2.3: 타임라인 충돌 해결
- **예상 시간:** 25분
- **목표:** 동시 실행 애니메이션 간 충돌 방지

**수정 대상:**
```
src/components/layout/MorphingDesktopNav.tsx
```

**작업 내용:**
- [ ] `closeTimelineRef` 정리 로직 검토
- [ ] `gsap.killTweensOf()` 호출 위치 최적화
- [ ] overwrite 옵션 일관성 확인

**주의사항:**
- 기존 타임라인이 진행 중일 때 새 타임라인 시작 시 처리
- `onComplete` 콜백에서의 상태 업데이트 타이밍

---

#### Task 2.4: 초기 상태 설정 개선
- **예상 시간:** 15분
- **목표:** 컴포넌트 마운트 시 애니메이션 초기 상태 명확화

**수정 대상:**
```
src/components/layout/MorphingDesktopNav.tsx
```

**작업 내용:**
- [ ] 드롭다운이 닫힌 상태에서의 초기값 명시
- [ ] CSS와 GSAP 초기값 충돌 여부 확인
- [ ] `mounted` 상태 검사 로직 보완

---

### Phase 3: 스타일 검증

#### Task 3.1: CSS 속성 충돌 확인
- **예상 시간:** 15분
- **목표:** CSS transition과 GSAP 애니메이션 충돌 해결

**확인 대상:**
```
src/components/layout/MorphingDesktopNav.tsx (인라인 스타일)
src/app/globals.css (전역 스타일)
```

**작업 내용:**
- [ ] `transition` CSS 속성이 GSAP를 방해하는지 확인
- [ ] `will-change` 속성 검토
- [ ] `transform` 기본값 확인

---

#### Task 3.2: clipPath 호환성 테스트
- **예상 시간:** 10분
- **목표:** 모든 대상 브라우저에서 clipPath 애니메이션 작동 확인

**작업 내용:**
- [ ] Chrome 최신 버전 테스트
- [ ] Firefox 최신 버전 테스트
- [ ] Safari 최신 버전 테스트 (가능한 경우)
- [ ] `webkitClipPath` fallback 동작 확인

---

### Phase 4: 테스트 및 검증

#### Task 4.1: 단위 테스트
- **예상 시간:** 20분
- **목표:** 각 애니메이션 동작 개별 검증

**테스트 시나리오:**
- [ ] 드롭다운 열기 애니메이션
- [ ] 드롭다운 닫기 애니메이션
- [ ] 탭 간 전환 애니메이션
- [ ] 카테고리 호버 시 콘텐츠 전환

---

#### Task 4.2: 통합 테스트
- **예상 시간:** 15분
- **목표:** 전체 헤더 네비게이션 플로우 검증

**테스트 시나리오:**
- [ ] 빠른 탭 전환 시 애니메이션 안정성
- [ ] 마우스 빠른 이동 시 드롭다운 처리
- [ ] 페이지 스크롤 중 헤더 동작
- [ ] 브라우저 리사이즈 시 애니메이션

---

#### Task 4.3: 성능 테스트
- **예상 시간:** 10분
- **목표:** 애니메이션 성능 최적화 확인

**측정 항목:**
- [ ] 애니메이션 FPS (60fps 유지 여부)
- [ ] CPU 사용량
- [ ] 메모리 누수 여부
- [ ] 리페인트/리플로우 빈도

---

### Phase 5: 문서화 및 마무리

#### Task 5.1: 변경 사항 문서화
- **예상 시간:** 10분
- **목표:** 수정 내용 및 결과 기록

**작업 내용:**
- [ ] 수정된 코드 변경점 정리
- [ ] 해결된 문제 목록 작성
- [ ] 향후 주의사항 기록

---

## 작업 우선순위

| 순서 | Task ID | 중요도 | 난이도 |
|------|---------|--------|--------|
| 1    | 1.1     | 높음   | 낮음   |
| 2    | 1.2     | 높음   | 낮음   |
| 3    | 2.1     | 높음   | 중간   |
| 4    | 2.2     | 높음   | 높음   |
| 5    | 2.3     | 중간   | 중간   |
| 6    | 2.4     | 중간   | 낮음   |
| 7    | 3.1     | 중간   | 낮음   |
| 8    | 3.2     | 낮음   | 낮음   |
| 9    | 4.1     | 높음   | 중간   |
| 10   | 4.2     | 높음   | 중간   |
| 11   | 4.3     | 중간   | 낮음   |
| 12   | 5.1     | 낮음   | 낮음   |

---

## 예상 총 소요 시간

**약 3시간 15분**

- Phase 1 (진단 및 준비): 25분
- Phase 2 (코드 수정): 1시간 30분
- Phase 3 (스타일 검증): 25분
- Phase 4 (테스트 및 검증): 45분
- Phase 5 (문서화 및 마무리): 10분

---

## 주의사항

1. **작업 순서 준수:** 진단(Phase 1)을 반드시 먼저 수행하여 정확한 문제 원인 파악
2. **점진적 수정:** 한 번에 많은 변경보다 작은 단위로 수정 후 테스트
3. **백업:** 수정 전 현재 코드 상태 Git 커밋
4. **테스트 환경:** 개발 서버에서 실시간 확인하며 작업

---

## 롤백 계획

문제 발생 시 다음 명령으로 이전 상태로 복원:
```bash
git checkout -- src/components/layout/MorphingDesktopNav.tsx
git checkout -- src/lib/gsap.ts
```
