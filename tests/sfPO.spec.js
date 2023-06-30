const { test, expect } = require('@playwright/test');
const { salesforceLogin } = require('../pageObjects/salesforceLogin');



test('sales force login', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    const SF_Login = new salesforceLogin(page);

    await page.goto("https://login.salesforce.com")
    await SF_Login.submitLogin("uchittlur@gmail.com", "Tiger1985")
    await page.waitForLoadState();
    await page.goto("/lightning/page/home")
    await SF_Login.settingsCog();
    // Before you click open in new page
    const [setUpPage] = await Promise.all([
        context.waitForEvent('page'),
        await page.locator("li[id='related_setup_app_home']").click(),
    ])
    await setUpPage.waitForLoadState();
    const title = await setUpPage.locator("span[class='title']").textContent();
    console.log(title);
    await expect(setUpPage.locator("span[class='title']")).toHaveText(title);
    await setUpPage.close()


    

});