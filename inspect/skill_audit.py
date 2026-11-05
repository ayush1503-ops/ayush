import asyncio, json
from playwright.async_api import async_playwright

LUM = """(hex) => {
  const c = hex.match(/\\w\\w/g).map(h => parseInt(h,16)/255).map(v => v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4));
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];
}"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":1440,"height":950})
        pg = await ctx.new_page()
        errs=[]
        pg.on("console", lambda m: errs.append((m.type,m.text)) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))

        for url in ["/", "/portfolio", "/resume"]:
            await pg.goto("http://localhost:5173"+url, wait_until="networkidle")
            await pg.wait_for_timeout(1500)
            res = await pg.evaluate("""() => {
              const parse = s => { const m = s.match(/rgba?\\(([^)]+)\\)/); if(!m) return null;
                const p = m[1].split(',').map(Number); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
              const lum = c => { const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
                return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b); };
              const bgOf = el => { let n = el;
                while (n && n !== document.documentElement) {
                  const c = parse(getComputedStyle(n).backgroundColor);
                  if (c && c.a > 0.85) return c;
                  n = n.parentElement;
                } return {r:243,g:103,b:14,a:1}; };
              const bad = [];
              for (const el of document.querySelectorAll('p,span,h1,h2,h3,h4,li,a,button')) {
                const txt = (el.innerText||'').trim();
                if (!txt || txt.length < 2) continue;
                if (el.children.length) continue;
                const cs = getComputedStyle(el);
                if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.6) continue;
                const fg = parse(cs.color); const bg = bgOf(el);
                if (!fg) continue;
                const L1 = lum(fg), L2 = lum(bg);
                const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
                const size = parseFloat(cs.fontSize);
                const weight = Number(cs.fontWeight);
                const large = size >= 24 || (size >= 18.66 && weight >= 700);
                if (ratio < (large ? 3 : 4.5)) {
                  bad.push({txt: txt.slice(0,32), ratio: +ratio.toFixed(2), size, weight, color: cs.color, bg: `rgb(${bg.r},${bg.g},${bg.b})`});
                }
              }
              const seen = new Set(); const uniq = [];
              for (const b of bad) { const k = b.color+b.bg+b.size; if (seen.has(k)) continue; seen.add(k); uniq.push(b); }
              return uniq.slice(0, 12);
            }""")
            tg = await pg.evaluate("""() => {
              const small = [];
              for (const el of document.querySelectorAll('a,button,[role=button]')) {
                const r = el.getBoundingClientRect();
                if (r.width < 1 || r.height < 1) continue;
                if (getComputedStyle(el).visibility === 'hidden') continue;
                if (r.height < 24 || r.width < 24) small.push({t:(el.innerText||el.getAttribute('aria-label')||'').slice(0,24), w:Math.round(r.width), h:Math.round(r.height)});
              }
              return small.slice(0,12);
            }""")
            print(f"--- {url} ---")
            print("  contrast failures:", json.dumps(res, indent=None) if res else "none")
            print("  targets < 24px  :", json.dumps(tg) if tg else "none")
        print("console errors:", errs)
        await b.close()
asyncio.run(main())
