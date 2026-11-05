import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1600,"height":1000}, device_scale_factor=1)
        pg=await ctx.new_page()
        errs=[]
        pg.on("console", lambda m: errs.append((m.type,m.text)) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))
        await pg.goto("http://localhost:5173/", wait_until="networkidle"); await pg.wait_for_timeout(2600)
        await pg.screenshot(path="/home/user/preview-cover.png")
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(2000)
        await pg.screenshot(path="/home/user/preview-portfolio.png")
        for y in range(0,9000,500):
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(90)
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(700)
        await pg.screenshot(path="/home/user/preview-portfolio-full.png", full_page=True)
        await pg.goto("http://localhost:5173/resume", wait_until="networkidle"); await pg.wait_for_timeout(1600)
        await pg.screenshot(path="/home/user/preview-resume.png", full_page=True)
        print("errors:", errs[:5])
        await b.close()
asyncio.run(main())
