import { test, expect } from "@playwright/test";
import SearchPage from "../pages/search-page";

let searchPage: SearchPage;

test.beforeEach("Setup", async ({ page }) => {
  searchPage = new SearchPage(page);
  await page.goto("http://localhost:3100/search");
});
test.afterEach("Teardown", async ({ page }) => {
  await page.close();
});

test.describe("Search Suite", () => {
  test("Search Success", async ({ page }) => {
    await searchPage.searchField.fill("automation");
    await searchPage.searchButton.click();
    await expect(searchPage.resultsMessage).toContainText(
      "Found one result for automation"
    );
  });

  test("Search Empty", async ({ page }) => {
    await searchPage.searchField.fill("");
    await searchPage.searchButton.click();
    await expect(searchPage.resultsMessage).toContainText(
      "Please provide a search word."
    );
  });
});
