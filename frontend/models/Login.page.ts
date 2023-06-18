import { Page } from "@playwright/test";

export class LoginPage {
    protected page: Page
    protected selectors = {
        usernameInput: 'input[name="user"]',
        continueButton: 'input#login',
        passwordInput: 'input#password',
        loginButton: '#login-submit',
        authenticatedHeader: '[data-testid="authenticated-header"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /** Logins to trello with given username and password. */
    async login(username: string, password: string) {
        await this.page.fill(this.selectors.usernameInput, username);
        await this.page.click(this.selectors.continueButton);
        await this.page.fill(this.selectors.passwordInput, password);
        await this.page.click(this.selectors.loginButton);
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector(this.selectors.authenticatedHeader, { state: "visible" });
    }
}
