import { Locator, Page, expect } from '@playwright/test';
export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole("button", { name: 'Login' });
    }

    async goToLoginUrl(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {

        await this.username.fill(username);
        await this.password.fill(password);
        this.page.on('dialog', dialog => dialog.accept());
        await this.loginBtn.click();
    }

    async loginWithoutCreds() {
        await this.loginBtn.click();
        await expect(this.page.getByRole("alert")).toBeVisible();
    }

    async loginWithOnlyUsername(username: string) {
        await this.username.fill(username);
        await this.loginBtn.click();
        await expect(this.page.getByRole("alert")).toBeVisible();
    }

    async loginWithOnlyPassword(password: string) {
        await this.password.fill(password);
        await this.loginBtn.click();
        await expect(this.page.getByRole("alert")).toBeVisible();
    }
}