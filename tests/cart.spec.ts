import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('Verify product added in cart', async ({ page }) => {

    const validUsername: string = "standard_user";
    const validPassword: string = "secret_sauce";
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(validUsername, validPassword);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    const selectItem: string = "Sauce Labs Fleece Jacket";
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(selectItem);

    const cartItems = page.locator('.cart_item').all();
    for(const cartItem of await cartItems){
        if(await cartItem.locator('.inventory_item_name').textContent() == selectItem){
            console.log('Product in cart matches with the product added');
            break;
        }
    }
});

test('Cart reflects multiple selected products and supports removal and continue shopping', async ({page})=>{

    // User login section
    const validUsername: string = "standard_user";
    const validPassword: string = "secret_sauce";
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(validUsername, validPassword);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    
    // User adds items to cart
    const selectedItems: string[] = ["Sauce Labs Backpack","Sauce Labs Bolt T-Shirt"];
    let count: number = 0;
    const inventoryPage = new InventoryPage(page);
    for(const item of selectedItems){
        await inventoryPage.addItemToCart(item);
        count++;
    }

    const cartPage = new CartPage(page);
    await cartPage.cartCount(count);

    // User clicks on cart icon and navigates to cart page
    await cartPage.goToCart();

    // All cart items are scanned and user verifies products in cart matches with the selected products
    await cartPage.verifyCartItems(selectedItems);

    // User wants to remove a product from cart
    // User validates removed product is no longer in cart list and also cart count is updated
    let itemToRemove: string = "Sauce Labs Bolt T-Shirt";
    const updatedCount = await cartPage.removeProduct(count, itemToRemove);
    await cartPage.cartCount(updatedCount);

    // Checkout and continue shopping buttons are visible
    await cartPage.verifyCheckoutBtnEnabled();
    await cartPage.verifyContinueShoppingBtnVisibility();

    await cartPage.clickContinueShoppingBtn();

    // Verifies user is navigated back to inventory page
    await cartPage.verifyInventoryUrl("https://www.saucedemo.com/inventory.html");
});