import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page";
import HomePage from "../pages/home-page";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach("Setup", async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await page.goto("http://localhost:3100/login");
});
test.afterEach("Teardown", async ({ page }) => {
  await page.close();
});

test.describe("Login Suite", () => {
  test("Login Sucess", async ({ page }) => {
    await loginPage.usernameField.fill("johndoe19");
    await loginPage.passwordField.fill("supersecret");
    await loginPage.signInButton.click();
    await expect(homePage.welcomeMessage).toContainText("Welcome!");
    await expect(homePage.welcomeUsername).toContainText("johndoe19");
  });

  test("Login Failure A", async ({ page }) => {
    await loginPage.usernameField.fill("testing");
    await loginPage.passwordField.fill("wrongMessage");
    await loginPage.signInButton.click();
    await expect(loginPage.wrongcredentialsMessage).toContainText(
      "Wrong credentials"
    );
  });

  test("Login Failure B", async ({ page }) => {
    await loginPage.usernameField.fill("");
    await loginPage.passwordField.fill("");
    await loginPage.signInButton.click();
    await expect(loginPage.fieldCannotBeEmptyMessage).toContainText(
      "Fields can not be empty"
    );
  });

  test("Checkout Form Order Success", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });

  test("Checkout Form Alert", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });

  test("Cart Total Test", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });

  test("Grid Item Test", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });

  test("Grid All Items Test", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });

  test("Search Success", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });

  test("Search Empty", async ({ page }) => {
    await page.locator("#username").click();
    await page.locator("#password").fill("supersecret");
    await page.locator("#signin-button").click();
  });
});
