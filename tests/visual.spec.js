const { test, expect } = require("@playwright/test");


test("Visual - My Orders Page", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", { name: "Login" }).click();

    await page.locator("button[routerlink*='myorders']").click();

    await expect(page).toHaveScreenshot("orders-page.png");
 
});

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  expect(await page.textContent('.hero__title')).toMatchSnapshot('hero.txt');
});