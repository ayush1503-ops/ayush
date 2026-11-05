import asyncio
from playwright.async_api import async_playwright
BASE="http://localhost:5173"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        errs=[]
        pg.on("console", lambda m: errs.append((m.type,m.text)) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))
        await pg.goto(BASE+"/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(2200)
        for i,y in enumerate([2600,4200,5600,7000]):
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(1100)
            await pg.screenshot(path=f"/home/user/inspect/f_port_{i}.png")
        h=await pg.evaluate("document.body.scrollHeight"); print("portfolio height",h)
        await pg.goto(BASE+"/resume", wait_until="networkidle"); await pg.wait_for_timeout(1800)
        await pg.screenshot(path="/home/user/inspect/f_resume_top.png")
        print("ERRS", errs[:8])
        # tablet
        c2=await b.new_context(viewport={"width":820,"height":1000}, is_mobile=True, has_touch=True)
        p2=await c2.new_page()
        await p2.goto(BASE+"/portfolio", wait_until="networkidle"); await p2.wait_for_timeout(2000)
        await p2.screenshot(path="/home/user/inspect/f_tab_port.png")
        await p2.goto(BASE+"/resume", wait_until="networkidle"); await p2.wait_for_timeout(1600)
        await p2.screenshot(path="/home/user/inspect/f_tab_resume.png")
        await b.close()
asyncio.run(main())
