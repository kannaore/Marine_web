"""
webapp-testing 스킬 데모
- Playwright를 사용한 브라우저 자동화 예제
- 해양조사 웹사이트 테스트
"""
from playwright.sync_api import sync_playwright
import os

# 스크린샷 저장 경로
SCREENSHOT_DIR = os.path.dirname(os.path.abspath(__file__))

def test_marine_website():
    """메인 테스트 함수"""
    print("🚀 Playwright 브라우저 자동화 시작...")
    
    with sync_playwright() as p:
        # 브라우저 시작 (headless=True로 백그라운드 실행)
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        try:
            # 1. 페이지 접속
            print("📄 페이지 접속 중...")
            page.goto('http://localhost:3000')
            page.wait_for_load_state('networkidle')
            print("✅ 페이지 로드 완료!")
            
            # 2. 메인 페이지 스크린샷 캡처
            screenshot_path = os.path.join(SCREENSHOT_DIR, 'screenshot_main.png')
            page.screenshot(path=screenshot_path, full_page=True)
            print(f"📸 메인 페이지 스크린샷 저장: {screenshot_path}")
            
            # 3. 페이지 제목 확인
            title = page.title()
            print(f"📝 페이지 제목: {title}")
            
            # 4. 네비게이션 요소 탐색
            print("\n🔍 네비게이션 요소 탐색...")
            nav_links = page.locator('nav a').all()
            print(f"   발견된 네비게이션 링크: {len(nav_links)}개")
            for i, link in enumerate(nav_links[:5]):  # 최대 5개만 출력
                text = link.inner_text()
                if text.strip():
                    print(f"   - 링크 {i+1}: {text.strip()}")
            
            # 5. 버튼 탐색
            print("\n🔘 버튼 요소 탐색...")
            buttons = page.locator('button').all()
            print(f"   발견된 버튼: {len(buttons)}개")
            
            # 6. 이미지 요소 확인
            print("\n🖼️ 이미지 요소 탐색...")
            images = page.locator('img').all()
            print(f"   발견된 이미지: {len(images)}개")
            
            # 7. 콘솔 에러 확인
            print("\n🔧 페이지 상태 확인...")
            errors = []
            page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
            
            # 8. 스크롤 테스트 및 추가 스크린샷
            print("\n📜 스크롤 테스트...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")
            page.wait_for_timeout(500)
            
            screenshot_path2 = os.path.join(SCREENSHOT_DIR, 'screenshot_scrolled.png')
            page.screenshot(path=screenshot_path2)
            print(f"📸 스크롤 후 스크린샷 저장: {screenshot_path2}")
            
            print("\n" + "="*50)
            print("✅ 테스트 완료!")
            print("="*50)
            
        except Exception as e:
            print(f"❌ 에러 발생: {e}")
        finally:
            browser.close()
            print("🔒 브라우저 종료")

if __name__ == "__main__":
    test_marine_website()
