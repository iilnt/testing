const puppeteer = require('puppeteer');

describe('UI Tests - JSONPlaceholder Website', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('https://jsonplaceholder.typicode.com');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should load homepage with correct title', async () => {
    const title = await page.title();
    expect(title).toBe('JSONPlaceholder - Free Fake REST API');
  });

  test('should display main heading', async () => {
    const heading = await page.$eval('h1', el => el.textContent);
    expect(heading).toMatch(/JSONPlaceholder/i);
  });

  test('should have link to /posts', async () => {
    const hrefs = await page.$$eval('a', links => links.map(link => link.getAttribute('href')));
    expect(hrefs).toContain('/posts');
  });

  test('should navigate to /posts page when link is clicked', async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click('a[href="/posts"]'),
    ]);
    expect(page.url()).toBe('https://jsonplaceholder.typicode.com/posts');
  });

  test('should display JSON response on /posts page', async () => {
    const content = await page.$eval('pre', el => el.textContent);
    expect(() => JSON.parse(content)).not.toThrow();
  });
});