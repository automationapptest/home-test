#**App Automation Test**

## Must have before start

- **Git**: To clone the repository.
- **Docker**: To run the application under test.
- **Node.js**: To execute Playwright tests.

## Steps to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/abelramireza/home-test.git
cd home-test
```
### 2. Install Dependencies 
```bash
npm install
npx playwright install #"If Playwright browsers are not installed automatically, you can install them manually:"
```

### 3. Pull Docker Image
1. Pull the docker image containing the web app
`docker pull automaticbytes/demo-app`

2. Run the image
`docker run -p 3100:3100 automaticbytes/demo-app`

3. Verify the app is shown in below url and set it as the base url for the tests.
`http://localhost:3100`

### 4. Run the Tests
```bash
npx playwright test
```
Run tests in a specific browser (e.g., Chrome or Firefox):
```bash
npm run chrome:run
npm run firefox:run
npm run default:run #To execute in all default browsers in the playwright.config.js
```
After running the tests, Playwright generates a detailed report. Open it using:
```bash
npx playwright show-report
```

### Tests Scenarios
1.  Login Success
   - Navigate to http://localhost:3100/login
   - Successfully login with credentials: johndoe19/supersecret
   - Assert that welcome message containing username is shown.

2. Login Failure A
   - Navigate to http://localhost:3100/login
   - Enter wrong username/password
   - Assert error message is shown.

3. Login Failure B
   - Navigate to http://localhost:3100/login
   - Leave both username/password in blank
   - Assert error message is shown.

4. Checkout Form Order Success
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is not checkmarked then checkmark it.
   - Submit the form and assert that the order confirmation number is not empty.

5. Checkout Form Alert
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is checkmarked, then uncheckmark it.
   - Try to submit the form and validate that the alert message is shown and confirm the alert.
   - Assert alert is gone.

6. Cart Total Test
    - Navigate to http://localhost:3100/checkout
	- Assert that the cart total shown is correct for the item prices added.

7. Grid Item Test
    - Navigate to http://localhost:3100/grid
    - Assert that in position 7 the product shown is "Super Pepperoni"
	- Assert that the price shown is $10
	
8. Grid All Items Test	
	- Navigate to http://localhost:3100/grid
	- Assert that all the items have a non empty title, price, image and a button.

9. Search Success
  - Navigate to http://localhost:3100/search
  - Search for any word (for instance automation)
  - Assert that "Found one result for" plus the word you searched is shown.

10. Search Empty
	- Navigate to http://localhost:3100/search
	- Leave search box empty and submit the search
	- Assert that "Please provide a search word." message is shown.

### Key Features
1.	Automated Docker Management:
	•	The Docker container is started in globalSetup.js and stopped in globalTeardown.js. No manual intervention is required.
2.	Cross-Browser Testing:
	•	Tests run in both Chrome and Firefox browsers by default.
3.	Full Page Object Model:
	•	Tests are organized using a Page Object Model for better readability and maintainability


### Additonal Notes

1.	Environment Setup:
	•	The project uses globalSetup.js to start the Docker container before running tests.
	•	The container is automatically stopped after tests via globalTeardown.js.
2.	Custom Configurations:
	•	The playwright.config.js file includes settings for parallel test execution, browser-specific configurations, and headless testing modes.
3.	Extensibility:
	•	New test cases can be easily added by following the Page Object Model and reusing common components.
4.	Parallel Execution:
	•	All tests are run twice (once for each browser: Chrome and Firefox) for comprehensive cross-browser validation.

   ## GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) to automate the execution of Playwright tests in a CI/CD pipeline. Below is an overview of how the workflow is set up:

### Workflow Highlights

1. **Docker Installation and Setup**:
   - The workflow installs Docker and pulls the `automaticbytes/demo-app` Docker image.
   - This image is used as the backend for the tests.

2. **Automated Browser Installation**:
   - Playwright browsers are installed using `npx playwright install --with-deps`.

3. **Test Execution**:
   - Playwright tests are executed in **headless mode** by default to ensure compatibility with CI environments without a display server.
   - If you want to run tests in headed mode (with a UI), the workflow supports using `xvfb-run` to create a virtual display environment.

4. **Test Report Artifacts**:
   - After the tests complete, the Playwright HTML report is uploaded as an artifact for review.

### Running Headless or Headed Browsers in CI

- By default, the tests run in **headless mode** for simplicity and speed. This is configured in the `playwright.config.js` file:

```javascript
use: {
  headless: true, // Ensure tests run in headless mode in CI
  baseURL: 'http://localhost:3100',
  screenshot: 'on',
  trace: 'on-first-retry',
},
```
- To enable headed mode (if required), the workflow uses xvfb-run:
```yaml
- name: Run Playwright Tests
  run: xvfb-run --auto-servernum -- npx playwright test
  ```