"""
Animation Migration Visual Test
Uses Playwright to capture screenshots and verify GSAP animations work correctly.
Based on webapp-testing skill guidelines.
"""
from playwright.sync_api import sync_playwright
import os
import time

OUTPUT_DIR = "test-screenshots"

def test_animations():
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        
        # Enable console logging
        page.on("console", lambda msg: print(f"Browser: {msg.text}"))
        
        print("🌐 Navigating to http://localhost:3000...")
        page.goto("http://localhost:3000", timeout=30000)
        page.wait_for_load_state("networkidle")
        time.sleep(2)  # Wait for GSAP animations to initialize
        
        # Screenshot 1: Hero section initial state
        print("📸 Capturing Hero section...")
        page.screenshot(path=f"{OUTPUT_DIR}/01_hero_initial.png", full_page=False)
        
        # Screenshot 2: After scrolling (trigger scroll animations)
        print("📸 Scrolling and capturing animations...")
        page.evaluate("window.scrollBy(0, 500)")
        time.sleep(1)
        page.screenshot(path=f"{OUTPUT_DIR}/02_hero_scrolled.png")
        
        # Screenshot 3: Capabilities section
        print("📸 Scrolling to Capabilities section...")
        page.evaluate("window.scrollBy(0, 1500)")
        time.sleep(1.5)
        page.screenshot(path=f"{OUTPUT_DIR}/03_capabilities.png")
        
        # Screenshot 4: Stats section
        print("📸 Scrolling to Stats section...")
        page.evaluate("window.scrollBy(0, 1000)")
        time.sleep(1.5)
        page.screenshot(path=f"{OUTPUT_DIR}/04_stats.png")
        
        # Screenshot 5: Certifications Gallery
        print("📸 Scrolling to Certifications...")
        page.evaluate("window.scrollBy(0, 1000)")
        time.sleep(1)
        page.screenshot(path=f"{OUTPUT_DIR}/05_certifications.png")
        
        # Screenshot 6: Full page
        print("📸 Capturing full page...")
        page.screenshot(path=f"{OUTPUT_DIR}/06_full_page.png", full_page=True)
        
        # Test header hover (desktop nav)
        print("📸 Testing header navigation...")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)
        
        # Try to hover on nav items
        nav_item = page.locator("text=ABOUT US").first
        if nav_item.is_visible():
            nav_item.hover()
            time.sleep(1)
            page.screenshot(path=f"{OUTPUT_DIR}/07_nav_dropdown.png")
        
        # Mobile view test
        print("📸 Testing mobile viewport...")
        page.set_viewport_size({"width": 390, "height": 844})
        page.reload()
        page.wait_for_load_state("networkidle")
        time.sleep(1)
        page.screenshot(path=f"{OUTPUT_DIR}/08_mobile_hero.png")
        
        # Mobile scroll
        page.evaluate("window.scrollBy(0, 800)")
        time.sleep(1)
        page.screenshot(path=f"{OUTPUT_DIR}/09_mobile_content.png")
        
        browser.close()
        
    print(f"\n✅ Test complete! Screenshots saved to {OUTPUT_DIR}/")
    print("Review screenshots to verify animations work correctly.")

if __name__ == "__main__":
    test_animations()
