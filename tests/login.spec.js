/**
 * Test Suite for Login Page Functionality
 * Includes tests for successful and failed login attempts.
 */
const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/login.page").default;
const settings = require("../data/settings.json");
const CommonPage = require("../pages/common.page").default;

test.describe("Login Tests", () => {
  let loginPage;
  let commonPage;

  test.beforeEach(async ({ page }) => {
    commonPage = new CommonPage(page);
    loginPage = new LoginPage(page);
    await commonPage.navigate("/login");
  });

  test("Login Success", async () => {
    await loginPage.login(
      settings.env.credentials.common.user,
      settings.env.credentials.common.password
    );
    const welcomeMessage = await loginPage.getWelcomeMessage();
    expect(welcomeMessage).toContain(settings.env.credentials.common.user);
  });

  test("Login Failure A (Invalid Credentials)", async () => {
    await loginPage.login(
      settings.env.credentials.wrong.user,
      settings.env.credentials.wrong.password
    );
    await loginPage.getLoginMessage("Wrong credentials");
  });

  test("Login Failure B (Blank Credentials)", async () => {
    await loginPage.login(
      settings.env.credentials.blank.user,
      settings.env.credentials.blank.password
    );
    await loginPage.getLoginMessage("Fields can not be empty");
  });
});