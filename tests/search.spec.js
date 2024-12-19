/**
 * Test Suite for Search Page Functionality
 * Includes tests for successful searches and validation for empty searches.
 */
const { test, expect } = require("@playwright/test");
const CommonPage = require("../pages/common.page").default;
const SearchPage = require("../pages/search.page").default;

test.describe("Search Page Tests", () => {
  let searchPage;
  let commonPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    commonPage = new CommonPage(page);
    await commonPage.navigate("/search");
  });

  // Test cases for search functionality
  const searchTests = [
    {
      name: "Search Success",
      query: "automation",
      expectedMessage: "Found one result for automation",
    },
    {
      name: "Search Empty",
      query: "",
      expectedMessage: "Please provide a search word.",
    },
  ];

  searchTests.forEach(({ name, query, expectedMessage }) => {
    test(name, async () => {
      // Perform the search
      await searchPage.performSearch(query);

      // Validate the result
      const resultText = await searchPage.getSearchResult(expectedMessage);
      expect(resultText).toContain(expectedMessage);
    });
  });
});