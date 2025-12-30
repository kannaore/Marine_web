from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import os
import re
import sys

BASE_URL = os.getenv("BASE_URL", "http://localhost:3000")
OUTPUT_DIR = "./test-screenshots"

PAGES = [
    "/",
    "/ko",
    "/en",
    "/ko/test",
    "/en/test",
    "/ko/about",
    "/en/about",
    "/ko/services",
    "/en/services",
    "/ko/assets",
    "/en/assets",
    "/ko/performance",
    "/en/performance",
    "/ko/careers",
    "/en/careers",
    "/ko/contact",
    "/en/contact",
    "/ko/sustainability",
    "/en/sustainability",
]

DYNAMIC_PAGES = [
    "/ko/about/greeting",
    "/ko/services/hydrographic-survey",
    "/ko/assets/vessels",
    "/ko/performance/key-results",
    "/en/about/greeting",
    "/en/services/hydrographic-survey",
    "/en/assets/vessels",
    "/en/performance/key-results",
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844, "is_mobile": True, "has_touch": True},
}


def safe_name(path: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9]+", "-", path.strip("/"))
    return cleaned if cleaned else "root"


def wait_for_page_ready(page):
    try:
        page.wait_for_load_state("networkidle", timeout=8000)
    except PlaywrightTimeoutError:
        page.wait_for_load_state("domcontentloaded")
        page.wait_for_timeout(500)


def visit(page, path, label, status_errors, console_errors, page_errors):
    url = f"{BASE_URL}{path}"
    response = page.goto(url, wait_until="domcontentloaded")
    wait_for_page_ready(page)
    page.wait_for_timeout(400)

    status = response.status if response else None
    if status and status >= 400:
        status_errors.append(f"{label} {path} -> HTTP {status}")

    screenshot_path = os.path.join(OUTPUT_DIR, f"{label}_{safe_name(path)}.png")
    page.screenshot(path=screenshot_path, full_page=True)
    return page.url


def main() -> int:
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    status_errors = []
    console_errors = []
    page_errors = []
    visited = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for viewport_name, viewport in VIEWPORTS.items():
            context = browser.new_context(
                viewport={"width": viewport["width"], "height": viewport["height"]},
                is_mobile=viewport.get("is_mobile", False),
                has_touch=viewport.get("has_touch", False),
            )

            for path in PAGES + DYNAMIC_PAGES:
                page = context.new_page()

                def handle_console(msg, page_path=path, vp=viewport_name):
                    if msg.type in ("error", "warning"):
                        console_errors.append(f"[{vp}] {page_path} :: {msg.type} :: {msg.text}")

                def handle_page_error(err, page_path=path, vp=viewport_name):
                    page_errors.append(f"[{vp}] {page_path} :: {err}")

                page.on("console", handle_console)
                page.on("pageerror", handle_page_error)

                final_url = visit(page, path, viewport_name, status_errors, console_errors, page_errors)
                visited.append(f"[{viewport_name}] {path} -> {final_url}")

                page.close()

            context.close()

        browser.close()

    report_path = os.path.join(OUTPUT_DIR, "smoke_report.txt")
    with open(report_path, "w", encoding="utf-8") as report:
        report.write("Visited URLs:\n")
        report.write("\n".join(visited))
        report.write("\n\nStatus Errors:\n")
        report.write("\n".join(status_errors) or "None")
        report.write("\n\nConsole Errors/Warnings:\n")
        report.write("\n".join(console_errors) or "None")
        report.write("\n\nPage Errors:\n")
        report.write("\n".join(page_errors) or "None")

    print(f"Visited {len(visited)} pages across {len(VIEWPORTS)} viewports.")
    print(f"Status errors: {len(status_errors)}")
    print(f"Console errors/warnings: {len(console_errors)}")
    print(f"Page errors: {len(page_errors)}")
    print(f"Report saved to: {report_path}")

    if status_errors or page_errors:
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
