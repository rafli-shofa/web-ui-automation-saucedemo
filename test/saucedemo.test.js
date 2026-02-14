require('chromedriver');

const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo Automation Test', function () {
    let driver;
    this.timeout(60000);

    before(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Sukses Login ke SauceDemo', async function () {
        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        await driver.findElement(By.css('[data-test="username"]'))
            .sendKeys('standard_user');

        await driver.findElement(By.css('[data-test="password"]'))
            .sendKeys('secret_sauce');

        await driver.findElement(By.id('login-button')).click();

        const cart = await driver.wait(
            until.elementLocated(By.className('shopping_cart_link')),
            10000
        );

        assert.ok(cart);
    });

    it('Urutkan Produk dari A ke Z', async function () {
        const dropdown = await driver.findElement(
            By.css('[data-test="product-sort-container"]')
        );

        await dropdown.click();
        await dropdown.findElement(
            By.css('option[value="az"]')
        ).click();

        await driver.sleep(2000);
    });
});
