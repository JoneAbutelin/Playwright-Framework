class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator("div li");
        this.productText = page.locator("h3:has-text('ADIDAS ORIGINAL')");
        this.checkoutBtn = page.locator("button:has-text('Checkout')");

    }
    async isProductVisible() {
        await this.cartItems.first().waitFor();
       return await this.productText.isVisible();
        expect(cartCheck).toBeTruthy();
        await this.checkoutBtn.click();
    }
     async checkoutCart() {
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage };