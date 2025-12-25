# Playwright BDD Test Automation Framework

A comprehensive test automation framework combining Playwright with BDD (Cucumber) and multiple reporting options including Allure, Cucumber HTML reports, and native Playwright reports.

## 📋 Table of Contents

- [Framework Features](#framework-features)
- [Framework Structure](#framework-structure)
- [Installation & Setup](#installation--setup)
- [Running Tests](#running-tests)
- [Report Generation](#report-generation)
- [Configuration Files](#configuration-files)
- [CI/CD Integration](#cicd-integration)
- [Commands Reference](#commands-reference)

## ✨ Framework Features

- ✅ **Dual Test Approach**: Run tests via Playwright or BDD Cucumber
- ✅ **Multiple Reports**: Allure, Cucumber HTML, Bootstrap, JSON, JUnit
- ✅ **Screenshot on Failure**: Automatic screenshot capture for failed tests
- ✅ **Parallel Execution**: Support for parallel test execution
- ✅ **Headed/Headless Mode**: Configurable browser modes
- ✅ **CI/CD Ready**: GitHub Actions integration included
- ✅ **Multi-Browser Support**: Chrome, Firefox, Safari (WebKit)

## 📁 Framework Structure

```
playwright-demo-test/
│
├── .github/
│   └── workflows/
│       └── playwright.yml           # GitHub Actions CI/CD pipeline
│
├── features/                        # BDD Feature files
│   ├── sample.feature               # Gherkin feature scenarios
│   ├── step_definitions/            # Step definition implementations
│   │   └── sample.steps.js
│   └── support/                     # Support files
│       ├── hooks.js                 # Cucumber hooks (Before/After)
│       └── world.js                 # Custom World constructor
│
├── tests/                           # Playwright test files
│   ├── home.spec.js                 # Regular Playwright tests
│   └── hook.spec.js
│
├── reports/                         # Generated test reports
│   ├── index.html                   # Reports dashboard
│   ├── cucumber-html-report/        # Multiple HTML report
│   ├── cucumber-bootstrap-report.html
│   ├── cucumber-report.json         # JSON report
│   └── cucumber-junit-report.xml    # JUnit XML report
│
├── allure-results/                  # Allure raw test data (ignored in git)
├── allure-report/                   # Allure HTML report (ignored in git)
├── playwright-report/               # Native Playwright HTML report (ignored in git)
├── test-results/                    # Test artifacts (screenshots, videos)
│
├── cucumber.config.js               # Cucumber configuration
├── cucumber.runner.js               # Tag-based test runner
├── cucumber-html-report.js          # Multiple HTML report generator
├── cucumber-multi-report.js         # Bootstrap report generator
├── generate-all-reports.js          # Master report generation script
├── playwright.config.js             # Playwright configuration
├── package.json                     # Dependencies & scripts
└── .gitignore                       # Git ignore patterns
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Allure CLI (for Allure reports)

### Install Allure CLI (macOS)

```bash
brew install allure
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install --with-deps
```

## 🧪 Running Tests

### ⚡ Quick Start (One-Liner)

**Run all tests and generate all reports:**
```bash
npm run test:all:complete && npm run allure:open
```

This will:
- ✅ Run Playwright tests
- ✅ Run BDD Cucumber tests
- ✅ Generate all reports (Cucumber HTML, Allure, JUnit)
- ✅ Open Allure report in browser

**Alternative (BDD only with reports):**
```bash
npm run test:all && npm run allure:open
```

---

### Option 1: Run via BDD Cucumber

#### Basic BDD Test Execution

```bash
npm run test:bdd
```

#### Run BDD Tests in Parallel

```bash
npm run test:bdd:parallel
```

#### Run with Environment Variables

```bash
# Run in headed mode
HEADLESS=false npm run test:bdd

# Run with slow motion (500ms delay)
SLOWMO=500 npm run test:bdd

# Run with custom parallel workers
PARALLEL=3 npm run test:bdd:parallel
```

#### Run Tests by Tags (Using Runner)

```bash
# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run smoke tests in parallel
npm run test:smoke:parallel

# Custom tag combinations using runner
node cucumber.runner.js --tags "@smoke"
node cucumber.runner.js --tags "@smoke and @regression"
node cucumber.runner.js --tags "@smoke or @critical"
node cucumber.runner.js --tags "not @skip"
node cucumber.runner.js --tags "@smoke" --parallel 3
```

### Option 2: Run via Playwright

#### Run All Playwright Tests

```bash
npm test
# or
npx playwright test
```

#### Run in Headed Mode

```bash
npx playwright test --headed
```

#### Run Specific Test File

```bash
npx playwright test tests/home.spec.js
```

#### Run in Debug Mode

```bash
npx playwright test --debug
```

#### Run Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Option 3: Run Both Playwright & BDD Tests

#### Run All Tests (Playwright + BDD)

```bash
npm run test:both
```

#### Run Playwright + Specific BDD Tags

```bash
# Run all Playwright tests + @smoke BDD tests
npm run test:both:smoke
```

#### Run Everything with Complete Reporting

```bash
# Runs Playwright tests + BDD tests + generates all reports
npm run test:all:complete
```

## 📊 Report Generation

### Generate All Reports (After BDD Tests)

```bash
npm run reports:generate
```

This generates:

- Multiple Cucumber HTML Report
- Bootstrap-themed Report
- JSON Report
- JUnit XML Report
- Reports Dashboard

### Generate Allure Report

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Or generate and open in one command
allure serve allure-results
```

### View Reports Dashboard

```bash
open reports/index.html
```

### View Native Playwright Report

```bash
npx playwright show-report
```

### Run All Tests & Generate All Reports

```bash
npm run test:all
```

## ⚙️ Configuration Files

### 2. `cucumber.config.js`

**Purpose**: Tag-based test execution runner
**Features**:

- Execute tests by tags (@smoke, @regression, etc.)
- Support for tag combinations (and, or, not)
- Parallel execution support
- Custom format options

**Usage Examples**:

```bash
# Run specific tags
node cucumber.runner.js --tags "@smoke"
node cucumber.runner.js --tags "@smoke and @regression"
node cucumber.runner.js --tags "not @skip"

# With parallel execution
node cucumber.runner.js --tags "@smoke" --parallel 3

# Custom format
node cucumber.runner.js --tags "@smoke" --format "json:custom-report.json"
```

### 2. `

### 1. `playwright.config.js`

**Purpose**: Main Playwright configuration
**Key Settings**:

```javascript
{
  testDir: "./tests",              // Test directory
  fullyParallel: true,             // Parallel execution
  retries: process.env.CI ? 2 : 0, // Retries on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    3"html"],                      // Native HTML report
    ["allure-playwright", {...}]   // Allure integration
  ],
  use: {
    headless: true,                // Browser mode
    actionTimeout: 30000,          // Action timeout
    navigationTimeout: 30000,      // Navigation timeout
    timeout: 60000                 // Test timeout
  },
  projects: [                      // Browser configurations
    { name: "chromium", ... },
    { name: "firefox", ... },
    { name: "webkit", ... }
  ]
}
```

**What to Update**:

- `headless`: Set to `false` for local debugging
- `timeout`: Adjust test timeout as needed
- `baseURL`: Set your application URL
- `projects`: Enable/disable browsers

### 2. `cucumber.config.js`

**Pu4pose**: Cucumber BDD configuration
**Key Settings**:

```javascript
{
  require: [
    "features/step_definitions/**/*.js",
    "features/support/**/*.js"
  ],
  format: [
    "progress-bar",                // Console output
    "html:reports/cucumber-html-report.html",
    "json:reports/cucumber-report.json",
    "junit:reports/cucumber-junit-report.xml"
  ],5
  parallel: process.env.PARALLEL ? parseInt(process.env.PARALLEL) : 1
}
```

**What to Update**:

- `require`: Add new step definition paths
- `format`: Add/remove report formats
- `parallel`: Change default parallel workers

### 3. `features/support/hooks.js`

**Purpose**: Cucumber lifecycle hooks
**Functions**:

- `BeforeAll`: Launch browser once before all tests
- `Before`: Create new page for each scenario
- `After`: Take screenshots on failure, close page
- `A6terAll`: Close browser after all tests

**What to Update**:

- Browser launch options (viewport, slowMo, etc.)
- Screenshot settings
- Video recording options

### 4. `package.json` - Scripts Section

**Available Commands**:

| Command                       | Description                           |
| ----------------------------- | ------------------------------------- |
| `npm test`                    | Run Playwright tests                  |
| `npm run test:playwright`     | Run Playwright tests (explicit)       |
| `npm run test:bdd`            | Run BDD Cucumber tests                |
| `npm run test:smoke`          | Run tests tagged with @smoke          |
| `npm run test:regression`     | Run tests tagged with @regression     |
| `npm run test:smoke:parallel` | Run smoke tests in parallel           |
| `npm run test:tags`           | Custom tag runner (see examples)      |
| `npm run test:bdd:parallel`   | Run BDD tests in parallel             |
| `npm run test:both`           | Run all Playwright + all BDD tests    |
| `npm run test:both:smoke`     | Run all Playwright + @smoke BDD tests |
| `npm run test:all:complete`   | Run all tests + generate all reports  |
| `npm run reports:generate`    | Generate all custom reports           |
| `npm run reports:open`        | Open cucumber report                  |
| `npm run allure:generate`     | Generate Allure report                |
| `npm run allure:open`         | Open Allure report                    |
| `npm run test:all`            | Run BDD + generate all reports        |
| `npm run clean`               | Clean all report directories          |
| `npm run pretest`             | Auto-clean before tests               |

### 5. Report Generator Files

#### `cucumber-html-report.js`

- Generates multiple-cucumber-html-reporter
- Configurable metadata and custom data
- **Update**: `metadata` section for environment info

#### `cucumber-multi-report.js`

- Generates Bootstrap-themed report
- Single HTML file output
- **Update**: `metadata` section for app version, environment

#### `generate-all-reports.js`

- Master script that runs all report generators
- Creates reports dashboard (index.html)
- Checks for required JSON files
- **Update**: Add new report generators to `reports` array

## 🔄 CI/CD Integration

### GitHub Actions (`.github/workflows/playwright.yml`)

The workflow:

1. Installs dependencies
2. Installs Playwright browsers
3. Runs Playwright tests
4. Generates Allure report
5. Uploads both reports as artifacts

**Key Steps**:

```yaml
- name: Run Playwright tests
  run: npx playwright test

- name: Generate Allure report
  if: always()
  run: allure generate allure-results --clean -o allure-report

- name:  @critical
  Scenario: Successful login
    Given I navigate to "https://example.com"
    When I enter username "user@test.com"
    And I enter password "password123"
    And I click login button
    Then I should see the dashboard

  @regression
  Scenario: Failed login with invalid credentials
    Given I navigate to "https://example.com"
    When I enter username "invalid@test.com"
    And I enter password "wrongpass"
    And I click login button
    Then I should see an error message

  @skip
  Scenario: This test is skipped
    Given I navigate to "https://example.com"
```

**Common Tags**:

- `@smoke` - Critical smoke tests
- `@regression` - Full regression suite
- `@critical` - High priority tests
- `@skip` - Temporarily disabled tests
- `@wip` - Work in progressses: actions/upload-artifact@v4
  with:
  name: allure-report
  path: allure-report/

````

**Customization**:
- Update trigger branches
- Add BDD test execution
- Add environment-specific configurations
- Integrate with other CI tools (GitLab, Jenkins)

## 📝 Writing Tests

### BDD Cucumber Approach

#### 1. Create Feature File (`features/sample.feature`)
```gherkin
Feature: Login functionality

  @smoke
  Scenario: Successful login
    Given I navigate to "https://example.com"
    When I enter username "user@test.com"
    And I enter password "password123"
    And I click login button
    Then I should see the dashboard
````

#### 2. Implement Step Definitions (`features/step_definitions/login.steps.js`)

```javascript
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to {string}", async function (url) {
  await this.page.goto(url);
});

When("I enter username {string}", async function (username) {
  await this.page.fill("#username", username);
});

Then("I should see the dashboard", async function () {
  await expect(this.page).toHaveURL(/.*dashboard/);
});
```

### Playwright Approach

#### Create Test File (`tests/login.spec.js`)

```javascript
import { test, expect } from "@playwright/test";

test("successful login", async ({ page }) => {
  await page.goto("https://example.com");
  await page.fill("#username", "user@test.com");
  await page.fill("#password", "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*dashboard/);
});
```

## 🎯 Best Practices

1. **Use Page Objects**: Create reusable page classes
2. **Environment Variables**: Use `.env` for sensitive data
3. **Meaningful Names**: Use descriptive test and step names
4. **Tags**: Use `@smoke`, `@regression` for test categorization
5. **Clean Reports**: Run `npm run clean` before important test runs
6. **Screenshots**: Enabled automatically on BDD test failures
7. **Parallel Execution**: Use wisely based on test independence

## 🐛 Troubleshooting

### Tests Failing with "Cannot read properties of undefined"

- Ensure hooks are properly set up in `features/support/hooks.js`
- Check that `this.page` is available in step definitions

### Reports Not Generating

- Verify test execution completed successfully
- Check that JSON report exists: `reports/cucumber-report.json`
- Run `npm run test:bdd` before `npm run reports:generate`

### Allure Report Not Loading

- Don't open `allure-report/index.html` directly
- Use `allure open allure-report` or `allure serve allure-results`
- Allure needs a web server to display properly

### Browser Not Launching

- Run `npx playwright install --with-deps`
- Check `headless` setting in config files
- Verify system dependencies are installed

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Allure Report](https://docs.qameta.io/allure/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 👤 Author

Vineet Kumar

## 📄 License

ISC

---

**Happy Testing! 🚀**
