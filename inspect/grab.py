import asyncio, json
from playwright.async_api import async_playwright

URL = "https://uimaven.art/home/"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":1440,"height":900}, device_scale_factor=1)
        pg = await ctx.new_page()
        await pg.goto(URL, wait_until="networkidle", timeout=90000)
        await pg.wait_for_timeout(6000)
        await pg.screenshot(path="/home/user/inspect/desk_top.png")
        html = await pg.content()
        open("/home/user/inspect/dom.html","w").write(html)
        # scroll and capture
        h = await pg.evaluate("document.body.scrollHeight")
        print("scrollHeight", h)
        await pg.wait_for_timeout(500)
        for i in range(0, 8):
            await pg.evaluate(f"window.scrollBy(0,{500})")
            await pg.wait_for_timeout(300)
        print("after scroll h", await pg.evaluate("document.documentElement.scrollHeight"))
        print("body classes", await pg.evaluate("document.body.className"))
        print("url", pg.url)
        await b.close()

asyncio.run(main())
