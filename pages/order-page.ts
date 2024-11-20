import { Locator, Page } from "@playwright/test";

export default class OrderPage {
  public readonly page: Page;
  public readonly orderMessage: Locator;
  public readonly orderNumberText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderMessage = page.locator("#order-confirmation").locator("h1");
    this.orderNumberText = page.locator("[data-id=ordernumber]");
  }
}
