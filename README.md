# Home Test Project

This repository contains automated tests for the **Home Test Project**, developed using Playwright. The tests validate various functionalities, including login, checkout, grid, and search.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **Docker** (if you need to run the application locally)

## Installation

1. Clone the repository and navigate to the project directory:
   ```
   git clone https://github.com/NicoSalva/home-test.git
   cd home-test
   ```

2. Install the dependencies:
```
npm install
```
3. Install Playwright browsers:
```
npx playwright install
```
4. Pull and run the Docker image for the web application:
```
docker pull automaticbytes/demo-app
docker run -p 3100:3100 automaticbytes/demo-app
```

5. Verify the application is running: Open http://localhost:3100 in your browser.

## Running the Tests

To run all the tests together:
```
npm test
```

## Run a Specific Test File

```
npx playwright test tests/<test-file>.spec.js
```

Example:
```
npx playwright test tests/login.spec.js
```

## Run a Specific Test

```
npx playwright test tests/<test-file>.spec.js --grep "<test-name>"
```

Example:
```
npx playwright test tests/login.spec.js --grep "TEST02 - Login Failure A"
```

## Headless Mode
If you want to run the tests in headless mode (without opening the browser), modify the headless flag in the playwright.config.js:
```
headless: true,
```

Alternatively, override it directly when running the test:
```
npx playwright test --headed=false
```

## Reporting

## Generate and open the Allure report:

```
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## My Solution
I decided to apply the POM (Page Object Model) pattern because it was mentioned as an added value in the challenge requirements. However, I didn’t find it necessary to create a separate section for encapsulating locators since the project size is relatively small. I prefer to focus on optimizing development practicality and ease of use over strictly adhering to theoretical concepts.

Even though it wasn’t mentioned as a requirement, I added Allure reporting because I believe it’s visually appealing and adds significant value to frameworks like this.

While I would normally prefer fewer comments, for this type of project I think it’s appropriate to include explanations of what each method does in the pages. This makes the framework easier to understand and maintain for anyone reviewing or expanding the solution.
