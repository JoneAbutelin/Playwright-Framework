class OrdersPage {
    constructor(page) {
        this.page = page;
        this.tableBody = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");

    }
    async selectOrder(orderId) {
        await this.tableBody.waitFor();
        for (let i = 0; i < await this.rows.count(); i++) {
            const rowOrderId = await this.rows.nth(i).locator('th').textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderIdDetails() {
        return (await this.orderIdDetails.textContent()).trim();
    }
}
module.exports = { OrdersPage };