const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { POManager } = require('../page-objects/POManager');

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Initialize POManager
    this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
    // Runs before each step
    // You can add logging if needed
    console.log("Starting step...");
});

AfterStep(async function ({ result }) {
    // If step fails → take screenshot
    if (result.status === Status.FAILED) {
        
        const screenshot = await this.page.screenshot({
            path: `screenshots/error-${Date.now()}.png`,
            fullPage: true
        });

        // Attach to report (important 🔥)
        await this.attach(screenshot, 'image/png');
    }
});

After(async function () {
    await this.browser.close();
});