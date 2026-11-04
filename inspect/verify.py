import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={"width":1440,"height":950})
        await pg.goto("http://localhost:5173/portfolio", wait_until="networkidle"); await pg.wait_for_timeout(1500)
        for y in range(0,9000,500):
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(90)
        for name,y in [("v_art",3350),("v_guar",4050)]:
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(600)
            await pg.screenshot(path=f"/home/user/inspect/{name}.png")
        # overlap audit: any text node covered by an absolutely/fixed positioned sibling?
        report = await pg.evaluate("""() => {
          const out = [];
          const sel = 'p, h1, h2, h3, span, a, button, li';
          const els = [...document.querySelectorAll(sel)].filter(e => {
            const cs = getComputedStyle(e);
            if (cs.position === 'absolute' || cs.position === 'fixed') return false;
            const r = e.getBoundingClientRect();
            return r.width > 4 && r.height > 4 && e.innerText && e.innerText.trim().length > 2;
          });
          const decos = [...document.querySelectorAll('*')].filter(e => {
            const cs = getComputedStyle(e);
            return (cs.position === 'absolute' || cs.position === 'fixed') && !e.innerText?.trim().length;
          });
          const hits = new Set();
          for (const t of els) {
            const a = t.getBoundingClientRect();
            for (const d of decos) {
              const b = d.getBoundingClientRect();
              if (b.width < 8 || b.height < 8) continue;
              const ox = Math.min(a.right,b.right)-Math.max(a.left,b.left);
              const oy = Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
              if (ox > 8 && oy > 8) {
                // ignore full-bleed background layers that are behind everything
                const z = getComputedStyle(d).zIndex;
                if (z === 'auto' || Number(z) < 1) continue;
                hits.add(`${t.tagName}:${(t.innerText||'').slice(0,30).replace(/\\n/g,' ')} <= ${d.className.toString().slice(0,60)}`);
              }
            }
          }
          return [...hits].slice(0, 25);
        }""")
        print("POSSIBLE OVERLAPS:", len(report))
        for r in report: print("  -", r)
        await b.close()
asyncio.run(main())
