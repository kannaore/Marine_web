# Learnings - services-section-fixes

## Session: ses_43a2f4368ffesuqQjixugmLI1E (2026-01-16)

### Conventions Discovered
- Tailwind CSS v4: `@theme` 블록 사용 (`:root` 대신)
- CSS 변수에 함수 값(`blur()`, `linear-gradient()`)은 별도 `:root` 섹션에 정의
- 기존 lint 에러 55개는 pre-existing (이 작업과 무관)

### Successful Approaches
- Task 0: `:root` 섹션을 `@theme` 블록 다음에 추가하여 glassmorphism 변수 정의
- Task 1: `loopAdditionalSlides`를 슬라이드 수(6)와 동일하게 설정하여 loop 버그 해결

### Commands
- `npm run lint` - lint check
- `npm run build` - production build
- `npm run dev` - dev server

### Key File Locations
- globals.css: line 45-54 (new `:root` section)
- BusinessServicesPage.tsx: line 339, 376 (Swiper loopAdditionalSlides)
- BusinessServicesPage.tsx: line 163-177 (VideoBackground)
- globals.css: line 683-689 (.detail-backdrop)
