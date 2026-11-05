import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("http://localhost:5173/", wait_until="networkidle"); await pg.wait_for_timeout(1200)
        H=await pg.evaluate("document.body.scrollHeight")
        for i,frac in enumerate([0.34,0.42,0.5,0.6,0.72]):
            await pg.evaluate(f"window.scrollTo(0,{int(H*frac)})"); await pg.wait_for_timeout(900)
            await pg.screenshot(path=f"inspect/r12_zip_{i}.png")
        # phone
        pg2=await b.new_page(viewport={"width":390,"height":844})
        await pg2.goto("http://localhost:5173/", wait_until="networkidle"); await pg2.wait_for_timeout(1000)
        await pg2.evaluate("window.scrollTo(0, document.body.scrollHeight*0.55)"); await pg2.wait_for_timeout(700)
        await pg2.screenshot(path="inspect/r12_m_home_mid.png")
        await pg2.evaluate("window.scrollTo(0, document.body.scrollHeight)"); await pg2.wait_for_timeout(700)
        await pg2.screenshot(path="inspect/r12_m_home_end.png")
        await b.close()
asyncio.run(main())
