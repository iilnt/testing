const puppeteer = require('puppeteer');

describe('E2E Tests - JSONPlaceholder User Flows', () => {
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

  test('User lands on homepage and sees heading', async () => {
    const heading = await page.$eval('h1', el => el.textContent);
    expect(heading).toMatch(/JSONPlaceholder/i);
  });

  test('User navigates to /users and sees response', async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click('a[href="/users"]'),
    ]);
    expect(page.url()).toBe('https://jsonplaceholder.typicode.com/users');

    const content = await page.$eval('pre', el => el.textContent);
    const users = JSON.parse(content);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('name');
  });

  test('User navigates to /comments and checks JSON validity', async () => {
    await page.goto('https://jsonplaceholder.typicode.com/comments');
    const text = await page.$eval('pre', el => el.textContent);
    expect(() => JSON.parse(text)).not.toThrow();
  });

  test('User checks post JSON format on /posts/1', async () => {
    await page.goto('https://jsonplaceholder.typicode.com/posts/1');
    const text = await page.$eval('pre', el => el.textContent);
    const post = JSON.parse(text);
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('title');
  });

  test('User navigates back to home from /posts', async () => {
    await page.goto('https://jsonplaceholder.typicode.com/posts');
    await page.goBack();
    expect(page.url()).toBe('https://jsonplaceholder.typicode.com/posts/1');
  });
});