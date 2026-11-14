import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage{

    page: Page;
    cartBadge: Locator;
    cartBtn: Locator;
    cartItems: Locator;
    checkoutBtn: Locator;
    continueShoppingBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartBtn = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
        this.checkoutBtn = page.getByRole('button', {name:'Checkout'});
        this.continueShoppingBtn = page.getByRole('button', {name: 'Continue Shopping'});
    }

    async cartCount(count: number) {
        await expect(this.cartBadge).toHaveText(String(count));
        console.log(`Cart count is updated and now has ${count} items`);
    }

    async goToCart() {
        super.clickOnButton(this.cartBtn);
        await this.page.waitForLoadState("networkidle");
    }

    async verifyCartItems(items: string[]) {
        const cartItems = this.cartItems.all();
        for (const cartItem of await cartItems) {
            for (const item of items) {
                if (await cartItem.locator('.inventory_item_name').textContent() == item) {
                    console.log(`${item} is displayed in cart`);
                }
            }
        }
    }

    async removeProduct(count: number, itemToRemove: string) {
        const cartItems = this.cartItems.all();
        for (const cartItem of await cartItems) {
            if (await cartItem.locator('.inventory_item_name').textContent() == itemToRemove) {
                await expect(cartItem.getByRole('button', { name: 'Remove' })).toBeEnabled();
                await cartItem.getByRole('button', { name: 'Remove' }).click();
                count--;
                break;
            }
        }
        await expect(this.page.getByText(itemToRemove)).not.toBeVisible();
        console.log(`${itemToRemove} is removed from the cart`);
        return count;
    }

    async verifyCheckoutBtnEnabled() {
        super.verifyButtonEnabled(this.checkoutBtn);
        console.log("Checkout button is enabled");
    }

    async verifyContinueShoppingBtnVisibility() {
        super.verifyButtonVisibility(this.continueShoppingBtn);
        console.log("Continue shopping button is visible");
    }

    async clickContinueShoppingBtn(){
        super.clickOnButton(this.continueShoppingBtn);
    }

    async verifyInventoryUrl(url: string){
        super.verifyPageUrl(url);
        console.log("User is successfully redirected to inventory page");
    }
}