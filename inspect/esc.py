import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(1800)
        await pg.click("button:has-text('THE PASHA ATELIER')"); await pg.wait_for_timeout(900)
        print("open", await pg.locator("[role=dialog]").count())
        await pg.keyboard.press("Escape"); await pg.wait_for_timeout(1200)
        print("after esc", await pg.locator("[role=dialog]").count())
        # also test clicking backdrop
        await pg.click("button:has-text('THE PASHA ATELIER')"); await pg.wait_for_timeout(700)
        await pg.mouse.click(30,450); await pg.wait_for_timeout(1200)
        print("after backdrop", await pg.locator("[role=dialog]").count())
        await b.close()
asyncio.run(main())
