import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle")
        await pg.wait_for_timeout(1800)
        btn = pg.locator("button").first
        await btn.hover()
        print("hover   :", await btn.evaluate("el => getComputedStyle(el).cursor"))
        await pg.mouse.down()
        print("pressed :", await btn.evaluate("el => getComputedStyle(el).cursor"))
        await pg.mouse.up()
        # touch device: custom cursors must not be required
        ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True)
        p2 = await ctx.new_page()
        await p2.goto("http://localhost:5173/", wait_until="networkidle")
        await p2.wait_for_timeout(1200)
        print("touch <a>:", await p2.evaluate("() => getComputedStyle(document.querySelector('a')).cursor"))
        print("touch html:", await p2.evaluate("() => getComputedStyle(document.documentElement).cursor"))
        await b.close()
asyncio.run(main())
