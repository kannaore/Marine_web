# Services Section V2 - Phase 2 Fixes

## Context

### Original Request
1. Swiper 스크롤 로직이 완전히 깨짐 - 끝까지 스크롤 안 되고 무한루프도 작동 안 함
2. 글래스모피즘 컨트롤이 너무 적음 - 그림자, 블러 퍼짐, 테두리 둥글기 등 필요

### Root Cause Analysis

**Issue 1 (Swiper Loop Broken)**:
- Bidirectional Controller binding creates circular dependency
- Known Swiper bug: Controller + loop=true causes tracking issues (GitHub #7178, #6491)
- Custom `handleWheel` may interfere with loop boundary detection

**Issue 2 (Glass Controls Insufficient)**:
- Only 5 controls exist (blur, bgOpacity, bgColor, borderOpacity, borderWidth)
- Missing: saturate, brightness, contrast, shadows, border-radius, noise, blend modes, bevels

---

## Work Objectives

### Core Objective
Fix Swiper scroll/loop functionality by removing Controller module and implementing manual sync. Expand glass debug panel from 5 to 18 controls organized into 4 folders.

### Concrete Deliverables
- `BusinessServicesPage.tsx`: Manual Swiper sync, fixed loop behavior
- `useAnimationConfig.ts`: 18 glass controls in 4 Leva folders
- `globals.css`: Extended glass CSS variables

### Definition of Done
- [ ] Swiper scrolls through all 6 slides
- [ ] Loop works: slide 6 → slide 1, slide 1 → slide 6
- [ ] Fast wheel scrolling doesn't cause deadlock
- [ ] Glass debug panel has 4 folders with 18 total controls
- [ ] All glass controls update CSS variables in real-time
- [ ] `npm run build` succeeds

### Must NOT Have (Guardrails)
- Don't add glass controls to components outside Services section
- Don't create new hook files (extend useAnimationConfig only)
- Don't change popup layout/styling
- Don't remove existing Swiper touch functionality
- Don't break navigation menu or popup functionality

---

## Task Flow

```
Task 0 (Diagnose via logs)
    ↓
Task 1 (Remove Controller, manual sync)
    ↓
Task 2 (Fix loop edge cases)
    ↓
Task 3 (Expand glass controls to 18)
    ↓
Task 4 (Update globals.css)
    ↓
Task 5 (Integration test)
```

---

## TODOs

- [ ] 0. Diagnose Current Swiper Behavior via Console Logs

  **What to do**:
  - Run `npm run dev` and open browser console
  - Navigate to `/ko/services` and test scrolling
  - Document what the 4 console.logs show:
    - `[Swiper] Wheel blocked:` - when is it blocking?
    - `[Swiper] Transition started, realIndex:` - what indices are logged?
    - `[Swiper] SlideChange:` - is realIndex correct at boundaries?
    - `[Swiper] TransitionEnd fired` - does it fire on loop?

  **Must NOT do**:
  - No code changes in this task

  **Parallelizable**: NO (diagnostic step)

  **References**:
  - `src/components/sections/business/BusinessServicesPage.tsx:245` - Wheel blocked log
  - `src/components/sections/business/BusinessServicesPage.tsx:275` - Transition started log
  - `src/components/sections/business/BusinessServicesPage.tsx:308` - SlideChange log
  - `src/components/sections/business/BusinessServicesPage.tsx:313` - TransitionEnd log

  **Acceptance Criteria**:
  - [ ] Console output documented
  - [ ] Root cause confirmed (Controller module or other issue)

  **Commit**: NO

---

- [ ] 1. Remove Controller Module, Implement Manual Sync

  **What to do**:
  1. Remove `Controller` import from `swiper/modules`
  2. Remove `modules={[Controller]}` from both Swipers
  3. Remove `controller={{ control: ... }}` prop from both Swipers
  4. Keep `onSlideChange` on dataSwiper (already exists)
  5. In `handleSlideChange`, manually sync bgSwiper:
     ```tsx
     const handleSlideChange = useCallback((swiper: SwiperType) => {
         const newIndex = swiper.realIndex;
         console.log('[Swiper] SlideChange:', { realIndex: newIndex });
         setActiveIndex(newIndex);
         // Manual sync: only if bgSwiper exists and not already at same index
         if (bgSwiper && bgSwiper.realIndex !== newIndex) {
             bgSwiper.slideToLoop(newIndex, swiperSpeed);
         }
     }, [bgSwiper, swiperSpeed]);
     ```

  **Must NOT do**:
  - Don't remove `loop: true` or `loopAdditionalSlides`
  - Don't modify `handleWheel` logic (yet)
  - Don't change slide count or data

  **Parallelizable**: NO (depends on Task 0)

  **References**:
  - `src/components/sections/business/BusinessServicesPage.tsx:4-6` - Controller import
  - `src/components/sections/business/BusinessServicesPage.tsx:326-335` - bgSwiper config
  - `src/components/sections/business/BusinessServicesPage.tsx:365-376` - dataSwiper config
  - `src/components/sections/business/BusinessServicesPage.tsx:307-310` - handleSlideChange

  **Acceptance Criteria**:
  - [ ] No TypeScript errors
  - [ ] Both swipers sync when scrolling
  - [ ] Loop works at boundaries (6→1, 1→6)

  **Commit**: NO (combine with Task 2)

---

- [ ] 2. Fix Loop Edge Cases in Wheel Handler

  **What to do**:
  1. In `handleWheel`, ensure blocking during transitions prevents issues:
     ```tsx
     const handleWheel = useCallback((e: WheelEvent) => {
         // Block during transition or popups
         if (dataSwiper?.animating || isMenuOpen || isDetailOpen) {
             console.log('[Swiper] Wheel blocked:', { 
                 animating: dataSwiper?.animating, 
                 isMenuOpen, 
                 isDetailOpen 
             });
             e.preventDefault();  // Also prevent default when blocked
             return;
         }
         // ... rest of accumulator logic ...
     }, [...]);
     ```
  2. Ensure `slideNext()` and `slidePrev()` work correctly with loop

  **Must NOT do**:
  - Don't change wheel accumulator threshold/decay logic
  - Don't add new wheel event listeners

  **Parallelizable**: NO (depends on Task 1)

  **References**:
  - `src/components/sections/business/BusinessServicesPage.tsx:242-276` - handleWheel function

  **Acceptance Criteria**:
  - [ ] Scroll from slide 1 → 2 → 3 → 4 → 5 → 6 → 1 (loop)
  - [ ] Scroll from slide 1 → 6 (reverse loop)
  - [ ] Fast scrolling doesn't cause stuck state
  - [ ] Console logs show correct realIndex throughout

  **Commit**: YES
  - Message: `fix(services): replace Controller module with manual Swiper sync for reliable loop`
  - Files: `BusinessServicesPage.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 3. Expand Glass Controls to 18 (4 Folders)

  **What to do**:
  1. Refactor `useGlassConfig()` to use Leva's folder structure
  2. Add all 18 controls organized into 4 groups:

  **Refraction Folder (4 controls)**:
  | Control | Range | Default | CSS Variable |
  |---------|-------|---------|--------------|
  | blur | 0-50px | 32 | `--glass-blur` |
  | saturate | 100-250% | 180 | `--glass-saturate` |
  | brightness | 80-130% | 100 | `--glass-brightness` |
  | contrast | 80-120% | 100 | `--glass-contrast` |

  **Surface Folder (4 controls)**:
  | Control | Range | Default | CSS Variable |
  |---------|-------|---------|--------------|
  | bgColor | RGB | rgb(47,54,58) | `--glass-bg-rgb` |
  | bgOpacity | 0.05-0.5 | 0.4 | `--glass-bg-opacity` |
  | noiseOpacity | 0-0.2 | 0 | `--glass-noise-opacity` |
  | blendMode | dropdown | normal | `--glass-blend-mode` |

  **Edge Folder (5 controls)**:
  | Control | Range | Default | CSS Variable |
  |---------|-------|---------|--------------|
  | borderWidth | 0-2px | 1 | `--glass-border-width` |
  | borderOpacity | 0-0.6 | 0.15 | `--glass-border-opacity` |
  | borderRadius | 0-50px | 8 | `--glass-border-radius` |
  | gradientBorder | toggle | false | `--glass-gradient-border` |
  | borderColor | RGB | rgb(255,255,255) | `--glass-border-rgb` |

  **Shadow Folder (5 controls)**:
  | Control | Range | Default | CSS Variable |
  |---------|-------|---------|--------------|
  | shadowBlur | 0-60px | 30 | `--glass-shadow-blur` |
  | shadowSpread | -10 to 20px | 0 | `--glass-shadow-spread` |
  | shadowOpacity | 0-0.5 | 0.3 | `--glass-shadow-opacity` |
  | innerGlow | 0-20px | 0 | `--glass-inner-glow` |
  | topBevel | toggle | false | `--glass-top-bevel` |

  3. Update `useLayoutEffect` to inject all new CSS variables to `:root`

  **Implementation Pattern**:
  ```tsx
  const glassRefraction = useControls(
      "Refraction",
      {
          blur: { value: 32, min: 0, max: 50, step: 1, label: "Blur (px)" },
          saturate: { value: 180, min: 100, max: 250, step: 5, label: "Saturate (%)" },
          brightness: { value: 100, min: 80, max: 130, step: 5, label: "Brightness (%)" },
          contrast: { value: 100, min: 80, max: 120, step: 5, label: "Contrast (%)" },
      },
      { collapsed: true, render: () => isDev }
  );
  // ... repeat for Surface, Edge, Shadow folders
  ```

  **Must NOT do**:
  - Don't remove existing glass functionality
  - Don't create new hook files
  - Don't apply glass controls outside Services section

  **Parallelizable**: YES (with Task 1, 2 - independent feature)

  **References**:
  - `src/hooks/useAnimationConfig.ts:107-165` - Current useGlassConfig implementation
  - Leva folder API: https://github.com/pmndrs/leva#folder

  **Acceptance Criteria**:
  - [ ] 4 Leva folders visible in debug panel
  - [ ] 18 total controls across folders
  - [ ] All controls update in real-time
  - [ ] No TypeScript errors

  **Commit**: NO (combine with Task 4)

---

- [ ] 4. Update globals.css with Extended Glass Variables

  **What to do**:
  1. Add new CSS custom properties to `:root`:
     ```css
     :root {
         /* Existing */
         --glass-bg-dark: rgba(47, 54, 58, 0.40);
         --glass-blur-lg: blur(40px);
         /* ... */
         
         /* New - Refraction */
         --glass-saturate: saturate(180%);
         --glass-brightness: brightness(100%);
         --glass-contrast: contrast(100%);
         
         /* New - Surface */
         --glass-noise-opacity: 0;
         --glass-blend-mode: normal;
         
         /* New - Edge */
         --glass-border-radius: 8px;
         --glass-gradient-border: none;
         
         /* New - Shadow */
         --glass-shadow: 0 30px 60px rgba(0,0,0,0.3);
         --glass-inner-glow: none;
         --glass-top-bevel: none;
     }
     ```

  2. Update glass-related classes to use new variables

  **Must NOT do**:
  - Don't change popup layout/dimensions
  - Don't affect non-glass elements

  **Parallelizable**: NO (depends on Task 3)

  **References**:
  - `src/app/globals.css:45-54` - Current glass variables
  - `src/app/globals.css:394-418` - .btn-more-nav styles
  - `src/app/globals.css:474-492` - .btn-all-nav styles

  **Acceptance Criteria**:
  - [ ] New CSS variables defined in :root
  - [ ] Glass elements use combined backdrop-filter
  - [ ] Shadow controls affect visual appearance
  - [ ] Border radius control works

  **Commit**: YES
  - Message: `feat(services): add comprehensive 18-control glass debug panel with 4 folders`
  - Files: `useAnimationConfig.ts`, `globals.css`
  - Pre-commit: `npm run build`

---

- [ ] 5. Integration Testing

  **What to do**:
  - Full manual QA of all features

  **Swiper Testing**:
  - [ ] Wheel scroll through all 6 slides
  - [ ] Loop 6→1 works
  - [ ] Loop 1→6 works (reverse)
  - [ ] Background video syncs with content
  - [ ] Fast wheel scrolling doesn't deadlock
  - [ ] Touch/swipe works on mobile (DevTools simulation)
  - [ ] Menu popup → select item → correct slide shown
  - [ ] "Learn More" button opens detail popup

  **Glass Panel Testing**:
  - [ ] 4 Leva folders visible (Refraction, Surface, Edge, Shadow)
  - [ ] Blur slider changes backdrop blur
  - [ ] Saturate slider affects vibrancy
  - [ ] Border radius rounds corners
  - [ ] Shadow controls add depth
  - [ ] Inner glow toggle works
  - [ ] Top bevel toggle works
  - [ ] Noise opacity adds grain texture
  - [ ] Blend mode dropdown changes overlay behavior

  **Build Testing**:
  - [ ] `npm run build` succeeds
  - [ ] No TypeScript errors
  - [ ] Production build hides Leva panel

  **Parallelizable**: NO (final verification)

  **Acceptance Criteria**:
  - [ ] All Swiper tests pass
  - [ ] All Glass panel tests pass
  - [ ] Build succeeds

  **Commit**: NO (all commits done in previous tasks)

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 2 | `fix(services): replace Controller module with manual Swiper sync for reliable loop` | BusinessServicesPage.tsx |
| 4 | `feat(services): add comprehensive 18-control glass debug panel with 4 folders` | useAnimationConfig.ts, globals.css |

---

## Success Criteria

### Final Checklist
- [ ] Swiper loop works in both directions
- [ ] No deadlock on fast scrolling
- [ ] Background/content swipers stay synced
- [ ] 18 glass controls in 4 organized folders
- [ ] Real-time CSS variable updates
- [ ] `npm run build` succeeds
- [ ] Production build hides debug panel

---

## Estimated Effort

| Task | Complexity | Est. Time |
|------|------------|-----------|
| 0 - Diagnose | Low | 10 min |
| 1 - Remove Controller | Medium | 30 min |
| 2 - Fix loop edges | Medium | 20 min |
| 3 - Expand glass controls | High | 45 min |
| 4 - Update CSS | Medium | 20 min |
| 5 - Integration test | Low | 15 min |
| **Total** | | **~2.5 hours** |
