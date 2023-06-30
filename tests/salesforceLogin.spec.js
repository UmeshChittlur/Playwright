const { test, expect } = require('@playwright/test');

test('Salesforce Login', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://login.salesforce.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Login | Salesforce");
    await page.locator("input[id='username']").type("uchittlur@gmail.com");
    await page.locator("input[id='password']").type("Tiger1985");
    await page.locator("input[id='Login']").click();
    await page.waitForLoadState();

    await page.goto("https://tcsoftware-dev-ed.develop.lightning.force.com/lightning/page/home");
    await page.locator(".headerTrigger").nth(1).click();


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
    // await page.bringToFront();

    await expect(page.locator("span[title='Marketing']")).toContainText("Marketing");
    await expect(page.locator("span[title='Quarterly Performance']")).toHaveText("Quarterly Performance");

    await page.locator("[aria-label='Search']").click();
    await page.locator("[aria-label='Search']").type(title, { delay: 100 });
    await page.keyboard.press('Enter');
    const messageText = await page.locator("div[class*='noResultsTitle']").textContent();
    await expect(page.locator("div[class*='noResultsTitle']")).toHaveText(messageText);
    console.log(messageText);
    await page.close();


});