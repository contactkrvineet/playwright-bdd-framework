// @ts-check
const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./reports/",
  reportPath: "./reports/cucumber-html-report/",
  reportName: "Playwright BDD Cucumber Report",
  pageTitle: "Automation Test Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "120",
    },
    device: "Local Machine",
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  customData: {
    title: "Run Information",
    data: [
      { label: "Project", value: "Playwright Demo Test" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "Regression" },
      { label: "Execution Start Time", value: new Date().toISOString() },
      { label: "Execution End Time", value: new Date().toISOString() },
    ],
  },
});

console.log("✅ Cucumber HTML report generated successfully!");
