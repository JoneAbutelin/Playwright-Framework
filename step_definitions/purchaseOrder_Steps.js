const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../page-objects/POManager');
const { expect } = require('@playwright/test');


Given('user launches the application', async function () {


    this.loginPage = this.poManager.getLoginPage();

    await this.loginPage.goTo();

});
When('user logs in with email {string} and password {string}', async function (email, password) {
    await this.loginPage.validLogin(email, password);

});
When('user adds product {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.addToCart(productName);
});

When('user navigates to cart page', async function () {
    await this.dashboardPage.navigateToCart();
});

Then('product should be visible in cart', async function () {
    this.cartPage = this.poManager.getCartPage();
    const isVisible = await this.cartPage.isProductVisible();
    expect(isVisible).toBeTruthy();
});