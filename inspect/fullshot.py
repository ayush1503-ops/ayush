import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        for name,url in [("port","/portfolio"),("res","/resume")]:
            await pg.goto("http://localhost:5173"+url, wait_until="networkidle")
            await pg.wait_for_timeout(1500)
            # trigger all reveals
            for y in range(0, 9000, 500):
                await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(120)
            await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(800)
            await pg.screenshot(path=f"/home/user/inspect/full_{name}.png", full_page=True)
        await b.close()
asyncio.run(main())
