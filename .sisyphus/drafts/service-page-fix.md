# Draft: 서비스 페이지 스크롤/UI 수정

## Requirements (confirmed)

### 1. 스크롤 애니메이션 문제 ✅ 확정
- **원하는 동작**: 1→2→3→4→5→6→1→2... 계속 한 방향으로 자연스러운 무한 루프
- **현재 문제**: 6→1 전환시 슬라이드가 뒤로 돌아가는 부자연스러운 애니메이션
- **해결 방향**: loop 유지 + Swiper 복제 슬라이드(loopedSlides) 설정 조정

### 2. UI 전체 품질 차이 ✅ 스크린샷 비교 완료

| 항목 | simpac 원본 | 현재 구현 |
|------|------------|----------|
| **메뉴 팝업 배경** | 강한 blur(30px), 어두운 배경 | blur 약함 |
| **메뉴 그리드** | 3+2 레이아웃, 썸네일 with 이미지 | 썸네일에 gradient만 |
| **썸네일 크기** | 더 큼 (약 15rem 너비) | 작아 보임 |
| **하단 버튼** | glassmorphism 뚜렷 | 효과 약함 |
| **상세 팝업** | 큰 16:9 이미지, 스크롤 가능 | 간단한 gradient 박스 |
| **텍스트 스타일** | 프리미엄 느낌 | 덜 고급스러움 |

## Technical Decisions

### Loop 문제 해결 방법:
1. **loopedSlides 설정**: 복제 슬라이드 수를 총 슬라이드 수와 같게 설정
2. **loopAdditionalSlides**: 추가 여유분 확보
3. **두 Swiper(배경/콘텐츠) sync 최적화**

### UI 수정 방향:
1. 메뉴 팝업: blur 강화, 배경 투명도 조정
2. 썸네일: 크기 증가, aspect ratio 조정
3. 상세 팝업: 전체 레이아웃 재설계 (simpac 스타일)
4. 하단 버튼: glassmorphism 효과 강화

## Research Findings

### 현재 구현 CSS (globals.css):
- `.business-pop .pop-inner`: blur(30px), rgba(3, 6, 8, 0.9) ✅ 이미 설정됨
- `.business-menu .menu-item`: width: 15rem ✅ 이미 설정됨
- **BUT** 썸네일에 실제 이미지가 없고 gradient만 사용 중

### simpac 상세 팝업 구조:
- 헤더: 타이틀 + 서브타이틀 + "사이트 바로가기" 버튼
- 큰 16:9 이미지
- 설명 텍스트
- 스크롤 가능한 영역

### 현재 상세 팝업:
- 간단한 gradient 박스 (이미지 없음)
- "사이트 바로가기" 버튼 있음
- **레이아웃이 simpac과 다름**

## User Decision
- **스크롤**: 한 방향 무한 루프 원함 (1→2→3→4→5→6→1...)
- **UI**: 전체적으로 simpac 수준으로 고급스럽게

## Scope Boundaries
- INCLUDE: 
  - 스크롤 동작 수정 (진정한 무한 루프)
  - 메뉴 팝업 UI 개선
  - 상세 팝업 UI 재설계
  - glassmorphism 효과 강화
  - 하단 버튼 스타일 조정
- EXCLUDE: 
  - 실제 서비스 이미지 (현재 없으므로 gradient 유지하되 스타일 개선)
