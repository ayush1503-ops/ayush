import asyncio, pathlib
from playwright.async_api import async_playwright

CUR = pathlib.Path('/home/user/ayush-portfolio/public/cursors')

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 48, "height": 48})
        for name in ["fist", "point", "three"]:
            svg = (CUR / f"{name}.svg").read_text()
            await pg.set_content("<html><body style='margin:0;background:transparent'>" + svg + "</body></html>")
            await pg.wait_for_timeout(100)
            for size in (48, 32):
                await pg.set_viewport_size({"width": size, "height": size})
                await pg.evaluate("(s)=>{const el=document.querySelector('svg');el.setAttribute('width',s);el.setAttribute('height',s);}", size)
                out = CUR / f"hand-{name}-{size}.png"
                await pg.screenshot(path=str(out), omit_background=True)
                print(out.name, out.stat().st_size, "bytes")
        await b.close()

asyncio.run(main())
