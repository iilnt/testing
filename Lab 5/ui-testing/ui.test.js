import puppeteer from 'puppeteer'

describe('Rozetka TV Page UI Tests', () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true })
        page = await browser.newPage()
        await page.goto('https://rozetka.com.ua/ua/all-tv/c80037/', {
            waitUntil: 'networkidle2',
        })
    }, 30000)

    afterAll(async () => {
        await browser.close()
    })

    test('Page should have correct title', async () => {
        const title = await page.title()
        expect(title).toContain('Телевізори')
    })

    test('Product layout should be present', async () => {
        const layout = await page.$('.layout')
        expect(layout).not.toBeNull()
    })

    test('Should display some products', async () => {
        const products = await page.$$('.tile')
        expect(products.length).toBeGreaterThan(0)
    })

    test('Filter should be available and clickable', async () => {
        const filterToggle = await page.$('.setting-filter-button')
        expect(filterToggle).not.toBeNull()
        await filterToggle.click()
        await new Promise(res => setTimeout(res, 3000))
    })

    test('Sorting by price should change order', async () => {
        await page.select('select.select-css', '1') // 1 = за зростанням ціни
        await new Promise(res => setTimeout(res, 3000))

        const prices = await page.$$eval('.catalog-grid .goods-tile__price-value', els =>
            els.map(el => parseInt(el.textContent.replace(/\D/g, ''), 10)).filter(Boolean)
        )
        const sortedPrices = [...prices].sort((a, b) => a - b)

        expect(prices.slice(0, 3)).toEqual(sortedPrices.slice(0, 3))
    })
})
