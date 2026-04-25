const { test, expect } = require("@playwright/test");
const { LoginPage } = require('../page-objects/loginPage');
const { DashboardPage } = require('../page-objects/dashboardPage');
const { CartPage } = require('../page-objects/cartPage');
const { PlaceOrderPage } = require('../page-objects/placeOrderPage');
const { OrdersPage } = require('../page-objects/ordersPage');
const { POManager } = require("../page-objects/POManager");
const { customtest } = require("../utils/CustomFixture/placeOrderTestFixture");
const dataset = JSON.parse(JSON.stringify(require('../utils/TestData/placeOrder.json')));

test.only("Page Object E2E Practise Test", async ({ page }) => {

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(dataset.email, dataset.password);

  const dashboardPage = new DashboardPage(page);

  await dashboardPage.addToCart(dataset.prodName);
  await dashboardPage.navigateToCart();

  const cartPage = new CartPage(page);

  const isVisible = await cartPage.isProductVisible();
  expect(isVisible).toBeTruthy();
  await cartPage.checkoutCart();

  const placeOrderPage = new PlaceOrderPage(page);

  await placeOrderPage.selectCountry(dataset.countryName);
  await placeOrderPage.placeOrder();
  const successMsg = await placeOrderPage.getSuccessMessage();
  expect(successMsg.trim()).toBe("Thankyou for the order.");

  const orderId = await placeOrderPage.getOrderId();
  expect(orderId).toBeTruthy(); await placeOrderPage.goToOrdersPage();

  const ordersPage = new OrdersPage(page);

  await ordersPage.selectOrder(orderId);
  const orderIdDetails = await ordersPage.getOrderIdDetails();
  expect(orderId).toContain(orderIdDetails);

});

customtest(" Custom Fixture Page Object E2E Practise Test", async ({ page, testDataForOrder }) => {

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

  const dashboardPage = new DashboardPage(page);

  await dashboardPage.addToCart(testDataForOrder.prodName);
  await dashboardPage.navigateToCart();

  const cartPage = new CartPage(page);

  const isVisible = await cartPage.isProductVisible();
  expect(isVisible).toBeTruthy();
  await cartPage.checkoutCart();

  const placeOrderPage = new PlaceOrderPage(page);

  await placeOrderPage.selectCountry(testDataForOrder.countryName);
  await placeOrderPage.placeOrder();
  const successMsg = await placeOrderPage.getSuccessMessage();
  expect(successMsg.trim()).toBe("Thankyou for the order.");

  const orderId = await placeOrderPage.getOrderId();
  expect(orderId).toBeTruthy(); await placeOrderPage.goToOrdersPage();

  const ordersPage = new OrdersPage(page);

  await ordersPage.selectOrder(orderId);
  const orderIdDetails = await ordersPage.getOrderIdDetails();
  expect(orderId).toContain(orderIdDetails);

});