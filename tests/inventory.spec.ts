import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('User is able to see all the items in the inventory', async ({ page }) => {

    const validUsername: string = "standard_user";
    const validPassword: string = "secret_sauce";
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(validUsername, validPassword);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyInventory();
});

const options: string[] = ["Name (Z to A)", "Price (low to high)", "Price (high to low)", "Name (A to Z)"];

for (const option of options) {
    test(`Inventory items are sorted correctly when sorted by ${option}`, async ({ page }) => {

        const validUsername: string = "standard_user";
        const validPassword: string = "secret_sauce";
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.goToLoginUrl("https://www.saucedemo.com/");
        await loginPage.login(validUsername, validPassword);
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

        const sortHandle: Locator = page.locator('.product_sort_container');
        await sortHandle.selectOption({ label: option });
        if (option == "Name (Z to A)") {
            await expect(page.locator('.product_sort_container')).toHaveValue("za");
            await expect(page.locator('.inventory_item').locator('.inventory_item_name')).toHaveText([
                "Test.allTheThings() T-Shirt (Red)",
                "Sauce Labs Onesie",
                "Sauce Labs Fleece Jacket",
                "Sauce Labs Bolt T-Shirt",
                "Sauce Labs Bike Light",
                "Sauce Labs Backpack"
            ]);
            console.log("Products are sorted from Z to A");
        }

        else if (option == "Price (low to high)") {
            await expect(page.locator('.product_sort_container')).toHaveValue("lohi");
            await expect(page.locator('.inventory_item').locator('.inventory_item_price')).toHaveText([
                "$7.99", "$9.99", "$15.99", "$15.99", "$29.99", "$49.99"
            ]);
            console.log("Products are sorted from price low to high");
        }

        else if (option == "Price (high to low)") {
            await expect(page.locator('.product_sort_container')).toHaveValue("hilo");
            await expect(page.locator('.inventory_item').locator('.inventory_item_price')).toHaveText([
                "$49.99", "$29.99", "$15.99", "$15.99", "$9.99", "$7.99"
            ]);
            console.log("Products are sorted from price high to low");
        }

        else {
            await expect(page.locator('.product_sort_container')).toHaveValue("az");
            await expect(page.locator('.inventory_item').locator('.inventory_item_name')).toHaveText([
                "Sauce Labs Backpack",
                "Sauce Labs Bike Light",
                "Sauce Labs Bolt T-Shirt",
                "Sauce Labs Fleece Jacket",
                "Sauce Labs Onesie",
                "Test.allTheThings() T-Shirt (Red)"
            ]);
            console.log("Products are sorted in default sorting order");
        }
    });
}

test('Details page shows an item details', async ({ page }) => {

    const validUsername: string = "standard_user";
    const validPassword: string = "secret_sauce";
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(validUsername, validPassword);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    const selectItem = "Sauce Labs Fleece Jacket";
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.openAndVerifyProductDetails(selectItem);
});

test.only('User is able to add an item and remove it', async({page})=>{

    const selectItem = "Sauce Labs Fleece Jacket";
    const validUsername: string = "standard_user";
    const validPassword: string = "secret_sauce";
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(validUsername, validPassword);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addRemoveItem(selectItem);
});