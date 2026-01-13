# Draft: Hero Section Debug Panel

## Requirements (confirmed)

### 1. 입자 효과 (Particles)
- **결정**: 완전히 제거
- 현재: `TerrainParticles` 컴포넌트로 250개 입자 렌더링
- 목표: 해당 컴포넌트 삭제 또는 비활성화

### 2. 개발용 디버그 패널
- **위치**: 화면 구석에 토글 가능
- **프로덕션**: 숨김 처리 필요
- **방식**: 라이브러리 사용 vs 커스텀 구현 (조사 중)

### 3. 와이어프레임 슬라이더 옵션
사용자가 실시간으로 조정하고 싶은 항목:
- [ ] 그리드 밀도 (Grid density) - 현재 200x150
- [ ] 선 두께 (Line width) - 현재 0.035
- [ ] 글로우 강도 (Glow intensity)
- [ ] Bloom 효과 강도 - 현재 1.5
- [ ] 지형 높이 (Wave height) - 현재 5.0 multiplier
- [ ] 애니메이션 속도 - 현재 0.03
- [ ] 색상 (Low/High color) - 현재 #C8C0E8 / #FFFFFF
- [ ] 안개(Fog) 거리 - 현재 15~60
- [ ] 카메라 위치/각도
- [ ] 비네팅 강도 - 현재 0.5

### 4. 텍스트 디버그 옵션
모든 텍스트 요소에 대해 조정 가능하게:
- **메인 타이틀** ("Deep. Precision. Discovery.")
  - font-size: 현재 clamp(2rem, 4vw, 3.5rem)
  - font-weight: 현재 600
  - letter-spacing: 현재 -0.01em
- **하이라이트** ("Discovery.")
  - 그라데이션 색상
  - 글로우 강도: 현재 drop-shadow 12px 0.4 opacity
- **서브타이틀**
  - font-size: 현재 clamp(0.95rem, 1.3vw, 1.15rem)
  - font-weight: 현재 300
  - color opacity: 현재 0.65
- **CTA 텍스트**
  - font-size: 현재 clamp(0.65rem, 0.8vw, 0.75rem)
  - font-weight: 현재 500
  - letter-spacing: 현재 0.12em

## Technical Decisions
- **디버그 라이브러리**: `leva` 사용 권장
  - R3F와 같은 pmndrs 팀이 개발, 궁합 최고
  - TypeScript 지원 우수
  - 폴더 구조로 옵션 그룹화 가능
  - 색상 피커, 슬라이더, 토글 등 다양한 컨트롤 내장
  - 값 복사/내보내기 기능 내장

## Research Findings

### 1. 기존 코드베이스 분석
- **디버그 패널 없음**: 현재 leva/dat.gui/tweakpane 미사용
- **테스트 페이지 존재**: `/test` 경로에 Component Test Lab 있음
- **상태 관리 패턴**:
  - React `useState` + GSAP `ScrollTrigger.onUpdate` 조합
  - R3F `useFrame`으로 셰이더 uniform 실시간 업데이트
- **CSS 변수**: `globals.css`의 `@theme` 블록에 Tailwind CSS 4 방식으로 정의

### 2. 주요 파일들
- `HeroSection.tsx`: scrollProgress 상태 관리, 텍스트 렌더링
- `WireframeTerrainScene.tsx`: 셰이더 uniform 업데이트, 와이어프레임 설정
- `globals.css`: hero-headline, hero-subtitle 등 스타일 정의
- `ThreeCanvas.tsx`: `enableControls` prop으로 OrbitControls 토글 가능

### 3. leva 라이브러리 활용법
```tsx
import { useControls, folder } from 'leva'

const { gridDensity, lineWidth } = useControls({
  Wireframe: folder({
    gridDensity: { value: 200, min: 50, max: 400, step: 10 },
    lineWidth: { value: 0.035, min: 0.01, max: 0.1, step: 0.005 },
  }),
  Typography: folder({
    headlineSize: { value: 3.5, min: 1, max: 8, step: 0.1 },
  }),
}, { collapsed: true })
```

### 4. 프로덕션 숨김 처리
```tsx
import { Leva } from 'leva'
<Leva hidden={process.env.NODE_ENV === 'production'} />
```

## Open Questions
1. ~~디버그 패널 라이브러리 선택~~ → leva 확정
2. 슬라이더 값 저장/내보내기 → leva 내장 기능 활용
3. 프로덕션 빌드에서 자동 제거 vs 조건부 렌더링 → 조건부 렌더링 (Leva hidden prop)

## Scope Boundaries
- INCLUDE: 디버그 패널 구현, 입자 제거, 슬라이더 연동
- EXCLUDE: 실제 최종 스타일 값 결정 (사용자가 슬라이더로 조정)
