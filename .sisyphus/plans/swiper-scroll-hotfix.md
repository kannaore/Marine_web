# Swiper Scroll Hotfix

## Root Cause (Oracle Analysis)

**Problem**: Mixing `slideNext()`/`slidePrev()` (duplicate space) with `slideToLoop(realIndex)` (real space) causes loop bookkeeping conflicts.

**Symptoms**:
- Can't reach end of slides
- Loop doesn't work
- Chaotic behavior

---

## Fix Strategy

**ONE canonical approach**: Always navigate in **realIndex space** using `slideToLoop()`.

---

## TODOs

- [ ] 1. Replace slideNext/slidePrev with slideToLoop in handleWheel

  **What to do**:
  Replace the current wheel handler logic:
  
  ```tsx
  // BEFORE (broken)
  if (wheelAccum.current > 0) {
      dataSwiper?.slideNext();
  } else {
      dataSwiper?.slidePrev();
  }
  ```
  
  With realIndex-based navigation:
  
  ```tsx
  // AFTER (fixed)
  const currentReal = dataSwiper?.realIndex ?? 0;
  const totalSlides = servicesData.length; // 6
  let nextIndex: number;
  
  if (wheelAccum.current > 0) {
      nextIndex = (currentReal + 1) % totalSlides;
  } else {
      nextIndex = (currentReal - 1 + totalSlides) % totalSlides;
  }
  
  dataSwiper?.slideToLoop(nextIndex, swiperSpeed);
  ```

  **Acceptance Criteria**:
  - [ ] No slideNext/slidePrev calls in handleWheel
  - [ ] Uses modulo arithmetic for infinite loop

---

- [ ] 2. Add syncLock to prevent ping-pong corrections

  **What to do**:
  Add a ref to prevent re-entrant sync:
  
  ```tsx
  const syncLock = useRef(false);
  
  const handleSlideChange = useCallback((swiper: SwiperType) => {
      const newIndex = swiper.realIndex;
      console.log('[Swiper] SlideChange:', { realIndex: newIndex });
      setActiveIndex(newIndex);
      
      // Prevent re-entrant sync
      if (syncLock.current) return;
      
      if (bgSwiper && bgSwiper.realIndex !== newIndex) {
          syncLock.current = true;
          bgSwiper.slideToLoop(newIndex, swiperSpeed);
          // Release lock after transition
          setTimeout(() => { syncLock.current = false; }, swiperSpeed + 50);
      }
  }, [bgSwiper, swiperSpeed]);
  ```

  **Acceptance Criteria**:
  - [ ] syncLock ref added
  - [ ] Lock set before bgSwiper.slideToLoop
  - [ ] Lock released after swiperSpeed timeout

---

- [ ] 3. Guard wheel handler with initialization check

  **What to do**:
  Add early return at start of handleWheel:
  
  ```tsx
  const handleWheel = useCallback((e: WheelEvent) => {
      // Guard: ensure Swiper is ready
      if (!dataSwiper?.initialized || !bgSwiper?.initialized) {
          return;
      }
      
      // Block during transition or when popups are open
      if (dataSwiper.animating || isMenuOpen || isDetailOpen) {
          // ... existing code
      }
      // ... rest of handler
  }, [dataSwiper, bgSwiper, /* other deps */]);
  ```

  **Acceptance Criteria**:
  - [ ] Checks dataSwiper?.initialized
  - [ ] Checks bgSwiper?.initialized

---

- [ ] 4. Reduce loopAdditionalSlides

  **What to do**:
  Change from `loopAdditionalSlides={6}` to `loopAdditionalSlides={1}`:
  
  ```tsx
  <Swiper
      speed={swiperSpeed}
      loop={true}
      loopAdditionalSlides={1}  // was 6
      // ...
  >
  ```
  
  Apply to BOTH Swipers.

  **Acceptance Criteria**:
  - [ ] Both Swipers have loopAdditionalSlides={1}

---

- [ ] 5. Update "Scroll to explore" button

  **What to do**:
  The button currently uses slideNext(), change to slideToLoop:
  
  ```tsx
  // BEFORE
  <button onClick={() => dataSwiper?.slideNext()}>
  
  // AFTER
  <button onClick={() => {
      const next = ((dataSwiper?.realIndex ?? 0) + 1) % servicesData.length;
      dataSwiper?.slideToLoop(next, swiperSpeed);
  }}>
  ```

  **Acceptance Criteria**:
  - [ ] Button uses slideToLoop instead of slideNext

---

- [ ] 6. Test and verify

  **Verification**:
  - [ ] Wheel scroll through all 6 slides
  - [ ] Loop 6→1 works
  - [ ] Loop 1→6 works (reverse)
  - [ ] Fast scrolling doesn't cause stuck state
  - [ ] Background/content stay in sync
  - [ ] npm run build passes

---

## Commit

After all fixes:
```
fix(services): use slideToLoop consistently to fix loop navigation

- Replace slideNext/slidePrev with realIndex-based slideToLoop
- Add syncLock to prevent ping-pong sync corrections
- Guard wheel handler with initialization check
- Reduce loopAdditionalSlides from 6 to 1
```
