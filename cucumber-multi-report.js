// @ts-check
const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "./reports/cucumber-report.json",
  output: "./reports/cucumber-bootstrap-report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Development",
    Browser: "Chrome",
    Platform: process.platform,
    Parallel: "Scenarios",
    Executed: "Local",
  },
  failedSummaryReport: true,
  brandTitle: "Playwright BDD Test Report",
  name: "Cucumber Report",
  columnLayout: 1,
  screenshotsDirectory: "./test-results/screenshots/",
  storeScreenshots: true,
};

reporter.generate(options);

console.log("✅ Cucumber Bootstrap report generated successfully!");
