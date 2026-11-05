import asyncio
from playwright.async_api import async_playwright
sites = {
 "pasha":"https://thepashaatelier.vercel.app/",
 "games":"https://games-studio-smoky.vercel.app/",
 "pulse":"https://frontented-e-commerce-website-desig.vercel.app/",
 "editing":"https://editing-box-j3as.vercel.app/",
}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":1200,"height":750}, device_scale_factor=1)
        for k,u in sites.items():
            pg=await ctx.new_page()
            try:
                await pg.goto(u, wait_until="networkidle", timeout=60000)
            except Exception as e:
                print(k,"slow",e)
            await pg.wait_for_timeout(3500)
            await pg.screenshot(path=f"/home/user/ayush-portfolio/public/shots/{k}.png")
            print("shot",k, pg.url)
            await pg.close()
        await b.close()
asyncio.run(main())
