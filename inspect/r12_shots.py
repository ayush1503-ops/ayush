import asyncio
from playwright.async_api import async_playwright
URL = "http://localhost:5173"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1440,"height":900}, device_scale_factor=1)
        await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1500)
        await pg.screenshot(path="inspect/r12_home.png")
        await pg.goto(URL+"/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(1500)
        await pg.screenshot(path="inspect/r12_portfolio.png")
        for tab in ["About","Rates","FAQ","Contact"]:
            await pg.get_by_role("button", name=tab, exact=True).click(); await pg.wait_for_timeout(500)
            await pg.screenshot(path=f"inspect/r12_tab_{tab.lower()}.png")
        await pg.goto(URL+"/resume", wait_until="networkidle"); await pg.wait_for_timeout(1200)
        await pg.screenshot(path="inspect/r12_resume.png")
        # mobile
        pg2 = await b.new_page(viewport={"width":390,"height":844})
        for u,n in [("/","home"),("/portfolio","portfolio"),("/resume","resume")]:
            await pg2.goto(URL+u, wait_until="networkidle"); await pg2.wait_for_timeout(1200)
            await pg2.screenshot(path=f"inspect/r12_m_{n}.png")
        await b.close()
asyncio.run(main())
