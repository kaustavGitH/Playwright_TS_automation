import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User is able to login with valid credentials', async ({page})=>{

    const validUsername: string = "standard_user";
    const validPassword: string = "secret_sauce";
    const loginPage:LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(validUsername, validPassword);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});

test('User is not able to login with invalid credentials', async ({page})=>{

    const invalidUsername: string = "standard";
    const invalidPassword: string = "secret_sauce";
    const loginPage:LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.login(invalidUsername, invalidPassword);
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("alert")).toContainText("Epic sadface: Username and password do not match any user in this service");
});

test('User is not able to login with empty fields', async({page})=>{

    const loginPage:LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.loginWithoutCreds();
    await expect(page.getByRole("alert")).toContainText("Epic sadface: Username is required");
});

test('User is not able to login with empty username', async({page})=>{

    const password: string = "secret_sauce";
    const loginPage:LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.loginWithOnlyPassword(password);
    await expect(page.getByRole("alert")).toContainText("Epic sadface: Username is required");
});

test('User is not able to login with empty password', async({page})=>{

    const validUsername: string = "standard_user";
    const loginPage:LoginPage = new LoginPage(page);
    await loginPage.goToLoginUrl("https://www.saucedemo.com/");
    await loginPage.loginWithOnlyUsername(validUsername);
    await expect(page.getByRole("alert")).toContainText("Epic sadface: Password is required");
});