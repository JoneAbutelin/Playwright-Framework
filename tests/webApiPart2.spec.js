const { test, expect } = require('@playwright/test')

let webContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button', { name: "Login" }).click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
}
)


test('Inject Stored Cookies', async () => {
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    //const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});