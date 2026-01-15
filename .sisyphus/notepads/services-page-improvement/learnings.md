# Services Page Improvement - Learnings

## 2026-01-15 Task 1: VideoBackground Component

### What Was Done
- Added `thumbnailSrc`, `videoSrc`, `videoSrcMobile` fields to all 6 services in servicesData
- Created `VideoBackground` component with:
  - useState for `hasError` and `isMobile` state
  - useEffect for window resize listener (768px breakpoint)
  - video tag with autoPlay, muted, loop, playsInline attributes
  - onError handler that falls back to ImageBackground
  - Gradient overlay preserved for visual consistency
- Replaced ImageBackground with VideoBackground in Swiper slides

### Resource Mapping
| Service ID | Menu Thumbnail | Video (PC) | Video (Mobile) |
|------------|----------------|------------|----------------|
| 1 | business-menu-visual-1.jpg | business-visual-1.mp4 | - |
| 2 | business-menu-visual-3.jpg | business-visual-3.mp4 | business-visual-3-mo.mp4 |
| 3 | business-menu-visual-4.jpg | business-visual-4.mp4 | business-visual-4-mo.mp4 |
| 4 | business-menu-visual-5.jpg | business-visual-5.mp4 | business-visual-5-mo.mp4 |
| 5 | business-menu-visual-6.jpg | business-visual-6.mp4 | - |
| 6 | business-menu-visual-1.jpg | - (image fallback) | - |

### File Locations
- Videos: `/public/images/services/bg/`
- Thumbnails: `/public/images/services/menu/`
- Main component: `marine-web-app/src/components/sections/business/BusinessServicesPage.tsx`

### Build Status
- `npm run build` - SUCCESS

### Pre-existing Code Discoveries
- `loopAdditionalSlides: 1` was already applied to both Swipers (Task 2 may be partially done)
- `BusinessMenuPopup` already had `thumbnailSrc` field in interface and conditional rendering
- `BusinessDetailPopup` already had `imageSrc` conditional rendering
- `globals.css` already had blur(40px) for menu popup and blur(30px) for detail popup
