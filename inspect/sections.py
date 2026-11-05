import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(1500)
        rows=await pg.evaluate("""() => {
          const shell = document.querySelector('.dense');
          return [...shell.children].map((el,i) => ({i, tag: el.tagName, h: Math.round(el.getBoundingClientRect().height), txt: (el.textContent||'').trim().slice(0,42)}));
        }""")
        for r in rows: print(r)
        await b.close()
asyncio.run(main())
