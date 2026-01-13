# Work Plan: Hero Section Debug Panel

## Overview
히어로 섹션의 와이어프레임과 텍스트 스타일을 실시간으로 조정할 수 있는 leva 기반 디버그 패널 구현

## Success Criteria
1. leva 디버그 패널이 개발 환경에서만 표시됨
2. 입자 효과(TerrainParticles)가 완전히 제거됨
3. 와이어프레임의 모든 속성을 슬라이더로 실시간 조정 가능
4. 텍스트 스타일을 선택적으로 조정 가능 (폰트 종류 포함)
5. 값이 LocalStorage에 저장되어 새로고침 후에도 유지
6. Copy 버튼으로 현재 값을 JSON으로 복사 가능

## Reference Files
- `marine-web-app/src/components/sections/HeroSection.tsx` - 텍스트 렌더링
- `marine-web-app/src/components/ui/WireframeTerrainScene.tsx` - 와이어프레임 셰이더
- `marine-web-app/src/app/globals.css` - 히어로 텍스트 스타일
- Template images:
  - `Template/main_hero.jpeg` - 목표 디자인
  - `Template/canvas background want.png` - 목표 배경

---

## Tasks

### Task 1: leva 패키지 설치
**Parallelizable**: NO (다른 모든 태스크의 선행 조건)

**Description**: leva 라이브러리 설치

**Steps**:
1. `marine-web-app` 디렉토리에서 `npm install leva` 실행
2. 설치 확인: `node_modules/leva` 존재 확인

**Expected Output**:
- package.json에 leva 의존성 추가됨
- 빌드 에러 없음

---

### Task 2: 입자 효과 제거
**Parallelizable**: YES (Task 3, 4와 병렬 가능)

**Description**: TerrainParticles 컴포넌트 완전 제거

**File**: `marine-web-app/src/components/ui/WireframeTerrainScene.tsx`

**Changes**:
1. `TerrainParticles` 함수 컴포넌트 삭제 (라인 252-304)
2. `SceneContent`에서 `<TerrainParticles count={particleCount} />` 호출 제거 (라인 367)
3. `particleCount` 변수 제거 (라인 354)

**Verification**:
- 빌드 성공
- 화면에 입자가 표시되지 않음

---

### Task 3: Leva Provider 설정
**Parallelizable**: YES (Task 2, 4와 병렬 가능)

**Description**: Leva 전역 설정 및 LocalStorage 저장 활성화

**File**: `marine-web-app/src/app/[locale]/layout.tsx` 또는 새 파일 생성

**Changes**:
1. `LevaProvider` 컴포넌트 생성 (`components/providers/LevaProvider.tsx`)
2. 프로덕션 환경에서 숨김 처리: `<Leva hidden={process.env.NODE_ENV === 'production'} />`
3. 레이아웃에 Provider 추가

**Code Example**:
```tsx
// components/providers/LevaProvider.tsx
"use client";

import { Leva } from 'leva';

export function LevaProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Leva 
                hidden={process.env.NODE_ENV === 'production'}
                collapsed={true}
                oneLineLabels={false}
            />
            {children}
        </>
    );
}
```

**Verification**:
- 개발 환경: 우측 상단에 leva 패널 표시
- 프로덕션 빌드: 패널 숨김

---

### Task 4: 와이어프레임 컨트롤 훅 생성
**Parallelizable**: YES (Task 2, 3과 병렬 가능 - Task 1 완료 후)

**Description**: 와이어프레임 설정을 위한 leva 훅 생성

**File**: 새 파일 `marine-web-app/src/hooks/useHeroDebugControls.ts`

**Controls Structure**:
```tsx
import { useControls, folder, button } from 'leva';

export function useWireframeControls() {
    return useControls('Wireframe', {
        // Grid
        gridDensityX: { value: 200, min: 50, max: 400, step: 10, label: 'Grid X' },
        gridDensityY: { value: 150, min: 50, max: 300, step: 10, label: 'Grid Y' },
        lineWidth: { value: 0.035, min: 0.01, max: 0.1, step: 0.005, label: 'Line Width' },
        
        // Glow
        glowIntensity: { value: 0.4, min: 0, max: 1, step: 0.05, label: 'Glow Intensity' },
        glowRadius: { value: 3.5, min: 1, max: 6, step: 0.5, label: 'Glow Radius' },
        
        // Terrain
        waveHeight: { value: 5.0, min: 1, max: 15, step: 0.5, label: 'Wave Height' },
        animationSpeed: { value: 0.03, min: 0.01, max: 0.1, step: 0.01, label: 'Animation Speed' },
        
        // Colors
        colorLow: { value: '#C8C0E8', label: 'Color Low' },
        colorHigh: { value: '#FFFFFF', label: 'Color High' },
        
        // Bloom
        bloomIntensity: { value: 1.5, min: 0, max: 3, step: 0.1, label: 'Bloom' },
        
        // Fog
        fogNear: { value: 15, min: 5, max: 30, step: 1, label: 'Fog Near' },
        fogFar: { value: 60, min: 30, max: 100, step: 5, label: 'Fog Far' },
        
        // Camera
        cameraY: { value: 3, min: 0, max: 10, step: 0.5, label: 'Camera Y' },
        cameraZ: { value: 15, min: 5, max: 30, step: 1, label: 'Camera Z' },
        
        // Vignette
        vignetteIntensity: { value: 0.5, min: 0, max: 1, step: 0.05, label: 'Vignette' },
    }, { collapsed: true, store: null }); // store: null allows localStorage persistence
}
```

**Verification**:
- leva 패널에 "Wireframe" 폴더 표시
- 슬라이더 조작 시 값 변경 확인

---

### Task 5: 텍스트 컨트롤 훅 생성
**Parallelizable**: YES (Task 4와 병렬 가능)

**Description**: 텍스트 스타일 조정을 위한 leva 훅

**File**: `marine-web-app/src/hooks/useHeroDebugControls.ts` (Task 4와 같은 파일)

**Controls Structure**:
```tsx
const FONT_OPTIONS = {
    'Outfit (Display)': 'var(--font-display)',
    'Pretendard (Sans)': 'var(--font-sans)',
    'Inter': 'Inter, sans-serif',
    'Roboto': 'Roboto, sans-serif',
    'System UI': 'system-ui, sans-serif',
};

export function useTypographyControls() {
    const [selectedText, setSelectedText] = useState<'headline' | 'highlight' | 'subtitle' | 'cta'>('headline');
    
    return useControls('Typography', {
        // Text selector
        activeText: { 
            value: 'headline', 
            options: ['headline', 'highlight', 'subtitle', 'cta'],
            label: 'Select Text',
            onChange: (v) => setSelectedText(v),
        },
        
        // Common properties (변경 시 activeText에 적용)
        fontFamily: { value: 'Outfit (Display)', options: Object.keys(FONT_OPTIONS), label: 'Font' },
        fontSize: { value: 3.5, min: 0.5, max: 10, step: 0.1, label: 'Size (rem)' },
        fontWeight: { value: 600, min: 100, max: 900, step: 100, label: 'Weight' },
        letterSpacing: { value: -0.01, min: -0.1, max: 0.3, step: 0.01, label: 'Letter Spacing' },
        lineHeight: { value: 1.1, min: 0.8, max: 2, step: 0.05, label: 'Line Height' },
        color: { value: '#FFFFFF', label: 'Color' },
        opacity: { value: 1, min: 0, max: 1, step: 0.05, label: 'Opacity' },
        
        // Highlight specific
        ...folder('Highlight Glow', {
            glowColor: { value: '#70D1E5', label: 'Glow Color' },
            glowSize: { value: 12, min: 0, max: 30, step: 1, label: 'Glow Size (px)' },
            glowOpacity: { value: 0.4, min: 0, max: 1, step: 0.05, label: 'Glow Opacity' },
        }, { collapsed: true }),
        
        // Copy current values
        'Copy Values': button(() => {
            // Copy current typography values to clipboard
            navigator.clipboard.writeText(JSON.stringify(getCurrentValues(), null, 2));
        }),
    }, { collapsed: true });
}
```

**Verification**:
- leva 패널에 "Typography" 폴더 표시
- 텍스트 선택 후 속성 변경 가능
- Copy Values 버튼 동작

---

### Task 6: WireframeTerrainScene에 컨트롤 연동
**Parallelizable**: NO (Task 4 완료 후)

**Description**: 와이어프레임 셰이더에 leva 값 연동

**File**: `marine-web-app/src/components/ui/WireframeTerrainScene.tsx`

**Changes**:
1. `useWireframeControls` 훅 import 및 호출
2. 셰이더 uniform에 leva 값 연결
3. EffectComposer의 Bloom, Vignette에 leva 값 연결
4. 카메라 위치에 leva 값 연결
5. geometry segments에 gridDensity 연결 (useMemo dependency 추가)

**Key Code Changes**:
```tsx
// SceneContent 내부
const controls = useWireframeControls();

// WireframeTerrain에 props 전달
<WireframeTerrain 
    scrollProgress={scrollProgress} 
    quality={quality}
    controls={controls}
/>

// Bloom, Vignette 수정
<Bloom intensity={controls.bloomIntensity} ... />
<Vignette darkness={controls.vignetteIntensity} ... />
```

**Verification**:
- 슬라이더 조작 시 와이어프레임 실시간 변경
- Bloom, Vignette 실시간 변경
- 값 변경 후 새로고침해도 유지 (LocalStorage)

---

### Task 7: HeroSection에 텍스트 컨트롤 연동
**Parallelizable**: NO (Task 5 완료 후)

**Description**: 텍스트 스타일에 leva 값 연동

**File**: `marine-web-app/src/components/sections/HeroSection.tsx`

**Changes**:
1. `useTypographyControls` 훅 import 및 호출
2. 각 텍스트 요소에 inline style로 leva 값 적용
3. CSS 클래스와 inline style 조합

**Key Code Changes**:
```tsx
const typography = useTypographyControls();

// 텍스트 요소별 스타일 계산
const getTextStyle = (textType: string) => {
    if (typography.activeText !== textType) return {};
    return {
        fontFamily: FONT_OPTIONS[typography.fontFamily],
        fontSize: `${typography.fontSize}rem`,
        fontWeight: typography.fontWeight,
        letterSpacing: `${typography.letterSpacing}em`,
        lineHeight: typography.lineHeight,
        color: typography.color,
        opacity: typography.opacity,
    };
};

// JSX
<h1 style={getTextStyle('headline')} ...>
```

**Verification**:
- 텍스트 선택 후 스타일 변경 시 실시간 반영
- 폰트 종류 변경 가능
- 값 변경 후 새로고침해도 유지

---

### Task 8: 전체 테스트 및 검증
**Parallelizable**: NO (모든 태스크 완료 후)

**Description**: 최종 통합 테스트

**Test Cases**:
1. `npm run dev` 실행 → 에러 없음
2. 브라우저에서 히어로 섹션 확인
   - 입자 효과 없음 ✓
   - leva 패널 우측 상단에 표시 ✓
3. Wireframe 폴더 조작
   - 그리드 밀도 변경 → 실시간 반영
   - 선 두께 변경 → 실시간 반영
   - 색상 변경 → 실시간 반영
   - Bloom 변경 → 실시간 반영
4. Typography 폴더 조작
   - 텍스트 선택 → 해당 텍스트만 스타일 변경
   - 폰트 종류 변경 → 반영
   - Copy Values → 클립보드에 JSON 복사
5. 새로고침 → 변경된 값 유지 (LocalStorage)
6. `npm run build` → 빌드 성공
7. 프로덕션 모드 (`NODE_ENV=production`) → leva 패널 숨김

**Verification Commands**:
```bash
cd marine-web-app
npm run dev
npm run build
npx tsc --noEmit
```

---

## Execution Order

```
Task 1 (leva 설치)
    ↓
┌───┴───┬───────┐
↓       ↓       ↓
Task 2  Task 3  Task 4 + Task 5 (병렬)
(입자제거) (Provider) (훅 생성)
    ↓       ↓       ↓
    └───────┴───────┘
            ↓
    Task 6 (와이어프레임 연동)
            ↓
    Task 7 (텍스트 연동)
            ↓
    Task 8 (테스트)
```

---

## Scope Boundaries

### IN SCOPE
- leva 패키지 설치 및 설정
- 입자 효과 완전 제거
- 와이어프레임 슬라이더 컨트롤 (10개 항목)
- 텍스트 슬라이더 컨트롤 (선택식, 폰트 포함)
- LocalStorage 저장
- Copy 버튼 기능

### OUT OF SCOPE
- 실제 최종 스타일 값 결정 (사용자가 슬라이더로 결정)
- 디자인 가이드 문서화
- 다른 섹션의 디버그 컨트롤
