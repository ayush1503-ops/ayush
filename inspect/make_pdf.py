import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        await pg.goto("http://localhost:5173/cv.html", wait_until="networkidle")
        await pg.wait_for_timeout(1200)
        await pg.pdf(path="/home/user/ayush-portfolio/public/ayush-thakur-cv.pdf",
                     format="A4", print_background=True,
                     margin={"top":"0","bottom":"0","left":"0","right":"0"})
        await b.close()
asyncio.run(main())
