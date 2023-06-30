const { test, expect } = require('@playwright/test');

test('Sortby drop down', async ({ page }) => {

    await page.goto("/reviews/televisions");
    console.log(await page.title());
    await expect(page).toHaveTitle("Television Reviews | Compare Televisions - Which?");
    await page.locator("button[id='onetrust-accept-btn-handler']").click();
    await page.locator("button[class='whi-banner-minus']").click();

    await page.locator("div[data-testid='drop-down-container']").click()
    await page.locator("li[data-value='PRICE_DESC']").click()
    await expect(page.locator("div[class='CustomDropdown__selectedOption--OyI-E']")).toHaveText("Price (high to low)")
    await expect(page).toHaveURL('/reviews/televisions?sortBy=PRICE_DESC')
    await page.waitForLoadState('networkidle')


    const firstPrice = await page.locator("span[class='ProductCardPrice__price--FO1oM']").first().textContent()
    const lastPrice = await page.locator("span[class='ProductCardPrice__price--FO1oM']").last().textContent()
    console.log(firstPrice)
    console.log(lastPrice)
    var highPrice = firstPrice.substring(1)
    var lowPrice = lastPrice.substring(1)
    console.log(highPrice)
    console.log(lowPrice)
    expect(parseInt(highPrice.replaceAll(',', ''))).toBeGreaterThan(parseInt(lowPrice.replaceAll(',', '')))
    await page.close();




});