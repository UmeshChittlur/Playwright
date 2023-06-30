const { test, expect } = require('@playwright/test');
const { Login } = require('../support/login');

test('Filter TV', async ({ page }) => {

    await page.goto("/reviews/televisions");
    console.log(await page.title());
    await expect(page).toHaveTitle("Television Reviews | Compare Televisions - Which?");
    await page.locator("button[id='onetrust-accept-btn-handler']").click();
    await page.locator("button[class='whi-banner-minus']").click();
    const login = new Login(page);
    await login.pw_dropdown("Most-recently reviewed")
    await login.pw_dropdown("Price (high to low)")
    



});