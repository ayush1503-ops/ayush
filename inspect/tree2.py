import asyncio, sys
from playwright.async_api import async_playwright
async def main(url, out):
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        await pg.goto(url, wait_until="networkidle", timeout=90000)
        await pg.wait_for_timeout(4000)
        info = await pg.evaluate("""() => {
          const out=[];
          const walk=(el,d)=>{ if(d>14) return;
            for(const c of el.children){
              const t=c.tagName.toLowerCase();
              if(['script','style','template','path','rect','circle'].includes(t)) continue;
              const r=c.getBoundingClientRect();
              const cs=getComputedStyle(c);
              out.push('  '.repeat(d)+`<${t} .${(c.className&&c.className.toString().slice(0,150))||''} @${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} bg=${cs.backgroundColor} sh=${cs.boxShadow.slice(0,60)} ${cs.fontSize}/${cs.fontWeight} ls=${cs.letterSpacing} br=${cs.borderRadius} bd=${cs.border}>` + (c.children.length===0 && (c.textContent||'').trim()?(' TXT: '+(c.textContent||'').trim().slice(0,90)):''));
              walk(c,d+1);
            }};
          walk(document.body,0);
          return out.join('\\n');
        }""")
        open(out,"w").write(info)
        await pg.screenshot(path=out.replace('.txt','.png'), full_page=(url.endswith('/resume/')))
        await b.close()
asyncio.run(main(sys.argv[1], sys.argv[2]))
