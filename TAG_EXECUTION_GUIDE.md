# Tag-Based Test Execution Quick Reference

## Available Tags in Features

Current tags used in `features/sample.feature`:

- `@smoke` - Quick smoke tests (1 scenario)
- `@regression` - Full regression suite (2 scenarios)

## Running Tests by Tags

### Using npm Scripts (Recommended)

```bash
# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression

# Run smoke tests in parallel
npm run test:smoke:parallel
```

### Using Runner Directly

```bash
# Basic tag execution
node cucumber.runner.js --tags "@smoke"
node cucumber.runner.js --tags "@regression"

# Tag combinations
node cucumber.runner.js --tags "@smoke and @regression"
node cucumber.runner.js --tags "@smoke or @critical"
node cucumber.runner.js --tags "not @skip"
node cucumber.runner.js --tags "@smoke and not @wip"

# With parallel execution
node cucumber.runner.js --tags "@smoke" --parallel 3
node cucumber.runner.js --tags "@regression" --parallel 5

# With custom format
node cucumber.runner.js --tags "@smoke" --format "json:custom.json"
```

## Tag Expressions

### AND Operator

Run scenarios that have BOTH tags:

```bash
node cucumber.runner.js --tags "@smoke and @critical"
```

### OR Operator

Run scenarios that have EITHER tag:

```bash
node cucumber.runner.js --tags "@smoke or @regression"
```

### NOT Operator

Exclude scenarios with specific tag:

```bash
node cucumber.runner.js --tags "not @skip"
node cucumber.runner.js --tags "@regression and not @slow"
```

### Complex Combinations

```bash
# Run smoke OR critical, but NOT skip
node cucumber.runner.js --tags "(@smoke or @critical) and not @skip"

# Run regression tests that are not work-in-progress
node cucumber.runner.js --tags "@regression and not @wip"
```

## Common Tag Conventions

### Priority Tags

- `@critical` - Must-pass tests
- `@high` - High priority
- `@medium` - Medium priority
- `@low` - Low priority

### Test Type Tags

- `@smoke` - Smoke tests
- `@regression` - Regression tests
- `@sanity` - Sanity checks
- `@e2e` - End-to-end tests
- `@integration` - Integration tests
- `@unit` - Unit tests

### Status Tags

- `@wip` - Work in progress
- `@skip` - Skip temporarily
- `@broken` - Known broken tests
- `@flaky` - Flaky tests

### Feature Tags

- `@login` - Login related
- `@checkout` - Checkout process
- `@payment` - Payment flows
- `@search` - Search functionality

## Example Feature with Tags

```gherkin
@regression @login
Feature: User Login

  @smoke @critical
  Scenario: Successful login with valid credentials
    Given I navigate to login page
    When I enter valid credentials
    Then I should be logged in

  @negative
  Scenario: Failed login with invalid credentials
    Given I navigate to login page
    When I enter invalid credentials
    Then I should see error message

  @skip @flaky
  Scenario: Login with social media
    Given I navigate to login page
    When I click on "Login with Google"
    Then I should be logged in via Google
```

## Running Tagged Tests

```bash
# Run all login smoke tests
node cucumber.runner.js --tags "@login and @smoke"

# Run critical tests only
node cucumber.runner.js --tags "@critical"

# Run regression except flaky tests
node cucumber.runner.js --tags "@regression and not @flaky"

# Run all tests except skip and wip
node cucumber.runner.js --tags "not @skip and not @wip"
```

## After Test Execution

Generate reports:

```bash
npm run reports:generate
```

View reports:

```bash
open reports/index.html
```

Generate Allure report:

```bash
npm run allure:generate
npm run allure:open
```
