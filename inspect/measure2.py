import asyncio, sys
from playwright.async_api import async_playwright
URL = "http://localhost:5173"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h, label in [(1440, 900, 'desk'), (390, 844, 'phone')]:
            pg = await b.new_page(viewport={"width": w, "height": h})
            for u in ["/", "/portfolio", "/resume"]:
                await pg.goto(URL + u, wait_until="networkidle"); await pg.wait_for_timeout(1200)
                hh = await pg.evaluate("document.body.scrollHeight")
                hs = await pg.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
                print(f"{label:6}{u:12} height {hh:5}px  hscroll={hs}")
            await pg.close()
        await b.close()
asyncio.run(main())
