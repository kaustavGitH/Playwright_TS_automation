import { Locator, Page, expect } from '@playwright/test';

export class BasePage{

    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async verifyButtonVisibility(locator: Locator){
        await expect(locator).toBeVisible();
    }

    async verifyButtonEnabled(locator: Locator){
        await expect(locator).toBeEnabled();
    }

    async clickOnButton(locator: Locator){
        await locator.click();
    }

    async verifyPageUrl(url: string){
        await expect(this.page).toHaveURL(url);
    }

}