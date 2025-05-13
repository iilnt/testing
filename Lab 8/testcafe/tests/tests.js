import { Selector } from 'testcafe'

fixture`Rozetka TV Page UI Tests`
    .page`https://rozetka.com.ua/ua/all-tv/c80037/`

test('Page should have correct title', async t => {
    const title = await t.eval(() => document.title)
    await t.expect(title).contains('Телевізори')
})

test('Product layout should be present', async t => {
    const layout = Selector('.layout')
    await t.expect(layout.exists).ok()
})

test('Should display some products', async t => {
    const products = Selector('.tile')
    await t.expect(products.count).gt(0)
})
