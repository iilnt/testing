module.exports = {
  '@tags': ['rozetka'],

  'Page should have correct title': async (browser) => {
    await browser
      .url('https://rozetka.com.ua/ua/all-tv/c80037/')
      .waitForElementVisible('body', 5000)
      .getTitle(function (title) {
        this.assert.ok(title.includes('Телевізори'), 'Title contains "Телевізори"');
      });
  },

  'Product layout should be present': async (browser) => {
    await browser
      .url('https://rozetka.com.ua/ua/all-tv/c80037/')
      .waitForElementVisible('.layout', 5000)
      .assert.visible('.layout', 'Layout is visible');
  },

  'Should display some products': async (browser) => {
    await browser
      .url('https://rozetka.com.ua/ua/all-tv/c80037/')
      .waitForElementVisible('.tile', 5000)
      .elements('css selector', '.tile', function (result) {
        this.assert.ok(result.value.length > 0, 'Some product tiles are visible');
      });
  },
};
