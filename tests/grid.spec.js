/**
 * Test Suite for Grid Page Functionality
 * Includes tests for individual and all grid items validation.
 */
const { test, expect } = require("@playwright/test");
const GridPage = require("../pages/grid.page").default;
const CommonPage = require("../pages/common.page").default;

test.describe("Grid Tests", () => {
  let gridPage;
  let commonPage;

  test.beforeEach(async ({ page }) => {
    gridPage = new GridPage(page);
    commonPage = new CommonPage(page);
    await commonPage.navigate("/grid");
  });

  test("Grid Item Test", async () => {
    // Test specific item in grid
    const productExpectedName = "Super Pepperoni";
    const productExpectedPosition = 7;
    const productExpectedPrice = "$10";

    // Scroll to the product
    const productLocator = gridPage.getGridItemAt(productExpectedPosition);
    await productLocator.scrollIntoViewIfNeeded();

    const productName = await gridPage.getProductNameAt(productExpectedPosition);
    expect(productName).toBe(productExpectedName);

    const productPrice = await gridPage.getProductPriceAt(productExpectedPosition);
    expect(productPrice).toBe(productExpectedPrice);
  });

  test("Grid All Items Test", async ({ page }, testInfo) => {
    // Validate all grid items
    const gridItems = await gridPage.getAllGridItems();

    for (const item of gridItems) {
      expect(item.title).not.toBe(""); // Title must not be empty
      expect(item.price).toMatch(/^\$\d+$/); // Price must be valid
      expect(item.image).not.toBe(""); // Image must exist
      expect(item.button).toBeTruthy(); // Button must exist
    }

    // Take full page screenshot for debugging
    await page.screenshot({
      path: "playwright-report/data/fullscreenshot.png",
      fullPage: true,
    });

    testInfo.attach("Full Page Screenshot", {
      path: "playwright-report/data/fullscreenshot.png",
      contentType: "image/png",
    });
  });
});