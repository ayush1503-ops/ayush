import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1440,"height":900})
        for u in ["/","/portfolio","/resume"]:
            await pg.goto("http://localhost:5173"+u, wait_until="networkidle"); await pg.wait_for_timeout(1500)
            h=await pg.evaluate("document.body.scrollHeight")
            # biggest rendered font on the page
            mx=await pg.evaluate("""() => Math.max(...[...document.querySelectorAll('h1,h2,h3,p,span')].map(e=>parseFloat(getComputedStyle(e).fontSize)))""")
            print(f"{u:12} page height {h:5}px   largest font {mx}px")
        await b.close()
asyncio.run(main())
