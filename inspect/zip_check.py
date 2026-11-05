import asyncio
from playwright.async_api import async_playwright
from PIL import Image
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(1200)
        zips = pg.locator("div.h-11.w-full")
        print("zip dividers:", await zips.count())
        for i in range(3):
            el = zips.nth(i)
            y = await el.evaluate("e => e.getBoundingClientRect().top + window.scrollY")
            for tag, off in [("closed", 820), ("mid", 420)]:
                await pg.evaluate("v => window.scrollTo(0, v)", y - off); await pg.wait_for_timeout(600)
                await pg.screenshot(path=f"/tmp/z.png")
                im = Image.open("/tmp/z.png").crop((60, 700, 1380, 860)); im.save(f"/home/user/inspect/zip{i}_{tag}.png")
            print(i, "captured")
        # numeric proof of scroll linkage
        el = zips.nth(0); y = await el.evaluate("e => e.getBoundingClientRect().top + window.scrollY")
        for off in [860, 640, 420, 200]:
            await pg.evaluate("v => window.scrollTo(0, v)", y - off); await pg.wait_for_timeout(450)
            st = await el.evaluate("""e => {
              const t = e.children[1].getBoundingClientRect(), bt = e.children[2].getBoundingClientRect(), s = e.children[3].getBoundingClientRect();
              return {gap: Math.round((bt.top - t.bottom)*10)/10, slider: Math.round(s.left)};
            }""")
            print(f"band at {off}px from viewport bottom → tape gap {st['gap']}px, slider x={st['slider']}")
        await b.close()
asyncio.run(main())
