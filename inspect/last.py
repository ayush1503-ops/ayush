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
        await pg.goto(BASE+"/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(2000)
        await pg.hover("li:nth-child(1) > button >> nth=0")
        await pg.wait_for_timeout(600)
        await pg.screenshot(path="/home/user/inspect/z_hover.png", clip={"x":430,"y":180,"width":940,"height":520})
        # filters
        await pg.click("text=3D >> nth=0"); await pg.wait_for_timeout(700)
        await pg.screenshot(path="/home/user/inspect/z_filter.png", clip={"x":430,"y":180,"width":940,"height":520})
        print("errors", errs)
        # mobile case study
        c=await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True)
        p2=await c.new_page()
        await p2.goto(BASE+"/portfolio", wait_until="networkidle"); await p2.wait_for_timeout(1800)
        await p2.tap("text=THE PASHA ATELIER")
        await p2.wait_for_timeout(900)
        await p2.screenshot(path="/home/user/inspect/z_mobile_case.png")
        await p2.goto(BASE+"/resume", wait_until="networkidle"); await p2.wait_for_timeout(1500)
        await p2.screenshot(path="/home/user/inspect/z_mobile_resume.png")
        await b.close()
asyncio.run(main())
