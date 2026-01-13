# Hero Section Refactor Plan

## Overview
메인 페이지 히어로 섹션을 Spline 3D 배경 + 프리미엄 타이포그래피로 리팩토링

---

## Requirements (유저 요청)

| # | 요구사항 | 상태 |
|---|----------|------|
| 1 | Spline 3D를 전체 배경으로 사용 | 📋 계획됨 |
| 2 | Spline 효과 = bathymetric 효과 (SVG 없음) | 📋 계획됨 |
| 3 | 워터마크 제거 | 📋 계획됨 |
| 4 | Headline 1줄: "DEEP. PRECISION. DISCOVERY." | 📋 계획됨 |
| 5 | Spline 3D 내 폰트 사용: **Readex Pro ExtraLight** | ✅ 확정 |
| 6 | Badge 제거 | 📋 계획됨 |
| 7 | CTA 버튼 제거 | 📋 계획됨 |
| 8 | i18n (ko/en) 적용 | 📋 계획됨 |

---

## Technical Decisions

### 1. Spline + Bathymetric 통합 전략

**Oracle 권장**: 단일 렌더러/씬 접근법

> "두 개의 렌더러를 쓰면 조명/안개/깊이 큐가 일치하지 않아 '레이어드' 느낌이 남"

**결정**:
- Spline "Clarity Stream" 씬 자체가 bathymetric 데이터 시각화 역할
- 별도 SVG/Canvas 오버레이 없음
- 씬 이름이 이미 "데이터 흐름" 컨셉에 맞음

### 2. 워터마크 제거

**방법**: CSS + JavaScript 하이브리드

```css
/* globals.css에 추가 */
.spline-watermark,
[aria-label*="Built with Spline"],
a[href*="spline.design"],
a[href*="splinecode.com"] {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
```

**참고**: 상업적 사용 시 Spline Starter 플랜 ($12/mo) 권장

### 3. 폰트 전략

**확정**: Readex Pro (Google Fonts)

| 속성 | 값 |
|------|-----|
| Font Family | Readex Pro |
| Weight | ExtraLight (200) |
| Letter Spacing | 0 |
| Alignment | Center |

**Next.js 설정**:
```tsx
// src/app/[locale]/layout.tsx
import { Readex_Pro } from 'next/font/google';

const readexPro = Readex_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-readex-pro',
  display: 'swap',
});
```

**CSS 변수**:
```css
/* globals.css */
@theme {
  --font-hero: var(--font-readex-pro), sans-serif;
}
```

### 4. Spline 통합 방식

```tsx
// SplineScene.tsx
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});
```

**핵심**:
- `ssr: false`로 클라이언트 전용 렌더링
- `onLoad` 콜백으로 로딩 상태 관리
- 로딩 플레이스홀더: 검정 배경 (Spline 씬과 동일)

---

## File Structure

```
src/
├── components/
│   ├── sections/
│   │   └── HeroSection.tsx          # 전면 리팩토링
│   └── ui/
│       └── SplineScene.tsx          # 새로 생성
├── app/
│   └── globals.css                  # 워터마크 숨김 CSS 추가
└── messages/
    ├── ko.json                      # Hero 텍스트 추가
    └── en.json                      # Hero 텍스트 추가
```

---

## Implementation Tasks

### Phase 1: 기반 설정 (10분)

- [ ] 1.1 `@splinetool/react-spline` 패키지 설치
- [ ] 1.2 `messages/ko.json`에 Hero 텍스트 추가
- [ ] 1.3 `messages/en.json`에 Hero 텍스트 추가

**i18n 구조**:
```json
{
  "hero": {
    "headline": "DEEP. PRECISION. DISCOVERY.",
    "subtitle": "정확한 해양 탐사 솔루션으로 지속 가능한 미래를 열어갑니다.",
    "scrollHint": "스크롤하여 더 알아보기"
  }
}
```

### Phase 2: SplineScene 컴포넌트 (15분)

- [ ] 2.1 `src/components/ui/SplineScene.tsx` 생성
- [ ] 2.2 dynamic import + ssr: false 설정
- [ ] 2.3 로딩 상태 관리 (onLoad 콜백)
- [ ] 2.4 에러 핸들링 (폴백 배경)

### Phase 3: 워터마크 제거 (5분)

- [ ] 3.1 `globals.css`에 워터마크 숨김 CSS 추가

### Phase 4: HeroSection 리팩토링 (30분)

- [ ] 4.1 기존 배경 제거 (Unsplash 이미지)
- [ ] 4.2 SplineScene 컴포넌트 통합
- [ ] 4.3 Badge 제거 ("Marine Survey Specialists")
- [ ] 4.4 CTA 버튼 2개 제거
- [ ] 4.5 Headline 1줄로 변경 + 스타일링
- [ ] 4.6 i18n 연동 (`useTranslations('hero')`)
- [ ] 4.7 기존 GSAP 애니메이션 조정

### Phase 5: 타이포그래피 (15분)

- [ ] 5.1 `globals.css`에 Hero 타이포 스타일 추가
- [ ] 5.2 시안 하이라이트 ("DISCOVERY." 부분)
- [ ] 5.3 텍스트 글로우 효과

**타이포 스펙**:
```css
.hero-headline {
  font-family: var(--font-readex-pro), sans-serif;
  font-weight: 200; /* ExtraLight - Spline과 동일 */
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero-highlight {
  color: #7CD4FD;
  text-shadow: 0 0 60px rgba(124, 212, 253, 0.5);
}
```

### Phase 6: 애니메이션 (15분)

- [ ] 6.1 Headline 등장 애니메이션 (GSAP)
- [ ] 6.2 Subtitle 등장 애니메이션
- [ ] 6.3 스크롤 패럴랙스 유지
- [ ] 6.4 Scroll Indicator 유지

**타임라인**:
```
0.0s → Spline 로드 완료 대기
0.3s → Headline 등장 (opacity + y)
0.6s → Subtitle 등장
1.2s → Scroll Indicator 등장
```

### Phase 7: 반응형 & 성능 (10분)

- [ ] 7.1 모바일 타이포 크기 조정
- [ ] 7.2 저사양 기기 감지 + 정적 폴백 (선택)
- [ ] 7.3 접근성 (`prefers-reduced-motion`)

---

## Visual Design

### 최종 레이아웃
```
┌────────────────────────────────────────────────────────┐
│                   HERO SECTION                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │                                                  │  │
│  │         ★ Spline 3D Full Background ★           │  │
│  │              (Clarity Stream)                    │  │
│  │         = bathymetric 효과 자체                  │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │                                            │  │  │
│  │  │   DEEP. PRECISION. DISCOVERY.              │  │  │
│  │  │                     ^^^^^^^^^ (시안)       │  │  │
│  │  │                                            │  │  │
│  │  │   정확한 해양 탐사 솔루션으로...            │  │  │
│  │  │                                            │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │                                                  │  │
│  │          ❌ Badge 없음                           │  │
│  │          ❌ CTA 버튼 없음                        │  │
│  │          ❌ 워터마크 (CSS로 숨김)                │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│              ↓ Scroll Indicator ↓                      │
└────────────────────────────────────────────────────────┘
```

### 컬러 팔레트
| 용도 | 컬러 | 코드 |
|------|------|------|
| 배경 | Pure Black | `#000000` (Spline 기본) |
| 텍스트 | White | `#FFFFFF` |
| 하이라이트 | Electric Cyan | `#7CD4FD` |
| 글로우 | Cyan 50% | `rgba(124, 212, 253, 0.5)` |
| 서브텍스트 | White 60% | `rgba(255, 255, 255, 0.6)` |

---

## Spline Integration

### Scene URL
```
https://prod.spline.design/qd2i7Sy9fv5P4SSMTN0CyDvc/scene.splinecode
```

### Embed URL (iframe용, 미사용)
```
https://my.spline.design/claritystream-qd2i7Sy9fv5P4SSMTN0CyDvc/
```

---

## Dependencies

### 설치 필요
```bash
npm install @splinetool/react-spline @splinetool/runtime
```

### 이미 설치됨
- `gsap`, `@gsap/react` - 애니메이션
- `next-intl` - i18n
- `next/dynamic` - SSR 비활성화 import

---

## Verification Checklist

### 기능 검증
- [ ] Spline 씬 로드 확인
- [ ] 워터마크 숨김 확인
- [ ] i18n ko/en 전환 확인
- [ ] 애니메이션 동작 확인
- [ ] 스크롤 패럴랙스 확인

### 성능 검증
- [ ] `npm run build` 성공
- [ ] Lighthouse 성능 체크
- [ ] 모바일 렌더링 확인

### 접근성 검증
- [ ] `prefers-reduced-motion` 대응
- [ ] 스크린 리더 호환

---

## Risks & Mitigations

| 리스크 | 대응 |
|--------|------|
| Spline 로딩 느림 | 로딩 플레이스홀더 (검정 배경) |
| 워터마크 재등장 | MutationObserver 폴백 |
| 모바일 성능 | 저사양 감지 시 정적 폴백 |
| 텍스트 가독성 | 반투명 오버레이 (필요시) |

---

## Pending Decisions

모든 결정사항 확정됨 ✅

---

## Estimated Time

| Phase | 예상 시간 |
|-------|----------|
| 1. 기반 설정 | 10분 |
| 2. SplineScene | 15분 |
| 3. 워터마크 | 5분 |
| 4. HeroSection | 30분 |
| 5. 타이포그래피 | 15분 |
| 6. 애니메이션 | 15분 |
| 7. 반응형/성능 | 10분 |
| **총계** | **~1시간 40분** |

---

## Next Steps

1. ✅ 폰트 확정: **Readex Pro ExtraLight**
2. 구현 시작 준비 완료
3. 구현 완료 후 검증
