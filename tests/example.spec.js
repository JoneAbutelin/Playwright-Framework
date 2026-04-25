const { test, expect } = require("@playwright/test");

test("first test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("second test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.wikipedia.org/");
});

test("sample test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator("[id='username']");
  const password = page.locator("[id='password']");
  const signInBtn = page.locator("input#signInBtn");
  // await page.goto("https://rahulshettyacademy.com/");
  // console.log(await page.title());
  // await expect(page).toHaveTitle(
  //   "Rahul Shetty Academy | QA Automation, Playwright, AI Testing & QA Online Training"
  // );
  // const [newPage] = await Promise.all([
  //   page.waitForEvent("popup"), // wait for new tab
  //   page.getByRole("link", { name: "Sign Up" }).click(),
  // ]);

  // await newPage.waitForLoadState();
  // console.log(await newPage.url());
  // await page.bringToFront();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // await page.locator("[id='username']").fill("jone");
  // await page.locator("[id='password']").fill("jone@1234");
  // await page.locator("input#signInBtn").click();
  // console.log(await page.locator("[style='display: block;']").textContent());
  // await expect(page.locator("[style='display: block;']")).toContainText(
  //   "Incorrect username/password."
  // );
  //Type fill
  await username.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Teacher");
  await page.locator("#usertype").last().click();
  await expect(page.locator("#usertype").last()).toBeChecked();
  await page.locator("#okayBtn").click();
  // await signInBtn.click();

  const docLink = page.locator("[href*='documents']");

  await expect(docLink).toHaveAttribute("class", "blinkingText");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    docLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const aText = text.split("@");
  const domain = aText[1].split(" ")[0];
  console.log("Domain Name:", domain);
  await page.bringToFront();
 // await page.pause();
  await page.locator("#username").fill(domain);
  await expect(page.locator("#username")).toHaveValue(domain);
  console.log(await username.inputValue());

  //await page.pause();
  // console.log(await page.locator(".card-body a").nth(0).textContent());
  // console.log(await page.locator(".card-body a").first().textContent());
  // await page.locator(".card-body a").first().waitFor();
  // const allTitles = await page.locator(".card-body a").allTextContents();
  // console.log(allTitles);
});
