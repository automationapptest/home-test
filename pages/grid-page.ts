import { Locator, Page } from "@playwright/test";

export default class GridPage {
  public readonly page: Page;
  public readonly items: Locator;
  public readonly titleText: Locator;
  public readonly addToCartButton: Locator;
  public readonly priceText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator(".item");
    this.titleText = page.locator('[data-test-id="item-name"]');
    this.priceText = page.locator("#item-price");
    this.addToCartButton = page.locator("#signin-button");
  }
}
