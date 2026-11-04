import asyncio
from playwright.async_api import async_playwright
# composite a demo image: the three states at their real size over the site colours
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":900,"height":260}, device_scale_factor=2)
        html = """<html><body style="margin:0;font-family:Jost,sans-serif;background:#f3670e">
        <div style="display:flex;height:260px">
          <div style="flex:1;display:grid;place-items:center;border-right:3px solid #000;background:#f3670e">
            <div style="text-align:center">
              <img src="/cursors/hand-fist-32.png" style="width:32px;height:32px;image-rendering:auto">
              <p style="font-weight:900;text-transform:uppercase;letter-spacing:.08em;font-size:13px;margin:14px 0 2px">default</p>
              <p style="font-size:11px;text-transform:uppercase;letter-spacing:.06em">fist · over the page</p>
            </div>
          </div>
          <div style="flex:1;display:grid;place-items:center;border-right:3px solid #000;background:#ffd31e">
            <div style="text-align:center">
              <img src="/cursors/hand-point-32.png" style="width:32px;height:32px">
              <p style="font-weight:900;text-transform:uppercase;letter-spacing:.08em;font-size:13px;margin:14px 0 2px">hover</p>
              <p style="font-size:11px;text-transform:uppercase;letter-spacing:.06em">point · links &amp; buttons</p>
            </div>
          </div>
          <div style="flex:1;display:grid;place-items:center;background:#4b6aff">
            <div style="text-align:center;color:#fff">
              <img src="/cursors/hand-three-32.png" style="width:32px;height:32px">
              <p style="font-weight:900;text-transform:uppercase;letter-spacing:.08em;font-size:13px;margin:14px 0 2px">active</p>
              <p style="font-size:11px;text-transform:uppercase;letter-spacing:.06em">three · on press</p>
            </div>
          </div>
        </div></body></html>"""
        await pg.set_content(html)
        # inline the images (set_content has no origin)
        import base64, pathlib
        for n in ["hand-fist-32.png","hand-point-32.png","hand-three-32.png"]:
            data = base64.b64encode(pathlib.Path("/home/user/ayush-portfolio/public/cursors/"+n).read_bytes()).decode()
            await pg.evaluate("([n,d]) => { document.querySelectorAll('img').forEach(i => { if (i.src.includes(n)) i.src = 'data:image/png;base64,'+d; }); }", [n, data])
        await pg.wait_for_timeout(400)
        await pg.screenshot(path="/home/user/cursor-states.png")
        await b.close()
asyncio.run(main())
