import asyncio, json, re
from playwright.async_api import async_playwright
URL = "https://uimaven.art/home/"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":1440,"height":900})
        pg = await ctx.new_page()
        reqs=[]
        pg.on("request", lambda r: reqs.append(r.url))
        await pg.goto(URL, wait_until="networkidle", timeout=90000)
        await pg.wait_for_timeout(6000)
        # structure dump
        info = await pg.evaluate("""() => {
          const out=[];
          const walk=(el,d)=>{ if(d>6) return;
            for(const c of el.children){
              const t=c.tagName.toLowerCase();
              if(['script','style','template'].includes(t)) continue;
              const r=c.getBoundingClientRect();
              const cs=getComputedStyle(c);
              out.push('  '.repeat(d)+`<${t} class="${(c.className&&c.className.toString().slice(0,120))||''}" id="${c.id||''}" @${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} bg=${cs.backgroundColor} color=${cs.color} font=${cs.fontFamily.split(',')[0]} ${cs.fontSize}/${cs.fontWeight} pos=${cs.position}>` + (c.children.length===0?(' TEXT: '+(c.textContent||'').trim().slice(0,80)):''));
              walk(c,d+1);
            }};
          walk(document.body,0);
          return out.join('\\n');
        }""")
        open("/home/user/inspect/tree.txt","w").write(info)
        print(info[:8000])
        # fonts / css vars
        styles = await pg.evaluate("""() => {
          const cs=getComputedStyle(document.body);
          const root=getComputedStyle(document.documentElement);
          const vars=[];
          for(const sheet of document.styleSheets){
            try{ for(const rule of sheet.cssRules){ if(rule.cssText.startsWith(':root')||rule.cssText.includes('--color-primary')) vars.push(rule.cssText.slice(0,4000)); } }catch(e){}
          }
          return {body:{font:cs.fontFamily, color:cs.color, bg:cs.backgroundColor}, vars: vars.slice(0,10)};
        }""")
        print(json.dumps(styles)[:4000])
        imgs = await pg.evaluate("() => [...document.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src, w:i.naturalWidth,h:i.naturalHeight, cls:i.className, alt:i.alt}))")
        print(json.dumps(imgs, indent=1)[:4000])
        open("/home/user/inspect/reqs.txt","w").write("\n".join(sorted(set(reqs))))
        svgs = await pg.evaluate("() => document.querySelectorAll('svg').length")
        print("svg count", svgs, "imgs", len(imgs))
        await b.close()
asyncio.run(main())
