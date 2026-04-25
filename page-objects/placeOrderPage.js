class PlaceOrderPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.placeOrderBtn = page.locator("a:has-text('Place Order')");
        this.successMsg = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersBtn = page.locator("button[routerlink*='myorders']");

    }
    async selectCountry(countryName) {
        await this.country.pressSequentially("ind", { delay: 100 });
        await this.dropdown.waitFor();
        const dcount = await this.dropdown.locator("button").count();
        console.log("dropdown count:" + dcount);
        for (let i = 0; i < dcount; i++) {
            const dropdownText = await this.dropdown.locator("button").nth(i).textContent();
            if (countryName == dropdownText) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async placeOrder() {
        await this.placeOrderBtn.click();

    }

    async getSuccessMessage() {
        return await this.successMsg.textContent();
    }

    async getOrderId() {
        return (await this.orderId.textContent()).trim();
    }


    async goToOrdersPage() {
        await this.ordersBtn.click();

    }

}
module.exports = { PlaceOrderPage };