# CI/CD Pipeline Configuration Guide

## Overview

This framework includes CI/CD configurations for both **GitHub Actions** and **GitLab CI/CD** that automatically run all tests and generate comprehensive reports.

---

## 🔄 GitHub Actions Pipeline

**File:** `.github/workflows/playwright.yml`

### Pipeline Steps

```yaml
1. ✅ Checkout code
2. ✅ Setup Node.js (LTS version)
3. ✅ Install npm dependencies
4. ✅ Install Playwright browsers
5. ✅ Install Allure CLI
6. ✅ Run Playwright tests
7. ✅ Run BDD Cucumber tests
8. ✅ Generate Cucumber reports (HTML, JSON, JUnit)
9. ✅ Generate Allure report
10. ✅ Upload Playwright report as artifact
11. ✅ Upload Cucumber reports as artifact
12. ✅ Upload Allure report as artifact
13. ✅ Upload screenshots (on failure)
```

### Triggers

- **Push** to `main` or `master` branch
- **Pull Requests** to `main` or `master` branch

### Artifacts Available

| Artifact Name | Contains | Retention |
|--------------|----------|-----------|
| `playwright-report` | Native Playwright HTML report | 30 days |
| `cucumber-reports` | All Cucumber reports (HTML, JSON, JUnit) | 30 days |
| `allure-report` | Allure HTML report | 30 days |
| `test-screenshots` | Screenshots from failed tests | 7 days |

### How to View Reports

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Click on the latest workflow run
4. Scroll down to **Artifacts** section
5. Download and extract any report

---

## 🦊 GitLab CI/CD Pipeline

**File:** `.gitlab-ci.yml`

### Pipeline Stages

#### Stage 1: Test (Parallel Execution)

**Job 1: `playwright_tests`**
```bash
- Run Playwright tests
- Generate Playwright HTML report
- Upload artifacts
```

**Job 2: `bdd_tests`**
```bash
- Run BDD Cucumber tests
- Generate JSON, JUnit reports
- Capture screenshots on failure
- Upload artifacts
```

**Job 3: `smoke_tests`** (Manual/MR only)
```bash
- Run @smoke tagged tests only
- Quick validation
```

#### Stage 2: Report

**Job: `generate_reports`**
```bash
- Generate Cucumber HTML reports
- Generate Allure report
- Upload all reports as artifacts
```

#### Alternative: `all_tests` (Manual)
```bash
- Run everything in sequence
- All tests + all reports
- Triggered manually
```

### Triggers

- **Automatic**: On every push
- **Merge Requests**: Runs smoke tests
- **Manual**: Full test suite with `all_tests` job

### Artifacts Available

| Job | Artifacts | Retention |
|-----|-----------|-----------|
| `playwright_tests` | Playwright report, test-results | 7 days |
| `bdd_tests` | Cucumber JSON, JUnit, screenshots | 7 days |
| `generate_reports` | All HTML reports, Allure | 30 days |
| `all_tests` | Complete test suite results | 30 days |
| `smoke_tests` | Smoke test results | 3 days |

### How to View Reports

1. Go to your GitLab project
2. Click **CI/CD → Pipelines**
3. Click on the latest pipeline
4. Click on any job
5. Click **Browse** in the Job artifacts section
6. Navigate to reports and open HTML files

---

## 📋 What Runs in Each Pipeline

### GitHub Actions

```
Pipeline Run
├── Install & Setup
│   ├── Checkout code
│   ├── Setup Node.js
│   ├── npm ci
│   ├── Install browsers
│   └── Install Allure CLI
│
├── Test Execution
│   ├── Playwright Tests (tests/*.spec.js)
│   └── BDD Tests (features/*.feature)
│
├── Report Generation
│   ├── Cucumber HTML Report
│   ├── Cucumber Bootstrap Report
│   ├── Allure Report
│   └── Reports Dashboard
│
└── Artifact Upload
    ├── playwright-report/
    ├── reports/
    ├── allure-report/
    └── test-results/screenshots/
```

### GitLab CI

```
Pipeline Run
│
├── Stage 1: Test (Parallel)
│   ├── Job: playwright_tests
│   │   └── Run: npm run test:playwright
│   │
│   ├── Job: bdd_tests
│   │   └── Run: npm run test:bdd
│   │
│   └── Job: smoke_tests (MR only)
│       └── Run: npm run test:smoke
│
└── Stage 2: Report
    └── Job: generate_reports
        ├── Run: npm run reports:generate
        └── Run: npm run allure:generate
```

---

## 🔧 Environment Variables

### GitHub Actions

Set in: **Settings → Secrets and variables → Actions**

```yaml
# Optional environment variables
HEADLESS: true              # Run browsers in headless mode
SLOWMO: 0                   # Slow motion delay (ms)
PARALLEL: 1                 # Parallel workers for BDD
```

### GitLab CI

Set in: **Settings → CI/CD → Variables**

```yaml
# Built-in variables used
CI_PROJECT_DIR              # Project directory
npm_config_cache            # NPM cache location
PLAYWRIGHT_BROWSERS_PATH    # Playwright browser location
```

---

## 🎯 Running Specific Test Suites in CI

### GitHub Actions

Modify the workflow file to run specific npm scripts:

```yaml
# For smoke tests only
- name: Run Smoke Tests
  run: npm run test:smoke

# For regression tests only
- name: Run Regression Tests
  run: npm run test:regression

# For both Playwright + BDD
- name: Run All Tests
  run: npm run test:both
```

### GitLab CI

Use the `smoke_tests` job or create custom jobs:

```yaml
regression_tests:
  stage: test
  script:
    - npm run test:regression
  only:
    - schedules  # Run on scheduled pipelines
```

---

## 📊 Report Access Guide

### Local Development

```bash
# Run tests and generate all reports
npm run test:all

# Open reports
npm run reports:open         # Cucumber report
npm run allure:open          # Allure report
npx playwright show-report   # Playwright report
open reports/index.html      # Reports dashboard
```

### GitHub Actions

1. Navigate to: **Actions → Latest Run → Artifacts**
2. Download desired artifact (zip file)
3. Extract and open `index.html` files

### GitLab CI

1. Navigate to: **CI/CD → Pipelines → Latest Pipeline**
2. Click on the `generate_reports` job
3. Click **Browse** artifacts
4. Navigate to reports folder
5. Download or view in browser

---

## 🚀 Quick Reference

| What You Need | GitHub Actions | GitLab CI |
|--------------|----------------|-----------|
| View Playwright Report | Download `playwright-report` artifact | Browse `playwright_tests` artifacts |
| View Cucumber Reports | Download `cucumber-reports` artifact | Browse `generate_reports` artifacts |
| View Allure Report | Download `allure-report` artifact | Browse `generate_reports` artifacts |
| View Screenshots | Download `test-screenshots` artifact | Browse `bdd_tests` artifacts |
| Run Smoke Tests Only | Modify workflow | Already configured |
| Run Full Suite | Automatic on push | Use `all_tests` manual job |

---

## ✅ Verification Checklist

Before pushing to CI:

- [ ] Tests pass locally: `npm run test:all`
- [ ] Reports generate: `npm run reports:generate`
- [ ] Allure generates: `npm run allure:generate`
- [ ] Dependencies up to date: `npm outdated`
- [ ] Browsers installed: `npx playwright install`

---

## 🐛 Troubleshooting CI

### GitHub Actions

**Issue**: Tests fail in CI but pass locally

**Solution**:
```yaml
# Add debug step
- name: Debug Environment
  run: |
    node --version
    npm --version
    npx playwright --version
```

**Issue**: Browser not launching

**Solution**: Ensure using the official Playwright Docker image or install system dependencies

### GitLab CI

**Issue**: Pipeline stuck or slow

**Solution**:
```yaml
# Enable caching
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - .npm/
    - node_modules/
```

**Issue**: Artifacts too large

**Solution**: Reduce retention or exclude unnecessary files:
```yaml
artifacts:
  expire_in: 3 days
  exclude:
    - node_modules/
```

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Allure CI Integration](https://docs.qameta.io/allure/#_get_started)

---

**✨ Your tests and reports will now run automatically on every push!**
