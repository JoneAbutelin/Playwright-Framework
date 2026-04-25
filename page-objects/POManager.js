const { LoginPage } = require('./loginPage');
const { DashboardPage } = require('./dashboardPage');
const { CartPage } = require('./cartPage');
const { PlaceOrderPage } = require('./placeOrderPage');
const { OrdersPage } = require('./ordersPage');

class POManager {
    constructor(page) {
        this.page = page;
    }

    getLoginPage() {
        return new LoginPage(this.page);
    }

    getDashboardPage() {
        return new DashboardPage(this.page);
    }

    getCartPage() {
        return new CartPage(this.page);
    }

    getPlaceOrderPage() {
        return new PlaceOrderPage(this.page);
    }

    getOrdersPage() {
        return new OrdersPage(this.page);
    }
}

module.exports = { POManager };