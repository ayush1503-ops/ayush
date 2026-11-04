import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1440,"height":900})
        errs=[]
        pg.on("console", lambda m: errs.append((m.type,m.text)) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))
        for u in ["/","/portfolio","/resume"]:
            await pg.goto("http://localhost:4173"+u, wait_until="networkidle"); await pg.wait_for_timeout(1800)
            t = await pg.title(); print(u, "→", t)
        await pg.goto("http://localhost:4173/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(1800)
        await pg.screenshot(path="/home/user/preview-localhost.png")
        print("errors:", errs)
        await b.close()
asyncio.run(main())
