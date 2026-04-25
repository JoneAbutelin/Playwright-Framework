class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.addToCartBtn = "text= Add To Cart";
        this.cartBtn = page.locator("[routerlink*='cart']");

    }

    async addToCart(prodName) {
        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            // if (await products.nth(i).locator("b").textContent() == prodName) {
            //   await products.nth(i).locator("text= Add To Cart").click();
            // }
            const prodText = await this.products.nth(i).locator("b").textContent();
            if (prodText == prodName) {
                await this.products.nth(i).locator(this.addToCartBtn).click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cartBtn.click();

    }
}
module.exports = { DashboardPage };