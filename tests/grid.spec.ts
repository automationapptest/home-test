import { test, expect } from "@playwright/test";
import GridPage from "../pages/grid-page";

let gridPage: GridPage;

test.beforeEach("Setup", async ({ page }) => {
  gridPage = new GridPage(page);
  await page.goto("http://localhost:3100/grid");
});
test.afterEach("Teardown", async ({ page }) => {
  await page.close();
});

test.describe("Grid Suite", () => {
  test("Grid Item Test", async ({ page }) => {
    const productPosition = await gridPage.items.filter({ hasText: "7" });

    const productName = await productPosition
      .locator('[data-test-id="item-name"]')
      .textContent();
    expect(productName).toBe("Super Pepperoni");

    const productPrice = await productPosition
      .locator("#item-price")
      .textContent();
    expect(productPrice).toBe("$10");
  });

  test("Grid All Items Test", async ({ page }) => {
    const items = gridPage.items;

    const itemCount = await items.count();

    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);

      // Assert title is non-empty
      const title = await item
        .locator('[data-test-id="item-name"]')
        .textContent();
      expect(title?.trim().length).toBeGreaterThan(0);

      // Assert price is non-empty
      const price = await item.locator("#item-price").textContent();
      expect(price?.trim().length).toBeGreaterThan(0);

      // Assert image source is non-empty
      const imageSrc = await item.locator("img").getAttribute("src");
      expect(imageSrc?.trim().length).toBeGreaterThan(0);

      // Assert button exists and is non-empty
      const buttonText = await item
        .locator('[data-test-id="add-to-order"]')
        .textContent();
      expect(buttonText?.trim().length).toBeGreaterThan(0);
    }
  });
});
