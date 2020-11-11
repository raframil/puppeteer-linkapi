require('dotenv').config()
const puppeteer = require('puppeteer');

const run = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage()
        await page.goto('https://platform.linkapi.solutions/packages/components')

        await page.setViewport({ width: 1920, height: 1080 })

        const RANDOM_DELAY = Math.floor(Math.random() * 50) + 30;

        await page.waitForSelector('#emailInput')
        await page.type('#emailInput', process.env.EMAIL, { delay: RANDOM_DELAY })

        await page.waitForSelector('#passwordInput')
        await page.type('#passwordInput', process.env.PASSWORD, { delay: RANDOM_DELAY })

        await page.waitForSelector('.row > .col-12 > login > .ng-dirty > .lkp-btn')
        await page.click('.row > .col-12 > login > .ng-dirty > .lkp-btn')

        await page.waitForSelector('.banner')
        await page.goto('https://platform.linkapi.solutions/packages/components')

        await page.waitForSelector('.lkp-cards-grid > component-card > .lkp-card > .lkp-clickable')
        const results = await page.evaluate(() => {
            let components = []
            const componentsElements = document.querySelectorAll('.lkp-cards-grid > component-card > .lkp-card > .lkp-clickable');
            componentsElements.forEach((component) => {
                components.push(component.querySelector('.lkp-truncate').innerText)
            });
            return components
        });

        await browser.close()
        return results
    } catch (error) {
        console.log(error)
    }
}

run();
