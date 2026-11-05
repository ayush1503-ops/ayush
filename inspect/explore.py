import asyncio
from playwright.async_api import async_playwright
URL="https://uimaven.art/home/"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        await pg.goto(URL, wait_until="networkidle", timeout=90000)
        await pg.wait_for_timeout(5000)
        await pg.mouse.move(1180,150); await pg.wait_for_timeout(1200)
        await pg.screenshot(path="/home/user/inspect/s_hero_hover.png")
        # scroll a lot
        for i in range(6):
            await pg.mouse.wheel(0,600); await pg.wait_for_timeout(400)
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path="/home/user/inspect/s_after_wheel.png")
        print("url after wheel", pg.url, await pg.evaluate("document.documentElement.scrollHeight"))
        # look for tab labels in canvas: none. try clicking near tabs
        await pg.mouse.click(928,131); await pg.wait_for_timeout(2000)
        await pg.screenshot(path="/home/user/inspect/s_click_resume.png")
        print("url after click", pg.url)
        for r in ["/","/portfolio","/about","/resume","/contact","/case-study"]:
            try:
                resp=await pg.request.get("https://uimaven.art"+r)
                print(r, resp.status, len(await resp.text()))
            except Exception as e: print(r,"err",e)
        await b.close()
asyncio.run(main())
