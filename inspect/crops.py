import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={"width":1440,"height":950})
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle")
        await pg.wait_for_timeout(1600)
        for y in range(0, 9000, 500):
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(100)
        for name, y in [("c_missions",1180),("c_arsenal",2150),("c_process",3250),("c_rates",3850),("c_footer",5600)]:
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(700)
            await pg.screenshot(path=f"/home/user/inspect/{name}.png")
        await b.close()
asyncio.run(main())
