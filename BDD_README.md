# Playwright BDD Cucumber Framework

## 📋 Features

- ✅ BDD with Cucumber and Playwright
- ✅ Multiple report formats (HTML, JSON, JUnit, Allure)
- ✅ Screenshot on failure
- ✅ Parallel execution support
- ✅ Configurable timeouts
- ✅ Headed/Headless mode

## 🚀 Usage

### Run BDD Tests

```bash
npm run test:bdd
```

### Run with Parallel Execution

```bash
npm run test:bdd:parallel
```

### Generate Reports

```bash
npm run reports:generate
```

### View Report Dashboard

```bash
open reports/index.html
```

### Run Everything

```bash
npm run test:all
```

## 📁 Project Structure

```
.
├── features/
│   ├── sample.feature              # Feature files
│   ├── step_definitions/           # Step definitions
│   │   └── sample.steps.js
│   └── support/                    # Support files
│       └── world.js
├── reports/                        # Generated reports
├── cucumber.config.js              # Cucumber configuration
├── cucumber-html-report.js         # Multiple HTML report config
├── cucumber-multi-report.js        # Bootstrap report config
└── generate-all-reports.js         # Report generation script
```

## 🎯 Writing Tests

### Feature File Example

```gherkin
Feature: Login
  Scenario: Successful login
    Given I navigate to "https://example.com"
    When I enter username "user@test.com"
    And I enter password "password123"
    And I click login button
    Then I should see the dashboard
```

### Step Definition Example

```javascript
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to {string}", async function (url) {
  await this.page.goto(url);
});
```

## 📊 Reports

- **Multiple HTML Report**: `reports/cucumber-html-report/`
- **Bootstrap Report**: `reports/cucumber-bootstrap-report.html`
- **JSON Report**: `reports/cucumber-report.json`
- **JUnit Report**: `reports/cucumber-junit-report.xml`
- **Allure Report**: Run `npm run allure:generate`

## ⚙️ Environment Variables

- `HEADLESS`: Set to `false` for headed mode
- `SLOWMO`: Slow down operations (in ms)
- `PARALLEL`: Number of parallel workers
- `VIDEO`: Set to `true` to record videos

Example:

```bash
HEADLESS=false npm run test:bdd
```
