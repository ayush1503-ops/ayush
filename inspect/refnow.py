import asyncio, hashlib
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        await pg.goto("https://uimaven.art/home/", wait_until="networkidle", timeout=90000)
        await pg.wait_for_timeout(5000)
        await pg.screenshot(path="/home/user/inspect/ref_now.png")
        html = await pg.content()
        print("html bytes", len(html), "sha", hashlib.sha1(html.encode()).hexdigest()[:10])
        await b.close()
asyncio.run(main())
