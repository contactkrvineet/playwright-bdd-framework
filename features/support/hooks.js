const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

// Set default timeout for all steps
setDefaultTimeout(60 * 1000);

// Global browser instance
let browser;

BeforeAll(async function () {
  console.log("🚀 Starting browser...");
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false",
    slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0,
  });
});

AfterAll(async function () {
  console.log("🔒 Closing browser...");
  if (browser) {
    await browser.close();
  }
});

Before(async function ({ pickle }) {
  // Create a new browser context for each scenario
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: process.env.VIDEO ? { dir: "test-results/videos" } : undefined,
  });

  // Create a new page and attach it to the world
  this.page = await this.context.newPage();

  // Set default timeouts
  this.page.setDefaultTimeout(30000);
  this.page.setDefaultNavigationTimeout(30000);

  console.log(`📄 New page created for scenario: ${pickle.name}`);
});

After(async function ({ pickle, result }) {
  // Take screenshot on failure
  if (result?.status === "FAILED" && this.page) {
    try {
      const screenshot = await this.page.screenshot({
        path: `test-results/screenshots/${pickle.name.replace(
          /\s+/g,
          "_"
        )}_${Date.now()}.png`,
        fullPage: true,
      });

      // Attach screenshot to report
      this.attach(screenshot, "image/png");
      console.log(`📸 Screenshot captured for failed scenario: ${pickle.name}`);
    } catch (error) {
      console.error("Failed to capture screenshot:", error.message);
    }
  }

  // Close context after each scenario
  if (this.context) {
    await this.context.close();
  }
});
