import asyncio
from playwright.async_api import async_playwright
BASE="http://localhost:5173"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for label,vp,mob in [("phone",{"width":390,"height":844},True),("tab",{"width":820,"height":900},True)]:
            ctx=await b.new_context(viewport=vp, is_mobile=mob, has_touch=True, device_scale_factor=2)
            pg=await ctx.new_page()
            for name,url in [("cover","/"),("portfolio","/portfolio")]:
                await pg.goto(BASE+url, wait_until="networkidle")
                await pg.wait_for_timeout(2400)
                await pg.screenshot(path=f"/home/user/inspect/{label}_{name}.png")
            await ctx.close()
        await b.close()
asyncio.run(main())
