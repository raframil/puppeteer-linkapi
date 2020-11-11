const puppeteer = require('puppeteer');

const run = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    await page.screenshot({ path: 'example1.png' });
    await browser.close();
}

run();