const { test, expect } = require("@playwright/test");

test("E2E Practise Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  //Login
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  await email.fill("jijuabutelin@gmail.com");
  await password.fill("Jone@1234");
  await page.locator("#login").click();

  //Dynamic Element locate
  const products = page.locator(".card-body");
  const prodName = "ADIDAS ORIGINAL";
  const count = await products.count();
  console.log(count);
  for (let i = 0; i < count; i++) {
    // if (await products.nth(i).locator("b").textContent() == prodName) {
    //   await products.nth(i).locator("text= Add To Cart").click();
    // }
    const prodText = await products.nth(i).locator("b").textContent();
    if (prodText == prodName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const cartCheck = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  expect(cartCheck).toBeTruthy();
  await page.locator("button:has-text('Checkout')").click();

  //Dropdown
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor();
  const dcount = await dropdown.locator("button").count();
  console.log("dropdown count:" + dcount);
  const countryName = " India";
  for (let i = 0; i < dcount; i++) {
    const dropdownText = await dropdown.locator("button").nth(i).textContent();
    if (countryName == dropdownText) {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await page.locator("a:has-text('Place Order')").click();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  await page.locator("button[routerlink*='myorders']").click();

  //Table dynamic element verify
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  //expect(orderId.includes(orderIdDetails)).toBeTruthy();
  expect(orderId).toContain(orderIdDetails);

});