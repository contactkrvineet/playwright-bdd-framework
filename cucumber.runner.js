#!/usr/bin/env node
/**
 * Cucumber Test Runner
 * Supports tag-based test execution
 *
 * Usage:
 *   node cucumber.runner.js --tags "@smoke"
 *   node cucumber.runner.js --tags "@smoke and @regression"
 *   node cucumber.runner.js --tags "@smoke or @critical"
 *   node cucumber.runner.js --tags "not @skip"
 */

const { spawn } = require("child_process");
const path = require("path");

// Parse command line arguments
const args = process.argv.slice(2);
let tags = "";
let parallel = 1;
let format = [];

// Default formats
const defaultFormats = [
  "progress-bar",
  "html:reports/cucumber-html-report.html",
  "json:reports/cucumber-report.json",
  "junit:reports/cucumber-junit-report.xml",
];

// Parse arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--tags" && args[i + 1]) {
    tags = args[i + 1];
    i++;
  } else if (args[i] === "--parallel" && args[i + 1]) {
    parallel = parseInt(args[i + 1]);
    i++;
  } else if (args[i] === "--format" && args[i + 1]) {
    format.push(args[i + 1]);
    i++;
  }
}

// Build cucumber command
const cucumberBin = path.join(__dirname, "node_modules", ".bin", "cucumber-js");
const cucumberArgs = [];

// Add tags if specified
if (tags) {
  cucumberArgs.push("--tags", tags);
}

// Add parallel execution
if (parallel > 1) {
  cucumberArgs.push("--parallel", parallel.toString());
}

// Add formats
const formats = format.length > 0 ? format : defaultFormats;
formats.forEach((f) => {
  cucumberArgs.push("--format", f);
});

// Add format options with proper JSON escaping
cucumberArgs.push("--format-options");
cucumberArgs.push('{"snippetInterface":"async-await"}');

console.log("🚀 Cucumber Test Runner");
console.log("=".repeat(50));
if (tags) {
  console.log(`📌 Tags: ${tags}`);
}
console.log(`⚡ Parallel workers: ${parallel}`);
console.log(`📊 Formats: ${formats.join(", ")}`);
console.log("=".repeat(50));
console.log("");

// Run cucumber
const cucumber = spawn(cucumberBin, cucumberArgs, {
  stdio: "inherit",
  env: { ...process.env },
});

cucumber.on("exit", (code) => {
  console.log("");
  console.log("=".repeat(50));
  console.log(`✨ Test execution completed with exit code: ${code}`);
  console.log("=".repeat(50));

  if (code === 0) {
    console.log("");
    console.log("📊 Generate reports by running: npm run reports:generate");
  }

  process.exit(code);
});

cucumber.on("error", (error) => {
  console.error("❌ Failed to start cucumber:", error);
  process.exit(1);
});
