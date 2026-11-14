import { Locator, Page, expect } from '@playwright/test';
export class InventoryPage {

    page: Page;
    item: Locator;
    cartBtn: Locator;
    productName: Locator;
    productDesc: Locator;
    productPrice: Locator;
    productImage: Locator;
    addToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.item = page.locator('.inventory_item');
        this.cartBtn = page.locator('.shopping_cart_link');
        this.productName = page.locator('.inventory_details_name');
        this.productDesc = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.productImage = page.locator('.inventory_details_img');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
    }

    async verifyInventory() {

        const itemCount: number = await this.item.count();
        for (let i: number = 0; i < itemCount; i++) {
            const itemName: string = await this.item.nth(i).locator('.inventory_item_name').innerText();
            expect(this.item.nth(i).locator('.inventory_item_name')).toBeVisible();
            expect(this.item.nth(i).locator('.inventory_item_desc')).toBeVisible();
            expect(this.item.nth(i).locator('.inventory_item_price')).toBeVisible();
            expect(this.item.nth(i).getByRole('button', { name: 'Add to cart' })).toBeVisible();
            console.log("Item " + (i + 1) + ` - ${itemName} is validated`);
        }
    }

    async openAndVerifyProductDetails(product: string) {

        await expect(this.item.getByText(product)).toBeVisible();
        await this.item.getByText(product).click();

        await expect(this.productName).toBeVisible();
        await expect(this.productName).toHaveText(product);
        console.log(`${product} item name is displayed`);

        await expect(this.productDesc).toBeVisible();
        console.log('Item description section is displayed');

        await expect(this.productPrice).toBeVisible();
        console.log('Item price is displayed');

        await expect(this.productImage).toBeVisible();
        console.log('Item image is displayed');

        await expect(this.addToCartBtn).toBeEnabled();
        console.log(`Add to cart button for ${product} is displayed`);
    }

    async addRemoveItem(product: string) {
        const items = this.item.all();
        for (const item of await items) {
            if (await item.locator('.inventory_item_name').innerText() == product) {
                await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
                await item.getByRole('button', { name: 'Add to cart' }).click();
                console.log("Product is added to cart");
                await expect(item.getByRole('button', { name: 'Remove' })).toBeVisible();
                console.log("Remove button is enabled");
                await item.getByRole('button', { name: 'Remove' }).click();
                await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
                console.log("Product is removed from cart");
                break;
            }
        }
    }

    async addItemToCart(product: string){
        const items = this.item.all();
        for (const item of await items) {
            if (await item.locator('.inventory_item_name').innerText() == product) {
                await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
                await item.getByRole('button', { name: 'Add to cart' }).click();
                console.log("Product is added to cart");
                break;
            }
        }
    }
}