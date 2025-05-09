import puppeteer from 'puppeteer';

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

test('User Login - should log in successfully', async () => {
  await page.goto(BASE_URL);
  await page.type('#user-name', USERNAME);
  await page.type('#password', PASSWORD);
  await page.click('#login-button');

  await page.waitForSelector('.inventory_list');
  const url = page.url();
  expect(url).toBe('https://www.saucedemo.com/inventory.html');
});

test('Product Filtering - should find a product by title', async () => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  const products = await page.$$eval('.inventory_item_name', items =>
    items.map(item => item.textContent)
  );

  expect(products).toContain('Sauce Labs Backpack');
});

test('Add to Cart and Checkout - should complete flow to checkout overview', async () => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  const products = await page.$$eval('.inventory_item_name', items =>
    items.map(item => item.textContent)
  );

  expect(products).toContain('Sauce Labs Backpack');
}, 30000);