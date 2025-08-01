# Playwright Test Automation Framework for Flight Booking

## Overview

This is a test automation framework built with Playwright and TypeScript to automate the testing of a flight booking website. The framework is designed to be robust, maintainable, and easy to use. It follows the Page Object Model (POM) design pattern to separate test logic from UI interaction details.

## Framework Structure

The project follows a standard structure for Playwright test automation frameworks:

```
.
├── pages/
│   ├── flight_page.ts
│   └── searchResult_page.ts
├── tests/
│   ├── searchFlights.spec.ts
│   └── priceCompare.spec.ts
├── util/
│   └── price-helper.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

*   **`pages/`**: Contains Page Object Model (POM) classes. Each class represents a page and encapsulates its locators and interaction methods.
*   **`tests/`**: Contains the test scripts for different user flows and features.
*   **`util/`**: Contains helper functions that can be reused across different tests.
*   **`.gitignore`**: Specifies files and directories to be ignored by Git.
*   **`package.json`**: Defines project dependencies and scripts.
*   **`package-lock.json`**: Records the exact versions of dependencies.
*   **`playwright.config.ts`**: The main configuration file for Playwright.
*   **`README.md`**: This file.

## Design Choices

The framework is designed with the following principles in mind:

*   **Page Object Model (POM):** The use of the POM pattern makes the tests more readable, maintainable, and reusable. It separates the test logic from the UI interaction details, which makes it easier to update the tests when the UI changes.
*   **Helper Functions:** The `util/` directory contains reusable helper functions. For example, `util/price-helper.ts` includes `captureVisibleFlightPrices`, which extracts and parses flight prices from the search results page. This promotes code reuse and separates complex logic from the tests.
*   **Playwright Test Runner:** Playwright is a modern and powerful test automation framework that provides a number of features that make it well-suited for testing web applications. These features include:
    *   **Cross-browser testing:** Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.
    *   **Parallel execution:** Playwright can run tests in parallel, which can significantly reduce the time it takes to run the tests.
    *   **Auto-waits:** Playwright automatically waits for elements to be ready before interacting with them, which makes the tests more reliable.
*   **TypeScript:** The use of TypeScript adds static typing to JavaScript, which helps to catch errors early and improve the quality of the code.

## Prerequisites

Before you can run the tests, you need to make sure that you have the following software installed on your machine:

*   [Node.js](https'://nodejs.org/en/) (v16 or higher)
*   [npm](https://www.npmjs.com/) (v8 or higher)

## Installation

To install the project dependencies, follow these steps:

1.  Clone the repository to your local machine.
2.  Open a terminal window and navigate to the project directory.
3.  Run the following command to install the dependencies:

```bash
npm install
```

## Running the Tests

You can run the entire test suite using npm:

```bash
npm test
```

This command executes all tests located in the `tests/` directory.

Alternatively, you can run tests directly with `npx playwright test`. This is useful for more specific commands:

To run the tests in headed mode (to watch the browser):

```bash
npx playwright test --headed
```

To run the tests in a specific browser:

```bash
npx playwright test --browser chromium
```

## CI/CD Integration

The framework can be easily integrated into a CI/CD pipeline, such as Jenkins or GitHub Actions.

### Jenkins

To integrate the framework with Jenkins, you can use the following steps:

1.  Install the Node.js plugin in Jenkins.
2.  Create a new Jenkins job and configure it to use a recent Node.js version.
3.  In the build step, add a shell command to run the tests:

```bash
npm install
npm test
```

4.  Configure the job to publish the test results (e.g., using the HTML Publisher plugin for the Playwright report).

### GitHub Actions

To integrate the framework with GitHub Actions, you can create a workflow file in `.github/workflows/`.

Here is an example workflow:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
    - name: Install dependencies
      run: npm install
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - name: Upload report
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

This workflow will run the tests on every push and pull request to the main/master branch. It will also upload the test report as an artifact.
