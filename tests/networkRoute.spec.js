const { test } = require('@playwright/test');

test("Modify request URL using continue", async ({ page }) => {
    page.on('request', req => {
        console.log(req.method(), req.url());
    });

    // Log responses
    page.on('response', res => {
        console.log(res.status(), res.url());
    });
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route => {

        const request = route.request();

        console.log("Original URL:", request.url());

        await route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6 "
        });
    });

    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByPlaceholder("email@example.com").fill("jijuabutelin@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Jone@1234");
    await page.getByRole("button", { name: "Login" }).click();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});