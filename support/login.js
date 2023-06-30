const { expect } = require('@playwright/test');

class Login {

    constructor(page) {
        this.page = page;
    }

    async submitLogin(username, password) {
        await this.page.locator("input[id='username']").type(username);
        await this.page.locator("input[id='password']").type(password);
        await this.page.locator("input[id='Login']").click();
    }

    async pw_dropdown(label) {
        await this.page.locator("div[data-testid='drop-down-container']").click()
        await this.page.locator("p[class='sbui-1p9d3sp']:has-text('" + label + "')").click()
        switch (label) {
            case "Most-recently reviewed":
            await expect(this.page.locator("div[class='CustomDropdown__selectedOption--OyI-E']")).toHaveText('Most-recently reviewed')
            await expect(this.page).toHaveURL("/reviews/televisions?sortBy=TESTING_DATE_DESC")
            break;
        case "Price (low to high)":
            await expect(this.page.locator("div[class='CustomDropdown__selectedOption--OyI-E']")).toHaveText('Price (low to high)')
            await expect(this.page).toHaveURL("/reviews/televisions?sortBy=PRICE_ASC")
            break;
        case "Price (high to low)":
            await expect(this.page.locator("div[class='CustomDropdown__selectedOption--OyI-E']")).toHaveText('Price (high to low)')
            await expect(this.page).toHaveURL("/reviews/televisions?sortBy=PRICE_DESC")
            break;
        case "Running cost (low to high)":
            await expect(this.page.locator("div[class='CustomDropdown__selectedOption--OyI-E']")).toHaveText('Running cost (low to high)')
            await expect(this.page).toHaveURL("/reviews/televisions?sortBy=ANNUAL_RUNNING_COST_ASC")
            break;
        case "Most-recently launched":
            await expect(this.page.locator("div[class='CustomDropdown__selectedOption--OyI-E']")).toHaveText('Most-recently launched')
            await expect(this.page).toHaveURL("/reviews/televisions?sortBy=LAUNCH_DATE_DESC")
            break;           
        }
    }

}

module.exports = { Login }