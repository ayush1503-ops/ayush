import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={"width":794,"height":1123})
        await pg.goto("http://localhost:5173/cv.html", wait_until="networkidle")
        await pg.wait_for_timeout(900)
        h=await pg.evaluate("document.body.scrollHeight")
        print("html height", h)
        await pg.screenshot(path="/home/user/inspect/cv_full.png", full_page=True)
        await b.close()
asyncio.run(main())
