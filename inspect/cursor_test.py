import asyncio, json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":1440,"height":900})
        pg = await ctx.new_page()
        errs=[]
        pg.on("console", lambda m: errs.append((m.type,m.text)) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))
        for url in ["/", "/portfolio", "/resume"]:
            await pg.goto("http://localhost:5173"+url, wait_until="networkidle")
            await pg.wait_for_timeout(1500)
            res = await pg.evaluate("""() => {
              const pick = (sel) => { const el = document.querySelector(sel); if(!el) return null;
                return { sel, cursor: getComputedStyle(el).cursor }; };
              return {
                html: getComputedStyle(document.documentElement).cursor,
                body: getComputedStyle(document.body).cursor,
                link: pick('a'),
                button: pick('button'),
                para: pick('p'),
                heading: pick('h1, h2'),
              };
            }""")
            print(url, json.dumps(res, indent=None))
        # are the cursor images actually served?
        for f in ["hand-fist-32.png","hand-point-32.png","hand-three-32.png"]:
            r = await pg.request.get("http://localhost:5173/cursors/"+f)
            print(f, r.status, len(await r.body()), "bytes")
        print("console errors:", errs)
        await b.close()
asyncio.run(main())
