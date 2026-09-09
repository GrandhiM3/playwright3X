# Playwright 3X

This repository contains end-to-end browser tests written with [Playwright Test](https://playwright.dev/docs/intro).

## Project structure

- `tests/` contains the Playwright test specifications.
- `playwright.config.ts` defines the test directory, HTML reporter, retry behavior, and browser projects.
- `package.json` declares the development dependencies.

## Prerequisites

- Node.js
- npm

Install the project dependencies and Playwright browsers:

```powershell
npm install
npx playwright install
```

## Running tests

Run the full suite across Chromium, Firefox, and WebKit:

```powershell
npx playwright test
```

Run one specification:

```powershell
npx playwright test tests/example.spec.ts
```

The configured tests run in headed mode. Playwright writes its HTML report to the generated `playwright-report/` directory. Open the most recent report with:

```powershell
npx playwright show-report
```

## Writing tests

Add test specifications under `tests/` and import `test` and `expect` from `@playwright/test`. The configuration discovers these files automatically and runs them using the configured browser projects.
