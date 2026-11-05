import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        await pg.goto("https://uimaven.art/resume/", wait_until="networkidle", timeout=90000)
        await pg.wait_for_timeout(5000)
        await pg.screenshot(path="/home/user/inspect/s_resume.png")
        # mobile
        m=await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True, device_scale_factor=2)
        mp=await m.new_page()
        await mp.goto("https://uimaven.art/home/", wait_until="networkidle", timeout=90000)
        await mp.wait_for_timeout(5000)
        await mp.screenshot(path="/home/user/inspect/s_mobile_cover.png")
        await b.close()
asyncio.run(main())
