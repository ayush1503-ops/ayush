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
        # keyboard: tab through cover, press Enter
        await pg.goto(BASE+"/", wait_until="networkidle"); await pg.wait_for_timeout(2300)
        for _ in range(4): await pg.keyboard.press("Tab")
        await pg.keyboard.press("Enter"); await pg.wait_for_timeout(1600)
        print("after keyboard Enter:", pg.url)
        await pg.screenshot(path="/home/user/inspect/qa_port.png")
        # case study via keyboard on first cartridge
        await pg.click("button:has-text('THE PASHA ATELIER')"); await pg.wait_for_timeout(800)
        open_ = await pg.locator("[role=dialog]").count(); print("dialog open:", open_)
        await pg.keyboard.press("Escape"); await pg.wait_for_timeout(400)
        print("dialog after esc:", await pg.locator("[role=dialog]").count())
        # reduced motion
        ctx2=await b.new_context(viewport={"width":1440,"height":900}, reduced_motion="reduce")
        p2=await ctx2.new_page(); await p2.goto(BASE+"/resume", wait_until="networkidle"); await p2.wait_for_timeout(1200)
        await p2.screenshot(path="/home/user/inspect/qa_resume_rm.png")
        print("errors:", errs[:5])
        await b.close()
asyncio.run(main())
