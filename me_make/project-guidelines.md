---
description: 프로젝트 코딩 표준, 기술 스택, 도구 활용 가이드라인
---

# Marine Web Project Guidelines

## 핵심 원칙

- App Router 기반 구조를 유지한다.
- Server Components를 기본으로 하고, 필요한 경우에만 `use client`를 사용한다.
- 데이터 패칭은 병렬화하고 캐싱/리밸리데이션 의도를 명시한다.
- 애니메이션은 GSAP + `@gsap/react`만 사용한다.
- 3D는 R3F + drei만 사용한다.

---

## 기술 스택

### 프레임워크

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**

### 스타일

- **Tailwind CSS 4** (CSS-first, `@theme` 기반)
- `globals.css`의 `@theme` 토큰이 단일 소스

### CMS / i18n

- **Sanity** (`next-sanity`, `@sanity/client`, `@sanity/image-url`)
- **next-intl** (ko/en, `app/[locale]` 라우팅)

### 애니메이션 / 3D

- **GSAP** + `@gsap/react` + ScrollTrigger
- **React Three Fiber** + **drei**

### 기타

- `embla-carousel-react`, `lucide-react`
- `@vercel/analytics`, `@vercel/speed-insights`

---

## Next.js App Router 규칙

- 페이지는 `app/[locale]/.../page.tsx`에 배치한다.
- 동적 라우트는 `app/[locale]/vessels/[slug]` 패턴을 유지한다.
- API는 App Router `route.ts`로 구성한다.

### 데이터 패칭 & 캐싱

- `fetch`는 기본적으로 요청마다 실행될 수 있으니 캐싱 의도를 명시한다.
- 정적/ISR: `fetch(..., { cache: "force-cache" })` 또는 `next: { revalidate: N }`.
- 동적: `cache: "no-store"` 명시.
- `fetch`를 쓰지 않는 데이터 소스는 React `cache()` 또는 `unstable_cache`로 중복 호출을 방지한다.
- 여러 요청은 병렬 실행하여 워터폴을 줄인다.

---

## next-intl (i18n)

- 로케일 루트는 `app/[locale]`를 유지한다.
- 로케일 설정은 `src/i18n/routing.ts`에서 관리한다.
- 메시지는 `messages/ko.json`, `messages/en.json`만 사용한다.

---

## Sanity

- GROQ로 쿼리하고 `apiVersion`을 명시한다.
- 공개 콘텐츠: `useCdn: true`, 미리보기/관리: `useCdn: false`.
- 콘텐츠 변경 시 `revalidatePath()` + Sanity webhook 기반 갱신을 고려한다.
- 이미지 URL은 `@sanity/image-url`을 사용한다.

---

## GSAP (@gsap/react)

- 애니메이션은 `useGSAP()`로 작성해 자동 cleanup을 보장한다.
- 이벤트 핸들러/지연 실행 함수는 `contextSafe()`로 래핑한다.
- ScrollTrigger는 타임라인 중심으로 구성하고, 필요 시 인스턴스를 직접 제어한다.

---

## 3D (R3F)

- draw call 수를 수백 이하로 유지하고 반복 오브젝트는 instancing한다.
- 성능 이슈 시 `PerformanceMonitor`(drei)로 품질을 스케일링한다.

---

## Tailwind CSS v4 사용 원칙

- `globals.css`의 `@theme` 토큰을 우선 사용한다.
- `tailwind.config.ts`는 비워두고 CSS-first만 사용한다.
- 커스텀 유틸은 `globals.css`에 추가한다 (`section-padding`, `container-custom` 등).
- 중요도 표시는 `class!` 형식으로 작성한다.

---

## 디자인 원칙

1. **프리미엄 미학** - 기업 사이트답게 고급스럽게.
2. **다크 테마** - `--color-marine-dark`, `--color-marine-hero`.
3. **Ocean 포인트** - `--color-ocean-500`, `--color-accent-cyan`.
4. **글래스모피즘** - `bg-white/5 backdrop-blur-xl border border-white/10`.
5. **폰트** - `--font-display`(Outfit) + `--font-sans`(Pretendard).

---

## 폴더 구조

```
Marine_web/
├── marine-web-app/           # 메인 프로젝트
│   ├── src/
│   │   ├── app/[locale]/     # 페이지 (Next.js App Router)
│   │   ├── components/
│   │   │   ├── animations/   # GSAP 애니메이션 컴포넌트
│   │   │   ├── layout/       # Header, Footer
│   │   │   ├── sections/     # 페이지 섹션
│   │   │   ├── ui/           # 재사용 UI 컴포넌트
│   │   │   └── providers/    # GSAPProvider
│   │   ├── hooks/            # useGSAPAnimations
│   │   └── lib/              # 유틸리티
│   ├── public/               # 정적 파일
│   └── messages/             # i18n 번역 (ko.json, en.json)


---

## 주의사항
- 빌드/테스트 명령은 자동 실행 가능.
- 파일 삭제/수정은 확인 필요.
```
