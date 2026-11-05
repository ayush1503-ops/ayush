import asyncio, sys
from playwright.async_api import async_playwright
BASE="http://localhost:5173"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        errs=[]
        pg.on("console", lambda m: errs.append(("console",m.type,m.text)) if m.type in ("error","warning") else None)
        pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))
        for name,url,hover in [("cover","/",False),("cover_hover","/",True),("portfolio","/portfolio",False),("resume","/resume",False)]:
            await pg.goto(BASE+url, wait_until="networkidle")
            await pg.wait_for_timeout(2600)
            if hover:
                await pg.mouse.move(1150,150); await pg.wait_for_timeout(900)
            await pg.screenshot(path=f"/home/user/inspect/m_{name}.png", full_page=(name=="resume"))
            if name=="portfolio":
                await pg.evaluate("window.scrollTo(0,900)"); await pg.wait_for_timeout(1200)
                await pg.screenshot(path="/home/user/inspect/m_portfolio_s2.png")
                await pg.evaluate("window.scrollTo(0,2000)"); await pg.wait_for_timeout(1200)
                await pg.screenshot(path="/home/user/inspect/m_portfolio_s3.png")
        print("ISSUES:", *errs[:20], sep="\n")
        await b.close()
asyncio.run(main())
