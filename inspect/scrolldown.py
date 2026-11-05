import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        c=await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True, device_scale_factor=2)
        pg=await c.new_page()
        await pg.goto("http://localhost:5173/", wait_until="networkidle"); await pg.wait_for_timeout(2200)
        await pg.evaluate("window.scrollTo(0, 1100)"); await pg.wait_for_timeout(900)
        await pg.screenshot(path="/home/user/inspect/phone_cover2.png")
        h=await pg.evaluate("document.body.scrollHeight"); print("mobile cover height", h)
        await b.close()
asyncio.run(main())
