// @ts-check
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Starting report generation...\n");

// Ensure reports directory exists
const reportsDir = path.join(__dirname, "reports");
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Check if cucumber report JSON exists
const cucumberJsonPath = path.join(reportsDir, "cucumber-report.json");
if (!fs.existsSync(cucumberJsonPath)) {
  console.error("❌ No cucumber-report.json found. Please run tests first.");
  process.exit(1);
}

// Generate different report formats
const reports = [
  {
    name: "Multiple Cucumber HTML Report",
    script: "cucumber-html-report.js",
  },
  {
    name: "Cucumber Bootstrap Report",
    script: "cucumber-multi-report.js",
  },
];

let successCount = 0;
let failCount = 0;

reports.forEach((report) => {
  try {
    console.log(`📊 Generating ${report.name}...`);
    execSync(`node ${report.script}`, { stdio: "inherit" });
    successCount++;
  } catch (error) {
    console.error(`❌ Failed to generate ${report.name}:`, error.message);
    failCount++;
  }
});

// Summary
console.log("\n" + "=".repeat(50));
console.log("📈 Report Generation Summary");
console.log("=".repeat(50));
console.log(`✅ Success: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log("=".repeat(50) + "\n");

// Display report locations
console.log("📁 Report Locations:");
console.log("   - Multiple HTML Report: ./reports/cucumber-html-report/");
console.log("   - Bootstrap Report: ./reports/cucumber-bootstrap-report.html");
console.log("   - JSON Report: ./reports/cucumber-report.json");
console.log("   - JUnit Report: ./reports/cucumber-junit-report.xml");
console.log("   - Allure Report: Run 'npm run allure:generate' to create\n");

// Generate report index
generateReportIndex();

console.log("✨ All reports generated successfully!");

function generateReportIndex() {
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Reports Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        .card h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        .card p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .card a {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            transition: transform 0.2s ease;
            font-weight: 600;
        }
        .card a:hover {
            transform: scale(1.05);
        }
        .timestamp {
            text-align: center;
            color: white;
            margin-top: 40px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Test Reports Dashboard</h1>
        <div class="cards">
            <div class="card">
                <h2>📊 Multiple HTML Report</h2>
                <p>Comprehensive report with multiple scenarios and detailed statistics</p>
                <a href="./cucumber-html-report/index.html">View Report</a>
            </div>
            <div class="card">
                <h2>📈 Bootstrap Report</h2>
                <p>Clean and responsive Bootstrap-themed test report</p>
                <a href="./cucumber-bootstrap-report.html">View Report</a>
            </div>
            <div class="card">
                <h2>🎯 Allure Report</h2>
                <p>Advanced reporting with trends, history, and detailed analytics</p>
                <a href="../allure-report/index.html">View Report</a>
            </div>
            <div class="card">
                <h2>📋 JSON Report</h2>
                <p>Raw JSON data for custom processing and integrations</p>
                <a href="./cucumber-report.json">View JSON</a>
            </div>
        </div>
        <div class="timestamp">
            <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(reportsDir, "index.html"), indexHtml);
  console.log("📄 Report index created: ./reports/index.html");
}
