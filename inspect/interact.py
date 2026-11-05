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
        await pg.goto(BASE+"/", wait_until="networkidle")
        await pg.wait_for_timeout(900)
        await pg.screenshot(path="/home/user/inspect/i_boot.png")
        await pg.wait_for_timeout(2200)
        # click portfolio tab -> navigates to /portfolio
        await pg.mouse.click(995,200)
        await pg.wait_for_timeout(1400)
        print("url after tab click:", pg.url)
        await pg.screenshot(path="/home/user/inspect/i_zip.png")
        await pg.wait_for_timeout(1500)
        print("url:", pg.url)
        # open a case study
        await pg.mouse.click(700,380)
        await pg.wait_for_timeout(900)
        await pg.screenshot(path="/home/user/inspect/i_case.png")
        await pg.keyboard.press("Escape")
        await pg.wait_for_timeout(500)
        # resume via toolbar
        await pg.click("text=Résumé")
        await pg.wait_for_timeout(2200)
        print("url:", pg.url)
        await pg.screenshot(path="/home/user/inspect/i_resume.png")
        # home
        await pg.click("header a")
        await pg.wait_for_timeout(2200)
        print("url:", pg.url)
        print("ERRS:", *errs[:10], sep="\n")
        await b.close()
asyncio.run(main())
