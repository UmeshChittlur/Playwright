
class salesforceLogin {

    constructor(page) {
        this.page = page;
    }

    async submitLogin(username, password) {
        await this.page.locator("input[id='username']").type(username);
        await this.page.locator("input[id='password']").type(password);
        await this.page.locator("input[id='Login']").click();

    }

    async settingsCog() {
        await this.page.locator(".headerTrigger").nth(1).click()
    }

}

module.exports = { salesforceLogin }