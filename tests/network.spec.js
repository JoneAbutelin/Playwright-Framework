const { test, expect, request } = require('@playwright/test')
const { DemoAPIUtils } = require('../utils/APIUtils/DemoAPIUtils');
const loginPayload = {
    userEmail: "jijuabutelin@gmail.com",
    userPassword: "Jone@1234"
};

const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
};
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const demoAPIUtils = new DemoAPIUtils(apiContext, loginPayload);
    response = await demoAPIUtils.createOrder(orderPayload);

}
)

test("API", async ({ page }) => {


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token
    );
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            await route.fulfill(
                {
                    response,
                    body
                }
            );
        });


    // await expect(page.locator(".card-body").nth(1)).toBeVisible();

    await page.locator("button[routerlink*='myorders']").click();

   // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    await expect(page.getByText("No Orders")).toBeVisible();


})