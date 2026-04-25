const { test, expect, request } = require('@playwright/test')
const { DemoAPIUtils } = require('../utils/APIUtils/DemoAPIUtils');
const loginPayload = {
    userEmail: "jijuabutelin@gmail.com",
    userPassword: "Jone@1234"
};

const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
};
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
    await expect(page.locator(".card-body").nth(1)).toBeVisible();

    await page.locator("button[routerlink*='myorders']").click();

    //Table dynamic element verify
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //expect(orderId.includes(orderIdDetails)).toBeTruthy();
    expect(response.orderId).toContain(orderIdDetails);


})