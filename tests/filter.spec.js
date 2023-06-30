const { test, expect } = require('@playwright/test');

test('Browser context Search TV', async ({ browser }) => {
    // Method 1
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");
    await page.locator("button[id='onetrust-accept-btn-handler']").click();
    await page.close();
    await context.close();

});

test('Filter TV', async ({ page }) => {

    await page.goto("/reviews/televisions");
    console.log(await page.title());
    await expect(page).toHaveTitle("Television Reviews | Compare Televisions - Which?");
    await page.locator("button[id='onetrust-accept-btn-handler']").click();
    await page.locator("button[class='whi-banner-minus']").click();
    const resolution = await page.locator("section[id='react-aria-16'] span[class='sbui-1yiop82']").allTextContents();
    console.log(resolution);
    const firstText = await page.locator("input[value='4K Ultra-HD']").getAttribute("aria-label")
    console.log(firstText)
    const firstTextSplit = firstText.trim().split(",")
    console.log(firstTextSplit)
    const actualText = firstTextSplit[1].trim().split(" ")[0]
    console.log(actualText)
    await page.getByText("4K Ultra-HD").click();
    await expect(page.locator("section[data-testid='product-list-header'] p")).toContainText(actualText + ' television reviews')

    const productTag = await page.locator("[class*='ProductCard__tags--2eWqG'] li span").allTextContents()
    console.log(productTag)

    const products = page.locator("[class='Products_productItem__4osTI']")
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.locator("[class*='ProductCard__tags--2eWqG'] li").nth(i).textContent() === '4K Ultra-HD') {
            await expect(products.nth(i)).toContainText('4K Ultra-HD')
        }
    }

    for (let i = 0; i < count; ++i) {
        if (await products.locator("[class*='ProductCard__tags--2eWqG'] li").nth(i).textContent() != 'Full-HD', 'HD-Ready') {
            await expect(products.nth(i)).not.toContainText('Full-HD', 'HD-Ready')
        }
    }
    await page.close();

});